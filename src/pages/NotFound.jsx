import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import NotFoundImage from '../assets/NotFound-Image.svg';

const NotFound = () => {
    return (
        <section className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-100 px-6">
            {/* Not Found Image */}
            <img
                src={NotFoundImage}
                alt="Page Not Found"
                className="max-w-md w-full"
            />

            {/* Return Home Button */}
            <Link
                to="/"
                className="flex items-center gap-2 mt-5 px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-900 transition duration-300"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Return Home</span>
            </Link>
        </section>
    );
};

export default NotFound;
