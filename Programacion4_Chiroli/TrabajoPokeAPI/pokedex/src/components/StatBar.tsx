interface StatBarProps {
    name: string;
    value: number;
}

const getColor = (value: number): string => {
    if (value >= 100) return "bg-green-500";
    if (value >= 60) return "bg-yellow-400";
    return "bg-red-400";
};

export default function StatBar({name, value}: StatBarProps) {
    const porcentaje = Math.min((value / 255) * 100, 100);

    return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="capitalize text-gray-500 w-24">{name}</span>
        <span className="font-bold text-gray-800">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${getColor(value)}`}
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
    );
}