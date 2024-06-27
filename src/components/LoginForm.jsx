import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import lahandamailogo from '../assets/lahandamailogo.png'

function LoginForm({ setIsLoggedIn }) {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    setIsLoggedIn(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Login with:', email, password);
        
        try {
            const userData = await login(email, password);
            console.log('User logged in:', userData);
            
            setIsLoggedIn(true);
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 500) {
                    setErrorMessage('Server error. Please try again later.');
                } else {
                    setErrorMessage('Email or password is incorrect.');
                }
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
            console.error('Login error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full flex">
                <div className="w-3/5 p-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h2 className="text-center text-2xl font-bold">Lahan Damai - CMS Login Page</h2>
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                type="text"
                                required
                                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={email}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Masukan Email"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Masukan Password"
                            />
                            <span 
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-sm mt-2">
                                {errorMessage}
                            </div>
                        )}
                        <button type="submit" className="w-full p-4 bg-[#5D3323] text-white rounded-lg hover:bg-[#4a271e]">Login</button>
                    </form>
                </div>
                <div className="w-px bg-gray-300 mx-8"></div>
                <div className="w-2/5 flex justify-center items-center">
                    <img src={lahandamailogo} alt="Logo" className="max-w-full max-h-96 object-contain" /> 
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
