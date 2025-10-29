
import React from 'react';
import { LucideIcon } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, change, changeType }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${
          changeType === 'positive' ? 'bg-green-100 text-green-600' : 
          changeType === 'negative' ? 'bg-red-100 text-red-600' : 
          'bg-blue-100 text-blue-600'
        }`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-xs ${
              changeType === 'positive' ? 'text-green-600' : 
              changeType === 'negative' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {change}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;