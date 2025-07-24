'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, AlertCircle, CheckCircle, Clock, RefreshCw, 
  ArrowLeft, ExternalLink, Smartphone 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/auth/supabase-auth';
import { signupRateLimiter } from '@/lib/auth/auth-utils';
import { cn } from '@/lib/utils';

export function VerifyEmail({ className, userEmail, onSuccess }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();
  
  const [verificationState, setVerificationState] = useState('pending');
  const [email, setEmail] = useState(userEmail || user?.email || '');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState(null);

  // Check for verification token in URL
  const token = searchParams?.get('token');
  const tokenHash = searchParams?.get('token_hash');
  const type = searchParams?.get('type');

  // Timer for rate limiting display
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  // Auto-verify if token is present
  useEffect(() => {
    if (token && tokenHash && type === 'email') {
      handleTokenVerification();
    }
  }, [token, tokenHash, type]);

  // Update email from user data
  useEffect(() => {
    if (user?.email && !email) {
      setEmail(user.email);
    }
  }, [user, email]);

  const handleTokenVerification = async () => {
    if (!token || !tokenHash) return;
    
    setVerificationState('verifying');
    setError(null);

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: 'email',
      });

      if (verifyError) {
        console.error('Verification error:', verifyError);
        
        if (verifyError.message.includes('expired')) {
          setVerificationState('expired');
          setError('This verification link has expired. Please request a new one.');
        } else {
          setVerificationState('error');
          setError(verifyError.message || 'Verification failed. Please try again.');
        }
        
        toast.error('Verification failed', {
          description: verifyError.message,
        });
      } else if (data.user) {
        setVerificationState('success');
        toast.success('Email verified!', {
          description: 'Your email has been successfully verified.',
        });
        
        onSuccess?.();
        
        // Redirect after verification
        setTimeout(() => {
          if (data?.user?.user_metadata?.onboarding_completed) {
            router.push('/dashboard');
          } else {
            router.push('/onboarding');
          }
        }, 2000);
      }
    } catch (err) {
      console.error('Verification error:', err);
      setVerificationState('error');
      setError('An unexpected error occurred. Please try again.');
      toast.error('Verification failed', {
        description: 'An unexpected error occurred.',
      });
    }
  };

  const handleResendVerification = async () => {
    if (!email || isResending) return;
    
    // Check rate limiting
    const rateLimitInfo = signupRateLimiter.check(email);
    if (rateLimitInfo.remaining === 0) {
      const retryAfter = rateLimitInfo.retryAfter || 0;
      setTimeRemaining(retryAfter);
      toast.error('Too many attempts', {
        description: `Please wait ${retryAfter} seconds before trying again.`,
      });
      return;
    }

    setIsResending(true);
    setError(null);

    try {
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (resendError) {
        setError(resendError.message);
        toast.error('Failed to resend', {
          description: resendError.message,
        });
      } else {
        toast.success('Verification email sent!', {
          description: 'Please check your email for the new verification link.',
        });
      }
    } catch (err) {
      setError('Failed to resend verification email. Please try again.');
      toast.error('Failed to resend', {
        description: 'Please try again later.',
      });
    } finally {
      setIsResending(false);
    }
  };

  const getStateIcon = () => {
    switch (verificationState) {
      case 'pending':
        return <Mail className="w-8 h-8 text-white" />;
      case 'verifying':
        return <RefreshCw className="w-8 h-8 text-white animate-spin" />;
      case 'success':
        return <CheckCircle className="w-8 h-8 text-white" />;
      case 'error':
      case 'expired':
        return <AlertCircle className="w-8 h-8 text-white" />;
      default:
        return <Mail className="w-8 h-8 text-white" />;
    }
  };

  const getStateColor = () => {
    switch (verificationState) {
      case 'success':
        return 'from-green-500 to-emerald-500';
      case 'error':
      case 'expired':
        return 'from-red-500 to-rose-500';
      case 'verifying':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-orange-500 to-amber-500';
    }
  };

  const getStateTitle = () => {
    switch (verificationState) {
      case 'pending':
        return 'Verify Your Email';
      case 'verifying':
        return 'Verifying...';
      case 'success':
        return 'Email Verified!';
      case 'expired':
        return 'Link Expired';
      case 'error':
        return 'Verification Failed';
      default:
        return 'Verify Your Email';
    }
  };

  const getStateDescription = () => {
    switch (verificationState) {
      case 'pending':
        return 'We sent a verification link to your email address. Click the link to verify your account.';
      case 'verifying':
        return 'Please wait while we verify your email address...';
      case 'success':
        return 'Your email has been successfully verified. You can now access all features.';
      case 'expired':
        return 'The verification link has expired. Please request a new verification email.';
      case 'error':
        return error || 'There was an error verifying your email. Please try again.';
      default:
        return 'Please verify your email to continue.';
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl text-center"
      >
        {/* State Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className={cn(
            "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6",
            `bg-gradient-to-r ${getStateColor()}`
          )}
        >
          {getStateIcon()}
        </motion.div>

        <h1 className="text-2xl font-bold text-white mb-2">
          {getStateTitle()}
        </h1>
        
        <p className="text-gray-400 mb-6">
          {getStateDescription()}
        </p>

        {/* Email Display */}
        {email && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-6">
            <p className="text-orange-400 font-medium">{email}</p>
          </div>
        )}

        {/* Success State - Auto redirect message */}
        {verificationState === 'success' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
          >
            <p className="text-green-400 text-sm">
              Redirecting you to the next step...
            </p>
          </motion.div>
        )}

        {/* Error Display */}
        {error && verificationState !== 'success' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="text-red-400 font-medium">Verification Error</p>
              <p className="text-red-300/80 text-sm mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Resend Button */}
          {(verificationState === 'pending' || verificationState === 'expired' || verificationState === 'error') && (
            <>
              {timeRemaining > 0 ? (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  Resend available in {timeRemaining}s
                </div>
              ) : (
                <motion.button
                  onClick={handleResendVerification}
                  disabled={isResending || authLoading || !email}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full py-3 px-4 rounded-xl font-medium transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-orange-500/50",
                    "bg-gradient-to-r from-orange-500 to-amber-500 text-white",
                    "hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-orange-500/25",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isResending ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    'Resend Verification Email'
                  )}
                </motion.button>
              )}
            </>
          )}

          {/* Try Again Button for verification errors */}
          {verificationState === 'error' && token && (
            <motion.button
              onClick={handleTokenVerification}
              disabled={authLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-blue-600 text-white hover:bg-blue-700"
            >
              Try Verification Again
            </motion.button>
          )}
        </div>

        {/* Help Information */}
        {verificationState !== 'success' && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-start gap-3 text-left">
                <Smartphone className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-blue-400 font-medium mb-1">Troubleshooting Tips</p>
                  <ul className="text-blue-300/80 space-y-1">
                    <li>• Check your spam/junk folder</li>
                    <li>• Make sure the email address is correct</li>
                    <li>• Verification links expire after 24 hours</li>
                    <li>• Try opening the link in a different browser</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Open Email App Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.a
                href="mailto:"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 p-3 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-200 text-gray-300 text-sm"
              >
                <Mail className="w-4 h-4" />
                Open Email
                <ExternalLink className="w-3 h-3" />
              </motion.a>
              
              <motion.a
                href="https://gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 p-3 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-200 text-gray-300 text-sm"
              >
                Gmail
                <ExternalLink className="w-3 h-3" />
              </motion.a>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-gray-700 space-y-3">
          {verificationState !== 'success' && (
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Change Email Address
            </Link>
          )}
          
          <div className="text-xs text-gray-500">
            Having trouble? Contact our{' '}
            <Link 
              href="/support" 
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              support team
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}