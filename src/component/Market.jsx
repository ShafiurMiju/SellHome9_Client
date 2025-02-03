import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Data generation functions
const generateData = (baseValue, propertyType, variance = 0.2) => {
  const years = 5;
  const dataPoints = years * 12;
  return Array.from({ length: dataPoints }, (_, i) => {
    const date = new Date(2020, i);
    const randomFactor = 1 + (Math.random() * variance - variance / 2);
    let value = baseValue * randomFactor;
    
    switch (propertyType) {
      case 'single': value *= 1.2; break;
      case 'condo': value *= 0.8; break;
      case 'townhouse': value *= 0.9; break;
      case 'multi': value *= 1.5; break;
      default: break;
    }
    
    return {
      date: date.toISOString().slice(0, 7),
      value: Math.round(value)
    };
  });
};

const generateAllData = () => {
  const propertyTypes = ['all', 'single', 'condo', 'townhouse', 'multi'];
  const metrics = {
    medianPrice: { base: 742500, variance: 0.3 },
    homesSold: { base: 20, variance: 0.5 },
    daysOnMarket: { base: 152.5, variance: 0.4 }
  };

  const data = {};
  propertyTypes.forEach(propType => {
    data[propType] = {
      medianPrice: generateData(metrics.medianPrice.base, propType, metrics.medianPrice.variance),
      homesSold: generateData(metrics.homesSold.base, propType, metrics.homesSold.variance),
      daysOnMarket: generateData(metrics.daysOnMarket.base, propType, metrics.daysOnMarket.variance)
    };
  });
  return data;
};

const allData = generateAllData();

const propertyTypes = [
  { value: 'all', label: 'All Residential' },
  { value: 'single', label: 'Single Family Residential' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'multi', label: 'Multi Family' },
];

// Demographic data
const demographicData = {
  age: [
    { label: 'Under 20', value: 20.60 },
    { label: '20s', value: 17.60 },
    { label: '30s', value: 18.50 },
    { label: '40s', value: 13.80 },
    { label: '50s', value: 13.40 },
    { label: '60s', value: 9.50 },
    { label: '70s', value: 4.40 },
    { label: 'Over 80', value: 2.10 }
  ],
  education: [
    { label: 'High School', value: 25.0 },
    { label: 'Some College', value: 30.0 },
    { label: "Bachelor's", value: 28.0 },
    { label: 'Graduate', value: 17.0 }
  ],
  employment: [
    { label: 'Full-time', value: 45.0 },
    { label: 'Part-time', value: 15.0 },
    { label: 'Self-employed', value: 10.0 },
    { label: 'Unemployed', value: 8.0 },
    { label: 'Retired', value: 22.0 }
  ]
};

const HomeSalesStats = () => {
    const locations = {
      zip: {
        code: '10026',
        label: 'ZIP',
        stats: {
          medianPrice: 742500,
          medianPriceSqFt: 928,
          daysOnMarket: 152.5,
          saleToList: 98.77,
          listedHomes: 61,
          soldHomes: 20
        }
      },
      city: {
        code: 'New York, NY',
        label: 'City',
        stats: {
          medianPrice: 770000,
          medianPriceSqFt: 561,
          daysOnMarket: 63,
          saleToList: 97.70,
          listedHomes: 4726,
          soldHomes: 2322
        }
      },
      county: {
        code: '--',
        label: 'County',
        stats: {
          medianPrice: '--',
          medianPriceSqFt: '--',
          daysOnMarket: '--',
          saleToList: 'NaN',
          listedHomes: '--',
          soldHomes: '--'
        }
      }
    };
  
    const StatCard = ({ location, label, stats }) => (
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="space-y-1">
          <div className="text-xl font-semibold">{location}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xl font-bold">
              {typeof stats.medianPrice === 'number' 
                ? `$${stats.medianPrice.toLocaleString()}` 
                : stats.medianPrice}
            </div>
            <div className="text-sm text-gray-500">Median Sale Price</div>
          </div>
          <div>
            <div className="text-xl font-bold">
              {typeof stats.medianPriceSqFt === 'number' 
                ? `$${stats.medianPriceSqFt}` 
                : stats.medianPriceSqFt}
            </div>
            <div className="text-sm text-gray-500">Median $ / SqFt</div>
          </div>
          <div>
            <div className="text-xl font-bold">{stats.daysOnMarket}</div>
            <div className="text-sm text-gray-500">Median Days on Mkt.</div>
          </div>
          <div>
            <div className="text-xl font-bold">
              {typeof stats.saleToList === 'number' 
                ? `${stats.saleToList}%` 
                : stats.saleToList}
            </div>
            <div className="text-sm text-gray-500">Median Sale-to-List</div>
          </div>
          <div>
            <div className="text-xl font-bold">{stats.listedHomes}</div>
            <div className="text-sm text-gray-500"># Listed Homes</div>
          </div>
          <div>
            <div className="text-xl font-bold">{stats.soldHomes}</div>
            <div className="text-sm text-gray-500">Sold Homes</div>
          </div>
        </div>
      </div>
    );
  
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Home Sales (Last 30 Days)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(locations).map(([key, data]) => (
            <StatCard
              key={key}
              location={data.code}
              label={data.label}
              stats={data.stats}
            />
          ))}
        </div>
      </div>
    );
  };
// MarketAnalysis Component
const MarketAnalysis = () => {
  const [metric, setMetric] = useState('medianPrice');
  const [propertyType, setPropertyType] = useState('all');
  const [timeRange, setTimeRange] = useState('3year');

  const filterDataByTimeRange = (data) => {
    const now = new Date();
    const yearOffset = parseInt(timeRange);
    const cutoffDate = new Date(now.setFullYear(now.getFullYear() - yearOffset))
      .toISOString()
      .slice(0, 7);
    return data.filter(item => item.date >= cutoffDate);
  };

  const getMetricData = (metricType = metric, propType = propertyType) => {
    const rawData = allData[propType][metricType];
    return filterDataByTimeRange(rawData);
  };

  const calculatePercentageChange = (data, index) => {
    if (data.length < 2) return 0;
    const currentValue = data[index]?.value;
    const previousValue = data[index - 1]?.value || data[index]?.value;
    return ((currentValue - previousValue) / previousValue) * 100;
  };

  const formatValue = (value, metricType) => {
    switch(metricType) {
      case 'medianPrice':
        return value.toLocaleString();
      case 'homesSold':
        return value.toLocaleString();
      case 'daysOnMarket':
        return `${value.toLocaleString()} days`;
      default:
        return value.toLocaleString();
    }
  };

  const formatTooltip = (value, name, props) => {
    const dataIndex = props.payload.index;
    const data = getMetricData();
    const percentChange = calculatePercentageChange(data, dataIndex);
    // console.log(formatValue(value, metric));
    
    return [
        
      `${formatValue(value, metric)}`,
    //   `\nMonth-over-Month Change: ${percentChange.toFixed(2)}%`,
      `\nYear-over-Year Change: ${calculateYearOverYearChange(data, dataIndex).toFixed(2)}%`
    ].join('');
    
  };

  const calculateYearOverYearChange = (data, currentIndex) => {
    if (!data || currentIndex < 12) return 0;
    const currentValue = data[currentIndex]?.value;
    const yearAgoValue = data[currentIndex - 12]?.value;
    if (!currentValue || !yearAgoValue) return 0;
    return ((currentValue - yearAgoValue) / yearAgoValue) * 100;
  };

  const getMetricStats = (metricType) => {
    const data = getMetricData(metricType);
    const currentValue = data[data.length - 1]?.value || 0;
    const percentageChange = calculatePercentageChange(data, data.length - 1);
    return { currentValue, percentageChange };
  };

  const metricData = getMetricData().map((item, index) => ({
    ...item,
    index
  }));

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-6">
      {/* Metric Tabs */}
      <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'medianPrice', label: 'Median Sales Price' },
          { id: 'homesSold', label: 'Number of Homes Sold' },
          { id: 'daysOnMarket', label: 'Median Days on Market' }
        ].map((tab) => {
          const stats = getMetricStats(tab.id);
          return (
            <button
              key={tab.id}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-colors
                ${metric === tab.id 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-200'
                }`}
              onClick={() => setMetric(tab.id)}
            >
              <div className="font-semibold">{tab.label}</div>
              {metric === tab.id && (
                <>
                  <div className="text-xs mt-1">
                    {formatValue(stats.currentValue, tab.id)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stats.percentageChange > 0 ? '+' : ''}{stats.percentageChange.toFixed(2)}%
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Filters Row */}
      <div className="flex justify-between items-center gap-4">
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-64 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {propertyTypes.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>

        <div className="flex bg-gray-100 p-1 rounded-lg">
          {['1year', '3year', '5year'].map((range) => (
            <button
              key={range}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${timeRange === range 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-200'
                }`}
              onClick={() => setTimeRange(range)}
            >
              {range.replace('year', ' Year')}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metricData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => {
                const [year, month] = date.split('-');
                return `${month}/${year}`;
              }}
              stroke="#6b7280"
            />
            <YAxis 
              tickFormatter={(value) => formatValue(value, metric)}
              stroke="#6b7280"
              orientation="right"
            />
            <Tooltip 
              formatter={formatTooltip}
              labelFormatter={(label) => {
                const [year, month] = label.split('-');
                return `${month}/${year}`;
              }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '8px',
                whiteSpace: 'pre-line'
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Demographics Component
const Demographics = () => {
  const [demographicFilter, setDemographicFilter] = useState('age');
  
  const colors = [
    '#FF1493', '#001F3F', '#008080', '#20B2AA', 
    '#48D1CC', '#8B4513', '#FFA07A', '#4169E1'
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Demographic Information for 10026</h2>
          <select 
            value={demographicFilter}
            onChange={(e) => setDemographicFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="age">Age</option>
            <option value="education">Education</option>
            <option value="employment">Employment Status</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="w-full md:w-1/2">
            {demographicData[demographicFilter].map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span>{item.label}</span>
                </div>
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {item.value.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/2 relative">
            <svg viewBox="0 0 400 400" className="w-full">
              {demographicData[demographicFilter].map((item, index) => {
                const total = demographicData[demographicFilter].reduce((sum, i) => sum + i.value, 0);
                const percentage = (item.value / total) * 100;
                const previousPercentages = demographicData[demographicFilter]
                  .slice(0, index)
                  .reduce((sum, i) => sum + (i.value / total) * 100, 0);
                
                const startAngle = (previousPercentages * 3.6) - 90;
                const endAngle = ((previousPercentages + percentage) * 3.6) - 90;
                
                const startX = Math.cos(startAngle * Math.PI / 180) * 150 + 200;
                const startY = Math.sin(startAngle * Math.PI / 180) * 150 + 200;
                const endX = Math.cos(endAngle * Math.PI / 180) * 150 + 200;
                const endY = Math.sin(endAngle * Math.PI / 180) * 150 + 200;
                
                const largeArcFlag = percentage > 50 ? 1 : 0;
                
                return (
                  <path
                    key={index}
                    d={`
                      M 200 200
                      L ${startX} ${startY}
                      A 150 150 0 ${largeArcFlag} 1 ${endX} ${endY}
                      Z
                    `}
                    fill={colors[index % colors.length]}
                    stroke="white"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// Combined Dashboard Component
const Market = () => {
  return (
    <div className="w-full max-w-6xl space-y-8">
        <HomeSalesStats/>
      <MarketAnalysis />
      <Demographics />
    </div>
  );
};

export default Market;