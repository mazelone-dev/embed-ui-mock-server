interface StatCardProps {
  label: string;
  value: string;
  description: string;
}

const StatCard = ({ label, value, description }: StatCardProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-xs text-gray-400">{description}</p>
    </div>
  );
};

export default StatCard;
