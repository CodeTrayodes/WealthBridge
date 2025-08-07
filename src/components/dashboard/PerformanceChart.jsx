// src/components/dashboard/PerformanceChart.jsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  MoreHorizontal,
  Target,
  Zap,
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, StatusBadge } from '@/components/ui';


const PerformanceChart = ({ data, period, isBalanceVisible }) => {
  const [selectedMetric, setSelectedMetric] = useState('portfolio');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Mock performance data for different periods
  const performanceData = {
    '1D': [
      { date: '09:30', portfolio: 2965000, benchmark: 2960000, equity: 1850000, mf: 750000 },
      { date: '11:00', portfolio: 2968000, benchmark: 2962000, equity: 1852000, mf: 751000 },
      { date: '12:30', portfolio: 2970000, benchmark: 2963000, equity: 1854000, mf: 752000 },
      { date: '14:00', portfolio: 2968500, benchmark: 2961500, equity: 1851500, mf: 751500 },
      { date: '15:30', portfolio: 2972000, benchmark: 2965000, equity: 1856000, mf: 754000 }
    ],
    '1W': [
      { date: 'Mon', portfolio: 2950000, benchmark: 2945000, equity: 1840000, mf: 745000 },
      { date: 'Tue', portfolio: 2955000, benchmark: 2948000, equity: 1845000, mf: 747000 },
      { date: 'Wed', portfolio: 2962000, benchmark: 2952000, equity: 1850000, mf: 749000 },
      { date: 'Thu', portfolio: 2968000, benchmark: 2958000, equity: 1852000, mf: 751000 },
      { date: 'Fri', portfolio: 2972000, benchmark: 2965000, equity: 1856000, mf: 754000 }
    ],
    '1M': [
      { date: 'Week 1', portfolio: 2850000, benchmark: 2840000, equity: 1780000, mf: 720000 },
      { date: 'Week 2', portfolio: 2885000, benchmark: 2870000, equity: 1800000, mf: 730000 },
      { date: 'Week 3', portfolio: 2920000, benchmark: 2905000, equity: 1825000, mf: 740000 },
      { date: 'Week 4', portfolio: 2972000, benchmark: 2965000, equity: 1856000, mf: 754000 }
    ],
    '3M': [
      { date: 'Oct', portfolio: 2750000, benchmark: 2730000, equity: 1720000, mf: 700000 },
      { date: 'Nov', portfolio: 2820000, benchmark: 2800000, equity: 1760000, mf: 715000 },
      { date: 'Dec', portfolio: 2890000, benchmark: 2870000, equity: 1810000, mf: 735000 },
      { date: 'Jan', portfolio: 2972000, benchmark: 2965000, equity: 1856000, mf: 754000 }
    ],
    '6M': [
      { date: 'Aug', portfolio: 2650000, benchmark: 2620000, equity: 1650000, mf: 680000 },
      { date: 'Sep', portfolio: 2700000, benchmark: 2680000, equity: 1690000, mf: 690000 },
      { date: 'Oct', portfolio: 2750000, benchmark: 2730000, equity: 1720000, mf: 700000 },
      { date: 'Nov', portfolio: 2820000, benchmark: 2800000, equity: 1760000, mf: 715000 },
      { date: 'Dec', portfolio: 2890000, benchmark: 2870000, equity: 1810000, mf: 735000 },
      { date: 'Jan', portfolio: 2972000, benchmark: 2965000, equity: 1856000, mf: 754000 }
    ],
    '1Y': [
      { date: 'Q1 24', portfolio: 2400000, benchmark: 2380000, equity: 1500000, mf: 600000 },
      { date: 'Q2 24', portfolio: 2520000, benchmark: 2500000, equity: 1580000, mf: 630000 },
      { date: 'Q3 24', portfolio: 2680000, benchmark: 2660000, equity: 1670000, mf: 680000 },
      { date: 'Q4 24', portfolio: 2850000, benchmark: 2830000, equity: 1780000, mf: 720000 },
      { date: 'Q1 25', portfolio: 2972000, benchmark: 2965000, equity: 1856000, mf: 754000 }
    ],
    'ALL': [
      { date: '2020', portfolio: 1800000, benchmark: 1750000, equity: 1100000, mf: 450000 },
      { date: '2021', portfolio: 2100000, benchmark: 2050000, equity: 1300000, mf: 520000 },
      { date: '2022', portfolio: 2200000, benchmark: 2180000, equity: 1350000, mf: 550000 },
      { date: '2023', portfolio: 2600000, benchmark: 2580000, equity: 1600000, mf: 650000 },
      { date: '2024', portfolio: 2850000, benchmark: 2830000, equity: 1780000, mf: 720000 },
      { date: '2025', portfolio: 2972000, benchmark: 2965000, equity: 1856000, mf: 754000 }
    ]
  };

  const currentData = performanceData[period] || performanceData['1Y'];
  
  const metrics = [
    { 
      id: 'portfolio', 
      name: 'Total Portfolio', 
      color: '#3b82f6',
      gradient: 'from-bs-blue-500 to-bs-blue-600' 
    },
    { 
      id: 'benchmark', 
      name: 'Benchmark (Nifty 50)', 
      color: '#6b7280',
      gradient: 'from-gray-500 to-gray-600' 
    },
    { 
      id: 'equity', 
      name: 'Equity Holdings', 
      color: '#a855f7',
      gradient: 'from-bs-purple-500 to-bs-purple-600' 
    },
    { 
      id: 'mf', 
      name: 'Mutual Funds', 
      color: '#10b981',
      gradient: 'from-emerald-500 to-emerald-600' 
    }
  ];

  const formatCurrency = (amount) => {
    if (!isBalanceVisible) return '****';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate chart dimensions and scales
  const chartWidth = 400;
  const chartHeight = 200;
  const padding = 40;

  const getMinMax = (metric) => {
    const values = currentData.map(d => d[metric]);
    return {
      min: Math.min(...values),
      max: Math.max(...values)
    };
  };

  const createPath = (metric) => {
    const { min, max } = getMinMax(metric);
    const xStep = (chartWidth - 2 * padding) / (currentData.length - 1);
    
    return currentData.map((point, index) => {
      const x = padding + index * xStep;
      const y = chartHeight - padding - ((point[metric] - min) / (max - min)) * (chartHeight - 2 * padding);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const createGradientPath = (metric) => {
    const { min, max } = getMinMax(metric);
    const xStep = (chartWidth - 2 * padding) / (currentData.length - 1);
    
    let path = currentData.map((point, index) => {
      const x = padding + index * xStep;
      const y = chartHeight - padding - ((point[metric] - min) / (max - min)) * (chartHeight - 2 * padding);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    path += ` L ${chartWidth - padding} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`;
    return path;
  };

  const getPerformanceStats = () => {
    const first = currentData[0];
    const last = currentData[currentData.length - 1];
    
    const portfolioChange = last.portfolio - first.portfolio;
    const portfolioChangePercent = ((portfolioChange / first.portfolio) * 100);
    
    const benchmarkChange = last.benchmark - first.benchmark;
    const benchmarkChangePercent = ((benchmarkChange / first.benchmark) * 100);
    
    const outperformance = portfolioChangePercent - benchmarkChangePercent;

    return {
      portfolioChange,
      portfolioChangePercent,
      benchmarkChangePercent,
      outperformance
    };
  };

  const stats = getPerformanceStats();

  return (
    <Card variant="elegant">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-bs-blue-400" />
              Performance Analysis
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track your portfolio performance vs benchmark
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        
        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-lg p-4 border border-emerald-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Portfolio Return</span>
              <ArrowUp className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(stats.portfolioChange)}
              </p>
              <StatusBadge value={stats.portfolioChangePercent} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-bs-blue-500/10 to-bs-blue-500/5 rounded-lg p-4 border border-bs-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Benchmark Return</span>
              <Activity className="w-3 h-3 text-bs-blue-400" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-foreground">
                {stats.benchmarkChangePercent.toFixed(2)}%
              </p>
              <Badge variant="secondary" size="sm">Nifty 50</Badge>
            </div>
          </div>

          <div className="bg-gradient-to-br from-bs-purple-500/10 to-bs-purple-500/5 rounded-lg p-4 border border-bs-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Outperformance</span>
              <Zap className="w-3 h-3 text-bs-purple-400" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-foreground">
                {stats.outperformance >= 0 ? '+' : ''}{stats.outperformance.toFixed(2)}%
              </p>
              <Badge 
                variant={stats.outperformance >= 0 ? "success" : "destructive"} 
                size="sm"
              >
                {stats.outperformance >= 0 ? 'Beating' : 'Trailing'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Chart Legend */}
        <div className="flex flex-wrap gap-4">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedMetric === metric.id
                  ? 'bg-gradient-to-r from-bs-blue-500/20 to-bs-purple-500/10 border border-bs-blue-500/30'
                  : 'hover:bg-background/50'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: metric.color }}
              />
              <span className="text-muted-foreground">{metric.name}</span>
            </button>
          ))}
        </div>

        {/* Chart Container */}
        <div className="relative bg-background/30 rounded-lg p-4 overflow-hidden">
          <svg 
            width={chartWidth} 
            height={chartHeight} 
            className="w-full h-auto"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          >
            {/* Grid Lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(75, 85, 99, 0.1)" strokeWidth="1"/>
              </pattern>
              
              {/* Gradients for filled areas */}
              {metrics.map((metric) => (
                <linearGradient key={metric.id} id={`gradient-${metric.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={metric.color} stopOpacity="0.3"/>
                  <stop offset="100%" stopColor={metric.color} stopOpacity="0.05"/>
                </linearGradient>
              ))}
            </defs>
            
            <rect width={chartWidth} height={chartHeight} fill="url(#grid)" />

            {/* Chart Lines */}
            {metrics.map((metric, index) => (
              <g key={metric.id}>
                {/* Filled area */}
                <motion.path
                  d={createGradientPath(metric.id)}
                  fill={`url(#gradient-${metric.id})`}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: selectedMetric === metric.id ? 1 : 0.3
                  }}
                  transition={{ delay: index * 0.1 }}
                />
                
                {/* Line */}
                <motion.path
                  d={createPath(metric.id)}
                  stroke={metric.color}
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: 1,
                    opacity: selectedMetric === metric.id ? 1 : 0.5
                  }}
                  transition={{ 
                    pathLength: { delay: index * 0.1, duration: 1 },
                    opacity: { duration: 0.3 }
                  }}
                />
              </g>
            ))}

            {/* Data Points */}
            {currentData.map((point, index) => {
              const xStep = (chartWidth - 2 * padding) / (currentData.length - 1);
              const x = padding + index * xStep;
              
              return metrics.map((metric) => {
                const { min, max } = getMinMax(metric.id);
                const y = chartHeight - padding - ((point[metric.id] - min) / (max - min)) * (chartHeight - 2 * padding);
                
                return (
                  <motion.circle
                    key={`${metric.id}-${index}`}
                    cx={x}
                    cy={y}
                    r={selectedMetric === metric.id ? "4" : "2"}
                    fill={metric.color}
                    className="cursor-pointer"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onMouseEnter={() => setHoveredPoint({ point, metric: metric.id, x, y })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                );
              });
            })}

            {/* X-axis labels */}
            {currentData.map((point, index) => {
              const xStep = (chartWidth - 2 * padding) / (currentData.length - 1);
              const x = padding + index * xStep;
              
              return (
                <text
                  key={index}
                  x={x}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  className="text-xs fill-gray-400"
                >
                  {point.date}
                </text>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hoveredPoint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute bg-card border border-border/50 rounded-lg p-3 pointer-events-none z-10 shadow-lg"
              style={{
                left: hoveredPoint.x - 60,
                top: hoveredPoint.y - 80
              }}
            >
              <p className="text-sm font-medium text-foreground">
                {hoveredPoint.point.date}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(hoveredPoint.point[hoveredPoint.metric])}
              </p>
            </motion.div>
          )}
        </div>

        {/* Quick Insights */}
        <div className="bg-gradient-to-r from-bs-blue-500/5 to-bs-purple-500/5 rounded-lg p-4 border border-bs-blue-500/10">
          <h4 className="font-semibold text-foreground mb-3 flex items-center">
            <Target className="w-4 h-4 mr-2 text-bs-blue-400" />
            Performance Insights
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Best performing asset</p>
              <div className="flex items-center space-x-2">
                <Badge variant="success" size="sm">Equity</Badge>
                <span className="text-foreground">+8.4%</span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Volatility</p>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" size="sm">Moderate</Badge>
                <span className="text-foreground">12.3%</span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Sharpe Ratio</p>
              <div className="flex items-center space-x-2">
                <Badge variant="success" size="sm">Excellent</Badge>
                <span className="text-foreground">1.8</span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Max Drawdown</p>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" size="sm">Controlled</Badge>
                <span className="text-foreground">-8.2%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;