
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { 
  ChartData, 
  LineChartData, 
  HeatmapData
} from '@/data/mockData';
import databaseService from '@/services/databaseService';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';

// Define types
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
  isLoading: boolean;
  error: Error | null;
  supbaseConnected: boolean;
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
  // Cast trafficHeatmapData to the expected type
  const typedTrafficHeatmapData = trafficHeatmapData as unknown as TrafficHeatmapData[];
  
  const [chartData, setChartData] = useState({
    kpiData,
    treatmentTypeData,
    monthlyTrendData,
    riskMatrixData,
    trafficHeatmapData: typedTrafficHeatmapData
  });
  const [dataOverview, setDataOverview] = useState(defaultDataOverview);
  const [mlModelMetrics, setMlModelMetrics] = useState(defaultMlModelMetrics);
  const [isUsingDefaultData, setIsUsingDefaultData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [supbaseConnected, setSupabaseConnected] = useState(false);

  // Check Supabase connection
  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        // Simple ping to check connection
        const { data, error } = await supabase.from('kpi_data').select('count').limit(1);
        if (!error) {
          setSupabaseConnected(true);
          console.log('Supabase connection successful');
        } else {
          console.error('Supabase connection error:', error);
          toast({
            title: "Database Connection Error",
            description: "Using fallback data. Check Supabase configuration.",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error('Failed to check Supabase connection:', err);
      }
    };
    
    checkSupabaseConnection();
  }, []);

  // Fetch data from database
  const fetchDataFromDatabase = async () => {
    try {
      setIsLoading(true);
      
      // Only try to fetch data if Supabase is connected
      if (supbaseConnected) {
        // Fetch KPI data
        const kpiDataFromDb = await databaseService.getKpiData();
        if (kpiDataFromDb && kpiDataFromDb.length > 0) {
          setChartData(prevData => ({ ...prevData, kpiData: kpiDataFromDb }));
        }
        
        // Fetch treatment type data
        const treatmentTypeDataFromDb = await databaseService.getTreatmentTypeData();
        if (treatmentTypeDataFromDb && treatmentTypeDataFromDb.length > 0) {
          setChartData(prevData => ({ 
            ...prevData, 
            treatmentTypeData: treatmentTypeDataFromDb as ChartData[] 
          }));
        }
        
        // Fetch monthly trend data
        const monthlyTrendDataFromDb = await databaseService.getMonthlyTrendData();
        if (monthlyTrendDataFromDb && monthlyTrendDataFromDb.length > 0) {
          setChartData(prevData => ({ 
            ...prevData, 
            // Line data items already match the expected format, no need for casting
            monthlyTrendData: monthlyTrendDataFromDb as unknown as LineChartData[]
          }));
        }
        
        // Fetch risk matrix data
        const riskMatrixDataFromDb = await databaseService.getRiskMatrixData();
        if (riskMatrixDataFromDb && riskMatrixDataFromDb.length > 0) {
          setChartData(prevData => ({ 
            ...prevData, 
            // Heatmap data items already match the expected format, no need for casting
            riskMatrixData: riskMatrixDataFromDb as unknown as HeatmapData[]
          }));
        }
        
        // Fetch traffic heatmap data
        const trafficHeatmapDataFromDb = await databaseService.getTrafficHeatmapData();
        if (trafficHeatmapDataFromDb && trafficHeatmapDataFromDb.length > 0) {
          setChartData(prevData => ({ 
            ...prevData, 
            trafficHeatmapData: trafficHeatmapDataFromDb as TrafficHeatmapData[] 
          }));
        }
        
        // Fetch data overview
        const dataOverviewFromDb = await databaseService.getDataOverview();
        if (dataOverviewFromDb) {
          setDataOverview(dataOverviewFromDb);
        }
        
        // Fetch ML model metrics
        const mlModelMetricsFromDb = await databaseService.getMlModelMetrics();
        if (mlModelMetricsFromDb) {
          setMlModelMetrics(mlModelMetricsFromDb);
        }
        
        // If we got data from the database, we're no longer using default data
        if (
          kpiDataFromDb?.length > 0 ||
          treatmentTypeDataFromDb?.length > 0 ||
          monthlyTrendDataFromDb?.length > 0 ||
          riskMatrixDataFromDb?.length > 0 ||
          trafficHeatmapDataFromDb?.length > 0 ||
          dataOverviewFromDb ||
          mlModelMetricsFromDb
        ) {
          setIsUsingDefaultData(false);
          toast({
            title: "Data loaded from database",
            description: "Your dashboard has been updated with data from Supabase",
          });
        }
      } else {
        console.log('Using default data (Supabase not connected)');
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching data from database:", err);
      setError(err instanceof Error ? err : new Error("Unknown error"));
      setIsLoading(false);
    }
  };
  
  // Load data when component mounts
  useEffect(() => {
    fetchDataFromDatabase();
  }, [supbaseConnected]); // Only refetch when connection status changes

  // Function to update data from uploaded file
  const updateDataFromUpload = async (fileData: any) => {
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
          // Ensure proper type casting for trafficHeatmapData
          newChartData.trafficHeatmapData = fileData.chartData.trafficHeatmapData as TrafficHeatmapData[];
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
      
      // Save the data to the database
      await databaseService.saveUploadedData(fileData);
      
      toast({
        title: "Data updated successfully",
        description: "Dashboard has been updated with your uploaded data and saved to database",
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
    isUsingDefaultData,
    isLoading,
    error,
    supbaseConnected
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
