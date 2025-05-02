
// Mock KPI data
export const kpiData = [
  { title: "Patients", value: "1,294", change: 12.3, isPositive: true },
  { title: "Avg. Age", value: "42.5", change: 2.1, isPositive: true },
  { title: "Recovery", value: "84%", change: 5.2, isPositive: true },
  { title: "Readmission", value: "12%", change: 3.1, isPositive: false },
  { title: "Occupancy", value: "76%", change: 8.4, isPositive: true },
  { title: "Satisfaction", value: "4.8/5", change: 4.3, isPositive: true },
  { title: "Revenue", value: "$1.2M", change: 10.8, isPositive: true }
];

// Mock chart data
export const treatmentTypeData = [
  { name: "Medication", value: 423 },
  { name: "Surgery", value: 212 },
  { name: "Physical Therapy", value: 354 },
  { name: "Radiation", value: 148 },
  { name: "Immunotherapy", value: 276 },
  { name: "Preventive Care", value: 321 }
];

export const ChartData = treatmentTypeData;

export const monthlyTrendData = [
  { name: "Jan", value: 142 },
  { name: "Feb", value: 165 },
  { name: "Mar", value: 187 },
  { name: "Apr", value: 214 },
  { name: "May", value: 253 },
  { name: "Jun", value: 289 },
  { name: "Jul", value: 312 },
  { name: "Aug", value: 298 },
  { name: "Sep", value: 276 },
  { name: "Oct", value: 243 },
  { name: "Nov", value: 218 },
  { name: "Dec", value: 196 }
];

export const LineChartData = monthlyTrendData;

export const satisfactionScoreData = [
  { name: "Very Satisfied", value: 56 },
  { name: "Satisfied", value: 28 },
  { name: "Neutral", value: 10 },
  { name: "Unsatisfied", value: 4 },
  { name: "Very Unsatisfied", value: 2 }
];

export const trafficChannelsData = [
  { name: "Direct", value: 45 },
  { name: "Referral", value: 23 },
  { name: "Social", value: 18 },
  { name: "Search", value: 14 }
];

// Heatmap data
export const riskMatrixData = [
  { riskLevel: "Almost Certain", impact: "Insignificance", count: 2 },
  { riskLevel: "Almost Certain", impact: "Minor", count: 3 },
  { riskLevel: "Almost Certain", impact: "Moderate", count: 4 },
  { riskLevel: "Almost Certain", impact: "Major", count: 5 },
  { riskLevel: "Almost Certain", impact: "Extreme", count: 5 },
  { riskLevel: "Likely", impact: "Insignificance", count: 2 },
  { riskLevel: "Likely", impact: "Minor", count: 3 },
  { riskLevel: "Likely", impact: "Moderate", count: 4 },
  { riskLevel: "Likely", impact: "Major", count: 5 },
  { riskLevel: "Likely", impact: "Extreme", count: 4 },
  { riskLevel: "Possible", impact: "Insignificance", count: 1 },
  { riskLevel: "Possible", impact: "Minor", count: 2 },
  { riskLevel: "Possible", impact: "Moderate", count: 3 },
  { riskLevel: "Possible", impact: "Major", count: 4 },
  { riskLevel: "Possible", impact: "Extreme", count: 3 },
  { riskLevel: "Unlikely", impact: "Insignificance", count: 0 },
  { riskLevel: "Unlikely", impact: "Minor", count: 1 },
  { riskLevel: "Unlikely", impact: "Moderate", count: 2 },
  { riskLevel: "Unlikely", impact: "Major", count: 3 },
  { riskLevel: "Unlikely", impact: "Extreme", count: 2 },
  { riskLevel: "Rare", impact: "Insignificance", count: 0 },
  { riskLevel: "Rare", impact: "Minor", count: 0 },
  { riskLevel: "Rare", impact: "Moderate", count: 1 },
  { riskLevel: "Rare", impact: "Major", count: 2 },
  { riskLevel: "Rare", impact: "Extreme", count: 1 }
];

export const HeatmapData = riskMatrixData;

// Traffic heatmap data (day, hour, intensity)
export const trafficHeatmapData = [
  [0, 0, 2], // Monday morning
  [0, 1, 3], // Monday noon
  [0, 2, 4], // Monday afternoon
  [0, 3, 3], // Monday evening
  [0, 4, 1], // Monday night
  [1, 0, 1], // Tuesday morning
  [1, 1, 2], // Tuesday noon
  [1, 2, 5], // Tuesday afternoon
  [1, 3, 4], // Tuesday evening
  [1, 4, 0], // Tuesday night
  [2, 0, 3], // Wednesday morning
  [2, 1, 4], // Wednesday noon
  [2, 2, 5], // Wednesday afternoon
  [2, 3, 2], // Wednesday evening
  [2, 4, 1], // Wednesday night
  [3, 0, 4], // Thursday morning
  [3, 1, 5], // Thursday noon
  [3, 2, 3], // Thursday afternoon
  [3, 3, 2], // Thursday evening
  [3, 4, 0], // Thursday night
  [4, 0, 2], // Friday morning
  [4, 1, 3], // Friday noon
  [4, 2, 4], // Friday afternoon
  [4, 3, 5], // Friday evening
  [4, 4, 2]  // Friday night
];

// Data overview statistics
export const dataOverview = {
  totalRows: 12584,
  totalColumns: 32,
  missingValues: 423,
  duplicates: 87,
  numericColumns: 18,
  categoricalColumns: 14
};

// ML model metrics
export const mlModelMetrics = {
  regression: {
    target: "Patient Length of Stay",
    rmse: 1.24,
    r2: 0.83,
    mape: 0.112
  },
  classification: {
    target: "Readmission Risk",
    accuracy: 0.88,
    precision: 0.85,
    recall: 0.82,
    f1Score: 0.835
  }
};
