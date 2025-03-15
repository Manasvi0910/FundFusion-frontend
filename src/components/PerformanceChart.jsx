import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot, CartesianGrid } from 'recharts';

const PerformanceChart = ({ performanceData, setTimeRange, currentTimeRange }) => {
  const timeRanges = ['1M', '3M', '6M', '1Y', '3Y', 'MAX'];
  const [activeRange, setActiveRange] = useState(currentTimeRange || '1M');
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    setTimeRange(activeRange);
    
    // Generate data for different time ranges based on the available data
    const simulateDataForTimeRange = (range) => {
      // If we have real data for this range, use it
      if (range === '1M' && performanceData.length > 0) {
        return [...performanceData];
      }
      
      // Otherwise, simulate data for other time ranges
      const baseData = [...performanceData];
      if (baseData.length === 0) return [];
      
      const firstValue = baseData[0].value;
      const lastValue = baseData[baseData.length - 1].value;
      const totalGain = lastValue - firstValue;
      
      // Create simulated data based on the selected time range
      let simulatedData = [];
      let dataPoints = 0;
      let startDate = new Date();
      let volatilityFactor = 1.0;
      
      // Configure simulation parameters based on time range
      switch(range) {
        case '3M':
          dataPoints = 90;
          startDate = new Date(new Date().setDate(new Date().getDate() - 90));
          volatilityFactor = 1.2;
          break;
        case '6M':
          dataPoints = 180;
          startDate = new Date(new Date().setDate(new Date().getDate() - 180));
          volatilityFactor = 1.5;
          break;
        case '1Y':
          dataPoints = 365;
          startDate = new Date(new Date().setDate(new Date().getDate() - 365));
          volatilityFactor = 2.0;
          break;
        case '3Y':
          dataPoints = 365 * 3;
          startDate = new Date(new Date().setDate(new Date().getDate() - 365 * 3));
          volatilityFactor = 3.0;
          break;
        case 'MAX':
          dataPoints = 365 * 5; // 5 years as MAX
          startDate = new Date(new Date().setDate(new Date().getDate() - 365 * 5));
          volatilityFactor = 4.0;
          break;
        default:
          return baseData;
      }
      
      // Generate points with a more realistic market pattern
      // Start with a lower value and gradually increase with fluctuations
      const startValue = range === 'MAX' ? firstValue * 0.5 : 
                         range === '3Y' ? firstValue * 0.6 : 
                         range === '1Y' ? firstValue * 0.7 : 
                         range === '6M' ? firstValue * 0.8 : 
                         range === '3M' ? firstValue * 0.9 : firstValue;
      
      // Generate data points
      const stepSize = Math.ceil(dataPoints / 30); // Show ~30 points regardless of range
      for (let i = 0; i < dataPoints; i += stepSize) {
        // Only create about 30 data points for readability
        const progress = i / dataPoints;
        const trend = startValue + (lastValue - startValue) * progress;
        
        // Add some randomness for fluctuation
        const fluctuation = (Math.random() - 0.5) * totalGain * 0.03 * volatilityFactor;
        
        // Create date for this point
        const pointDate = new Date(startDate);
        pointDate.setDate(startDate.getDate() + i);
        
        // Format date as "DD MMM"
        const formattedDate = pointDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short'
        }).replace(' ', ' '); // Ensure proper spacing
        
        simulatedData.push({
          date: formattedDate,
          value: Math.max(1000, Math.round(trend + fluctuation))
        });
      }
      
      // Ensure the last point matches the current value
      if (simulatedData.length > 0 && baseData.length > 0) {
        simulatedData[simulatedData.length - 1].value = baseData[baseData.length - 1].value;
      }
      
      return simulatedData;
    };
    
    setFilteredData(simulateDataForTimeRange(activeRange));
  }, [activeRange, performanceData, setTimeRange]);
  
  // Find the latest data point for the reference dot
  const latestData = filteredData.length > 0 ? filteredData[filteredData.length - 1] : null;
  
  // Calculate the total gain/loss
  const firstValue = filteredData.length > 0 ? filteredData[0].value : 0;
  const lastValue = filteredData.length > 0 ? filteredData[filteredData.length - 1].value : 0;
  const absoluteGain = lastValue - firstValue;
  const percentageGain = firstValue > 0 ? (absoluteGain / firstValue) * 100 : 0;
  
  // Set gain/loss color
  const isPositive = absoluteGain >= 0;
  const gainColor = isPositive ? 'text-green-500' : 'text-red-500';
  const gainBgColor = isPositive ? 'bg-green-500' : 'bg-red-500';
  const gainIconPath = isPositive 
    ? <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    : <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />;

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
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Performance Summary</h2>
        
        {/* Performance value - styled as in the image with #1E1E1E background */}
        <div className="inline-block mb-6" style={{ backgroundColor: '#2A2A2A', borderRadius: '8px', padding: '16px' }}>
          <div className="text-2xl font-semibold text-white">₹{lastValue.toLocaleString('en-IN')}</div>
          <div className="flex items-center mt-1">
            <div className={`w-4 h-4 rounded-full ${gainBgColor} flex items-center justify-center mr-1`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                {gainIconPath}
              </svg>
            </div>
            <span className={gainColor}>₹{Math.abs(absoluteGain).toLocaleString('en-IN')}</span>
            <span className="mx-2 text-gray-500">|</span>
            <span className={gainColor}>{percentageGain.toFixed(2)}%</span>
          </div>
        </div>
        
        {/* Chart */}
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid 
                horizontal={true} 
                vertical={false} 
                strokeDasharray="3 3" 
                stroke="#333333" 
                strokeOpacity={0.5}
              />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#374151', strokeWidth: 0.5 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                hide={true}
                domain={['dataMin - 10000', 'dataMax + 10000']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#007AFF" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: '#007AFF' }}
              />
              {latestData && (
                <ReferenceDot
                  x={latestData.date}
                  y={latestData.value}
                  r={4}
                  fill="#007AFF"
                  stroke="none"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Time range buttons */}
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
    </div>
  );
};

export default PerformanceChart;