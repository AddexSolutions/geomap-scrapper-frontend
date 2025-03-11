import { FiEdit3 } from "react-icons/fi";

export default function PersonalInfo() {
  return (
    <div className="bg-white rounded-lg p-6 border">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-lg font-semibold mb-4 md:mb-0">Personal Information</h3>
        <button className={`hidden xl:flex items-center justify-center max-sm:w-full gap-2 px-4 py-2 text-sm font-semibold text-gray-700 border rounded-lg hover:bg-gray-100 transition`}>
          <FiEdit3 />
          Edit
        </button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
        <InfoRow label="Full Name" value="Muhammad Bilawal" />
        <InfoRow label="Email Address" value="bk4449719@gmail.com" />
        <InfoRow label="Phone" value="+92 3340300278" />
        <button className={`xl:hidden flex items-center justify-center max-sm:w-full gap-2 px-4 py-2 text-sm font-semibold text-gray-700 border rounded-lg hover:bg-gray-100 transition`}>
          <FiEdit3 />
          Edit
        </button>
      </div>
    </div>
  );
}

export function InfoRow({ label, value }: { label: string, value: string }) {
  return (
    <div className={`text-center md:text-left`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-md font-medium">{value}</p>
    </div>
  );
}