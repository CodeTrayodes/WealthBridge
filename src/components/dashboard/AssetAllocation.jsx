// src/components/dashboard/AssetAllocation.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  TrendingUp,
  Building,
  Landmark,
  Target,
  Wallet,
  MoreHorizontal,
  Info,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, StatusBadge } from "@/components/ui/Badge";

const AssetAllocation = ({ data, isBalanceVisible }) => {
  const [selectedAsset, setSelectedAsset] = useState(null);

  const allocationData = [
    {
      id: "equity",
      name: "Equity",
      value: 1850000,
      percentage: 62.5,
      change: 8.4,
      color: "#3b82f6",
      gradient: "from-bs-blue-500 to-bs-blue-600",
      icon: TrendingUp,
      description: "Direct stocks and equity investments",
      holdings: 25,
      subCategories: [
        { name: "Large Cap", percentage: 45, value: 832500 },
        { name: "Mid Cap", percentage: 35, value: 647500 },
        { name: "Small Cap", percentage: 20, value: 370000 },
      ],
    },
    {
      id: "mutual-funds",
      name: "Mutual Funds",
      value: 750000,
      percentage: 25.3,
      change: 6.2,
      color: "#a855f7",
      gradient: "from-bs-purple-500 to-bs-purple-600",
      icon: PieChart,
      description: "Diversified mutual fund investments",
      holdings: 12,
      subCategories: [
        { name: "Equity Funds", percentage: 60, value: 450000 },
        { name: "Debt Funds", percentage: 25, value: 187500 },
        { name: "Hybrid Funds", percentage: 15, value: 112500 },
      ],
    },
    {
      id: "fixed-deposits",
      name: "Fixed Deposits",
      value: 300000,
      percentage: 10.1,
      change: 5.8,
      color: "#10b981",
      gradient: "from-emerald-500 to-emerald-600",
      icon: Landmark,
      description: "Bank FDs and government bonds",
      holdings: 5,
      subCategories: [
        { name: "Bank FDs", percentage: 70, value: 210000 },
        { name: "Government Bonds", percentage: 30, value: 90000 },
      ],
    },
    {
      id: "real-estate",
      name: "Real Estate",
      value: 65000,
      percentage: 2.1,
      change: -2.1,
      color: "#f59e0b",
      gradient: "from-amber-500 to-amber-600",
      icon: Building,
      description: "REITs and property investments",
      holdings: 2,
      subCategories: [
        { name: "REITs", percentage: 80, value: 52000 },
        { name: "Property Funds", percentage: 20, value: 13000 },
      ],
    },
  ];

  const totalValue = allocationData.reduce((sum, item) => sum + item.value, 0);

  const formatCurrency = (amount) => {
    if (!isBalanceVisible) return "****";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Create SVG pie chart data
  const createPieData = () => {
    let cumulativePercentage = 0;
    return allocationData.map((item) => {
      const startAngle = cumulativePercentage * 360;
      const endAngle = startAngle + (item.percentage * 360) / 100;

      const result = {
        ...item,
        startAngle,
        endAngle,
        pathData: createArcPath(50, 50, 35, startAngle, endAngle),
      };

      cumulativePercentage += item.percentage / 100;
      return result;
    });
  };

  const createArcPath = (centerX, centerY, radius, startAngle, endAngle) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      centerX,
      centerY,
      "L",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "Z",
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const pieData = createPieData();

  return (
    <Card variant="elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-bs-blue-400" />
              Asset Allocation
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Portfolio distribution across asset classes
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Pie Chart */}
        <div className="relative flex justify-center">
          <div className="relative w-64 h-64">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full transform -rotate-90"
            >
              {pieData.map((item, index) => (
                <motion.path
                  key={item.id}
                  d={item.pathData}
                  fill={item.color}
                  className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
                  onClick={() =>
                    setSelectedAsset(selectedAsset === item.id ? null : item.id)
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    filter:
                      selectedAsset === item.id ? "brightness(1.2)" : "none",
                  }}
                />
              ))}
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(totalValue)}
              </p>
              <Badge variant="success" size="sm" className="mt-1">
                +12.4%
              </Badge>
            </div>
          </div>
        </div>

        {/* Asset List */}
        <div className="space-y-3">
          {allocationData.map((asset, index) => {
            const IconComponent = asset.icon;
            const isSelected = selectedAsset === asset.id;

            return (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group rounded-lg p-4 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-bs-blue-500/10 to-bs-purple-500/5 border border-bs-blue-500/30"
                    : "bg-background/30 hover:bg-background/50"
                }`}
                onClick={() => setSelectedAsset(isSelected ? null : asset.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full`}
                      style={{ backgroundColor: asset.color }}
                    />
                    <div
                      className={`w-8 h-8 bg-gradient-to-br ${asset.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {asset.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {asset.holdings} holdings
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <div>
                        <p className="font-semibold text-foreground">
                          {asset.percentage}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(asset.value)}
                        </p>
                      </div>
                      <StatusBadge value={asset.change} />
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-border/50"
                  >
                    <p className="text-sm text-muted-foreground mb-3">
                      {asset.description}
                    </p>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">
                        Breakdown:
                      </p>
                      {asset.subCategories.map((sub, subIndex) => (
                        <div
                          key={subIndex}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {sub.name}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-foreground">
                              {sub.percentage}%
                            </span>
                            <span className="text-muted-foreground">
                              {formatCurrency(sub.value)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 text-bs-blue-400"
                    >
                      View Details <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Allocation Analysis */}
        <div className="bg-gradient-to-r from-bs-blue-500/5 to-bs-purple-500/5 rounded-lg p-4 border border-bs-blue-500/10">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-bs-blue-500 to-bs-purple-500 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-2">
                Allocation Analysis
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Risk Level</p>
                  <Badge variant="secondary" size="sm">
                    Moderate-High
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Diversification</p>
                  <Badge variant="success" size="sm">
                    Excellent
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Rebalancing</p>
                  <Badge variant="secondary" size="sm">
                    Due in Q2
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Tax Efficiency</p>
                  <Badge variant="success" size="sm">
                    Optimized
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col space-y-2">
          <Button variant="outline" size="sm" className="w-full">
            <div className="flex">
              <Target className="w-4 h-4 mr-2" />
              Rebalance Portfolio
            </div>
          </Button>
          <Button variant="ghost" size="sm" className="w-full text-bs-blue-400">
            Download Allocation Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetAllocation;
