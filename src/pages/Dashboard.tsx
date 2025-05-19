import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import KpiCard from '@/components/KpiCard';
import BarChartComponent from '@/components/BarChartComponent';
import LineChartComponent from '@/components/LineChartComponent';
import HeatmapComponent from '@/components/HeatmapComponent';
import LinearRegressionChart from '@/components/LinearRegressionChart';
import DataOverviewCard from '@/components/DataOverviewCard';
import MLModelCard from '@/components/MLModelCard';
import TrafficHeatmap from '@/components/TrafficHeatmap';
import { useData } from '@/context/DataContext';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { 
    chartData, 
    dataOverview, 
    mlModelMetrics, 
    isUsingDefaultData,
    columnData,
    datasetColumns,
    regressionData
  } = useData();

  // Generate dynamic dashboard summary based on the uploaded dataset
  const getDashboardSummary = () => {
    if (datasetColumns.length === 0) {
      return "Upload a dataset to see a personalized dashboard overview.";
    }

    const numericColumns = columnData.numeric.length;
    const categoryColumns = columnData.categorical.length;
    const dateColumns = columnData.date.length;
    const totalColumns = datasetColumns.length;
    const totalRows = dataOverview?.totalRows || 0;

    let summary = `This dashboard is analyzing ${totalRows.toLocaleString()} records with ${totalColumns} features. `;
    
    if (numericColumns > 0) {
      summary += `Found ${numericColumns} numeric columns suitable for trends and metrics. `;
    }
    
    if (categoryColumns > 0) {
      summary += `Identified ${categoryColumns} categorical columns for segmentation and classification. `;
    }
    
    if (dateColumns > 0) {
      summary += `Time-based analysis is available with ${dateColumns} date columns. `;
    }
    
    return summary;
  };

  // Get dynamic dataset name based on columns
  const getDatasetName = () => {
    if (datasetColumns.length === 0) {
      return "Key Point Indicators";
    }

    const hasHealthTerms = datasetColumns.some(col => 
      /patient|health|treatment|medical|doctor|hospital|clinic|disease/i.test(col)
    );
    
    const hasFinanceTerms = datasetColumns.some(col => 
      /sales|revenue|profit|cost|finance|price|income|expense/i.test(col)
    );
    
    const hasMarketingTerms = datasetColumns.some(col => 
      /campaign|marketing|customer|lead|conversion|traffic|social/i.test(col)
    );

    if (hasHealthTerms) return "Healthcare Data Overview";
    if (hasFinanceTerms) return "Financial Performance Metrics";
    if (hasMarketingTerms) return "Marketing Analytics Dashboard";
    
    return "Dataset Analysis";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isCollapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <DashboardHeader 
            title={getDatasetName()} 
            className="mb-2"
          />
          
          {/* Dynamic Description */}
          <div className="mb-6 text-sm text-muted-foreground">
            <p>{getDashboardSummary()}</p>
          </div>
          
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
                    Currently displaying default demonstration data. Upload your own data in the "Upload Data" section to see customized analytics.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* File Information Alert */}
          {!isUsingDefaultData && datasetColumns.length > 0 && (
            <Alert className="mb-6 bg-blue-50 border-blue-200">
              <FileText className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                <div className="flex flex-col gap-2">
                  <p><span className="font-medium">Dataset loaded:</span> {dataOverview?.totalRows.toLocaleString()} rows × {datasetColumns.length} columns</p>
                  <p className="text-sm text-muted-foreground">
                    Columns detected: {columnData.numeric.length > 0 && <span>{columnData.numeric.length} numeric</span>}
                    {columnData.categorical.length > 0 && <span>, {columnData.categorical.length} categorical</span>}
                    {columnData.date.length > 0 && <span>, {columnData.date.length} date</span>}
                    {columnData.text.length > 0 && <span>, {columnData.text.length} text</span>}
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}
          
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
            {chartData.kpiData.length > 0 ? (
              chartData.kpiData.map((kpi, index) => (
                <KpiCard
                  key={index}
                  title={kpi.title}
                  value={kpi.value}
                  change={kpi.change}
                  isPositive={kpi.isPositive}
                />
              ))
            ) : (
              <div className="col-span-full bg-white p-6 rounded-lg shadow flex items-center justify-center">
                <p className="text-gray-500">No KPI data available. Upload a dataset to generate metrics.</p>
              </div>
            )}
          </div>
          
          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {chartData.treatmentTypeData.length > 0 ? (
              <BarChartComponent 
                title={columnData.categorical.length > 0 && columnData.numeric.length > 0 
                  ? `${columnData.categorical[0]} Distribution` 
                  : "Treatment Types"} 
                data={chartData.treatmentTypeData} 
              />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center">
                <p className="text-gray-500">No categorical data available</p>
              </div>
            )}
            
            {chartData.monthlyTrendData.length > 0 ? (
              <LineChartComponent 
                title={columnData.date.length > 0 && columnData.numeric.length > 0
                  ? `${columnData.numeric[0]} Trend by ${columnData.date[0]}`
                  : "Monthly Trends"} 
                data={chartData.monthlyTrendData}
              />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center">
                <p className="text-gray-500">No time series data available</p>
              </div>
            )}
          </div>
          
          {/* Linear Regression Chart */}
          <div className="mb-6">
            {regressionData && regressionData.data && regressionData.data.length > 0 ? (
              <LinearRegressionChart 
                title={`Linear Regression: ${regressionData.xAxisName} vs ${regressionData.yAxisName}`}
                xAxisName={regressionData.xAxisName}
                yAxisName={regressionData.yAxisName}
                data={regressionData.data}
              />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center">
                <p className="text-gray-500">
                  No regression data available. Upload a dataset with numeric columns to see linear regression analysis.
                </p>
              </div>
            )}
          </div>
          
          {/* Lower Section: Data Overview, ML Models, and Traffic */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
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
              
              {mlModelMetrics && (
                <>
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
                </>
              )}
            </div>
            
            <div>
              {chartData.riskMatrixData.length > 0 ? (
                <HeatmapComponent 
                  title="Risk Matrix" 
                  data={chartData.riskMatrixData}
                />
              ) : (
                <div className="bg-white p-6 rounded-lg shadow h-full flex items-center justify-center">
                  <p className="text-gray-500">No risk data available</p>
                </div>
              )}
            </div>
            
            <div>
              {chartData.trafficHeatmapData.length > 0 ? (
                <TrafficHeatmap 
                  title="Data Distribution" 
                  data={chartData.trafficHeatmapData}
                />
              ) : (
                <div className="bg-white p-6 rounded-lg shadow h-full flex items-center justify-center">
                  <p className="text-gray-500">No distribution data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
