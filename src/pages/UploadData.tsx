
import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';

const UploadData: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <DashboardHeader 
            title="Upload Data" 
            className="mb-6"
          />
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="mb-4">
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400" 
                  stroke="currentColor" 
                  fill="none" 
                  viewBox="0 0 48 48" 
                  aria-hidden="true"
                >
                  <path 
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600 hover:text-blue-500">
                  Click to upload
                </span> or drag and drop
              </p>
              <p className="mt-1 text-xs text-gray-500">
                CSV, Excel, or JSON up to 10MB
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Upload Requirements</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>File must be in CSV, Excel, or JSON format</li>
                <li>Maximum file size is 10MB</li>
                <li>First row must contain column headers</li>
                <li>Date columns should be in YYYY-MM-DD format</li>
                <li>Numeric data should not contain special characters</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadData;
