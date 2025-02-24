import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import DashboardOverview from "../components/Dashboard/DashboardOverview";
import DashboardJobs from "../components/Dashboard/DashboardJobs";
import DashboardSettings from "../components/Dashboard/DashboardSettings";
import DashboardProfile from "../components/Dashboard/DashboardProfile";


const Dashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState("Overview");

    const renderComponent = () => {
        switch (activeTab) {
            case "Overview":
                return <DashboardOverview />;
            case "Jobs":
                return <DashboardJobs />;
            case "Profile":
                return <DashboardProfile user={user} />;
            case "Settings":
                return <DashboardSettings user={user} />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-indigo-600 text-white p-6 shadow-lg flex flex-col">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <p className="text-sm text-gray-300">{user?.Email}</p>

                <nav className="flex flex-col space-y-3 mt-6">
                    {["Overview", "Jobs", "Profile", "Settings"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-left px-4 py-2 rounded-md transition ${activeTab === tab ? "bg-white text-indigo-600" : "hover:bg-indigo-500"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                <button onClick={logout} className="mt-auto cursor-pointer bg-white text-black py-2 px-4 rounded-md">
                    Logout
                </button>

                <Link to="/" className="mt-4 bg-gray-200 text-black py-2 px-4 rounded-md text-center">
                    ← Back to Home
                </Link>
            </aside>

            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6">{activeTab}</h1>
                {renderComponent()}
            </main>
        </div>
    );
};

export default Dashboard;
