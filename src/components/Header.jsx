import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Users, LogOut } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-dark border-b border-gray-800 p-4 flex justify-between items-center">
      <nav className="flex space-x-8">
        <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
        <Link to="/" className="text-white border-b-2 border-blue-500 pb-1">Portfolio</Link>
        <Link to="/mutual-funds" className="text-gray-400 hover:text-white">Mutual Funds</Link>
        <Link to="/tools" className="text-gray-400 hover:text-white">Tools</Link>
        <Link to="/transactions" className="text-gray-400 hover:text-white">Transactions</Link>
      </nav>
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white">
          <Search size={20} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <Bell size={20} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <Users size={20} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;