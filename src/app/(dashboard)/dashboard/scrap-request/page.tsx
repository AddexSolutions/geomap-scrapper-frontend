import JobSubmissionForm from "@/components/Dashboard/ScrapingSubmissionForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Scrape Request | GMaps Scraper Dashboard",
  description: "Submit and manage your Google Maps scrape requests easily from your dashboard."
};

export default function ScrapeRequestPage() {
  return (
    <div className="p-4 md:p-6 bg-white rounded-xl border min-h-screen">
      <h1 className="text-xl font-bold mb-6">Submit New Scrape Request</h1>
      <JobSubmissionForm />
    </div>
  );
}
