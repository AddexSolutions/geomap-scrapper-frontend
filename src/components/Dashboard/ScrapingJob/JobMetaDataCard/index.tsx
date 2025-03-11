"use client";

import { MdAssignment, MdInfo, MdAccessTime } from "react-icons/md";

interface JobMetaDataCardProps {
  jobMetaData: {
    id: number;
    status: string;
    created_at: string;
    queries: string[];
  };
}

export default function JobMetaDataCard({ jobMetaData }: JobMetaDataCardProps) {

  return (
    <div className="rounded-lg p-6 mb-6 border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Job ID */}
        <div className="flex items-center space-x-2">
          <MdAssignment className="text-blue-500 shrink-0" size={24} />
          <span className="font-semibold text-gray-700">Job ID:</span>
          <span className="text-gray-800">{jobMetaData.id}</span>
        </div>

        {/* Status */}
        <div className="flex items-center space-x-2">
          <MdInfo className="text-green-500 shrink-0" size={24} />
          <span className="font-semibold text-gray-700">Status:</span>
          <span
            className={`px-3 py-1 rounded-full capitalize text-sm font-semibold ${jobMetaData.status === "completed"
              ? "bg-green-100 text-green-700"
              : jobMetaData.status === "queued"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
              }`}
          >
            {jobMetaData.status}
          </span>
        </div>

        {/* Created At */}
        <div className="flex items-center space-x-2">
          <MdAccessTime className="text-purple-500 shrink-0" size={24} />
          <span className="font-semibold text-gray-700 whitespace-nowrap">
            Created At:
          </span>
          <span className="text-gray-800 truncate">
            {new Date(jobMetaData.created_at).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Queries */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Queries</h2>
        <ul className="flex flex-wrap list-disc list-inside text-gray-700">
          {jobMetaData.queries.map((query: string, index: number) => (
            <li key={index}>{query.replaceAll(";", ", ")}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
