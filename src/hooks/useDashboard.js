// src/hooks/useDashboard.js
import { useState, useEffect, useCallback } from 'react';

// Mock portfolio data generator
const generateMockPortfolioData = (panNumber) => {
  // Base portfolio data that would come from PAN-linked accounts
  const baseData = {
    // Basic portfolio metrics
    totalValue: 2965000,
    totalInvested: 2545000,
    totalReturns: 420000,
    totalReturnsPercent: 16.5,
    dayChange: 12850,
    dayChangePercent: 0.43,
    
    // Asset allocation
    assetAllocation: [
      {
        category: 'Equity',
        value: 1850000,
        percentage: 62.5,
        change: 8.4,
        holdings: [
          {
            name: 'HDFC Bank Ltd',
            symbol: 'HDFCBANK',
            quantity: 350,
            avgPrice: 1524.50,
            currentPrice: 1680.50,
            value: 588175,
            returns: 54600,
            returnsPercent: 10.2,
            exchange: 'NSE'
          },
          {
            name: 'Infosys Ltd',
            symbol: 'INFY',
            quantity: 200,
            avgPrice: 1420.75,
            currentPrice: 1598.20,
            value: 319640,
            returns: 35490,
            returnsPercent: 12.5,
            exchange: 'NSE'
          },
          {
            name: 'Reliance Industries',
            symbol: 'RELIANCE',
            quantity: 150,
            avgPrice: 2345.60,
            currentPrice: 2456.85,
            value: 368527.5,
            returns: 16687.5,
            returnsPercent: 4.7,
            exchange: 'NSE'
          },
          {
            name: 'TCS Ltd',
            symbol: 'TCS',
            quantity: 100,
            avgPrice: 3245.80,
            currentPrice: 3542.90,
            value: 354290,
            returns: 29710,
            returnsPercent: 9.2,
            exchange: 'NSE'
          },
          {
            name: 'ICICI Bank Ltd',
            symbol: 'ICICIBANK',
            quantity: 250,
            avgPrice: 985.40,
            currentPrice: 1124.75,
            value: 281187.5,
            returns: 34837.5,
            returnsPercent: 14.1,
            exchange: 'NSE'
          }
        ]
      },
      {
        category: 'Mutual Funds',
        value: 750000,
        percentage: 25.3,
        change: 6.2,
        holdings: [
          {
            name: 'SBI Bluechip Fund',
            amc: 'SBI Mutual Fund',
            folioNumber: 'SBI123456789',
            units: 1250.45,
            nav: 78.62,
            value: 98285.37,
            invested: 85000,
            returns: 13285.37,
            returnsPercent: 15.6,
            sipAmount: 5000,
            sipDate: 10
          },
          {
            name: 'HDFC Mid-Cap Opportunities Fund',
            amc: 'HDFC Mutual Fund',
            folioNumber: 'HDFC987654321',
            units: 845.20,
            nav: 156.45,
            value: 132245.89,
            invested: 120000,
            returns: 12245.89,
            returnsPercent: 10.2,
            sipAmount: 8000,
            sipDate: 5
          },
          {
            name: 'Axis Small Cap Fund',
            amc: 'Axis Mutual Fund',
            folioNumber: 'AXIS456789123',
            units: 2150.75,
            nav: 65.25,
            value: 140337.44,
            invested: 135000,
            returns: 5337.44,
            returnsPercent: 4.0,
            sipAmount: 0, // Lump sum
            sipDate: null
          },
          {
            name: 'Mirae Asset Large Cap Fund',
            amc: 'Mirae Asset',
            folioNumber: 'MIRAE789123456',
            units: 1875.60,
            nav: 89.45,
            value: 167731.42,
            invested: 150000,
            returns: 17731.42,
            returnsPercent: 11.8,
            sipAmount: 6000,
            sipDate: 15
          }
        ]
      },
      {
        category: 'Fixed Deposits',
        value: 300000,
        percentage: 10.1,
        change: 5.8,
        holdings: [
          {
            bankName: 'HDFC Bank',
            accountNumber: 'FD***4567',
            principal: 200000,
            interestRate: 6.8,
            maturityDate: '2025-08-15',
            currentValue: 205680,
            returns: 5680,
            tenure: 12
          },
          {
            bankName: 'ICICI Bank',
            accountNumber: 'FD***7890',
            principal: 100000,
            interestRate: 7.2,
            maturityDate: '2025-12-30',
            currentValue: 103600,
            returns: 3600,
            tenure: 18
          }
        ]
      },
      {
        category: 'Others',
        value: 65000,
        percentage: 2.1,
        change: -2.1,
        holdings: [
          {
            name: 'Embassy Office Parks REIT',
            type: 'REIT',
            units: 150,
            avgPrice: 380.50,
            currentPrice: 385.75,
            value: 57862.5,
            returns: 787.5,
            returnsPercent: 1.4
          },
          {
            name: 'Bharat Bond ETF 2030',
            type: 'Bond ETF',
            units: 75,
            avgPrice: 95.20,
            currentPrice: 96.85,
            value: 7263.75,
            returns: 123.75,
            returnsPercent: 1.7
          }
        ]
      }
    ],

    // Performance data for charts
    performanceData: {
      '1D': [
        { date: '09:30', value: 2952150 },
        { date: '10:00', value: 2954800 },
        { date: '10:30', value: 2958200 },
        { date: '11:00', value: 2961500 },
        { date: '11:30', value: 2959800 },
        { date: '12:00', value: 2963200 },
        { date: '12:30', value: 2965000 }
      ],
      '1W': [
        { date: 'Mon', value: 2945000 },
        { date: 'Tue', value: 2951000 },
        { date: 'Wed', value: 2958000 },
        { date: 'Thu', value: 2962000 },
        { date: 'Fri', value: 2965000 }
      ],
      '1M': Array.from({ length: 30 }, (_, i) => ({
        date: `Day ${i + 1}`,
        value: 2850000 + (i * 3833) + Math.random() * 20000 - 10000
      })),
      '1Y': [
        { date: 'Jan 24', value: 2400000 },
        { date: 'Mar 24', value: 2520000 },
        { date: 'May 24', value: 2480000 },
        { date: 'Jul 24', value: 2650000 },
        { date: 'Sep 24', value: 2720000 },
        { date: 'Nov 24', value: 2850000 },
        { date: 'Jan 25', value: 2965000 }
      ]
    },

    // Recent transactions
    recentTransactions: [
      {
        id: 'TXN001',
        type: 'buy',
        asset: 'HDFC Bank Ltd',
        category: 'equity',
        quantity: 50,
        price: 1680.50,
        amount: 84025,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      },
      {
        id: 'TXN002',
        type: 'sip',
        asset: 'SBI Bluechip Fund',
        category: 'mutual-fund',
        quantity: 25.45,
        price: 78.62,
        amount: 2000,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      },
      {
        id: 'TXN003',
        type: 'dividend',
        asset: 'Infosys Ltd',
        category: 'equity',
        quantity: 200,
        price: 18.50,
        amount: 3700,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      }
    ],

    // Holdings summary
    holdings: {
      total: 42,
      equity: 25,
      mutualFunds: 12,
      fixedDeposits: 3,
      others: 2
    },

    // Portfolio summary
    summary: {
      assetTypes: 4,
      goalsOnTrack: 2,
      lastRebalanced: '2024-10-15',
      riskLevel: 'Moderate-High',
      diversificationScore: 85
    }
  };

  return baseData;
};

// Custom hook for dashboard data management
export const useDashboard = (panNumber) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  // Simulate fetching portfolio data based on PAN
  const fetchPortfolioData = useCallback(async (panNumber) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In real implementation, this would:
      // 1. Validate PAN number
      // 2. Fetch data from multiple sources (banks, brokers, AMCs)
      // 3. Aggregate and normalize the data
      // 4. Calculate portfolio metrics

      if (!panNumber) {
        throw new Error('PAN number is required');
      }

      // Simulate occasional network errors
      if (Math.random() < 0.05) {
        throw new Error('Network error. Please try again.');
      }

      const data = generateMockPortfolioData(panNumber);
      setPortfolioData(data);
      setLastSyncTime(new Date().toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
      setIsConnected(true);

    } catch (err) {
      setError(err.message);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync portfolio data
  const syncPortfolio = useCallback(async () => {
    if (panNumber) {
      await fetchPortfolioData(panNumber);
    }
  }, [panNumber, fetchPortfolioData]);

  // Initial data fetch
  useEffect(() => {
    if (panNumber) {
      fetchPortfolioData(panNumber);
    } else {
      setLoading(false);
      setError('Please provide your PAN number to view portfolio');
    }
  }, [panNumber, fetchPortfolioData]);

  // Auto-refresh every 5 minutes during market hours
  useEffect(() => {
    if (!portfolioData || !isConnected) return;

    const now = new Date();
    const currentHour = now.getHours();
    const isMarketHours = currentHour >= 9 && currentHour < 16; // 9 AM to 4 PM

    if (isMarketHours) {
      const interval = setInterval(() => {
        // Only update prices, not full sync
        updateLivePrices();
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearInterval(interval);
    }
  }, [portfolioData, isConnected]);

  // Update live prices (simulated)
  const updateLivePrices = useCallback(() => {
    if (!portfolioData) return;

    setPortfolioData(prevData => {
      const updatedData = { ...prevData };
      
      // Simulate small price movements
      const priceChange = () => (Math.random() - 0.5) * 0.02; // ±1% random change
      
      // Update equity prices
      updatedData.assetAllocation.forEach(asset => {
        if (asset.category === 'Equity' && asset.holdings) {
          asset.holdings.forEach(holding => {
            const change = priceChange();
            holding.currentPrice = holding.currentPrice * (1 + change);
            holding.value = holding.quantity * holding.currentPrice;
            holding.returns = holding.value - (holding.quantity * holding.avgPrice);
            holding.returnsPercent = (holding.returns / (holding.quantity * holding.avgPrice)) * 100;
          });
        }
      });

      // Recalculate totals
      const newTotalValue = updatedData.assetAllocation.reduce((sum, asset) => sum + asset.value, 0);
      const dayChangeAmount = newTotalValue - updatedData.totalValue;
      
      updatedData.totalValue = newTotalValue;
      updatedData.dayChange = dayChangeAmount;
      updatedData.dayChangePercent = (dayChangeAmount / updatedData.totalValue) * 100;
      updatedData.totalReturns = newTotalValue - updatedData.totalInvested;
      updatedData.totalReturnsPercent = (updatedData.totalReturns / updatedData.totalInvested) * 100;

      return updatedData;
    });

    setLastSyncTime(new Date().toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }));
  }, [portfolioData]);

  // Get portfolio insights
  const getPortfolioInsights = useCallback(() => {
    if (!portfolioData) return null;

    const insights = {
      topPerformer: null,
      worstPerformer: null,
      concentrationRisk: false,
      rebalancingNeeded: false,
      taxOptimization: []
    };

    // Find top and worst performers
    const allHoldings = [];
    portfolioData.assetAllocation.forEach(asset => {
      if (asset.holdings) {
        asset.holdings.forEach(holding => {
          allHoldings.push({
            ...holding,
            category: asset.category
          });
        });
      }
    });

    if (allHoldings.length > 0) {
      insights.topPerformer = allHoldings.reduce((prev, current) => 
        (prev.returnsPercent > current.returnsPercent) ? prev : current
      );
      
      insights.worstPerformer = allHoldings.reduce((prev, current) => 
        (prev.returnsPercent < current.returnsPercent) ? prev : current
      );
    }

    // Check concentration risk (any single asset > 20% of portfolio)
    insights.concentrationRisk = allHoldings.some(
      holding => (holding.value / portfolioData.totalValue) > 0.2
    );

    // Check if rebalancing needed (asset allocation drift > 5%)
    insights.rebalancingNeeded = portfolioData.assetAllocation.some(
      asset => Math.abs(asset.percentage - 25) > 5 // Assuming target is 25% each
    );

    return insights;
  }, [portfolioData]);

  return {
    portfolioData,
    loading,
    error,
    lastSyncTime,
    isConnected,
    syncPortfolio,
    insights: getPortfolioInsights(),
    
    // Utility functions
    getTotalValue: () => portfolioData?.totalValue || 0,
    getTotalReturns: () => portfolioData?.totalReturns || 0,
    getAssetAllocation: () => portfolioData?.assetAllocation || [],
    getRecentTransactions: () => portfolioData?.recentTransactions || [],
    
    // Data refresh functions
    refreshPrices: updateLivePrices,
    forceSync: () => syncPortfolio()
  };
};

export default useDashboard;