import React, { useState } from 'react';
import InvestmentSummary from '../components/InvestmentSummary';
import PerformanceChart from '../components/PerformanceChart';
import SectorAllocation from '../components/SectorAllocation';
import OverlapAnalysis from '../components/OverlapAnalysis';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useDashboardData } from '../hooks/useApi';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const [timeRange, setTimeRange] = useState('1M');
  
  // In a real app, you'd get userId from auth context or similar
  const userId = 1;
  const { data, loading, error, refreshData } = useDashboardData(userId);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Good morning, {data.user_name}!</h1>
        <p className="text-gray-400">Evaluate Your Investment Performance</p>
      </div>

      <InvestmentSummary 
        currentValue={data.current_investment_value}
        initialValue={data.initial_investment_value}
        bestFund={data.best_performing_scheme}
        worstFund={data.worst_performing_scheme}
      />

      {/* Added margin-top (mt-8) here to create the gap */}
      <div className="mt-20 mb-4 border-b border-gray-800">
        <div className="flex">
          <button
            className={`px-4 py-2 ${activeTab === 'performance' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('performance')}
          >
            Performance Metrics
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'portfolio' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio Composition
          </button>
        </div>
      </div>

      {activeTab === 'performance' ? (
        <PerformanceChart 
          performanceData={data.performance_data} 
          setTimeRange={setTimeRange} 
          currentTimeRange={timeRange}
        />
      ) : (
        <>
          <div className="space-y-8">
            <SectorAllocation sectorData={data.sector_allocation} />
            <OverlapAnalysis overlapData={data.fund_overlap} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;