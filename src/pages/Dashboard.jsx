import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('Overview');

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-indigo-600 text-white p-6 shadow-lg flex flex-col">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                    <p className="text-sm text-gray-300">{user?.Email}</p>
                </div>

                <nav className="flex flex-col space-y-3">
                    {['Overview', 'Profile', 'Settings'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-left px-4 py-2 rounded-md transition ${activeTab === tab ? 'bg-white text-indigo-600' : 'hover:bg-indigo-500'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="mt-auto cursor-pointer bg-slate-50 text-black py-2 px-4 rounded-md hover:bg-slate-200 transition"
                >
                    Logout
                </button>

                {/* Back to Home Button */}
                <Link
                    to="/"
                    className="mt-4 bg-gray-200 text-black py-2 px-4 rounded-md text-center hover:bg-gray-300 transition"
                >
                    ← Back to Home
                </Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{activeTab}</h1>

                {/* Dynamic Content */}
                {activeTab === 'Overview' && (
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-indigo-500 text-white p-6 rounded-lg shadow-md">
                            <p className="text-lg font-semibold">Projects</p>
                            <p className="text-2xl">3</p>
                        </div>
                        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
                            <p className="text-lg font-semibold">Tasks Completed</p>
                            <p className="text-2xl">15</p>
                        </div>
                        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
                            <p className="text-lg font-semibold">Pending Tasks</p>
                            <p className="text-2xl">4</p>
                        </div>
                    </div>
                )}

                {activeTab === 'Profile' && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">User Profile</h2>
                        <p className="text-gray-600"><strong>ID:</strong> {user?.id}</p>
                        <p className="text-gray-600"><strong>Name:</strong> {user?.Name}</p>
                        <p className="text-gray-600"><strong>Email:</strong> {user?.Email}</p>
                    </div>
                )}

                {activeTab === 'Settings' && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700">Settings</h2>
                        <p className="text-gray-600 mt-2">Coming Soon...</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
