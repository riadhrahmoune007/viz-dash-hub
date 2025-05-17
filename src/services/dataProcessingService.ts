// Process CSV data
export const processCSV = (content: string): any => {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const result: Record<string, any> = {
    kpiData: [],
    chartData: {
      treatmentTypeData: [],
      monthlyTrendData: [],
      riskMatrixData: [],
      trafficHeatmapData: []
    },
    dataOverview: {
      totalRows: lines.length - 1,
      totalColumns: headers.length,
      missingValues: 0,
      duplicates: 0,
      numericColumns: 0,
      categoricalColumns: 0
    },
    mlModelMetrics: null,
    columnData: {
      numeric: [],
      categorical: [],
      date: [],
      text: []
    },
    datasetColumns: headers
  };
  
  // Process data rows
  const dataRows = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const row: Record<string, any> = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      row[header] = value;
      
      // Check if value is missing
      if (value === '' || value === undefined || value === null) {
        result.dataOverview.missingValues++;
      }
    });
    
    return row;
  });
  
  // Analyze column types
  const columnTypes: Record<string, string> = {};
  const columnValues: Record<string, any[]> = {};
  
  headers.forEach(header => {
    columnValues[header] = dataRows.map(row => row[header]).filter(val => val !== '' && val !== undefined && val !== null);
    
    // Check if column is numeric
    const numericValues = columnValues[header].filter(val => !isNaN(parseFloat(val)) && isFinite(Number(val))).length;
    const percentNumeric = numericValues / (columnValues[header].length || 1);
    
    // Check if column is date
    const datePattern = /^\d{4}[-/](0?[1-9]|1[012])[-/](0?[1-9]|[12][0-9]|3[01])$|^(0?[1-9]|1[012])[-/](0?[1-9]|[12][0-9]|3[01])[-/]\d{4}$/;
    const dateValues = columnValues[header].filter(val => datePattern.test(val)).length;
    const percentDate = dateValues / (columnValues[header].length || 1);
    
    // Determine column type
    if (percentNumeric > 0.7) {
      columnTypes[header] = 'numeric';
      result.columnData.numeric.push(header);
      result.dataOverview.numericColumns++;
    } else if (percentDate > 0.7) {
      columnTypes[header] = 'date';
      result.columnData.date.push(header);
    } else if (columnValues[header].length > 0) {
      const uniqueValues = new Set(columnValues[header]);
      if (uniqueValues.size <= Math.min(10, columnValues[header].length * 0.2)) {
        columnTypes[header] = 'categorical';
        result.columnData.categorical.push(header);
        result.dataOverview.categoricalColumns++;
      } else {
        columnTypes[header] = 'text';
        result.columnData.text.push(header);
      }
    }
  });
  
  // Extract chart data based on column types
  if (result.columnData.categorical.length > 0 && result.columnData.numeric.length > 0) {
    const categoryCol = result.columnData.categorical[0];
    const valueCol = result.columnData.numeric[0];
    
    // Group data for bar chart
    const catValueMap: Record<string, number> = {};
    dataRows.forEach(row => {
      const category = row[categoryCol];
      const value = parseFloat(row[valueCol]);
      if (category && !isNaN(value)) {
        if (catValueMap[category]) {
          catValueMap[category] += value;
        } else {
          catValueMap[category] = value;
        }
      }
    });
    
    result.chartData.treatmentTypeData = Object.entries(catValueMap).map(([name, value]) => ({
      name,
      value
    })).slice(0, 10); // Limit to top 10 categories
  }
  
  // Create time series data if we have date columns
  if (result.columnData.date.length > 0 && result.columnData.numeric.length > 0) {
    const dateCol = result.columnData.date[0];
    const valueCol = result.columnData.numeric[0];
    
    // Group data by date
    const dateValueMap: Record<string, number> = {};
    dataRows.forEach(row => {
      const date = row[dateCol];
      const value = parseFloat(row[valueCol]);
      if (date && !isNaN(value)) {
        if (dateValueMap[date]) {
          dateValueMap[date] += value;
        } else {
          dateValueMap[date] = value;
        }
      }
    });
    
    result.chartData.monthlyTrendData = Object.entries(dateValueMap).map(([name, value]) => ({
      name,
      value
    })).slice(0, 12); // Limit to 12 time points
  }
  
  // Check for duplicates
  const uniqueRows = new Set(lines.slice(1).map(line => line.trim()));
  result.dataOverview.duplicates = lines.length - 1 - uniqueRows.size;
  
  // Process KPI data if relevant columns exist
  if (headers.includes('kpi_title') && headers.includes('kpi_value') && headers.includes('kpi_change')) {
    const kpiRows = dataRows.filter(row => row.kpi_title && row.kpi_value !== undefined);
    result.kpiData = kpiRows.map(row => ({
      title: row.kpi_title,
      value: row.kpi_value,
      change: parseFloat(row.kpi_change || '0'),
      isPositive: parseFloat(row.kpi_change || '0') >= 0
    }));
  }
  
  return result;
};

// Process JSON data
export const processJSON = (content: any): any => {
  try {
    const result: Record<string, any> = {
      kpiData: content.kpiData || [],
      chartData: {
        treatmentTypeData: content.treatmentTypeData || content.chartData?.treatmentTypeData || [],
        monthlyTrendData: content.monthlyTrendData || content.chartData?.monthlyTrendData || [],
        riskMatrixData: content.riskMatrixData || content.chartData?.riskMatrixData || [],
        trafficHeatmapData: content.trafficHeatmapData || content.chartData?.trafficHeatmapData || []
      },
      dataOverview: content.dataOverview || {
        totalRows: 0,
        totalColumns: 0,
        missingValues: 0,
        duplicates: 0,
        numericColumns: 0,
        categoricalColumns: 0
      },
      mlModelMetrics: content.mlModelMetrics || null
    };
    
    return result;
  } catch (error) {
    console.error('Error processing JSON:', error);
    throw new Error('Invalid JSON format');
  }
};

// Process Excel data (requires external library, using a stub for now)
export const processExcel = (content: ArrayBuffer): any => {
  throw new Error('Excel processing not implemented - Please use CSV or JSON format');
};

// Main function to process uploaded files
export const processUploadedFile = async (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const fileType = file.name.split('.').pop()?.toLowerCase();
    
    reader.onload = (event) => {
      try {
        if (!event.target?.result) {
          return reject('File read error');
        }
        
        let result;
        
        switch (fileType) {
          case 'csv':
            result = processCSV(event.target.result as string);
            break;
          case 'json':
            const jsonData = JSON.parse(event.target.result as string);
            result = processJSON(jsonData);
            break;
          case 'xlsx':
          case 'xls':
            result = processExcel(event.target.result as ArrayBuffer);
            break;
          default:
            return reject(`Unsupported file type: ${fileType}`);
        }
        
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject('File read error');
    };
    
    if (fileType === 'json' || fileType === 'csv' || fileType === 'txt') {
      reader.readAsText(file);
    } else if (fileType === 'xlsx' || fileType === 'xls') {
      reader.readAsArrayBuffer(file);
    } else {
      reject(`Unsupported file type: ${fileType}`);
    }
  });
};
