"use client";

import { useState, useEffect } from "react";
import JobMetaDataCard from "@/components/Dashboard/ScrapingJob/JobMetaDataCard";
import DataTable from "@/app/(dashboard)/dashboard/job/[id]/scrappingDataTable";
import { MdErrorOutline } from "react-icons/md";

export default function JobDetailsContent({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchJob() {
      try {
        const token = localStorage.getItem("geomap_auth");
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );

        if (!response.ok) {
          throw new Error(`Error fetching job: ${response.statusText}`);
        }

        const data = await response.json();
        setJob(data);
      } catch (err: any) {
        console.log("Failed to fetch job data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [jobId]);


  function Loader() {
    return (
      <div className="pt-20 flex justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (loading) {
    return <Loader />
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center text-red-500">
        <MdErrorOutline className="w-16 h-16 mb-4" />
        <p className="text-lg font-medium">No job data available</p>
        <p className="text-sm text-gray-400">Please check if data is loaded correctly or try again later.</p>
      </div>
    );
  }

  const jobMetaData = {
    id: job.id,
    status: job.status,
    queries: job.queries,
    created_at: job.created_at,
  };

  return (
    <>
      {/* Meta Data Card */}
      <JobMetaDataCard jobMetaData={jobMetaData} />

      {/* DataTable Component */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Scraping Results
        </h2>
        <DataTable places={job.places} />
      </div>
    </>
  );
}
