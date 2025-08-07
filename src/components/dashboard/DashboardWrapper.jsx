// src/components/dashboard/DashboardWrapper.jsx
'use client';

import React, { Suspense } from 'react';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import Dashboard from './Dashboard';
import DashboardAuth from './DashboardAuth';
import { LoadingSpinner } from '@/components/ui';

// Loading component for dashboard
function DashboardLoading() {
  return (
    <div className="min-h-screen hero-bg py-6">
      <div className="container-hero space-y-6">
        
        {/* Header Loading */}
        <div className="animate-pulse">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-3">
              <div className="w-32 h-6 bg-bs-blue-500/20 rounded-full"></div>
              <div className="w-64 h-8 bg-bs-purple-500/20 rounded-lg"></div>
              <div className="w-48 h-4 bg-bs-gray-800 rounded"></div>
            </div>
            <div className="flex space-x-3">
              <div className="w-20 h-10 bg-bs-gray-800 rounded-lg"></div>
              <div className="w-24 h-10 bg-bs-gray-800 rounded-lg"></div>
              <div className="w-32 h-10 bg-bs-blue-500/20 rounded-lg"></div>
            </div>
          </div>

          {/* Stats Cards Loading */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-elegant p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-bs-blue-500/20 rounded-xl"></div>
                  <div className="space-y-2">
                    <div className="w-24 h-4 bg-bs-gray-800 rounded"></div>
                    <div className="w-32 h-6 bg-bs-gray-800 rounded"></div>
                  </div>
                </div>
                <div className="w-20 h-4 bg-bs-gray-800 rounded"></div>
              </div>
            ))}
          </div>

          {/* Main Content Loading */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="card-elegant p-6 h-64"></div>
              <div className="card-elegant p-6 h-80"></div>
              <div className="card-elegant p-6 h-96"></div>
            </div>
            <div className="space-y-6">
              <div className="card-elegant p-6 h-64"></div>
              <div className="card-elegant p-6 h-48"></div>
              <div className="card-elegant p-6 h-56"></div>
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="text-center mt-12">
          <LoadingSpinner size="xl" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Loading Your Portfolio
          </h3>
          <p className="text-muted-foreground">
            Syncing data from your linked accounts...
          </p>
          <div className="flex justify-center space-x-8 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Banks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-bs-blue-400 rounded-full animate-pulse"></div>
              <span>Brokers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-bs-purple-400 rounded-full animate-pulse"></div>
              <span>Mutual Funds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Error component for dashboard
function DashboardError({ error, retry }) {
  const handleRetry = () => {
    if (retry) {
      retry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen hero-bg py-6">
      <div className="container-hero">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Unable to Load Portfolio</h1>
          <p className="text-muted-foreground">
            We're having trouble accessing your portfolio data. This could be due to:
          </p>
          <ul className="text-sm text-muted-foreground text-left space-y-1">
            <li>• Temporary connectivity issues with data sources</li>
            <li>• Maintenance on banking/broker systems</li>
            <li>• Authentication token expiry</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleRetry}
              className="bs-button flex items-center justify-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry Loading
            </button>
            <a 
              href="/"
              className="bs-button bg-card/80 text-bs-blue-400 hover:bg-bs-blue-500/10 flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            Need help? Contact support at{' '}
            <a href="mailto:support@wealthbridge.com" className="text-bs-blue-400 hover:text-bs-blue-300">
              support@wealthbridge.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Custom error boundary for dashboard
class DashboardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Dashboard error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return <DashboardError error={this.state.error} retry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

// Main wrapper component
const DashboardWrapper = ({ userProfile }) => {
  return (
    <DashboardErrorBoundary>
      <Suspense fallback={<DashboardLoading />}>
        <DashboardAuth userProfile={userProfile}>
          <Dashboard userProfile={userProfile} />
        </DashboardAuth>
      </Suspense>
    </DashboardErrorBoundary>
  );
};

export default DashboardWrapper;