import Link from "next/link";
import { Job } from "@/types/jobs";

const ScrapingHistoryCard = ({ job }: { job: Job }) => {
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      completed: "text-[#039855] bg-[#ECFDF3]",
      queued: "text-[#DC6803] bg-[#FEF7C9]",
      failed: "text-[#D92D20] bg-[#FEF3F2]",
      default: "text-gray-600 bg-gray-100"
    };
    return statusColors[status] || statusColors.default;
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <h3 className="text-md font-semibold">Job ID: {job.id}</h3>
        <div>
          <span className={`px-3 py-[2px] sm:py-1 max-sm:my-1 max-w-fit text-sm font-medium border rounded-full ${getStatusColor(job.status)}`}>
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </span>
        </div>
      </div>
      <p className="text-gray-500 text-sm mt-1">
        <strong>Created:</strong> {new Date(job.created_at).toLocaleString()}
      </p>
      <p className="text-gray-600 mt-2"><strong>Queries:</strong></p>
      <ul className="list-disc pl-5 text-gray-700 text-sm">
        {job.queries.map((query: string, index: number) => (
          <li key={index}>{query}</li>
        ))}
      </ul>
      {/* Added View Job Link */}
      <div className="mt-4">
        <Link href={`/dashboard/job/${job.id}`} className="text-blue-600 hover:underline font-medium">
          View Job
        </Link>
      </div>
    </div >
  );
};

export default ScrapingHistoryCard;