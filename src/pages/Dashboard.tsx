
import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import KpiCard from '@/components/KpiCard';
import BarChartComponent from '@/components/BarChartComponent';
import LineChartComponent from '@/components/LineChartComponent';
import HeatmapComponent from '@/components/HeatmapComponent';
import DataOverviewCard from '@/components/DataOverviewCard';
import MLModelCard from '@/components/MLModelCard';
import TrafficHeatmap from '@/components/TrafficHeatmap';
import { 
  kpiData, 
  treatmentTypeData, 
  monthlyTrendData,
  satisfactionScoreData,
  trafficChannelsData,
  riskMatrixData,
  dataOverview,
  mlModelMetrics,
  trafficHeatmapData
} from '@/data/mockData';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isCollapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <DashboardHeader 
            title="Main Key Point Indicators" 
            className="mb-6"
          />
          
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
            {kpiData.map((kpi, index) => (
              <KpiCard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                isPositive={kpi.isPositive}
              />
            ))}
          </div>
          
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
          
          {/* Lower Section: Data Overview, ML Models, and Traffic */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <DataOverviewCard 
                totalRows={dataOverview.totalRows}
                totalColumns={dataOverview.totalColumns}
                missingValues={dataOverview.missingValues}
                duplicates={dataOverview.duplicates}
                numericColumns={dataOverview.numericColumns}
                categoricalColumns={dataOverview.categoricalColumns}
              />
              
              <MLModelCard
                title="Regression Model"
                target={mlModelMetrics.regression.target}
                metrics={{
                  rmse: mlModelMetrics.regression.rmse,
                  r2: mlModelMetrics.regression.r2,
                  mape: mlModelMetrics.regression.mape
                }}
              />
              
              <MLModelCard
                title="Classification Model"
                target={mlModelMetrics.classification.target}
                metrics={{
                  accuracy: mlModelMetrics.classification.accuracy,
                  precision: mlModelMetrics.classification.precision,
                  recall: mlModelMetrics.classification.recall,
                  f1Score: mlModelMetrics.classification.f1Score
                }}
              />
            </div>
            
            <div>
              <HeatmapComponent 
                title="Risk Matrix" 
                data={riskMatrixData}
              />
            </div>
            
            <div>
              <TrafficHeatmap 
                title="Traffic Channels" 
                data={trafficHeatmapData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
