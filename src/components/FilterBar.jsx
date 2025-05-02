
import React, { useState } from 'react';
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const FilterBar = ({ onFilterChange, filterOptions, className = "" }) => {
  const [activeFilters, setActiveFilters] = useState({});
  
  const handleFilterChange = (id, value) => {
    const newActiveFilters = { ...activeFilters };
    
    if (value === null || value === undefined || 
        (Array.isArray(value) && value.length === 0) || 
        value === '') {
      delete newActiveFilters[id];
    } else {
      newActiveFilters[id] = value;
    }
    
    setActiveFilters(newActiveFilters);
    onFilterChange(newActiveFilters);
  };
  
  const clearFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };
  
  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Filter Data</h2>
          {Object.keys(activeFilters).length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
            >
              Clear All
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filterOptions.map((filter) => (
            <div key={filter.id} className="flex flex-col space-y-2">
              <label className="text-sm font-medium">{filter.label}</label>
              
              {filter.type === 'select' && (
                <select
                  className="border border-gray-300 rounded-md p-2 text-sm"
                  value={activeFilters[filter.id] || ''}
                  onChange={(e) => handleFilterChange(filter.id, e.target.value || null)}
                >
                  <option value="">All</option>
                  {filter.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
              
              {filter.type === 'range' && (
                <div className="pt-2">
                  <Slider
                    min={filter.range[0]}
                    max={filter.range[1]}
                    defaultValue={[filter.range[0]]}
                    onValueChange={(value) => handleFilterChange(filter.id, value[0])}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{filter.range[0]}</span>
                    <span>{activeFilters[filter.id] || filter.range[0]}</span>
                    <span>{filter.range[1]}</span>
                  </div>
                </div>
              )}
              
              {filter.type === 'boolean' && (
                <Switch
                  checked={activeFilters[filter.id] || false}
                  onCheckedChange={(checked) => handleFilterChange(filter.id, checked)}
                />
              )}
              
              {filter.type === 'date' && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex justify-between items-center w-full"
                    >
                      {activeFilters[filter.id] ? 
                        new Date(activeFilters[filter.id]).toLocaleDateString() : 
                        "Select date"}
                      <Calendar className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={activeFilters[filter.id] ? new Date(activeFilters[filter.id]) : undefined}
                      onSelect={(date) => handleFilterChange(filter.id, date)}
                    />
                  </PopoverContent>
                </Popover>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
