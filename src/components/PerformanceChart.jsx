import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

const PerformanceChart = ({ performanceData, setTimeRange, currentTimeRange }) => {
  const timeRanges = ['1M', '3M', '6M', '1Y', '3Y', 'MAX'];
  const [activeRange, setActiveRange] = useState(currentTimeRange || '1M');
  
  useEffect(() => {
    setTimeRange(activeRange);
  }, [activeRange, setTimeRange]);

  // Find the latest data point for the reference dot
  const latestData = performanceData.length > 0 ? performanceData[performanceData.length - 1] : null;
  
  // Calculate the total gain/loss
  const firstValue = performanceData.length > 0 ? performanceData[0].value : 0;
  const lastValue = performanceData.length > 0 ? performanceData[performanceData.length - 1].value : 0;
  const absoluteGain = lastValue - firstValue;
  const percentageGain = firstValue > 0 ? (absoluteGain / firstValue) * 100 : 0;

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 rounded shadow-lg border border-gray-700">
          <p className="text-gray-300 text-sm">{`${label}: ₹${payload[0].value.toLocaleString('en-IN')}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Performance Summary</h2>
      <div className="bg-gray-900 p-4 mb-4 rounded">
      <div className="border border-gray-700 rounded-lg p-6 max-w-md">

        <div className="mb-4">
          <span className="text-2xl font-semibold">₹{lastValue.toLocaleString('en-IN')}</span>
          <div className="flex items-center mt-1">
            <span className={`text-sm ${absoluteGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ₹{Math.abs(absoluteGain).toLocaleString('en-IN')}
            </span>
            <span className="mx-2 text-gray-500">|</span>
            <span className={`text-sm ${percentageGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {percentageGain >= 0 ? '+' : ''}{percentageGain.toFixed(1)}%
            </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 p-4 rounded" style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#6B7280' }}
              tickLine={false}
              axisLine={{ stroke: '#374151', strokeWidth: 0.5 }}
            />
            <YAxis 
              hide={true}
              domain={['dataMin - 10000', 'dataMax + 10000']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#3B82F6' }}
            />
            {latestData && (
              <ReferenceDot
                x={latestData.date}
                y={latestData.value}
                r={4}
                fill="#3B82F6"
                stroke="none"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center mt-4 space-x-2">
        {timeRanges.map(range => (
          <button
            key={range}
            className={`px-4 py-2 rounded ${activeRange === range ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setActiveRange(range)}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;