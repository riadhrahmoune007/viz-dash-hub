
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar, ChartLine, Grid3X3 } from "lucide-react";

const Visualizations = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({});
  const { 
    chartData, 
    isUsingDefaultData, 
    columnData,
    datasetColumns 
  } = useData();
  const [selectedVisType, setSelectedVisType] = useState("bar");

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

  // Generate dynamic visualizations based on column data
  const generateDynamicVisualizations = () => {
    const visuals = [];
    
    // Generate bar charts for categorical + numeric columns
    if (columnData.categorical.length > 0 && columnData.numeric.length > 0 && showChart('bar')) {
      const categoryColumns = columnData.categorical.slice(0, 3); // Limit to first 3 categorical columns
      
      categoryColumns.forEach((categoryCol, index) => {
        const valueCol = columnData.numeric[0]; // Use first numeric column
        const title = `${categoryCol} by ${valueCol}`;
        
        if (chartData.treatmentTypeData && chartData.treatmentTypeData.length > 0) {
          visuals.push(
            <BarChartComponent 
              key={`bar-${index}`}
              title={title} 
              data={chartData.treatmentTypeData}
            />
          );
        }
      });
    }
    
    // Generate line charts for date + numeric columns
    if (columnData.date.length > 0 && columnData.numeric.length > 0 && showChart('line')) {
      const dateColumns = columnData.date.slice(0, 2); // Limit to first 2 date columns
      
      dateColumns.forEach((dateCol, index) => {
        const valueCol = columnData.numeric[0]; // Use first numeric column
        const title = `${valueCol} Trend by ${dateCol}`;
        
        if (chartData.monthlyTrendData && chartData.monthlyTrendData.length > 0) {
          visuals.push(
            <LineChartComponent 
              key={`line-${index}`}
              title={title} 
              data={chartData.monthlyTrendData}
            />
          );
        }
      });
    }
    
    // Generate heatmaps if applicable
    if (showChart('heatmap')) {
      if (chartData.riskMatrixData && chartData.riskMatrixData.length > 0) {
        visuals.push(
          <HeatmapComponent 
            key="heatmap-1"
            title="Risk Matrix" 
            data={chartData.riskMatrixData}
          />
        );
      }
      
      if (chartData.trafficHeatmapData && chartData.trafficHeatmapData.length > 0) {
        visuals.push(
          <TrafficHeatmap 
            key="heatmap-2"
            title="Traffic Channels" 
            data={chartData.trafficHeatmapData}
          />
        );
      }
    }
    
    return visuals;
  };

  const renderNoDataMessage = () => (
    <Card className="col-span-2">
      <CardContent className="pt-6">
        <div className="text-center py-8">
          <h3 className="text-lg font-medium mb-2">No visualization data available</h3>
          <p className="text-muted-foreground mb-4">
            Upload a dataset with numeric, categorical, or date columns to automatically generate visualizations.
          </p>
          <p className="text-sm text-muted-foreground">
            Try uploading a CSV file with columns that contain categories and numbers.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  // Generate dynamic visualization options based on available data
  const getVisualizationOptions = () => {
    const options = [];
    
    if (columnData.categorical.length > 0 && columnData.numeric.length > 0) {
      options.push({ id: 'bar', label: 'Bar Charts', icon: <ChartBar className="w-4 h-4" /> });
    }
    
    if (columnData.date.length > 0 && columnData.numeric.length > 0) {
      options.push({ id: 'line', label: 'Line Charts', icon: <ChartLine className="w-4 h-4" /> });
    }
    
    if (chartData.riskMatrixData?.length > 0 || chartData.trafficHeatmapData?.length > 0) {
      options.push({ id: 'heatmap', label: 'Heatmaps', icon: <Grid3X3 className="w-4 h-4" /> });
    }
    
    return options;
  };

  const visOptions = getVisualizationOptions();
  const dynamicVisuals = generateDynamicVisualizations();

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
          
          {datasetColumns.length > 0 && (
            <Alert className="mb-6">
              <AlertTitle>Data loaded successfully</AlertTitle>
              <AlertDescription>
                Your dataset with {datasetColumns.length} columns is ready for visualization. 
                Available column types: 
                {columnData.numeric.length > 0 && <span className="font-medium"> {columnData.numeric.length} numeric</span>}
                {columnData.categorical.length > 0 && <span className="font-medium">, {columnData.categorical.length} categorical</span>}
                {columnData.date.length > 0 && <span className="font-medium">, {columnData.date.length} date</span>}
                {columnData.text.length > 0 && <span className="font-medium">, {columnData.text.length} text</span>}
              </AlertDescription>
            </Alert>
          )}
          
          <FilterBar 
            onFilterChange={handleFilterChange}
            filterOptions={filterOptions}
            className="mb-6"
          />
          
          {visOptions.length > 0 && (
            <Tabs defaultValue={visOptions[0]?.id} className="mb-6" onValueChange={setSelectedVisType}>
              <TabsList>
                {visOptions.map(option => (
                  <TabsTrigger key={option.id} value={option.id} className="flex items-center gap-2">
                    {option.icon}
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {visOptions.map(option => (
                <TabsContent key={option.id} value={option.id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dynamicVisuals.filter(visual => {
                      const key = visual.key || '';
                      return key.startsWith(option.id);
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
          
          {/* Show default layout if no tabs are rendered */}
          {visOptions.length === 0 && (
            <>
              {/* Main Charts Grid */}
              {(showChart('bar') || showChart('line')) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {showChart('bar') && chartData.treatmentTypeData.length > 0 && (
                    <BarChartComponent 
                      title="Treatment Types" 
                      data={chartData.treatmentTypeData} 
                    />
                  )}
                  {showChart('line') && chartData.monthlyTrendData.length > 0 && (
                    <LineChartComponent 
                      title="2022 Monthly Trends" 
                      data={chartData.monthlyTrendData}
                    />
                  )}
                  
                  {!chartData.treatmentTypeData.length && !chartData.monthlyTrendData.length && renderNoDataMessage()}
                </div>
              )}
              
              {/* Heatmaps Grid */}
              {showChart('heatmap') && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {chartData.riskMatrixData.length > 0 && (
                    <HeatmapComponent 
                      title="Risk Matrix" 
                      data={chartData.riskMatrixData}
                    />
                  )}
                  {chartData.trafficHeatmapData.length > 0 && (
                    <TrafficHeatmap 
                      title="Traffic Channels" 
                      data={chartData.trafficHeatmapData}
                    />
                  )}
                  
                  {!chartData.riskMatrixData.length && !chartData.trafficHeatmapData.length && renderNoDataMessage()}
                </div>
              )}
            </>
          )}
          
          {/* If no visualizations are available at all */}
          {dynamicVisuals.length === 0 && visOptions.length === 0 && (
            <div className="grid grid-cols-1 gap-6">
              {renderNoDataMessage()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visualizations;
