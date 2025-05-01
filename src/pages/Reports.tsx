
import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';

const Reports: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <DashboardHeader 
            title="Reports" 
            className="mb-6"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Report Cards */}
            {['Monthly Analytics', 'Patient Outcomes', 'Treatment Efficacy', 'Regional Performance'].map((report, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{report}</h3>
                    <p className="text-sm text-gray-500 mt-1">Last updated: May 1, 2024</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">PDF</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Comprehensive analysis of healthcare metrics and performance indicators
                    for strategic decision making and operational improvements.
                  </p>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Created by: Admin Team</span>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View Report
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-white p-5 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Schedule Reports</h3>
            <p className="text-sm text-gray-600 mb-4">
              Set up automated report generation and delivery to stakeholders
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Create New Report
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Import Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
