
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Line,
  ComposedChart,
  Legend
} from 'recharts';
import { ChartBarIcon } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";

const LinearRegressionChart = ({ 
  title, 
  xAxisName,
  yAxisName,
  data,
  className 
}) => {
  // Calculate linear regression line
  const regressionLine = useMemo(() => {
    if (!data || data.length < 2) return { slope: 0, intercept: 0, rSquared: 0 };
    
    const n = data.length;
    
    // Calculate means
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    
    for (const point of data) {
      sumX += point.x;
      sumY += point.y;
      sumXY += point.x * point.y;
      sumX2 += point.x * point.x;
      sumY2 += point.y * point.y;
    }
    
    const meanX = sumX / n;
    const meanY = sumY / n;
    
    // Calculate slope and intercept
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = meanY - slope * meanX;
    
    // Calculate R-squared
    let SSres = 0, SStot = 0;
    for (const point of data) {
      const yPred = slope * point.x + intercept;
      SSres += Math.pow(point.y - yPred, 2);
      SStot += Math.pow(point.y - meanY, 2);
    }
    const rSquared = 1 - (SSres / SStot);
    
    return { slope, intercept, rSquared };
  }, [data]);

  // Generate regression line points
  const regressionLineData = useMemo(() => {
    if (!data || data.length < 2) return [];
    
    // Find min and max X values to draw the line
    const xValues = data.map(point => point.x);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    
    // Create two points to draw the line (start and end)
    return [
      { x: minX, y: minX * regressionLine.slope + regressionLine.intercept },
      { x: maxX, y: maxX * regressionLine.slope + regressionLine.intercept }
    ];
  }, [data, regressionLine]);

  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <ChartBarIcon size={18} />
            {title || "Linear Regression"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-gray-500">No data available for regression analysis</p>
        </CardContent>
      </Card>
    );
  }

  // Custom tooltip formatter function
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
          <p className="text-sm font-medium">{`${xAxisName}: ${payload[0].payload.x.toFixed(2)}`}</p>
          <p className="text-sm font-medium">{`${yAxisName}: ${payload[0].payload.y.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <ChartBarIcon size={18} />
          {title || "Linear Regression"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">Regression equation:</span>
            <span>
              y = {regressionLine.slope.toFixed(3)}x {regressionLine.intercept >= 0 ? '+' : ''} {regressionLine.intercept.toFixed(3)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">R² (coefficient of determination):</span>
            <span>{(regressionLine.rSquared * 100).toFixed(2)}%</span>
          </div>
        </div>
        <div className="h-[300px]">
          <ChartContainer 
            config={{
              points: { label: "Data Points", color: "#3b82f6" },
              line: { label: "Regression Line", color: "#ef4444" },
            }}
          >
            <ComposedChart
              data={data}
              margin={{ top: 20, right: 20, bottom: 40, left: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="x" 
                name={xAxisName} 
                label={{ value: xAxisName, position: 'bottom', offset: 0 }} 
              />
              <YAxis 
                dataKey="y" 
                name={yAxisName} 
                label={{ value: yAxisName, angle: -90, position: 'left' }} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Scatter name="Data Points" data={data} fill="#3b82f6" />
              <Line 
                name="Regression Line"
                data={regressionLineData} 
                dataKey="y"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                activeDot={false}
                type="linear"
              />
            </ComposedChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinearRegressionChart;
