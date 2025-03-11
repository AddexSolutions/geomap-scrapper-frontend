import { Job } from "@/types/jobs";
import ScrapingHistoryCard from "./ScrapingHistoryCard";
import { MdOutlineSearchOff } from "react-icons/md"; // Importing icon from react-icons

const ScrapingHistory = ({ jobs }: { jobs: Job[] }) => {
  return (
    <div className="bg-white rounded-lg p-6 border shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Scraping Requests History</h2>

      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <ScrapingHistoryCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
          <MdOutlineSearchOff className="w-16 h-16 mb-4 text-gray-400" />
          <p className="text-lg font-medium">No scraping jobs found</p>
          <p className="text-sm text-gray-400">Submit a new scraping job to see the history here.</p>
        </div>
      )}
    </div>
  );
};

export default ScrapingHistory;
