import React, { useState } from "react";
import { Settings, Mail, Lock, X } from "lucide-react";
import toast from "react-hot-toast";

const DashboardSettings = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState(user?.Email || "");
    const [password, setPassword] = useState("");

    const handleResetPassword = async (event) => {
        try {
            event.preventDefault();
            
            const response = await fetch("https://primary-production-af7f.up.railway.app/webhook/geomap/reset-password?path=send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                setIsModalOpen(false);
            } else {
                throw new Error(data.message || "Failed to reset password");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Reset Password</h2>
            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 cursor-pointer flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
                <Settings className="w-5 h-5" />
                <span>Reset Password</span>
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-xl w-96 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                            Reset Password
                        </h2>

                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div className="relative">
                                <label className="text-sm text-gray-700 font-medium">Email</label>
                                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                    <Mail className="w-5 h-5 text-gray-400 mx-3" />
                                    <input
                                        type="email"
                                        className="w-full pe-2 py-2 focus:outline-none"
                                        placeholder="Enter your email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-sm text-gray-700 font-medium">Current Password</label>
                                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                    <Lock className="w-5 h-5 text-gray-400 mx-3" />
                                    <input
                                        type="password"
                                        className="w-full pe-2 py-2 focus:outline-none"
                                        placeholder="Enter current password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button className="w-full cursor-pointer bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 transition-all"                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardSettings;
