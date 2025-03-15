import React, { useState } from 'react';

const InteractiveSectorAllocation = () => {
  // Parse the provided JSON data
  const portfolioData = {
    "user_name": "Yashna",
    "current_investment_value": 6863100.0,
    "initial_investment_value": 6350000.0,
    "sector_allocation": [
      {
        "sector": "Financial",
        "amount": 2457420.0,
        "percentage": 35.81
      },
      {
        "sector": "Technology",
        "amount": 2380560.0,
        "percentage": 34.69
      },
      {
        "sector": "Energy",
        "amount": 1344480.0,
        "percentage": 19.59
      },
      {
        "sector": "Healthcare",
        "amount": 275800.0,
        "percentage": 4.02
      },
      {
        "sector": "Industrials",
        "amount": 231240.0,
        "percentage": 3.37
      },
      {
        "sector": "Consumer Goods",
        "amount": 173600.0,
        "percentage": 2.53
      }
    ]
  };

  // Stocks data for each sector - this would come from your API
  const stocksData = {
    "Financial": [
      { name: "HDFC Bank", value: 1024450, percentage: 41.69, change: 2.5 },
      { name: "ICICI Bank", value: 787450, percentage: 32.04, change: 1.2 },
      { name: "Axis Bank", value: 345890, percentage: 14.08, change: -0.8 },
      { name: "SBI", value: 178290, percentage: 7.26, change: 0.5 },
      { name: "Kotak Mahindra", value: 121340, percentage: 4.94, change: 1.7 }
    ],
    "Technology": [
      { name: "Infosys", value: 1060300, percentage: 40, change: 1.8 },
      { name: "TCS", value: 595140, percentage: 25, change: 0.6 },
      { name: "HCL Tech", value: 476112, percentage: 20, change: -0.3 },
      { name: "Wipro", value: 249008, percentage: 15, change: -1.2 }
    ],
    "Energy": [
      { name: "Reliance", value: 806688, percentage: 60.0, change: 3.2 },
      { name: "ONGC", value: 336120, percentage: 25.0, change: 1.5 },
      { name: "GAIL", value: 201672, percentage: 15.0, change: -0.7 }
    ],
    "Healthcare": [
      { name: "Sun Pharma", value: 165480, percentage: 60.0, change: 2.1 },
      { name: "Dr Reddy's", value: 110320, percentage: 40.0, change: 0.9 }
    ],
    "Industrials": [
      { name: "L&T", value: 138744, percentage: 60.0, change: 1.1 },
      { name: "Siemens", value: 92496, percentage: 40.0, change: 0.5 }
    ],
    "Consumer Goods": [
      { name: "HUL", value: 104160, percentage: 60.0, change: 0.8 },
      { name: "ITC", value: 69440, percentage: 40.0, change: 1.2 }
    ]
  };

  // Define color scheme for sectors
  const sectorColors = {
    "Financial": "#a3b8d9",
    "Technology": "#a3b8d9",
    "Energy": "#d8d1e0",
    "Healthcare": "#d8d1e0",
    "Industrials": "#d8d1e0",
    "Consumer Goods": "#d8d1e0"
  };

  // State for active view (sectors or specific sector stocks)
  const [activeView, setActiveView] = useState("sectors");
  const [activeSector, setActiveSector] = useState("");
  const [hoveredSector, setHoveredSector] = useState(null);

  // Handle sector click
  const handleSectorClick = (sector) => {
    setActiveSector(sector);
    setActiveView("stocks");
  };

  // Return to main sector view
  const backToSectors = () => {
    setActiveView("sectors");
    setActiveSector("");
  };

  // Determine layout area for each sector based on its percentage
  const getSectorLayout = (sector) => {
    const percentage = sector.percentage;
    
    if (percentage > 30) {
      return "large"; // Financial and Technology
    } else if (percentage > 15) {
      return "medium"; // Energy
    } else {
      return "small"; // Healthcare, Industrials, Consumer Goods
    }
  };
  
  // Render stock breakdown for a hovered sector
  const renderStockBreakdown = (stocks, bgColor) => {
    if (!stocks || stocks.length === 0) {
      return (
        <div className="h-full w-full p-3 flex items-center justify-center" style={{ backgroundColor: bgColor }}>
          <div className="text-center text-black">
            <div className="font-medium">No breakdown available</div>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full w-full relative overflow-hidden" style={{ backgroundColor: bgColor }}>
        {/* Main container with grid */}
        <div className="h-full w-full grid grid-cols-2 grid-rows-2">
          {/* Stock 1 (e.g., Reliance) - Left column full height */}
          <div className="row-span-2 border-r border-black p-2 flex flex-col justify-between">
            <div>
              <div className="font-medium text-black truncate">{stocks[0].name}</div>
              <div className="text-black text-sm">₹{Math.round(stocks[0].value).toLocaleString('en-IN')}</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-black">{stocks[0].percentage}%</div>
            </div>
          </div>
          
          {/* Stock 2 (e.g., ONGC) - Top right */}
          <div className="border-b border-black p-2 flex flex-col justify-between">
            <div>
              <div className="font-medium text-black truncate">{stocks.length > 1 ? stocks[1].name : ''}</div>
              <div className="text-black text-sm">{stocks.length > 1 ? `₹${Math.round(stocks[1].value).toLocaleString('en-IN')}` : ''}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-black">{stocks.length > 1 ? `${stocks[1].percentage}%` : ''}</div>
            </div>
          </div>
          
          {/* Stock 3 (e.g., GAIL) - Bottom right */}
          <div className="p-2 flex flex-col justify-between">
            <div>
              <div className="font-medium text-black truncate">{stocks.length > 2 ? stocks[2].name : ''}</div>
              <div className="text-black text-sm">{stocks.length > 2 ? `₹${Math.round(stocks[2].value).toLocaleString('en-IN')}` : ''}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-black">{stocks.length > 2 ? `${stocks[2].percentage}%` : ''}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render main sector allocation view with fixed grid layout
  const renderSectorView = () => {
    // Group sectors by their layout size
    const largeItems = portfolioData.sector_allocation.filter(item => getSectorLayout(item) === "large");
    const mediumItems = portfolioData.sector_allocation.filter(item => getSectorLayout(item) === "medium");
    const smallItems = portfolioData.sector_allocation.filter(item => getSectorLayout(item) === "small");

    return (
      <>
        <h2 className="text-2xl font-semibold mb-6 text-white">Sector Allocation</h2>
        
        {/* Top row - large items (Financial and Technology) */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {largeItems.map(item => {
            const bgColor = sectorColors[item.sector] || "#EDE7F6";
            const isHovered = hoveredSector === item.sector;
            const stocks = stocksData[item.sector] || [];
            
            return (
              <div
                key={item.sector}
                className="rounded overflow-hidden cursor-pointer relative"
                style={{ 
                  backgroundColor: bgColor,
                  height: "280px",
                  zIndex: isHovered ? 10 : 0
                }}
                onClick={() => handleSectorClick(item.sector)}
                onMouseEnter={() => setHoveredSector(item.sector)}
                onMouseLeave={() => setHoveredSector(null)}
              >
                {!isHovered ? (
                  <div className="p-4 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-xl font-medium text-black">{item.sector}</div>
                      <div className="text-black">₹{item.amount.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="mb-2">
                      <span className="text-5xl font-bold text-black">{item.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                ) : (
                  renderStockBreakdown(stocks, bgColor)
                )}
              </div>
            );
          })}
        </div>
        
        {/* Second row - medium and small items (Energy, Healthcare, Industrials, Consumer Goods) */}
        <div className="grid grid-cols-6 gap-4">
          {/* Medium item (Energy) */}
          {mediumItems.map(item => {
            const bgColor = sectorColors[item.sector] || "#EDE7F6";
            const isHovered = hoveredSector === item.sector;
            const stocks = stocksData[item.sector] || [];
            
            return (
              <div
                key={item.sector}
                className="col-span-3 rounded overflow-hidden cursor-pointer relative"
                style={{ 
                  backgroundColor: bgColor,
                  height: "200px",
                  zIndex: isHovered ? 10 : 0
                }}
                onClick={() => handleSectorClick(item.sector)}
                onMouseEnter={() => setHoveredSector(item.sector)}
                onMouseLeave={() => setHoveredSector(null)}
              >
                {!isHovered ? (
                  <div className="p-4 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-lg font-medium text-black">{item.sector}</div>
                      <div className="text-black">₹{item.amount.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="mb-2">
                      <span className="text-5xl font-bold text-black">{item.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                ) : (
                  renderStockBreakdown(stocks, bgColor)
                )}
              </div>
            );
          })}
          
          {/* Small items */}
          {smallItems.map(item => {
            const bgColor = sectorColors[item.sector] || "#EDE7F6";
            const isHovered = hoveredSector === item.sector;
            const stocks = stocksData[item.sector] || [];
            
            return (
              <div
                key={item.sector}
                className="col-span-1 rounded overflow-hidden cursor-pointer relative"
                style={{ 
                  backgroundColor: bgColor,
                  height: "200px",
                  zIndex: isHovered ? 10 : 0
                }}
                onClick={() => handleSectorClick(item.sector)}
                onMouseEnter={() => setHoveredSector(item.sector)}
                onMouseLeave={() => setHoveredSector(null)}
              >
                {!isHovered ? (
                  <div className="p-4 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-lg font-medium text-black">{item.sector}</div>
                      <div className="text-black text-sm">₹{item.amount.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-black">{item.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                ) : (
                  renderStockBreakdown(stocks, bgColor)
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  // Render stocks view
  const renderStocksView = () => {
    // Find the sector data
    const sectorData = portfolioData.sector_allocation.find(s => s.sector === activeSector);
    if (!sectorData) return null;
    
    // Get stocks for the active sector
    const stocksToShow = stocksData[activeSector] || [];
    
    return (
      <>
        <div className="flex items-center mb-6">
          <button 
            onClick={backToSectors}
            className="mr-4 p-2 rounded-full bg-gray-700 text-white"
          >
            ←
          </button>
          <h2 className="text-2xl font-semibold text-white">{activeSector} Stocks</h2>
        </div>
        
        <div className="bg-blue-900 bg-opacity-30 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-300">Total {activeSector} Allocation</p>
              <p className="text-3xl font-bold text-white">₹{sectorData.amount.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-300">Percentage of Portfolio</p>
              <p className="text-3xl font-bold text-white">{sectorData.percentage.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        
        {stocksToShow.length > 0 ? (
          <div className="space-y-4">
            {stocksToShow.map((stock) => (
              <div 
                key={stock.name}
                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-medium text-white">{stock.name}</h3>
                  <p className="text-gray-300">₹{stock.value.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-white">{stock.percentage.toFixed(1)}%</p>
                  <p className={`${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-gray-400">
            <p>No detailed stock information available for {activeSector} sector.</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {activeView === "sectors" ? renderSectorView() : renderStocksView()}
      
      {/* Performance summary */}
      <div className="mt-6 text-gray-300">
        <div className="flex justify-between">
          <div>
            <p className="text-sm">Current Value</p>
            <p className="text-xl font-bold text-white">₹{portfolioData.current_investment_value.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-sm">Return</p>
            <p className="text-xl font-bold text-green-500">
              {(((portfolioData.current_investment_value - portfolioData.initial_investment_value) / portfolioData.initial_investment_value) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveSectorAllocation;