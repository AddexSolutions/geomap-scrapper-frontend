import React from "react";

const DashboardProfile = ({ user }) => {

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">User Profile</h2>
            <p className="text-gray-600"><strong>ID:</strong> {user?.id}</p>
            <p className="text-gray-600"><strong>Name:</strong> {user?.name}</p>
            <p className="text-gray-600"><strong>Email:</strong> {user?.email}</p>
        </div>
    );
};

export default DashboardProfile;
