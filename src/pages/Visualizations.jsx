
import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import BarChartComponent from '@/components/BarChartComponent';
import LineChartComponent from '@/components/LineChartComponent';
import HeatmapComponent from '@/components/HeatmapComponent';
import TrafficHeatmap from '@/components/TrafficHeatmap';
import FilterBar from '@/components/FilterBar';
import { toast } from '@/components/ui/use-toast';
import { useData } from '@/context/DataContext';

const Visualizations = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({});
  const { chartData, isUsingDefaultData } = useData();

  const filterOptions = [
    {
      id: 'chartType',
      label: 'Chart Type',
      type: 'select',
      options: ['Bar Charts', 'Line Charts', 'Heatmaps', 'All']
    },
    {
      id: 'timeRange',
      label: 'Time Range',
      type: 'select',
      options: ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Last Year', 'All Time']
    },
    {
      id: 'dataPoints',
      label: 'Data Points',
      type: 'range',
      range: [10, 100]
    }
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (Object.keys(newFilters).length > 0) {
      toast({
        title: "Visualization filters applied",
        description: `Applied ${Object.keys(newFilters).length} filters to charts.`,
      });
    }
  };

  // Determine which charts to show based on filters
  const showChart = (type) => {
    if (!filters.chartType || filters.chartType === 'All') return true;
    
    if (type === 'bar' && filters.chartType === 'Bar Charts') return true;
    if (type === 'line' && filters.chartType === 'Line Charts') return true;
    if (type === 'heatmap' && filters.chartType === 'Heatmaps') return true;
    
    return false;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isCollapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <DashboardHeader 
            title="Data Visualizations" 
            className="mb-6"
          />
          
          {isUsingDefaultData && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    Currently displaying default demonstration data. Upload your own data in the "Upload Data" section to see customized visualizations.
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
          
          {/* Main Charts Grid */}
          {(showChart('bar') || showChart('line')) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {showChart('bar') && (
                <BarChartComponent 
                  title="Treatment Types" 
                  data={chartData.treatmentTypeData} 
                />
              )}
              {showChart('line') && (
                <LineChartComponent 
                  title="2022 Monthly Trends" 
                  data={chartData.monthlyTrendData}
                />
              )}
            </div>
          )}
          
          {/* Heatmaps Grid */}
          {showChart('heatmap') && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HeatmapComponent 
                title="Risk Matrix" 
                data={chartData.riskMatrixData}
              />
              <TrafficHeatmap 
                title="Traffic Channels" 
                data={chartData.trafficHeatmapData}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visualizations;
