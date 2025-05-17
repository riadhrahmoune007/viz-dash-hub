
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  change: number;
  isPositive: boolean;
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, isPositive, className }) => {
  return (
    <Card className={cn("overflow-hidden bg-white", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-3">
          <p className="text-gray-500 font-medium">{title}</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            <div className={cn(
              "flex items-center text-sm font-medium",
              isPositive ? "text-green-600" : "text-red-600"
            )}>
              {isPositive ? (
                <ArrowUp size={16} className="mr-1" />
              ) : (
                <ArrowDown size={16} className="mr-1" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
