import { Metadata } from "next";
import DashboardContent from "@/components/Dashboard/DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard | GMaps Scraper",
  description: "Access your GMaps Scraper dashboard to extract, manage, and export Google Maps data efficiently."
};

export default function DashboardPage() {
  return <DashboardContent />;
}