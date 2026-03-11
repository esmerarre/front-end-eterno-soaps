import { useState } from 'react';
import axios from 'axios';
import "./AdminSignIn.css";

interface AdminSignInProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (accessToken: string) => void;
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminSignIn({ isOpen, onClose, onSuccess}: AdminSignInProps) {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage('');

        if (!formData.username.trim() || !formData.password.trim()) {
            setErrorMessage('Please enter both username and password.');
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await axios.post(`${BASE_URL}/admins/login`, {
                username: formData.username,
                password: formData.password,
            });

            const accessToken: string | undefined = response.data?.access_token;
            if (!accessToken) {
                setErrorMessage('Login failed. Missing access token.');
                return;
            }

            onSuccess(accessToken);
            setFormData({ username: '', password: '' });
        } catch {
            setErrorMessage('Invalid credentials. Please try again.');
        } finally {
            setIsSubmitting(false);
        }

    }

    const makeControlledInput = (inputName: 'username' | 'password') => {
        return (
        <input
            type={inputName === 'password' ? 'password' : 'text'}
            name={inputName}
            id={`input-${inputName}`}
            value={formData[inputName]}
            onChange={handleChange}
            autoComplete={inputName === 'password' ? 'current-password' : 'username'}
        />
        );
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-admin-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="close-button" onClick={onClose}>
            &times;
            </button>
            <form onSubmit={handleSubmit} className="sign-in-form">
            <div className="input-wrapper">
                <label htmlFor="input-username">Admin Username: </label>
                <div>{makeControlledInput('username')}</div>
            </div>
            <div className="input-wrapper">
                <label htmlFor="input-password">Password: </label>
                <div>{makeControlledInput('password')}</div>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            <div className="submit-button-wrapper">
                <input type="submit" value={isSubmitting ? 'Signing In...' : 'Sign In'} disabled={isSubmitting} />
            </div>
            </form>
        </div>
        </div>
    );
}