import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, FilePlus, Database } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="bg-dark w-48 border-r border-gray-800 flex flex-col">
      <div className="p-4 flex items-center">
        <Link to="/" className="text-blue-500 text-3xl font-bold">d</Link>
      </div>
      <div className="mt-8 flex flex-col flex-1">
        <div className="bg-gray-800 rounded mx-4 p-2 mb-4">
          <h2 className="text-white">PHA</h2>
        </div>
        <nav className="flex flex-col space-y-4 px-4">
          <Link 
            to="/fund-analysis" 
            className={`${isActive('/fund-analysis') ? 'text-white' : 'text-gray-400 hover:text-white'} flex items-center`}
          >
            <BarChart2 size={16} className="mr-2" />
            Fund Analysis
          </Link>
          <Link 
            to="/holdings" 
            className={`${isActive('/holdings') ? 'text-white' : 'text-gray-400 hover:text-white'} flex items-center`}
          >
            <FilePlus size={16} className="mr-2" />
            Holdings
          </Link>
          <Link 
            to="/transactions" 
            className={`${isActive('/transactions') ? 'text-white' : 'text-gray-400 hover:text-white'} flex items-center`}
          >
            <Database size={16} className="mr-2" />
            Transactions
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;