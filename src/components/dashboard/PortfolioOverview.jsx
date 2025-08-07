// src/components/dashboard/PortfolioOverview.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  Calendar,
  Filter,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  Percent
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, StatusBadge } from '@/components/ui';


const PortfolioOverview = ({ 
  portfolioData, 
  selectedPeriod, 
  onPeriodChange, 
  isBalanceVisible 
}) => {
  const periods = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1Y', value: '1Y' },
    { label: 'All', value: 'ALL' }
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

  const assetBreakdown = [
    {
      name: 'Equity',
      value: 1850000,
      allocation: 62.5,
      change: 8.4,
      color: 'from-bs-blue-500 to-bs-blue-600',
      icon: TrendingUp
    },
    {
      name: 'Mutual Funds',
      value: 750000,
      allocation: 25.3,
      change: 6.2,
      color: 'from-bs-purple-500 to-bs-purple-600',
      icon: PieChart
    },
    {
      name: 'Fixed Deposits',
      value: 300000,
      allocation: 10.1,
      change: 5.8,
      color: 'from-emerald-500 to-emerald-600',
      icon: BarChart3
    },
    {
      name: 'Real Estate',
      value: 65000,
      allocation: 2.1,
      change: -2.1,
      color: 'from-amber-500 to-amber-600',
      icon: Target
    }
  ];

  const recentPerformance = {
    '1D': { return: 2850, percentage: 0.12 },
    '1W': { return: 18500, percentage: 0.78 },
    '1M': { return: 95000, percentage: 3.2 },
    '3M': { return: 185000, percentage: 6.4 },
    '6M': { return: 275000, percentage: 9.8 },
    '1Y': { return: 420000, percentage: 16.5 },
    'ALL': { return: 1250000, percentage: 42.3 }
  };

  const currentPerformance = recentPerformance[selectedPeriod];

  return (
    <Card variant="elegant" className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-bs-blue-400" />
              Portfolio Overview
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track your investment performance across all asset classes
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex bg-background/50 rounded-lg p-1">
              {periods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => onPeriodChange(period.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    selectedPeriod === period.value
                      ? 'bg-gradient-to-r from-bs-blue-500 to-bs-purple-500 text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/80'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
            
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-bs-blue-500/10 to-bs-purple-500/5 rounded-lg p-4 border border-bs-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Period Return</span>
              <div className="flex items-center">
                {currentPerformance.percentage >= 0 ? (
                  <ArrowUp className="w-3 h-3 text-emerald-400" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-red-400" />
                )}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(currentPerformance.return)}
              </p>
              <StatusBadge value={currentPerformance.percentage} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-lg p-4 border border-emerald-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Best Performer</span>
              <TrendingUp className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-foreground">Equity</p>
              <Badge variant="success" size="sm">+8.4%</Badge>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-lg p-4 border border-amber-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Diversification</span>
              <PieChart className="w-3 h-3 text-amber-400" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-foreground">Excellent</p>
              <Badge variant="secondary" size="sm">4 Asset Classes</Badge>
            </div>
          </div>
        </div>

        {/* Asset Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-foreground">Asset Breakdown</h4>
            <Button variant="ghost" size="sm" className="text-bs-blue-400">
              View Details
            </Button>
          </div>

          <div className="space-y-3">
            {assetBreakdown.map((asset, index) => {
              const IconComponent = asset.icon;
              return (
                <motion.div
                  key={asset.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-background/30 rounded-lg p-4 hover:bg-background/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${asset.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{asset.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {asset.allocation}% allocation
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        {formatCurrency(asset.value)}
                      </p>
                      <StatusBadge value={asset.change} />
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-background/50 rounded-full h-2">
                      <motion.div
                        className={`h-2 bg-gradient-to-r ${asset.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${asset.allocation}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="bg-gradient-to-r from-bs-blue-500/5 to-bs-purple-500/5 rounded-lg p-4 border border-bs-blue-500/10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-bs-blue-400" />
              This Month's Summary
            </h4>
            <Badge variant="hero" size="sm">January 2025</Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Invested</p>
              <p className="text-lg font-bold text-foreground">{formatCurrency(125000)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Returns</p>
              <p className="text-lg font-bold text-emerald-400">{formatCurrency(18500)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Dividends</p>
              <p className="text-lg font-bold text-bs-blue-400">{formatCurrency(3200)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Tax Saved</p>
              <p className="text-lg font-bold text-amber-400">{formatCurrency(15600)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioOverview;