
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ title, data }) => {
  if (!data || data.length === 0) {
    return (
      <Card className="w-full h-96">
        <CardHeader>
          <CardTitle>{title || "Bar Chart"}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-gray-500">No data available</p>
        </CardContent>
      </Card>
    );
  }

  // Get all keys except the category key (first key)
  const keys = Object.keys(data[0]).filter(key => key !== Object.keys(data[0])[0]);
  const categoryKey = Object.keys(data[0])[0];

  return (
    <Card className="w-full h-96">
      <CardHeader>
        <CardTitle>{title || "Bar Chart"}</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={categoryKey} 
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{fontSize: 12}}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            {keys.map((key, index) => (
              <Bar 
                key={key} 
                dataKey={key} 
                fill={`hsl(${(index * 50) % 360}, 70%, 50%)`} 
                name={key}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;
