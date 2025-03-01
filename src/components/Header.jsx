import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Header = () => {
    const { loading, user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Extract first two letters of user's name
    const avatarText = user?.name ? user.name.slice(0, 2).toUpperCase() : '';

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <header className="bg-indigo-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* App Name */}
                <Link to="/" className="text-2xl sm:text-3xl font-extrabold text-white">GeoMap <span className='max-sm:hidden'>Scapper</span></Link>

                {/* Navigation */}
                <nav className="relative flex items-center space-x-6">
                    {/* Dashboard should always be present */}
                    <Link to="/dashboard" className="text-white hover:text-gray-200">Dashboard</Link>

                    {loading ? (
                        // Skeleton Loaders
                        <div className="flex space-x-4">
                            <div className="w-20 h-6 bg-slate-100 opacity-20 animate-pulse rounded"></div>
                            <div className="w-20 h-6 bg-slate-100 opacity-20 animate-pulse rounded"></div>
                        </div>
                    ) : user ? (
                        <div className="relative" ref={dropdownRef}>
                            {/* Avatar */}
                            <button
                                className="w-10 h-10 cursor-pointer bg-orange-500 text-white flex items-center justify-center rounded-full font-bold"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {avatarText}
                            </button>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-4">
                                    <p className="text-gray-700 text-sm font-bold">ID: {user.id}</p>
                                    <p className="text-gray-700 text-sm">{user.name}</p>
                                    <p className="text-gray-700 text-sm">{user.email}</p>
                                    <button
                                        className="mt-2 w-full cursor-pointer text-black bg-slate-100 py-1 rounded hover:bg-slate-200"
                                        onClick={() => {
                                            logout();
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Show Login and Signup when no user
                        <>
                            <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
                            <Link to="/signup" className="text-white hover:text-gray-200">Signup</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
