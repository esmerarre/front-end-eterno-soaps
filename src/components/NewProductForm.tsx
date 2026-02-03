import { useState } from 'react';
import type { NewProduct } from '../App';
import './NewProductForm.css';

interface NewProductFormProps {
  createNewProduct: (product: NewProduct) => void;
}

const kDefaultsFormState = {
  name: '',
  description: '',
  ingredients: '',
  imgKey: '',
};

const NewProductForm = ({createNewProduct}: NewProductFormProps) => {
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

    if (!formData.name.trim() || !formData.description.trim() || !formData.ingredients.trim() ){ //popup if field left empty
      alert('Please fill in all required fields.');
      return;
    }

    const ingredientsArray = formData.ingredients.split(',').map(item => item.trim());
    createNewProduct({ ...formData, ingredients: ingredientsArray }); //notifying rest of the app that there is data available 
    setFormData(kDefaultsFormState) //resets the text bar when the form is submitted
  }

  const makeControlledInput = (inputName: 'name' | 'description' | 'ingredients' | 'imgKey', placeholder?: string) => {
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
        <label htmlFor="imgKey">Product Image Key (optional): </label>
        <div>{ makeControlledInput('imgKey', "e.g. new-image.jpg")}</div>
      </div>
      <div className="submit-button-wrapper">
        <input type="submit" value="Create A New Product"/>
      </div>
    </form>
  );
};

export default NewProductForm;