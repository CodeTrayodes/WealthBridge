// src/components/dashboard/DashboardAuth.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Key,
  Building,
  CreditCard,
  Landmark,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, FeatureBadge } from '@/components/ui/Badge';

const DashboardAuth = ({ children, userProfile }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [authStep, setAuthStep] = useState('checking');
  const [panNumber, setPanNumber] = useState('');
  const [showPan, setShowPan] = useState(false);
  const [otp, setOtp] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Simulate authentication check
  useEffect(() => {
    const checkAuth = async () => {
      setIsVerifying(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, check if user is logged in and PAN is verified
      if (userProfile?.panNumber && userProfile?.isVerified) {
        setIsAuthenticated(true);
        setAuthStep('authenticated');
      } else {
        setAuthStep('pan-entry');
      }
      
      setIsVerifying(false);
    };

    checkAuth();
  }, [userProfile]);

  // Handle PAN verification
  const handlePanVerification = async (e) => {
    e.preventDefault();
    
    if (!panNumber || panNumber.length !== 10) {
      alert('Please enter a valid 10-character PAN number');
      return;
    }

    if (!agreedToTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    setIsVerifying(true);
    
    // Simulate PAN verification API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAuthStep('otp-verification');
    setIsVerifying(false);
  };

  // Handle OTP verification
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsAuthenticated(true);
    setAuthStep('authenticated');
    setIsVerifying(false);
  };

  // If still checking authentication
  if (isVerifying && authStep === 'checking') {
    return (
      <div className="min-h-screen hero-bg py-20">
        <div className="container-hero">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-gradient-to-br from-bs-blue-500 to-bs-purple-500 rounded-full flex items-center justify-center mx-auto"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Verifying Your Access
              </h1>
              <p className="text-muted-foreground">
                Ensuring secure access to your portfolio...
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-8 h-8 mx-auto"
            >
              <RefreshCw className="w-8 h-8 text-bs-blue-400 animate-spin" />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, show dashboard
  if (isAuthenticated) {
    return children;
  }

  // PAN Number Entry
  if (authStep === 'pan-entry') {
    return (
      <div className="min-h-screen hero-bg py-20">
        <div className="container-hero">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <FeatureBadge icon={Shield} className="mb-4 mx-auto">
                Secure Access Required
              </FeatureBadge>
              
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Access Your Portfolio
              </h1>
              <p className="text-muted-foreground">
                Enter your PAN number to securely access your investment portfolio
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="elegant">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Key className="w-5 h-5 mr-2 text-bs-blue-400" />
                    PAN Verification
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handlePanVerification} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        PAN Number
                      </label>
                      <div className="relative">
                        <input
                          type={showPan ? "text" : "password"}
                          value={panNumber}
                          onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                          placeholder="ABCDE1234F"
                          maxLength={10}
                          className="bs-input pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPan(!showPan)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPan ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        We'll fetch your investment data linked to this PAN
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">We'll connect to:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { name: 'Banks', icon: Landmark, color: 'text-emerald-400' },
                          { name: 'Brokers', icon: Building, color: 'text-bs-blue-400' },
                          { name: 'Mutual Funds', icon: CreditCard, color: 'text-bs-purple-400' },
                          { name: 'Deposits', icon: Shield, color: 'text-amber-400' }
                        ].map((source, index) => (
                          <div key={source.name} className="flex items-center space-x-2 p-2 bg-background/30 rounded-lg">
                            <source.icon className={`w-4 h-4 ${source.color}`} />
                            <span className="text-sm text-foreground">{source.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1"
                      />
                      <label htmlFor="terms" className="text-sm text-muted-foreground">
                        I agree to the{' '}
                        <a href="/terms" className="text-bs-blue-400 hover:text-bs-blue-300">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="/privacy" className="text-bs-blue-400 hover:text-bs-blue-300">
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      variant="gradient" 
                      size="lg" 
                      className="w-full"
                      disabled={isVerifying || !agreedToTerms}
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Verifying PAN...
                        </>
                      ) : (
                        <>
                          Verify PAN & Continue
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 p-4 bg-bs-blue-500/10 border border-bs-blue-500/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-bs-blue-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-bs-blue-400">Bank-Grade Security</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Your PAN and financial data are encrypted and never stored on our servers.
                          We only access read-only information to display your portfolio.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // OTP Verification
  if (authStep === 'otp-verification') {
    return (
      <div className="min-h-screen hero-bg py-20">
        <div className="container-hero">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-bs-blue-500 to-bs-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Verify Your Identity
              </h1>
              <p className="text-muted-foreground">
                We've sent a 6-digit OTP to your registered mobile number ending with ****56
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="elegant">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-bs-blue-400" />
                    Enter OTP
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleOtpVerification} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        6-Digit OTP
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="000000"
                        maxLength={6}
                        className="bs-input text-center text-lg tracking-widest"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="gradient" 
                      size="lg" 
                      className="w-full"
                      disabled={isVerifying}
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Verifying OTP...
                        </>
                      ) : (
                        <>
                          Verify & Access Portfolio
                          <CheckCircle className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Didn't receive the OTP?{' '}
                      <button className="text-bs-blue-400 hover:text-bs-blue-300 font-medium">
                        Resend OTP
                      </button>
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-center space-x-2">
                    <button 
                      onClick={() => setAuthStep('pan-entry')}
                      className="text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1"
                    >
                      <ArrowRight className="w-3 h-3 rotate-180" />
                      <span>Back to PAN entry</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DashboardAuth;