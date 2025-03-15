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

  // Mock financial stocks data - this would come from your API
  const financialStocks = [
    { name: "HDFC Bank", value: 1024450, percentage: 41.69, change: 2.5 },
    { name: "ICICI Bank", value: 787450, percentage: 32.04, change: 1.2 },
    { name: "Axis Bank", value: 345890, percentage: 14.08, change: -0.8 },
    { name: "SBI", value: 178290, percentage: 7.26, change: 0.5 },
    { name: "Kotak Mahindra", value: 121340, percentage: 4.94, change: 1.7 }
  ];

  // State for view (sectors or financial stocks)
  const [viewingFinancialStocks, setViewingFinancialStocks] = useState(false);

  // Handle Financial sector click
  const handleFinancialClick = () => {
    setViewingFinancialStocks(true);
  };

  // Return to main sector view
  const backToSectors = () => {
    setViewingFinancialStocks(false);
  };

  // Render main sector allocation view
  const renderSectorView = () => {
    return (
      <>
        <h2 className="text-2xl font-semibold mb-6 text-white">Sector Allocation</h2>
        <div className="grid grid-cols-12 gap-4">
          {/* Financial - large box (spans 8 columns) */}
          <div 
            className="col-span-8 p-4 rounded cursor-pointer" 
            style={{ 
              backgroundColor: '#9bb0c7', 
              height: '240px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between' 
            }}
            onClick={handleFinancialClick}
          >
            <div>
              <div className="text-lg font-medium text-black">{portfolioData.sector_allocation[0].sector}</div>
              <div style={{ color: '#1A1A1A' }}>₹{portfolioData.sector_allocation[0].amount.toLocaleString('en-IN')}</div>
            </div>
            <div className="mb-2">
              <span className="text-4xl font-bold text-black">{portfolioData.sector_allocation[0].percentage.toFixed(1)}%</span>
            </div>
          </div>
          
          {/* Technology - medium box (spans 4 columns) */}
          <div 
            className="col-span-4 p-4 rounded" 
            style={{ 
              backgroundColor: '#adb8cf', 
              height: '240px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between' 
            }}
          >
            <div>
              <div className="text-lg font-medium text-black">{portfolioData.sector_allocation[1].sector}</div>
              <div style={{ color: '#1A1A1A' }}>₹{portfolioData.sector_allocation[1].amount.toLocaleString('en-IN')}</div>
            </div>
            <div className="mb-2">
              <span className="text-4xl font-bold text-black">{portfolioData.sector_allocation[1].percentage.toFixed(1)}%</span>
            </div>
          </div>
          
          {/* Energy - medium-large box (spans 6 columns) */}
          <div 
            className="col-span-6 p-4 rounded" 
            style={{ 
              backgroundColor: '#c6c4d8', 
              height: '180px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between' 
            }}
          >
            <div>
              <div className="text-lg font-medium text-black">{portfolioData.sector_allocation[2].sector}</div>
              <div style={{ color: '#1A1A1A' }}>₹{portfolioData.sector_allocation[2].amount.toLocaleString('en-IN')}</div>
            </div>
            <div className="mb-2">
              <span className="text-4xl font-bold text-black">{portfolioData.sector_allocation[2].percentage.toFixed(1)}%</span>
            </div>
          </div>
          
          {/* Healthcare - small box (spans 2 columns) */}
          <div 
            className="col-span-2 p-4 rounded" 
            style={{ 
              backgroundColor: '#d8d1e0', 
              height: '180px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between' 
            }}
          >
            <div>
              <div className="text-lg font-medium text-black">{portfolioData.sector_allocation[3].sector}</div>
              <div style={{ color: '#1A1A1A' }}>₹{portfolioData.sector_allocation[3].amount.toLocaleString('en-IN')}</div>
            </div>
            <div className="mb-2">
              <span className="text-4xl font-bold text-black">{portfolioData.sector_allocation[3].percentage.toFixed(1)}%</span>
            </div>
          </div>
          
          {/* Industrials - small box (spans 2 columns) */}
          <div 
            className="col-span-2 p-4 rounded" 
            style={{ 
              backgroundColor: '#e5dbe8', 
              height: '180px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between' 
            }}
          >
            <div>
              <div className="text-lg font-medium text-black">{portfolioData.sector_allocation[4].sector}</div>
              <div style={{ color: '#1A1A1A' }}>₹{portfolioData.sector_allocation[4].amount.toLocaleString('en-IN')}</div>
            </div>
            <div className="mb-2">
              <span className="text-4xl font-bold text-black">{portfolioData.sector_allocation[4].percentage.toFixed(1)}%</span>
            </div>
          </div>
          
          {/* Consumer Goods - small box (spans 2 columns) */}
          <div 
            className="col-span-2 p-4 rounded" 
            style={{ 
              backgroundColor: '#f2e6ef', 
              height: '180px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between' 
            }}
          >
            <div>
              <div className="text-lg font-medium text-black">{portfolioData.sector_allocation[5].sector}</div>
              <div style={{ color: '#1A1A1A' }}>₹{portfolioData.sector_allocation[5].amount.toLocaleString('en-IN')}</div>
            </div>
            <div className="mb-2">
              <span className="text-4xl font-bold text-black">{portfolioData.sector_allocation[5].percentage.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Render financial stocks view
  const renderFinancialStocksView = () => {
    const financialSector = portfolioData.sector_allocation.find(s => s.sector === "Financial");
    
    return (
      <>
        <div className="flex items-center mb-6">
          <button 
            onClick={backToSectors}
            className="mr-4 p-2 rounded-full bg-gray-700 text-white"
          >
            ←
          </button>
          <h2 className="text-2xl font-semibold text-white">Financial Stocks</h2>
        </div>
        
        <div className="bg-blue-900 bg-opacity-30 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-300">Total Financial Allocation</p>
              <p className="text-3xl font-bold text-white">₹{financialSector.amount.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-300">Percentage of Portfolio</p>
              <p className="text-3xl font-bold text-white">{financialSector.percentage.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {financialStocks.map((stock) => (
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
      </>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {viewingFinancialStocks ? renderFinancialStocksView() : renderSectorView()}
      
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