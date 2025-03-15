import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Transactions = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Transactions</h1>
      <div className="bg-gray-800 rounded p-6 text-center">
        <p className="text-gray-400 mb-4">Transactions page is under development</p>
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default Transactions;