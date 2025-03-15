import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-900 bg-opacity-20 border border-red-800 text-red-300 px-4 py-3 rounded relative mt-4" role="alert">
      <div className="flex items-center">
        <AlertCircle className="mr-2" size={20} />
        <span className="block sm:inline">{message}</span>
      </div>
      <p className="mt-2 text-sm">Please try refreshing the page or contact support if the problem persists.</p>
    </div>
  );
};

export default ErrorMessage;