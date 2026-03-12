import { useState, useEffect } from 'react';
import type { NewProduct } from '../App';
import { getPresignedUploadUrl, uploadImageToS3 } from '../services/product';
import './NewProductForm.css';

interface NewProductFormProps {
  createNewProduct: (product: NewProduct) => void;
}

const kDefaultsFormState = {
  name: '',
  description: '',
  ingredients: '',
};

const NewProductForm = ({createNewProduct}: NewProductFormProps) => {
  const [formData, setFormData] = useState(kDefaultsFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Revoke the object URL when preview changes or component unmounts to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    
    setFormData((formData) => ({
      ...formData,
      [inputName]: inputValue,
    }));
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

    if (imageFile) {
      try {
        setIsUploading(true);
        const { uploadUrl, key } = await getPresignedUploadUrl(imageFile.name, imageFile.type);
        await uploadImageToS3(imageFile, uploadUrl);
        imgKey = key;
      } catch {
        alert('Image upload failed. Please try again.');
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    const ingredientsArray = formData.ingredients.split(',').map((item) => item.trim());
    createNewProduct({ ...formData, ingredients: ingredientsArray, imgKey });
    setFormData(kDefaultsFormState);
    handleRemoveImage();
  };

  const makeControlledInput = (inputName: 'name' | 'description' | 'ingredients', placeholder?: string) => {
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
        <label htmlFor="ingredients">List Ingredients (comma-separated):</label>
        <div>{makeControlledInput('ingredients', 'e.g. Oats, Honey, Lavender')}</div>
      </div>
      <div className="input-wrapper">
        <label>Product Image (optional):</label>
        <div className="file-upload-wrapper">
          <label htmlFor="productImage" className="file-upload-label">
            {imageFile ? imageFile.name : 'Choose an image…'}
          </label>
          <input
            type="file"
            id="productImage"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
            tabIndex={-1}
          />
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