import { useState, useEffect } from 'react';
import type { NewProduct } from '../App';
import { fetchImageKeys, uploadImageFile } from '../services/product';
import './NewProductForm.css';

interface NewProductFormProps {
  createNewProduct: (product: NewProduct) => void;
}

const kDefaultsFormState = {
  name: '',
  description: '',
  ldescription: '',
  ingredients: '',
  imgKey: '',
};

const NewProductForm = ({createNewProduct}: NewProductFormProps) => {
  const [formData, setFormData] = useState(kDefaultsFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageKeys, setImageKeys] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Revoke the object URL when preview changes or component unmounts to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    
    setFormData((formData) => ({
      ...formData,
      [inputName]: inputValue,
    }));
    if (inputName === 'imgKey') setShowSuggestions(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleRemoveImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.description.trim() || !formData.ingredients.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    let imgKey = '';

    // If an existing key isn't provided but a file is selected, upload it
    if (imageFile && !formData.imgKey.trim()) {
      try {
        setIsUploading(true);
        const key = await uploadImageFile(imageFile);
        imgKey = key;
        // refresh keys list
        try {
          const keys = await fetchImageKeys();
          setImageKeys(keys || []);
        } catch (e) {
          // ignore refresh errors
        }
      } catch {
        alert('Image upload failed. Please try again.');
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    } else if (formData.imgKey.trim()) {
      imgKey = formData.imgKey.trim();
    }

    const ingredientsArray = formData.ingredients.split(',').map((item) => item.trim());
    createNewProduct({ ...formData, ingredients: ingredientsArray, imgKey });
    setFormData(kDefaultsFormState);
    handleRemoveImage();
  };

  const makeControlledInput = (inputName: 'name' | 'description' | 'ingredients' | 'imgKey', placeholder?: string) => {
    return (
      <input
        type="text"
        name={inputName}
        id={`input-${inputName}`}
        value={formData[inputName]}
        onChange={handleChange}
        placeholder={placeholder || ''}
        autoComplete="off"
      />
    );
  };

  useEffect(() => {
    let mounted = true;
    const loadKeys = async () => {
      try {
          const keys = await fetchImageKeys();
          if (mounted) setImageKeys(keys || []);
        } catch {
          // silently fail — backend may not exist yet
        }
    };
    loadKeys();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredKeys = formData.imgKey.trim()
    ? imageKeys.filter((k) => k.toLowerCase().includes(formData.imgKey.toLowerCase())).slice(0, 8)
    : [];

  const selectExistingKey = (key: string) => {
    setFormData((f) => ({ ...f, imgKey: key }));
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="input-wrapper">
        <label htmlFor="name">Name: </label>
        <div>{makeControlledInput('name')}</div>
      </div>
      <div className="input-wrapper">
        <label htmlFor="description">Description: </label>
        <div>{ makeControlledInput('description')}</div>
      </div>
      <div className="input-wrapper">
        <label htmlFor="ldescription">Long Description (optional):</label>
        <div>
          <textarea
            name="ldescription"
            id="input-ldescription"
            value={formData.ldescription}
            onChange={handleChange}
            rows={5}
          />
        </div>
      </div>
        <div className="input-wrapper">
        <label htmlFor="ingredients">List Ingredients (comma-separated):</label>
        <div>{makeControlledInput('ingredients', 'e.g. Oats, Honey, Lavender')}</div>
      </div>
      <div className="input-wrapper">
        <label htmlFor="imgKey">Product Image Key (optional):</label>
        <div className="img-key-field">
          {makeControlledInput('imgKey', 'e.g. new-image.jpg')}
          {showSuggestions && filteredKeys.length > 0 && (
            <ul className="img-key-suggestions">
              {filteredKeys.map((k) => (
                <li key={k} onClick={() => selectExistingKey(k)}>{k}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="file-input-wrapper">
          <label className="file-label">Or upload an image:</label>
          <input
            type="file"
            id="productImage"
            accept="image/*"
            onChange={handleFileChange}
            disabled={Boolean(formData.imgKey.trim()) || isUploading}
          />
          {imageFile && (
            <div className="selected-file">Selected file: {imageFile.name}</div>
          )}
          {Boolean(formData.imgKey.trim()) && (
            <div className="muted">Upload disabled while using an existing image key. Clear the field to upload a new image.</div>
          )}
          {isUploading && <div className="upload-status">Uploading...</div>}
          {imagePreview && (
            <div className="image-preview-wrapper">
              <img src={imagePreview} alt="Product preview" className="image-preview" />
              <button
                type="button"
                className="remove-image-btn"
                onClick={handleRemoveImage}
              >
                ✕ Remove
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="submit-button-wrapper">
        <input
          type="submit"
          value={isUploading ? 'Uploading image…' : 'Create A New Product'}
          disabled={isUploading}
        />
      </div>
    </form>
  );
};

export default NewProductForm;