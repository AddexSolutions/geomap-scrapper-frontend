import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, UserPlus } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await login(email, password);
        setIsSubmitting(false);
        setEmail('')
        setPassword('');
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full ${isSubmitting ? 'cursor-not-allowed': 'cursor-pointer'} bg-blue-500 text-white flex items-center justify-center gap-2 py-2 rounded-md hover:bg-blue-600 transition`}
                    >
                        {isSubmitting && <Loader2 className="animate-spin" size={20} />}
                        {isSubmitting ? '' : 'Login'}
                    </button>

                    {/* Signup & Forgot Password Links */}
                    <div className="flex justify-between text-sm mt-4">
                        <Link to="/signup" className="text-blue-500 flex items-center gap-1 hover:underline">
                            <UserPlus size={16} /> Signup
                        </Link>
                        <Link to="/forget-password" className="text-blue-500 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
