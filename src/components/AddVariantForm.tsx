import { useState } from 'react';
import type { NewVariant, Product} from '../App';
import './AddVariantForm.css';

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
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    if (!formData.name.trim() || !formData.size.trim() || !formData.price.trim() || !formData.stockQuantity.trim() ) { //popup if field left empty
      alert('Please fill in all required fields.');
      return;
    }

    const findProduct = products.find((products) => products.name === formData.name);

    if (findProduct) {
        createNewVariant({...formData, productId: findProduct.id, price: parseFloat(formData.price), stockQuantity: parseInt(formData.stockQuantity)});  
        }
    else {
        alert('Product not found. Please make sure the product name is correct or create a new product.');
    }

    setFormData(kDefaultsFormState) //resets the text bar when the form is submitted
  }

  const makeControlledInput = (inputName: 'name' | 'size' | 'shape' | 'imgKey' | 'price' | 'stockQuantity', placeholder?: string) => {
    return (
      <input
        type="text"
        name={inputName}
        id={`input-${inputName}`}
        value={formData[inputName]}
        onChange={handleChange}
        placeholder={placeholder || ''}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="variant-form">
      <div className="input-wrapper">
        <label htmlFor="name">Enter Product Name: </label>
        <div>{makeControlledInput('name')}</div>
      </div>
      <div className="input-wrapper">
        <label htmlFor="size">Size: </label>
        <div>{ makeControlledInput('size')}</div>
      </div>
        <div className="input-wrapper">
        <label htmlFor="shape">Shape (Optional):</label>
        <div>{makeControlledInput('shape')}</div>
      </div>
      <div className="input-wrapper">
        <label htmlFor="imgKey">Product Variant Image Key (Optional):</label>
        <div>{makeControlledInput('imgKey', "e.g. new-image.jpg")}</div>
      </div>
        <div className="input-wrapper">
        <label htmlFor="price">Price:</label>
        <div>{makeControlledInput('price', "e.g. 10.99")}</div>
      </div>
        <div className="input-wrapper">
        <label htmlFor="stockQuantity">Stock Quantity:</label>
        <div>{makeControlledInput('stockQuantity')}</div>
      </div>
      <div className="submit-button-wrapper">
        <input type="submit" value="Create A New Product Variant"/>
      </div>
    </form>
  );
};

export default NewVariantForm;


// export interface NewVariant {
//   productId: number;
//   size: string;
//   shape: string;
//   imgUrl: string;
//   price: number;
//   stockQuantity: number;
// }