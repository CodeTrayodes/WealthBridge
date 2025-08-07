// src/components/dashboard/index.js - Export all dashboard components
export { default as Dashboard } from './Dashboard';
export { default as DashboardAuth } from './DashboardAuth';
export { default as DashboardWrapper } from './DashboardWrapper';
export { default as PortfolioOverview } from './PortfolioOverview';
export { default as AssetAllocation } from './AssetAllocation';
export { default as PerformanceChart } from './PerformanceChart';
export { default as TransactionHistory } from './TransactionHistory';
export { default as MarketSummary } from './MarketSummary';
export { QuickActions } from './MarketSummary';

// Additional utility components for dashboard
export const DashboardProvider = ({ children }) => {
  // In real app, this would provide dashboard context
  return children;
};

// Mock data generator for development/testing
export const generateMockData = (panNumber) => {
  return {
    userProfile: {
      firstName: 'Rajesh',
      lastName: 'Kumar', 
      panNumber: panNumber || 'ABCDE1234F',
      email: 'rajesh.kumar@example.com',
      phone: '+1-555-0123',
      country: 'UK',
      state: 'California',
      isVerified: true,
      kycStatus: 'completed',
      accountType: 'NRI',
      riskProfile: 'Moderate-High',
      investmentExperience: '5+ years',
      lastLogin: new Date().toISOString(),
      registrationDate: '2022-03-15'
    },
    portfolioSummary: {
      totalValue: 2965000,
      totalInvested: 2545000,
      totalReturns: 420000,
      totalReturnsPercent: 16.5,
      dayChange: 12850,
      dayChangePercent: 0.43,
      monthChange: 85600,
      monthChangePercent: 2.97,
      yearChange: 420000,
      yearChangePercent: 16.5
    },
    accountConnections: [
      {
        id: 'hdfc-bank',
        type: 'bank',
        name: 'HDFC Bank',
        accountNumber: '****5678',
        status: 'connected',
        lastSync: '2025-01-15T10:30:00Z',
        holdings: ['Fixed Deposits', 'Savings Account']
      },
      {
        id: 'zerodha',
        type: 'broker',
        name: 'Zerodha',
        accountNumber: 'ZD****890',
        status: 'connected', 
        lastSync: '2025-01-15T10:25:00Z',
        holdings: ['Stocks', 'ETFs']
      },
      {
        id: 'sbi-mf',
        type: 'mutual-fund',
        name: 'SBI Mutual Fund',
        accountNumber: 'SBI****123',
        status: 'connected',
        lastSync: '2025-01-15T10:20:00Z',
        holdings: ['SIP Investments', 'Lump Sum']
      },
      {
        id: 'axis-mf',
        type: 'mutual-fund',
        name: 'Axis Mutual Fund', 
        accountNumber: 'AXIS****456',
        status: 'pending',
        lastSync: null,
        holdings: []
      }
    ]
  };
};