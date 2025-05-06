import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { 
  ChartData, 
  LineChartData, 
  HeatmapData
} from '@/data/mockData';

// Define the types that were missing in mockData.ts
type TrafficHeatmapData = [number, number, number];

interface DataOverviewType {
  totalRows: number;
  totalColumns: number;
  missingValues: number;
  duplicates: number;
  numericColumns: number;
  categoricalColumns: number;
}

interface MLModelMetricsType {
  regression: {
    name: string;
    target: string;
    rmse: number;
    r2: number;
    mape: number;
  };
  classification: {
    name: string;
    target: string;
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
}

// Define the types for our context
interface DataContextType {
  chartData: {
    kpiData: any[];
    treatmentTypeData: ChartData[];
    monthlyTrendData: LineChartData[];
    riskMatrixData: HeatmapData[];
    trafficHeatmapData: TrafficHeatmapData[];
  };
  dataOverview: DataOverviewType | null;
  mlModelMetrics: MLModelMetricsType | null;
  updateDataFromUpload: (fileData: any) => void;
  isUsingDefaultData: boolean;
}

// Create the context with default values
const DataContext = createContext<DataContextType | undefined>(undefined);

// Import default data
import { 
  kpiData, 
  treatmentTypeData, 
  monthlyTrendData,
  riskMatrixData,
  trafficHeatmapData,
  dataOverview as defaultDataOverview,
  mlModelMetrics as defaultMlModelMetrics
} from '@/data/mockData';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chartData, setChartData] = useState({
    kpiData,
    treatmentTypeData,
    monthlyTrendData,
    riskMatrixData,
    trafficHeatmapData
  });
  const [dataOverview, setDataOverview] = useState(defaultDataOverview);
  const [mlModelMetrics, setMlModelMetrics] = useState(defaultMlModelMetrics);
  const [isUsingDefaultData, setIsUsingDefaultData] = useState(true);

  // Function to update data from uploaded file
  const updateDataFromUpload = (fileData: any) => {
    try {
      console.log("Processing uploaded data:", fileData);
      
      // Process KPI data
      if (fileData.kpiData && Array.isArray(fileData.kpiData)) {
        setChartData(prevData => ({ ...prevData, kpiData: fileData.kpiData }));
      }
      
      // Process chart data
      if (fileData.chartData) {
        const newChartData = { ...chartData };
        
        if (fileData.chartData.treatmentTypeData) {
          newChartData.treatmentTypeData = fileData.chartData.treatmentTypeData;
        }
        if (fileData.chartData.monthlyTrendData) {
          newChartData.monthlyTrendData = fileData.chartData.monthlyTrendData;
        }
        if (fileData.chartData.riskMatrixData) {
          newChartData.riskMatrixData = fileData.chartData.riskMatrixData;
        }
        if (fileData.chartData.trafficHeatmapData) {
          newChartData.trafficHeatmapData = fileData.chartData.trafficHeatmapData;
        }
        
        setChartData(newChartData);
      }
      
      // Process data overview
      if (fileData.dataOverview) {
        setDataOverview(fileData.dataOverview);
      }
      
      // Process ML model metrics
      if (fileData.mlModelMetrics) {
        setMlModelMetrics(fileData.mlModelMetrics);
      }
      
      setIsUsingDefaultData(false);
      
      toast({
        title: "Data updated successfully",
        description: "Dashboard has been updated with your uploaded data",
      });
    } catch (error) {
      console.error("Error processing data:", error);
      toast({
        title: "Error processing data",
        description: "There was an error processing your data. Please check the format and try again.",
        variant: "destructive",
      });
    }
  };

  // Provide the context value
  const value = {
    chartData,
    dataOverview,
    mlModelMetrics,
    updateDataFromUpload,
    isUsingDefaultData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
