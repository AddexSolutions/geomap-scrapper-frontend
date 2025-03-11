import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import StatCard from "./ScrapingStatCard";
import { Job } from "@/types/jobs";

const ScrapingStats = ({ jobs }: { jobs: Job[] }) => {
  const totalJobs = jobs.length;
  const completedCount = jobs.filter(job => job.status === "completed").length;
  const queuedCount = jobs.filter(job => job.status === "queued").length;
  const failedCount = jobs.filter(job => job.status === "failed").length;

  const calculatePercentage = (count: number) => (totalJobs > 0 ? ((count / totalJobs) * 100).toFixed(2) + "%" : "0.00%");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard title="Scrapes Completed" count={completedCount} percentage={calculatePercentage(completedCount)} color="green" statusIcon={<FaCheckCircle className="text-green-600 text-2xl" />} />
      <StatCard title="Scrapes Queued" count={queuedCount} percentage={calculatePercentage(queuedCount)} color="yellow" statusIcon={<FaClock className="text-yellow-600 text-2xl" />} />
      <StatCard title="Scrapes Failed" count={failedCount} percentage={calculatePercentage(failedCount)} color="red" statusIcon={<FaTimesCircle className="text-red-600 text-2xl" />} />
    </div>
  );
};

export default ScrapingStats;
