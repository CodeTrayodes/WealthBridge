// src/components/dashboard/Dashboard.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  Wallet,
  Target,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  Settings,
  Bell,
  Calendar,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
  Filter,
  Search,
  MoreHorizontal,
  ExternalLink,
  Sparkles,
  Globe,
  IndianRupee,
  Building,
  Landmark,
  Shield,
  Clock,
} from "lucide-react";

import { Button, Card, CardContent, CardHeader, CardTitle, Badge, StatusBadge, FeatureBadge } from "@/components/ui";
import PortfolioOverview from "./PortfolioOverview";
import AssetAllocation from "./AssetAllocation";
import PerformanceChart from "./PerformanceChart";
import TransactionHistory from "./TransactionHistory";
import MarketSummary, { QuickActions } from "./MarketSummary";
import { useDashboard } from "@/hooks/useDashboard";

const Dashboard = ({ userProfile }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("1Y");
  const [refreshing, setRefreshing] = useState(false);

  // Use dashboard hook for data management
  const {
    portfolioData,
    loading,
    error,
    lastSyncTime,
    syncPortfolio,
    isConnected,
  } = useDashboard(userProfile?.panNumber);

  const handleRefresh = async () => {
    setRefreshing(true);
    await syncPortfolio();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  if (loading && !portfolioData) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <DashboardError error={error} onRetry={handleRefresh} />;
  }

  const {
    totalValue,
    dayChange,
    dayChangePercent,
    totalReturns,
    totalReturnsPercent,
    assetAllocation,
    recentTransactions,
    performanceData,
    holdings,
    summary,
  } = portfolioData || {};

  const formatCurrency = (amount) => {
    if (!isBalanceVisible) return "****";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    if (!isBalanceVisible) return "**";
    return new Intl.NumberFormat("en-IN").format(num);
  };

  return (
    <div className="min-h-screen hero-bg py-24">
      <div className="container-hero space-y-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FeatureBadge icon={Sparkles} className="text-xs">
                Portfolio Dashboard
              </FeatureBadge>
              {isConnected && (
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>Live Data</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold">
              <span className="text-foreground">Welcome back, </span>
              <span className="text-hero-accent">
                {userProfile?.firstName || "Investor"}
              </span>
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>PAN: {userProfile?.panNumber || "****"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Last sync: {lastSyncTime || "Just now"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <span>{userProfile?.country || "Global"}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleBalanceVisibility}
              className="text-muted-foreground hover:text-foreground"
            >
              {isBalanceVisible ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
            </Button>

            <Button >
              <div className="flex">
                <Download className="w-4 h-4 mr-2" />
                Export
              </div>
            </Button>

            <Button size="lg" variant="outline">
              <div className="flex">
                <Plus className="w-4 h-4 mr-2" />
                Add Investment
              </div>
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Total Portfolio Value */}
          <Card
            variant="stats"
            className="hover:scale-105 transition-transform duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-bs-blue-500 to-bs-purple-500 rounded-xl flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Portfolio
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {formatCurrency(totalValue)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <StatusBadge value={dayChangePercent} />
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(Math.abs(dayChange))} today
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Total Returns */}
          <Card
            variant="stats"
            className="hover:scale-105 transition-transform duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Returns
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {formatCurrency(totalReturns)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <StatusBadge value={totalReturnsPercent} />
                <span className="text-sm text-muted-foreground">All time</span>
              </div>
            </CardContent>
          </Card>

          {/* Active Holdings */}
          <Card
            variant="stats"
            className="hover:scale-105 transition-transform duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-cyan-600 rounded-xl flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Holdings
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {formatNumber(holdings?.total || 0)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Across {summary?.assetTypes || 0} asset classes
              </div>
            </CardContent>
          </Card>

          {/* Goals Progress */}
          <Card
            variant="stats"
            className="hover:scale-105 transition-transform duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Goals on Track
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {summary?.goalsOnTrack || 0}/3
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Next review: Mar 2025
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Portfolio Overview & Performance */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PortfolioOverview
                portfolioData={portfolioData}
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
                isBalanceVisible={isBalanceVisible}
              />
            </motion.div>

            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <PerformanceChart
                data={performanceData}
                period={selectedPeriod}
                isBalanceVisible={isBalanceVisible}
              />
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TransactionHistory
                transactions={recentTransactions}
                isBalanceVisible={isBalanceVisible}
              />
            </motion.div>
          </div>

          {/* Right Column - Asset Allocation & Market Summary */}
          <div className="space-y-6">
            {/* Asset Allocation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AssetAllocation
                data={assetAllocation}
                isBalanceVisible={isBalanceVisible}
              />
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <QuickActions />
            </motion.div>

            {/* Market Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <MarketSummary />
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Alerts & Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card variant="elegant" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                <Bell className="w-5 h-5 mr-2 text-bs-blue-400" />
                Important Alerts & Updates
              </h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 mt-1" />
                  <div>
                    <p className="font-medium text-amber-400 text-sm">
                      Tax Filing Reminder
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your NRI tax filing deadline is approaching. Consider
                      consulting a tax advisor.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-bs-blue-500/10 border border-bs-blue-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Landmark className="w-5 h-5 text-bs-blue-400 mt-1" />
                  <div>
                    <p className="font-medium text-bs-blue-400 text-sm">
                      RBI Policy Update
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      New guidelines for NRI investments have been released.
                      Review your portfolio.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400 mt-1" />
                  <div>
                    <p className="font-medium text-emerald-400 text-sm">
                      Portfolio Milestone
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Congratulations! Your portfolio has grown by 15% this
                      year.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

// Loading Skeleton Component
const DashboardSkeleton = () => (
  <div className="min-h-screen hero-bg py-6">
    <div className="container-hero space-y-6">
      <div className="animate-pulse">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-3">
            <div className="w-32 h-6 bg-bs-gray-800 rounded"></div>
            <div className="w-64 h-8 bg-bs-gray-800 rounded"></div>
            <div className="w-48 h-4 bg-bs-gray-800 rounded"></div>
          </div>
          <div className="flex space-x-3">
            <div className="w-20 h-10 bg-bs-gray-800 rounded"></div>
            <div className="w-24 h-10 bg-bs-gray-800 rounded"></div>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card-elegant p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-bs-gray-800 rounded-xl"></div>
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-bs-gray-800 rounded"></div>
                  <div className="w-32 h-6 bg-bs-gray-800 rounded"></div>
                </div>
              </div>
              <div className="w-20 h-4 bg-bs-gray-800 rounded"></div>
            </div>
          ))}
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card-elegant p-6 h-64"></div>
            <div className="card-elegant p-6 h-80"></div>
          </div>
          <div className="space-y-6">
            <div className="card-elegant p-6 h-64"></div>
            <div className="card-elegant p-6 h-48"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Error Component
const DashboardError = ({ error, onRetry }) => (
  <div className="min-h-screen hero-bg py-6">
    <div className="container-hero">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Unable to Load Portfolio
        </h1>
        <p className="text-muted-foreground">
          We're having trouble connecting to your portfolio data. Please check
          your internet connection and try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onRetry} variant="gradient">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button variant="outline">Contact Support</Button>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
