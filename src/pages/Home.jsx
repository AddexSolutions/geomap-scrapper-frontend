import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-50">
            {/* Hero Section */}
            <section className="text-center max-w-3xl mx-auto px-2 sm:px-6">
                <h1 className="text-5xl sm:text-6xl font-extrabold text-indigo-700 mb-4">
                    The #1 GeoMap Scraper SaaS
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                    Extract high-quality data from Google search results effortlessly.
                    Fast, accurate, and built for businesses like yours.
                </p>
                <div className="flex max-sm:flex-col gap-4 justify-center">
                    <Link to="/signup" className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition">
                        Sign Up Now
                    </Link>
                    <Link to="/dashboard" className="px-6 py-3 border border-gray-400 text-gray-700 text-lg font-semibold rounded-lg hover:border-gray-600 transition">
                        Go to Dashboard
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
