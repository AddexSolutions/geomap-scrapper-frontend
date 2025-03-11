const ScrapingStatCard = ({ title, count, percentage, color, statusIcon }: { title: string; count: number; percentage: string; color: "green" | "yellow" | "red"; statusIcon: JSX.Element }) => {
  const colorClasses = {
    green: "text-[#039855] bg-[#ECFDF3]",
    yellow: "text-[#DC6803] bg-[#FEF7C9]",
    red: "text-[#D92D20] bg-[#FEF3F2]"
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white flex flex-col gap-3">
      <div className="p-3 bg-[#F2F4F7] rounded-full w-12 h-12 flex items-center justify-center">
        {statusIcon}
      </div>

      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="flex items-center">
        <p className="text-3xl font-bold">{count}</p>
        <div className={`ml-auto flex items-center gap-1 px-2 py-1 text-sm font-medium rounded-full w-fit ${colorClasses[color]}`}>
          <span>{percentage}</span>
        </div>
      </div>
    </div>
  );
};

export default ScrapingStatCard;
