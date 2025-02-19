import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Mail, Phone, Loader2, KeyRound } from 'lucide-react';

const ForgetPassword = () => {
    const { forgetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Modify logic based on whether you allow password resets via phone.
        await forgetPassword(email, phone);

        setIsLoading(false);

        setEmail('');
        setPhone('');
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Reset Your Password</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    {/* Reset Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer bg-orange-500 text-white flex items-center justify-center gap-2 py-2 rounded-md hover:bg-orange-600 transition"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <KeyRound size={20} />}
                        {isLoading ? '' : 'Send Reset Link'}
                    </button>

                    {/* Back to Login */}
                    <div className="text-sm mt-4 text-center">
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
