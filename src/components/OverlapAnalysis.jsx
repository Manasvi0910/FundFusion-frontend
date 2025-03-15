import React, { useState, useEffect } from 'react';
import { Info, ChevronDown, Check } from 'lucide-react';

const OverlapAnalysis = ({ overlapData }) => {
  // Use sample data if none is provided
  const sampleOverlapData = [
    {
      "fund_id_1": 1,
      "fund_id_2": 2,
      "fund_name_1": "ICICI Prudential Bluechip Fund",
      "fund_name_2": "HDFC Top 100 Fund",
      "overlap_percentage": 67.0,
      "overlapping_stocks": 3
    },
    {
      "fund_id_1": 1,
      "fund_id_2": 3,
      "fund_name_1": "ICICI Prudential Bluechip Fund",
      "fund_name_2": "SBI Bluechip Fund",
      "overlap_percentage": 87.0,
      "overlapping_stocks": 4
    }
  ];

  // Use provided data or fall back to sample
  const fundOverlapData = overlapData && overlapData.length > 0 ? overlapData : sampleOverlapData;
  
  // Get unique funds from the overlap data
  const extractUniqueFunds = () => {
    const fundsMap = new Map();
    
    fundOverlapData.forEach(item => {
      if (!fundsMap.has(item.fund_id_1)) {
        fundsMap.set(item.fund_id_1, {
          id: item.fund_id_1,
          name: item.fund_name_1
        });
      }
      
      if (!fundsMap.has(item.fund_id_2)) {
        fundsMap.set(item.fund_id_2, {
          id: item.fund_id_2,
          name: item.fund_name_2
        });
      }
    });
    
    return Array.from(fundsMap.values());
  };
  
  const allFunds = extractUniqueFunds();
  
  // State for selected funds and dropdown
  const [selectedFunds, setSelectedFunds] = useState(allFunds.slice(0, 2));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [displayFunds, setDisplayFunds] = useState([]);
  
  // Stock data
  const stocks = [
    { id: 1, name: 'HDFC LTD.', barColor: 'bg-yellow-400' },
    { id: 2, name: 'RIL', barColor: 'bg-green-400' },
    { id: 3, name: 'INFY', barColor: 'bg-purple-400' },
    { id: 4, name: 'TCS', barColor: 'bg-cyan-400' },
    { id: 5, name: 'HDFCBANK', barColor: 'bg-orange-400' },
    { id: 6, name: 'BHARTIARTL', barColor: 'bg-orange-500' }
  ];
  
  // Fund colors mapping - assign colors by fund ID to ensure consistency
  const getFundColor = (fundId) => {
    const colorMap = {
      1: { color: 'bg-blue-700', barColor: 'bg-blue-400' },      // ICICI Prudential Bluechip
      2: { color: 'bg-red-800', barColor: 'bg-red-500' },        // HDFC Top 100
      3: { color: 'bg-green-800', barColor: 'bg-green-500' },    // SBI Bluechip
      4: { color: 'bg-amber-700', barColor: 'bg-yellow-500' },   // Axis Bluechip
      5: { color: 'bg-purple-800', barColor: 'bg-purple-500' },  // Mirae Asset Large Cap
      6: { color: 'bg-lime-800', barColor: 'bg-lime-500' }       // ICICI Prudential Midcap
    };
    
    return colorMap[fundId] || { color: 'bg-gray-700', barColor: 'bg-gray-500' };
  };

  // Toggle fund selection
  const toggleFund = (fund) => {
    if (selectedFunds.some(f => f.id === fund.id)) {
      // Remove if already selected and there are more than 2 funds selected
      if (selectedFunds.length > 2) {
        setSelectedFunds(selectedFunds.filter(f => f.id !== fund.id));
      }
    } else {
      // Add if not selected (limit to 5 funds max)
      if (selectedFunds.length < 5) {
        setSelectedFunds([...selectedFunds, fund]);
      }
    }
  };

  // Update display funds whenever selectedFunds changes
  useEffect(() => {
    // Create fund objects with color info
    const newDisplayFunds = selectedFunds.map(fund => ({
      id: fund.id,
      name: fund.name,
      ...getFundColor(fund.id)
    }));
    
    setDisplayFunds(newDisplayFunds);
  }, [selectedFunds]);

  // Find overlap between funds
  const getOverlapData = (fundId1, fundId2) => {
    return fundOverlapData.find(item => 
      (item.fund_id_1 === fundId1 && item.fund_id_2 === fundId2) || 
      (item.fund_id_1 === fundId2 && item.fund_id_2 === fundId1)
    );
  };

  // Calculate total overlap statistics
  const calculateTotalOverlap = () => {
    let totalOverlap = 0;
    let pairCount = 0;
    
    // Calculate average overlap across all selected fund pairs
    for (let i = 0; i < selectedFunds.length; i++) {
      for (let j = i + 1; j < selectedFunds.length; j++) {
        const overlap = getOverlapData(selectedFunds[i].id, selectedFunds[j].id);
        if (overlap) {
          totalOverlap += overlap.overlap_percentage;
          pairCount++;
        }
      }
    }
    
    const averageOverlap = pairCount > 0 ? (totalOverlap / pairCount).toFixed(1) : 0;
    
    return {
      averageOverlap,
      fundCount: selectedFunds.length,
      pairCount
    };
  };

  // Generate connection data for visualization
  const generateConnectionData = (fundIndex, stockIndex) => {
    // This is a simplified approach since we don't have actual stock holdings
    // We'll use the overlapping_stocks count to determine which connections to show
    const fundId = displayFunds[fundIndex].id;
    const isOverlapping = false;
    let isHeldByFund = false;
    
    // Determine if this stock should be shown as held by this fund
    // For simplicity, let's say each fund holds stocks with ID <= the fund's position + 3
    isHeldByFund = stockIndex <= fundIndex + 3 && stockIndex < stocks.length;
    
    // Check if this stock overlaps with any other selected fund
    for (let i = 0; i < displayFunds.length; i++) {
      if (i !== fundIndex) {
        const otherFundId = displayFunds[i].id;
        const overlap = getOverlapData(fundId, otherFundId);
        
        if (overlap && stockIndex < overlap.overlapping_stocks) {
          isHeldByFund = true;
          break;
        }
      }
    }
    
    return { isOverlapping, isHeldByFund };
  };

  const { averageOverlap, fundCount, pairCount } = calculateTotalOverlap();

  return (
    <div className="w-full bg-gray-800 p-6 rounded-lg text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">Multi-Fund Overlap Analysis</h2>
          <button className="ml-2 text-gray-400 hover:text-white">
            <Info size={16} />
          </button>
        </div>
        
        {/* Dropdown for selecting multiple funds */}
        <div className="relative">
          <button 
            className="flex items-center bg-gray-700 px-3 py-2 rounded hover:bg-gray-600"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="text-sm mr-2">Select Funds ({selectedFunds.length})</span>
            <ChevronDown size={16} />
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-700 rounded shadow-lg z-10 max-h-96 overflow-y-auto">
              <div className="p-3 border-b border-gray-600">
                <div className="text-sm font-medium mb-1">Select up to 5 funds to compare</div>
                <div className="text-xs text-gray-400">Minimum 2 funds required for comparison</div>
              </div>
              {allFunds.map((fund) => (
                <button 
                  key={fund.id}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-600 text-sm flex items-center justify-between ${
                    selectedFunds.some(f => f.id === fund.id) ? 'bg-gray-600' : ''
                  }`}
                  onClick={() => toggleFund(fund)}
                >
                  <span>{fund.name}</span>
                  {selectedFunds.some(f => f.id === fund.id) && (
                    <Check size={16} className="text-green-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-gray-400 mb-6">
        <p className="mb-4">
          Comparing {fundCount} funds across {pairCount} combinations
        </p>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
            <span>Average overlap: {averageOverlap}% across all fund combinations</span>
          </div>
          
          {selectedFunds.length > 2 && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              {selectedFunds.map((fund1, i) => 
                selectedFunds.slice(i + 1).map((fund2, j) => {
                  const overlap = getOverlapData(fund1.id, fund2.id);
                  if (!overlap) return null;
                  
                  return (
                    <div key={`${fund1.id}-${fund2.id}`} className="text-xs bg-gray-700 p-2 rounded">
                      <span className="font-medium">{fund1.name} + {fund2.name}:</span>
                      <span className="ml-1">{overlap.overlap_percentage}% overlap ({overlap.overlapping_stocks} stocks)</span>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main visualization area with proper spacing */}
      <div className="w-full h-96 bg-gray-800 relative flex">
        {/* Left section with fund boxes - FIXED VERTICAL ALIGNMENT */}
        <div className="w-1/4 h-full flex flex-col justify-around pr-4">
          {displayFunds.map((fund, index) => (
            <div key={index} className="h-14 mb-2">
              <div className={`${fund.color} h-full rounded flex items-center justify-center`}>
                <div className="text-sm px-2 text-center">
                  {fund.name}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Vertical bars section */}
        <div className="w-8 h-full flex flex-col justify-around">
          {displayFunds.map((fund, index) => (
            <div key={index} className="h-14 mb-2 flex items-center justify-center">
              <div className={`${fund.barColor} w-2 h-full`}></div>
            </div>
          ))}
        </div>
        
        {/* Middle section - SVG connections */}
        <div className="w-1/2 h-full relative">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 400 400" 
            preserveAspectRatio="none"
            className="absolute inset-0"
          >
            {displayFunds.map((fund, fundIndex) => 
              stocks.map((stock, stockIndex) => {
                // Generate connection data
                const { isHeldByFund } = generateConnectionData(fundIndex, stockIndex);
                
                // Skip if this stock is not held by this fund
                if (!isHeldByFund) return null;
                
                // Calculate vertical positions based on the number of funds
                // Adjust the fund position to align with the center of the fund bar
                const fundBoxHeight = 56; // 14 * 4 for each h-14 element
                const fundTotalHeight = displayFunds.length * fundBoxHeight;
                const fundSpacing = 400 / (displayFunds.length);
                const fundY = (fundIndex * fundSpacing) + (fundSpacing / 2);
                
                // Adjust stock position to align with the center of the stock bar
                const stockBoxHeight = 40; // h-10 for each stock element
                const stockTotalHeight = stocks.length * stockBoxHeight;
                const stockSpacing = 400 / stocks.length;
                const stockY = (stockIndex * stockSpacing) + (stockSpacing / 2);
                
                // Randomize which connections appear darker based on fund pairs
                const randomModifier = (fundIndex * stockIndex) % displayFunds.length;
                const opacity = 0.3 + (randomModifier * 0.1);
                
                // Create bezier curve from fund bar to stock bar
                // Adjust the curve control points for smooth transition
                return (
                  <path
                    key={`${fundIndex}-${stockIndex}`}
                    d={`M 0 ${fundY} C 100 ${fundY}, 300 ${stockY}, 400 ${stockY}`}
                    stroke={`rgb(${85 + randomModifier * 20}, ${85 + randomModifier * 15}, ${85 + randomModifier * 25})`}
                    strokeWidth={15 + randomModifier * 2}
                    fill="none"
                    opacity={opacity}
                  />
                );
              })
            )}
          </svg>
        </div>

        {/* Right section - Stock bars and names */}
        <div className="w-1/6 h-full flex flex-col justify-around py-2">
          {stocks.map((stock, index) => (
            <div key={index} className="h-10 flex items-center my-1">
              <div className={`${stock.barColor} w-2 h-full`}></div>
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