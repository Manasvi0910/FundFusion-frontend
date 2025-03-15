import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const InvestmentSummary = ({ currentValue, initialValue, bestFund, worstFund }) => {
  // Sample data if none provided
  const defaultCurrentValue = 575000;
  const defaultInitialValue = 500000;
  const defaultBestFund = {
    name: 'ICICI Prudential Midcap Fund',
    return_percentage: 19
  };
  const defaultWorstFund = {
    name: 'Axis Flexi Cap Fund',
    return_percentage: -5
  };

  // Use provided data or fall back to defaults
  const current = currentValue || defaultCurrentValue;
  const initial = initialValue || defaultInitialValue;
  const best = bestFund || defaultBestFund;
  const worst = worstFund || defaultWorstFund;

  // Daily return (hardcoded for example)
  const dailyReturn = 0.6;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Current Investment Value */}
      <div className="bg-gray-950 bg-opacity-80 rounded-lg p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="w-1 h-12 bg-blue-500 mr-3"></div>
          <div className="text-gray-300 leading-tight">
            Current<br />Investment Value
          </div>
          <div className="ml-auto flex items-center text-green-500">
            <ArrowUp size={16} className="mr-1" />
            <span>+{dailyReturn}%</span>
          </div>
        </div>
        <div className="text-2xl font-semibold text-white">₹{current.toLocaleString('en-IN')}</div>
        <div className="text-xs text-gray-500 mt-1">1D Return</div>
      </div>

      {/* Initial Investment Value */}
      <div className="bg-gray-950 bg-opacity-80 rounded-lg p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="w-1 h-12 bg-blue-500 mr-3"></div>
          <div className="text-gray-300 leading-tight">
            Initial<br />Investment Value
          </div>
          <div className="ml-auto flex items-center text-green-500">
            <ArrowUp size={16} className="mr-1" />
            <span>+15%</span>
          </div>
        </div>
        <div className="text-2xl font-semibold text-white">₹{initial.toLocaleString('en-IN')}</div>
      </div>

      {/* Best Performing Scheme */}
      <div className="bg-gray-950 bg-opacity-80 rounded-lg p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="w-1 h-12 bg-blue-500 mr-3"></div>
          <div className="text-gray-300 leading-tight">
            Best<br />Performing Scheme
          </div>
          <div className="ml-auto flex items-center text-green-500">
            <ArrowUp size={16} className="mr-1" />
            <span>+{best.return_percentage}%</span>
          </div>
        </div>
        <div className="text-2xl font-semibold text-white">{best.name}</div>
      </div>

      {/* Worst Performing Scheme */}
      <div className="bg-gray-950 bg-opacity-80 rounded-lg p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="w-1 h-12 bg-blue-500 mr-3"></div>
          <div className="text-gray-300 leading-tight">
            Worst<br />Performing Scheme
          </div>
          <div className="ml-auto flex items-center text-red-500">
            <ArrowDown size={16} className="mr-1" />
            <span>-{Math.abs(worst.return_percentage)}%</span>
          </div>
        </div>
        <div className="text-2xl font-semibold text-white">{worst.name}</div>
      </div>
    </div>
  );
};

export default InvestmentSummary;