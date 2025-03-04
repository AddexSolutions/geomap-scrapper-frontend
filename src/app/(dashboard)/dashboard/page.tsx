import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | GMaps Scraper",
  description: "Access your GMaps Scraper dashboard to extract, manage, and export Google Maps data efficiently."
};

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 bg-white rounded-xl border min-h-screen">
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>
    </div>
  );
}