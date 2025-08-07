// src/components/dashboard/MarketSummary.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Globe,
  ExternalLink,
  RefreshCw,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, StatusBadge } from "@/components/ui";


const MarketSummary = () => {
  const marketData = [
    {
      name: "Sensex",
      value: 79856.75,
      change: 945.32,
      changePercent: 1.2,
      icon: TrendingUp,
      color: "text-emerald-400",
    },
    {
      name: "Nifty 50",
      value: 24213.3,
      change: 218.45,
      changePercent: 0.9,
      icon: TrendingUp,
      color: "text-emerald-400",
    },
    {
      name: "Bank Nifty",
      value: 52348.85,
      change: -156.2,
      changePercent: -0.3,
      icon: TrendingDown,
      color: "text-red-400",
    },
    {
      name: "USD/INR",
      value: 83.45,
      change: -0.08,
      changePercent: -0.1,
      icon: TrendingDown,
      color: "text-red-400",
    },
  ];

  const globalIndices = [
    { name: "S&P 500", value: 5956.25, change: 0.8 },
    { name: "NASDAQ", value: 19485.6, change: 1.2 },
    { name: "FTSE 100", value: 8234.15, change: -0.3 },
    { name: "Nikkei 225", value: 39485.25, change: 0.5 },
  ];

  const commodities = [
    { name: "Gold (₹/10g)", value: 63250, change: 0.5 },
    { name: "Silver (₹/kg)", value: 75800, change: -0.8 },
    { name: "Crude Oil ($/barrel)", value: 78.45, change: 1.2 },
  ];

  return (
    <Card variant="elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center">
            <Globe className="w-5 h-5 mr-2 text-bs-blue-400" />
            Market Summary
          </CardTitle>
          <Button variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Indian Markets */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground flex items-center">
            <Activity className="w-4 h-4 mr-2 text-bs-blue-400" />
            Indian Markets
          </h4>

          {marketData.map((market, index) => {
            const IconComponent = market.icon;
            return (
              <motion.div
                key={market.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-background/30 rounded-lg hover:bg-background/50 transition-colors duration-300"
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className={`w-4 h-4 ${market.color}`} />
                  <div>
                    <p className="font-medium text-foreground">{market.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {market.value.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
                <StatusBadge value={market.changePercent} />
              </motion.div>
            );
          })}
        </div>

        {/* Global Markets */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Global Markets</h4>

          <div className="grid grid-cols-2 gap-3">
            {globalIndices.map((index, idx) => (
              <motion.div
                key={index.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
                className="p-3 bg-background/30 rounded-lg text-center"
              >
                <p className="text-sm font-medium text-foreground">
                  {index.name}
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  {index.value.toLocaleString()}
                </p>
                <StatusBadge value={index.change} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Commodities */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Commodities</h4>

          {commodities.map((commodity, index) => (
            <motion.div
              key={commodity.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background/30 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {commodity.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {commodity.value.toLocaleString()}
                </p>
              </div>
              <StatusBadge value={commodity.change} />
            </motion.div>
          ))}
        </div>

        {/* Market Status */}
        <div className="bg-gradient-to-r from-bs-blue-500/5 to-bs-purple-500/5 rounded-lg p-4 border border-bs-blue-500/10">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">Market Status</h4>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-emerald-400">Open</span>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <div className="flex justify-between mb-1">
              <span>Trading Hours:</span>
              <span>9:15 AM - 3:30 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Next Close:</span>
              <span>3:30 PM IST</span>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full border-bs-blue-500/30 text-bs-blue-400"
        >
          <div className="flex">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Detailed Market Data
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};

// src/components/dashboard/QuickActions.jsx
export const QuickActions = () => {
  const actions = [
    {
      id: "add-money",
      title: "Add Money",
      description: "Fund your account",
      icon: "plus",
      color: "from-emerald-500 to-emerald-600",
      action: () => console.log("Add money"),
    },
    {
      id: "buy-stocks",
      title: "Buy Stocks",
      description: "Purchase equity",
      icon: "trending-up",
      color: "from-bs-blue-500 to-bs-blue-600",
      action: () => console.log("Buy stocks"),
    },
    {
      id: "start-sip",
      title: "Start SIP",
      description: "Systematic investment",
      icon: "repeat",
      color: "from-bs-purple-500 to-bs-purple-600",
      action: () => console.log("Start SIP"),
    },
    {
      id: "tax-planning",
      title: "Tax Planning",
      description: "Optimize taxes",
      icon: "calculator",
      color: "from-amber-500 to-amber-600",
      action: () => console.log("Tax planning"),
    },
    {
      id: "goal-setting",
      title: "Set Goals",
      description: "Financial planning",
      icon: "target",
      color: "from-cyan-500 to-cyan-600",
      action: () => console.log("Set goals"),
    },
    {
      id: "portfolio-review",
      title: "Portfolio Review",
      description: "Annual checkup",
      icon: "pie-chart",
      color: "from-indigo-500 to-indigo-600",
      action: () => console.log("Portfolio review"),
    },
  ];

  const iconMap = {
    plus: "+",
    "trending-up": "📈",
    repeat: "🔄",
    calculator: "🧮",
    target: "🎯",
    "pie-chart": "📊",
  };

  return (
    <Card variant="elegant">
      <CardHeader>
        <CardTitle className="text-xl">Quick Actions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Common investment actions
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={action.action}
              className={`group p-4 rounded-xl bg-gradient-to-br ${action.color} hover:scale-105 active:scale-95 transition-all duration-300 text-left`}
            >
              <div className="flex flex-col items-start space-y-2">
                <div className="text-2xl">{iconMap[action.icon]}</div>
                <div>
                  <h4 className="font-semibold text-white text-sm group-hover:text-gray-100">
                    {action.title}
                  </h4>
                  <p className="text-xs text-white/80 group-hover:text-white/90">
                    {action.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <Button variant="outline" size="sm" className="w-full">
            📱 Download Mobile App
          </Button>
          <Button variant="ghost" size="sm" className="w-full text-bs-blue-400">
            💬 Chat with Advisor
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSummary;
