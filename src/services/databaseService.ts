
import supabase from './supabaseClient';
import { toast } from '@/components/ui/use-toast';

// Define types for database tables
export interface KpiDataItem {
  id: number;
  title: string;
  value: string | number;
  change: number;
  isPositive: boolean;
}

export interface ChartDataItem {
  name: string;
  value: number;
}

export interface LineDataItem {
  name: string;
  patients: number;
  treatments: number;
}

export interface HeatmapDataItem {
  x: string;
  y: string;
  value: number;
}

interface DatabaseService {
  getKpiData: () => Promise<KpiDataItem[]>;
  getTreatmentTypeData: () => Promise<ChartDataItem[]>;
  getMonthlyTrendData: () => Promise<LineDataItem[]>;
  getRiskMatrixData: () => Promise<HeatmapDataItem[]>;
  getTrafficHeatmapData: () => Promise<[number, number, number][]>;
  getDataOverview: () => Promise<any>;
  getMlModelMetrics: () => Promise<any>;
  saveUploadedData: (data: any) => Promise<boolean>;
}

const databaseService: DatabaseService = {
  async getKpiData() {
    try {
      const { data, error } = await supabase
        .from('kpi_data')
        .select('*');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching KPI data:', error);
      toast({
        title: 'Error fetching KPI data',
        description: 'There was an error loading dashboard data',
        variant: 'destructive',
      });
      return [];
    }
  },
  
  async getTreatmentTypeData() {
    try {
      const { data, error } = await supabase
        .from('treatment_type_data')
        .select('*');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching treatment data:', error);
      return [];
    }
  },
  
  async getMonthlyTrendData() {
    try {
      const { data, error } = await supabase
        .from('monthly_trend_data')
        .select('*');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching monthly trend data:', error);
      return [];
    }
  },
  
  async getRiskMatrixData() {
    try {
      const { data, error } = await supabase
        .from('risk_matrix_data')
        .select('*');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching risk matrix data:', error);
      return [];
    }
  },
  
  async getTrafficHeatmapData() {
    try {
      const { data, error } = await supabase
        .from('traffic_heatmap_data')
        .select('*');
      
      if (error) throw error;
      // Transform the data to match the expected format [x, y, value]
      return data?.map(item => [item.x, item.y, item.value]) || [];
    } catch (error) {
      console.error('Error fetching traffic heatmap data:', error);
      return [];
    }
  },
  
  async getDataOverview() {
    try {
      const { data, error } = await supabase
        .from('data_overview')
        .select('*')
        .single();
      
      if (error) throw error;
      return data || null;
    } catch (error) {
      console.error('Error fetching data overview:', error);
      return null;
    }
  },
  
  async getMlModelMetrics() {
    try {
      const { data, error } = await supabase
        .from('ml_model_metrics')
        .select('*')
        .single();
      
      if (error) throw error;
      return data || null;
    } catch (error) {
      console.error('Error fetching ML model metrics:', error);
      return null;
    }
  },
  
  async saveUploadedData(data: any) {
    try {
      // Start a transaction to save data to multiple tables
      if (data.kpiData) {
        const { error } = await supabase
          .from('kpi_data')
          .upsert(data.kpiData, { onConflict: 'id' });
        
        if (error) throw error;
      }
      
      // Save other data types similarly
      if (data.chartData?.treatmentTypeData) {
        const { error } = await supabase
          .from('treatment_type_data')
          .upsert(data.chartData.treatmentTypeData, { onConflict: 'name' });
        
        if (error) throw error;
      }
      
      // Save more data...
      
      toast({
        title: 'Data saved to database',
        description: 'Your data has been successfully saved to Supabase',
      });
      
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: 'Error saving data',
        description: 'There was an error saving data to the database',
        variant: 'destructive',
      });
      return false;
    }
  }
};

export default databaseService;
