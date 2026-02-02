import { useState } from 'react';
import "./AdminSignIn.css";

interface AdminSignInProps {
  isOpen: boolean;
  onClose: () => void;
  admins?: { id: number; username: string }[];
  onSuccess: () => void;
}

export default function AdminSignIn({ isOpen, onClose, admins, onSuccess}: AdminSignInProps) {
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
        
        const isValidUsername = admins?.some((admin) => admin.username === formData.username);
        
        if (!formData.username.trim()) { //popup if field left empty // change logic to alert if credential is wrong
            alert('Please enter Admin credentials.');
        }

        else if (!isValidUsername) { //popup if field left empty // change logic to alert if credential is wrong
            alert("You've entered an incorrect username. Please try again.");
        }

        else if (isValidUsername) { //correct admin username
            onSuccess(); //display admin dashboard page
        }
        
        setFormData({username: ''}) //resets the text bar when the form is submitted

        return;

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