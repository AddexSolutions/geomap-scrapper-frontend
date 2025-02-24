import React from "react";

const DashboardOverview = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
    );
};

export default DashboardOverview;
