// src/components/community/ErrorBoundary.jsx
'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error for monitoring
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Check if a custom fallback is provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent 
            error={this.state.error} 
            retry={this.handleRetry}
          />
        );
      }

      // Default error UI
      return (
        <div className="min-h-screen hero-bg py-20">
          <div className="container-hero">
            <div className="max-w-2xl mx-auto text-center">
              <Card variant="elegant" className="p-8">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                  
                  <Badge variant="destructive" className="mx-auto mb-4">
                    Application Error
                  </Badge>
                  
                  <CardTitle className="text-2xl mb-4">
                    Oops! Something went wrong
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    We apologize for the inconvenience. An unexpected error occurred 
                    while loading this page. Our team has been notified and is working 
                    to resolve the issue.
                  </p>

                  {/* Error Details (only in development) */}
                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <div className="text-left bg-bs-gray-900/50 border border-red-500/20 rounded-lg p-4">
                      <h4 className="text-red-400 font-semibold mb-2">Error Details:</h4>
                      <p className="text-xs text-gray-300 font-mono">
                        {this.state.error.toString()}
                      </p>
                      {this.state.errorInfo && (
                        <details className="mt-2">
                          <summary className="text-red-400 text-xs cursor-pointer hover:text-red-300">
                            Component Stack
                          </summary>
                          <pre className="text-xs text-gray-400 mt-2 whitespace-pre-wrap">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </details>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={this.handleRetry}
                  
                      size="lg"
                      className="flex items-center"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                    
                    <Button 
                      onClick={() => window.location.href = '/'}
                      variant="outline"
                      size="lg"
                      className="flex items-center"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Go Home
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                      If this problem persists, please contact our support team at{' '}
                      <a 
                        href="mailto:support@wealthbridge.com" 
                        className="text-bs-blue-400 hover:text-bs-blue-300 transition-colors"
                      >
                        support@wealthbridge.com
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    }

    // No error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;