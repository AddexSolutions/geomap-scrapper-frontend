"use client";

import { useEffect, useState } from "react";
import ScrapingHistory from "@/components/Dashboard/ScrapingHistory";
import ScrapingStats from "@/components/Dashboard/ScrapingStats";
import { Job } from "@/types/jobs";

export default function DashboardContent() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      const token = localStorage.getItem("geomap_auth");

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs/get-jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching jobs: ${response.statusText}`);
        }
        const data = await response.json();
        setJobs(data.jobs || []);
      } catch (error: any) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  function Loader() {
    return (
      <div className="pt-20 flex justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl border min-h-screen">
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ScrapingStats jobs={jobs} />
          <ScrapingHistory jobs={jobs} />
        </>
      )}
    </div>
  );
}
