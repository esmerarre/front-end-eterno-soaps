import { useState } from 'react';
import "./AdminSignIn.css";

interface AdminSignInProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSignIn({ isOpen, onClose}: AdminSignInProps) {
  const [formData, setFormData] = useState({ username: '' }); //set up default state as empty str

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

        setFormData((formData) => {
            return {
                ...formData,
                [inputName]: inputValue
            }
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // REVIEW!!! xxx.admin placeholder for class from backend
        // if (!formData.username.trim() || formData.username != xxx.username) { //popup if field left empty // change logic to alert if credential is wrong
        //     alert('Please enter Admin credentials.');
        // return;
        // }

        if (!formData.username.trim()) { //popup if field left empty // change logic to alert if credential is wrong
            alert('Please enter Admin credentials.');
        return;
        }

    // displayNewPage(formData); //notifying rest of the app that there is data available 
    setFormData({username: ''}) //resets the text bar when the form is submitted
    }

    const makeControlledInput = (inputName: 'username') => {
        return (
        <input
            type="text"
            name={inputName}
            id={`input-${inputName}`}
            value={formData[inputName]}
            onChange={handleChange}
        />
        );
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="close-button" onClick={onClose}>
            &times;
            </button>
            <form onSubmit={handleSubmit} className="sign-in-form">
            <div className="input-wrapper">
                <label htmlFor="username">Enter Admin Username: </label>
                <div>{makeControlledInput('username')}</div>
            </div>
            <div className="submit-button-wrapper">
                <input type="submit" value="Sign In" />
            </div>
            </form>
        </div>
        </div>
    );
}