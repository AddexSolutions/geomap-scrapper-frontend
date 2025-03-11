import JobDetailsContent from "@/components/Dashboard/JobDetailContent";
import { Metadata } from "next";

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Job Details ${params.id} | GMaps Scraper Dashboard`,
    description: `View details and settings for a job in the GMaps Scraper dashboard.`,
  };
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6 md:p-8 bg-white rounded-xl border min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Job Details</h1>
      <JobDetailsContent jobId={params.id} />
    </div>
  );
}