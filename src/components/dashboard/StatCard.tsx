import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeLabel?: string;
  colorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeLabel,
  colorClass = 'bg-blue-500',
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`rounded-full p-3 ${colorClass} text-white`}>
            {icon}
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-semibold mt-1">{value}</p>
          </div>
        </div>
        
        {change !== undefined && (
          <div className="mt-4 flex items-center">
            {change >= 0 ? (
              <ArrowUp size={16} className="text-green-500" />
            ) : (
              <ArrowDown size={16} className="text-red-500" />
            )}
            <span className={`text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(change)}%
            </span>
            {changeLabel && (
              <span className="text-sm text-gray-500 ml-1">{changeLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;