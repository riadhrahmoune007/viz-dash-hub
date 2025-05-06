
import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import DataOverviewCard from '@/components/DataOverviewCard';
import FilterBar from '@/components/FilterBar';
import { toast } from '@/components/ui/use-toast';
import { useData } from '@/context/DataContext';
import { Skeleton } from "@/components/ui/skeleton";

const DataExplorer = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({});
  const { dataOverview, isUsingDefaultData, isLoading } = useData();

  const filterOptions = [
    {
      id: 'dataType',
      label: 'Data Type',
      type: 'select',
      options: ['Numeric', 'Categorical', 'Text', 'Date', 'Boolean']
    },
    {
      id: 'missingValues',
      label: 'Missing Values',
      type: 'range',
      range: [0, 100]
    },
    {
      id: 'onlyFavorite',
      label: 'Only Favorites',
      type: 'boolean'
    },
    {
      id: 'lastUpdated',
      label: 'Last Updated',
      type: 'date'
    }
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (Object.keys(newFilters).length > 0) {
      toast({
        title: "Filters applied",
        description: `Applied ${Object.keys(newFilters).length} filters to data.`,
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isCollapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <DashboardHeader 
            title="Data Explorer" 
            className="mb-6"
          />
          
          {isUsingDefaultData && !isLoading && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    Currently displaying default demonstration data. Upload your own data in the "Upload Data" section or check the Supabase database connection.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <FilterBar 
            onFilterChange={handleFilterChange}
            filterOptions={filterOptions}
            className="mb-6"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isLoading ? (
              // Loading state
              <>
                <div className="bg-white p-5 rounded-lg shadow">
                  <Skeleton className="h-8 w-1/3 mb-4" />
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </div>
                <div className="bg-white p-5 rounded-lg shadow">
                  <Skeleton className="h-8 w-1/3 mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                </div>
              </>
            ) : (
              // Data content
              <>
                {dataOverview && (
                  <DataOverviewCard 
                    totalRows={dataOverview.totalRows}
                    totalColumns={dataOverview.totalColumns}
                    missingValues={dataOverview.missingValues}
                    duplicates={dataOverview.duplicates}
                    numericColumns={dataOverview.numericColumns}
                    categoricalColumns={dataOverview.categoricalColumns}
                  />
                )}
                
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExplorer;
