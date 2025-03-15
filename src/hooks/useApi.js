import { useState, useEffect } from 'react';
import apiService from '../services/api';

// Custom hook for fetching dashboard data
export const useDashboardData = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getDashboardData(userId);
        setData(response);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, refreshTrigger]);

  return { data, loading, error, refreshData };
};

// Additional custom hooks
export const useUserInvestments = (userId) => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setLoading(true);
        const response = await apiService.getUserInvestments(userId);
        setInvestments(response);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch investments');
        console.error('Investments fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchInvestments();
    }
  }, [userId]);

  return { investments, loading, error };
};

export const useSectorAllocation = (userId) => {
  const [sectorData, setSectorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getSectorAllocation(userId);
        setSectorData(response);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch sector allocation');
        console.error('Sector allocation fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSectorData();
    }
  }, [userId]);

  return { sectorData, loading, error };
};

export const useFundOverlap = (userId) => {
  const [overlapData, setOverlapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverlapData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getFundOverlap(userId);
        setOverlapData(response);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch fund overlap data');
        console.error('Fund overlap fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOverlapData();
    }
  }, [userId]);

  return { overlapData, loading, error };
};