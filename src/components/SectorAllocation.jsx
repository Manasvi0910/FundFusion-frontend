import React from 'react';

const SectorAllocation = ({ sectorData }) => {
  // Sample data using the values from the image
  const defaultSectorData = [
    { sector: 'Financial', amount: 195000, percentage: 34, bgColor: '#A5B4FC' },
    { sector: 'Healthcare', amount: 83250, percentage: 14.5, bgColor: '#93A5C4' },
    { sector: 'Technology', amount: 111000, percentage: 19, bgColor: '#D1C4E9' },
    { sector: 'Consumer Goods', amount: 55500, percentage: 9.5, bgColor: '#EDE7F6' },
    { sector: 'Energy', amount: 55500, percentage: 9.5, bgColor: '#EDE7F6' },
    { sector: 'Other Sectors', amount: 55500, percentage: 9.5, bgColor: '#EDE7F6' }
  ];

  // Use provided data or default to sample data
  const data = sectorData || defaultSectorData;

  return (
    <div className="p-6" style={{ backgroundColor: '#111111' }}>
      <h2 className="text-2xl font-semibold mb-6 text-white">Sector Allocation</h2>
      <div className="grid grid-cols-12 gap-4">
        {/* Financial - large box (spans 8 columns) */}
        <div 
          className="col-span-8 p-4 rounded" 
          style={{ backgroundColor: '#A5B4FC', height: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div className="text-lg font-medium text-black">{data[0].sector}</div>
            <div style={{ color: '#1A1A1A' }}>₹{data[0].amount.toLocaleString('en-IN')}</div>
          </div>
          <div className="mb-2">
            <span className="text-4xl font-bold text-black">{data[0].percentage}%</span>
          </div>
        </div>
        
        {/* Healthcare - medium box (spans 4 columns) */}
        <div 
          className="col-span-4 p-4 rounded" 
          style={{ backgroundColor: '#93A5C4', height: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div className="text-lg font-medium text-black">{data[1].sector}</div>
            <div style={{ color: '#1A1A1A' }}>₹{data[1].amount.toLocaleString('en-IN')}</div>
          </div>
          <div className="mb-2">
            <span className="text-4xl font-bold text-black">{data[1].percentage}%</span>
          </div>
        </div>
        
        {/* Technology - medium-large box (spans 6 columns) */}
        <div 
          className="col-span-6 p-4 rounded" 
          style={{ backgroundColor: '#D1C4E9', height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div className="text-lg font-medium text-black">{data[2].sector}</div>
            <div style={{ color: '#1A1A1A' }}>₹{data[2].amount.toLocaleString('en-IN')}</div>
          </div>
          <div className="mb-2">
            <span className="text-4xl font-bold text-black">{data[2].percentage}%</span>
          </div>
        </div>
        
        {/* Consumer Goods - small box (spans 2 columns) */}
        <div 
          className="col-span-2 p-4 rounded" 
          style={{ backgroundColor: '#EDE7F6', height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div className="text-lg font-medium text-black">{data[3].sector}</div>
            <div style={{ color: '#1A1A1A' }}>₹{data[3].amount.toLocaleString('en-IN')}</div>
          </div>
          <div className="mb-2">
            <span className="text-4xl font-bold text-black">{data[3].percentage}%</span>
          </div>
        </div>
        
        {/* Energy - small box (spans 2 columns) */}
        <div 
          className="col-span-2 p-4 rounded" 
          style={{ backgroundColor: '#EDE7F6', height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div className="text-lg font-medium text-black">{data[4].sector}</div>
            <div style={{ color: '#1A1A1A' }}>₹{data[4].amount.toLocaleString('en-IN')}</div>
          </div>
          <div className="mb-2">
            <span className="text-4xl font-bold text-black">{data[4].percentage}%</span>
          </div>
        </div>
        
        {/* Other Sectors - small box (spans 2 columns) */}
        <div 
          className="col-span-2 p-4 rounded" 
          style={{ backgroundColor: '#EDE7F6', height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div className="text-lg font-medium text-black">{data[5].sector}</div>
            <div style={{ color: '#1A1A1A' }}>₹{data[5].amount.toLocaleString('en-IN')}</div>
          </div>
          <div className="mb-2">
            <span className="text-4xl font-bold text-black">{data[5].percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorAllocation;