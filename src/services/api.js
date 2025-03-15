import axios from 'axios';

// Get API URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Service Object
const apiService = {
  // Dashboard API
  getDashboardData: async (userId) => {
    try {
      const response = await api.get(`/investments/dashboard/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  },

  // User API
  getUser: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },

  // Investments API
  getUserInvestments: async (userId) => {
    try {
      const response = await api.get(`/investments/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user investments:', error);
      throw error;
    }
  },

  // Analysis API
  getSectorAllocation: async (userId) => {
    try {
      const response = await api.get(`/analysis/sector-allocation/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sector allocation:', error);
      throw error;
    }
  },

  getFundOverlap: async (userId) => {
    try {
      const response = await api.get(`/analysis/overlap/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching fund overlap:', error);
      throw error;
    }
  },

  // Funds API
  getAllFunds: async () => {
    try {
      const response = await api.get('/funds/');
      return response.data;
    } catch (error) {
      console.error('Error fetching funds:', error);
      throw error;
    }
  },
};

export default apiService;