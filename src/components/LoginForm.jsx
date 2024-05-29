import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login with:', username, password);
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Masukan Username"
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
                        <button type="submit" className="w-full p-4 bg-[#5D3323] text-white rounded-lg hover:bg-[#4a271e]">Login</button>
                    </form>
                </div>
                <div className="w-px bg-gray-300 mx-8"></div>
                <div className="w-2/5 flex justify-center items-center">
                    <img src="/lahandamailogo.png" alt="Logo" className="max-w-full max-h-96 object-contain" /> {/* Adjust the path and size as needed */}
                </div>
            </div>
        </div>
    );
}

export default LoginForm;