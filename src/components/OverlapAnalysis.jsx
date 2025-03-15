import React, { useState } from 'react';
import { Info } from 'lucide-react';

const OverlapAnalysis = ({ overlapData }) => {
  // Use dummy data if none provided (for demonstration purposes)
  const sampleOverlapData = [
    {
      fund_id_1: 1, fund_name_1: 'Motilal Large Cap Fund - Direct Plan',
      fund_id_2: 2, fund_name_2: 'Nippon Large Cap Fund - Direct Plan',
      overlapping_stocks: 'X', overlap_percentage: 'Y'
    }
  ];

  // Use provided data or fall back to sample
  const data = overlapData && overlapData.length > 0 ? overlapData : sampleOverlapData;
  const [selectedPair, setSelectedPair] = useState(data[0]);
  
  // Fund data with colors matching the reference image
  const funds = [
    { id: 1, name: 'Nippon Large Cap Fund - Direct Plan', color: 'bg-amber-700', barColor: 'bg-yellow-500' },
    { id: 2, name: 'Motilal Large Cap Fund - Direct Plan', color: 'bg-blue-800', barColor: 'bg-blue-500' },
    { id: 3, name: 'HDFC Large Cap Fund', color: 'bg-amber-900', barColor: 'bg-orange-500' },
    { id: 4, name: 'ICICI Prudential Midcap Fund', color: 'bg-lime-800', barColor: 'bg-lime-500' }
  ];
  
  // Stock data with colors matching the reference image
  const stocks = [
    { id: 1, name: 'HDFC LTD.', barColor: 'bg-yellow-400' },
    { id: 2, name: 'RIL', barColor: 'bg-green-400' },
    { id: 3, name: 'INFY', barColor: 'bg-purple-400' },
    { id: 4, name: 'TCS', barColor: 'bg-cyan-400' },
    { id: 5, name: 'HDFCBANK', barColor: 'bg-orange-400' },
    { id: 6, name: 'BHARTIARTL', barColor: 'bg-orange-500' }
  ];

  return (
    <div className="w-full bg-gray-950 p-6 rounded-lg text-white">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold">Overlap Analysis</h2>
        <button className="ml-2 text-gray-400 hover:text-white">
          <Info size={16} />
        </button>
      </div>

      <div className="text-gray-400 mb-6">
        <p className="mb-4">
          Comparing : {selectedPair.fund_name_1} and {selectedPair.fund_name_2}
        </p>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
            <span>{selectedPair.overlapping_stocks} Stocks Overlap across these funds.</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
            <span>{selectedPair.overlap_percentage}% Average Overlap in holdings.</span>
          </div>
        </div>
      </div>

      {/* Main visualization area with proper spacing */}
      <div className="w-full h-96 bg-gray-950 relative flex">
        {/* Left section - Fund boxes with vertical bars on right */}
        <div className="w-2/5 h-full flex flex-col justify-around">
          {funds.map((fund, index) => (
            <div key={index} className="relative h-16 mb-2 pr-2">
              {/* Fund box with reduced width to match original UI */}
              <div className={`${fund.color} py-3 px-4 h-full rounded text-white text-center w-11/12`}>
                <div className="text-sm leading-tight">
                  {fund.name.split(' - ')[0]}
                  {fund.name.includes(' - ') && (
                    <div>{fund.name.split(' - ')[1]}</div>
                  )}
                </div>
              </div>
              
              {/* Vertical colored bar on right edge */}
              <div className={`${fund.barColor} w-2 h-full absolute right-0 top-0`}></div>
            </div>
          ))}
        </div>
        
        {/* Middle section - SVG connections */}
        <div className="w-2/5 h-full relative">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 400 400" 
            preserveAspectRatio="none"
            className="absolute inset-0"
          >
            {/* Generate connections from each fund to each stock */}
            {funds.map((fund, fundIndex) => 
              stocks.map((stock, stockIndex) => {
                // Calculate vertical positions 
                const fundY = 45 + fundIndex * 90;
                const stockY = 35 + stockIndex * 58;
                
                // Connect from right side of SVG to left side
                return (
                  <path
                    key={`${fundIndex}-${stockIndex}`}
                    d={`M 0 ${fundY} C 100 ${fundY}, 300 ${stockY}, 400 ${stockY}`}
                    stroke="#555"
                    strokeWidth="20"
                    fill="none"
                    opacity="0.4"
                  />
                );
              })
            )}
          </svg>
        </div>

        {/* Right section - Stock names with vertical bars on left */}
        <div className="w-1/5 h-full flex flex-col justify-around py-2">
          {stocks.map((stock, index) => (
            <div key={index} className="relative h-10 flex items-center my-1">
              {/* Vertical colored bar on left */}
              <div className={`${stock.barColor} w-2 h-full absolute left-0 top-0`}></div>
              
              {/* Stock name right-aligned */}
              <div className="w-full pl-6 pr-2 flex justify-end">
                <span className="text-gray-300">{stock.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverlapAnalysis;