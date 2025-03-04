import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | GMaps Scraper Dashboard",
  description: "Manage your account, preferences, and scraping settings in the GMaps Scraper dashboard."
};

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-6 bg-white rounded-xl border min-h-screen">
      <h1 className="text-xl font-bold mb-6">Settings</h1>
    </div>
  );
}