import JobSubmissionForm from "@/components/Dashboard/JobSubmissionForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Job | GMaps Scraper Dashboard",
  description: "Submit and manage your Google Maps scraping jobs easily from your dashboard."
};

export default function JobsPage() {
  return (
    <div className="p-4 md:p-6 bg-white rounded-xl border min-h-screen">
      <h1 className="text-xl font-bold mb-6">Submit Job</h1>
      <JobSubmissionForm />
    </div>
  );
}
