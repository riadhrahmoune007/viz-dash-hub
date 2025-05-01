
import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import DataOverviewCard from '@/components/DataOverviewCard';
import { dataOverview } from '@/data/mockData';

const DataExplorer: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isCollapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <DashboardHeader 
            title="Data Explorer" 
            className="mb-6"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DataOverviewCard 
              totalRows={dataOverview.totalRows}
              totalColumns={dataOverview.totalColumns}
              missingValues={dataOverview.missingValues}
              duplicates={dataOverview.duplicates}
              numericColumns={dataOverview.numericColumns}
              categoricalColumns={dataOverview.categoricalColumns}
            />
            
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">Dataset Columns</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="bg-gray-50 p-3 rounded">
                  <h3 className="text-sm font-medium text-gray-700">Numeric Features</h3>
                  <ul className="mt-2 text-sm">
                    <li>Age</li>
                    <li>Blood Pressure</li>
                    <li>Cholesterol</li>
                    <li>Heart Rate</li>
                    <li>Diabetes Risk Score</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <h3 className="text-sm font-medium text-gray-700">Categorical Features</h3>
                  <ul className="mt-2 text-sm">
                    <li>Gender</li>
                    <li>Treatment Type</li>
                    <li>Patient Status</li>
                    <li>Region</li>
                    <li>Satisfaction Score</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExplorer;
