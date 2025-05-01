
import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import BarChartComponent from '@/components/BarChartComponent';
import LineChartComponent from '@/components/LineChartComponent';
import HeatmapComponent from '@/components/HeatmapComponent';
import TrafficHeatmap from '@/components/TrafficHeatmap';
import { 
  treatmentTypeData, 
  monthlyTrendData,
  riskMatrixData,
  trafficHeatmapData
} from '@/data/mockData';

const Visualizations: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isCollapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <DashboardHeader 
            title="Data Visualizations" 
            className="mb-6"
          />
          
          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <BarChartComponent 
              title="Treatment Types" 
              data={treatmentTypeData} 
            />
            <LineChartComponent 
              title="2022 Monthly Trends" 
              data={monthlyTrendData}
            />
          </div>
          
          {/* Heatmaps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HeatmapComponent 
              title="Risk Matrix" 
              data={riskMatrixData}
            />
            <TrafficHeatmap 
              title="Traffic Channels" 
              data={trafficHeatmapData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizations;
