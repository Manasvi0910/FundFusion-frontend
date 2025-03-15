import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import FundAnalysis from './pages/FundAnalysis';
import Holdings from './pages/Holdings';
import Transactions from './pages/Transactions';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container bg-gray-900 text-white min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/fund-analysis" element={<FundAnalysis />} />
              <Route path="/holdings" element={<Holdings />} />
              <Route path="/transactions" element={<Transactions />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;