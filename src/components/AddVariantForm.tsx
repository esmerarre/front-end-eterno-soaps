import { useState, useEffect } from 'react';
import type { NewVariant, Product} from '../App';
import './AddVariantForm.css';
import { fetchImageKeys, uploadImageFile } from '../services/product';

interface NewVariantFormProps {
    createNewVariant: (newVariant: NewVariant) => void;
    products: Product[];
}

const kDefaultsFormState = {
    name: '',
    size: '',
    shape: '',
    imgKey: '',
    price: '',
    stockQuantity: '',
};

const NewVariantForm = ({createNewVariant, products}: NewVariantFormProps) => {
  const [formData, setFormData] = useState(kDefaultsFormState); //setting up default state to back the input
  const [imageKeys, setImageKeys] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    
    //as the input changes the state is updated
    setFormData((formData)=> {
      return {
        ...formData,
        [inputName]: inputValue
      };
    });
    if (inputName === 'imgKey') {
      setShowSuggestions(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.size.trim() || !formData.price.trim() || !formData.stockQuantity.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    // If a file was selected and no existing imgKey provided, upload now
    if (selectedFile && !formData.imgKey.trim()) {
      setUploading(true);
      try {
        const key = await uploadImageFile(selectedFile);
        setFormData((f) => ({ ...f, imgKey: key }));
        // refresh keys for suggestions
        try {
          const keys = await fetchImageKeys();
          setImageKeys(keys || []);
        } catch (fetchErr) {
          // ignore refresh errors
          console.debug('refresh image keys failed', fetchErr);
        }
      } catch (uploadErr) {
            console.error('upload failed', uploadErr);
        alert('Image upload failed. Variant creation cancelled.');
        setUploading(false);
        return;
      }
      setUploading(false);
      setSelectedFile(null);
    }

    const findProduct = products.find((products) => products.name === formData.name);

    if (findProduct) {
      createNewVariant({ ...formData, productId: findProduct.id, price: parseFloat(formData.price), stockQuantity: parseInt(formData.stockQuantity) });
    } else {
      alert('Product not found. Please make sure the product name is correct or create a new product.');
      return;
    }

    setFormData(kDefaultsFormState); //resets the text bar when the form is submitted
  };

  useEffect(() => {
    let mounted = true;
    const loadKeys = async () => {
      try {
        const keys = await fetchImageKeys();
        if (mounted) setImageKeys(keys || []);
      } catch (err) {
        // silently fail — backend may not exist yet
      }
    };
    loadKeys();
    return () => {
      mounted = false;
    };
  }, []);

  const makeControlledInput = (inputName: 'name' | 'size' | 'shape' | 'imgKey' | 'price' | 'stockQuantity', placeholder?: string) => {
    return (
      <input
        type="text"
        name={inputName}
        id={`variant-${inputName}`}
        value={formData[inputName]}
        onChange={handleChange}
        placeholder={placeholder || ''}
        autoComplete="off"
      />
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    // keep the file input value — we will clear it after a successful submit
  };

  const filteredKeys = formData.imgKey.trim()
    ? imageKeys.filter((k) => k.toLowerCase().includes(formData.imgKey.toLowerCase())).slice(0, 8)
    : [];

  const selectExistingKey = (key: string) => {
    setFormData((f) => ({ ...f, imgKey: key }));
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="variant-form" autoComplete="off">
      <div className="input-wrapper">
        <label htmlFor="variant-name">Enter Product Name: </label>
        <div>{makeControlledInput('name')}</div>
      </div>
      <div className="input-wrapper">
        <label htmlFor="variant-size">Size: </label>
        <div>{ makeControlledInput('size')}</div>
      </div>
        <div className="input-wrapper">
        <label htmlFor="variant-shape">Shape (Optional):</label>
        <div>{makeControlledInput('shape')}</div>
      </div>
      <div className="input-wrapper">
        <label htmlFor="variant-imgKey">Product Variant Image Key (Optional):</label>
        <div className="img-key-field">
          {makeControlledInput('imgKey', "e.g. new-image.jpg")}
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
            accept="image/*"
            onChange={handleFileChange}
            disabled={Boolean(formData.imgKey.trim()) || uploading}
          />
          {selectedFile && (
            <div className="selected-file">Selected file: {selectedFile.name}</div>
          )}
          {Boolean(formData.imgKey.trim()) && (
            <div className="muted">Upload disabled while using an existing image key. Clear the field to upload a new image.</div>
          )}
          {uploading && <div className="upload-status">Uploading...</div>}
        </div>
      </div>
        <div className="input-wrapper">
        <label htmlFor="variant-price">Price:</label>
        <div>{makeControlledInput('price', "e.g. 10.99")}</div>
      </div>
        <div className="input-wrapper">
        <label htmlFor="variant-stockQuantity">Stock Quantity:</label>
        <div>{makeControlledInput('stockQuantity')}</div>
      </div>
      <div className="submit-button-wrapper">
        <input type="submit" value="Create A New Product Variant"/>
      </div>
    </form>
  );
};

export default NewVariantForm;