// src/components/auth/OAuthCallback.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Chrome, CheckCircle, AlertTriangle, ArrowRight, 
  Shield, Loader2, RefreshCw, UserPlus 
} from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/lib/auth/supabase-auth';
import { useAuth } from '@/hooks/useAuth';
import { deviceUtils, storageUtils } from '@/lib/auth/auth-utils';
import { cn } from '@/lib/utils';

export function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { initialize } = useAuth();
  
  const [state, setState] = useState('processing');
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/dashboard');

  useEffect(() => {
    handleOAuthCallback();
  }, []);

  const handleOAuthCallback = async () => {
    try {
      setState('processing');
      setError(null);

      // Get URL parameters
      const code = searchParams?.get('code');
      const error_code = searchParams?.get('error');
      const error_description = searchParams?.get('error_description');
      const state_param = searchParams?.get('state');

      // Handle OAuth errors
      if (error_code) {
        throw new Error(error_description || `OAuth error: ${error_code}`);
      }

      if (!code) {
        throw new Error('No authorization code received from Google');
      }

      // Exchange code for session
      const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

      if (sessionError) {
        throw new Error(sessionError.message || 'Failed to exchange code for session');
      }

      if (!data.user || !data.session) {
        throw new Error('No user data received from Google');
      }

      // Get user information
      const user = data.user;
      const session = data.session;
      setUserEmail(user.email || '');

      // Check if this is a new user
      const isNewAccount = !user.last_sign_in_at || 
        new Date(user.created_at).getTime() === new Date(user.last_sign_in_at).getTime();
      
      setIsNewUser(isNewAccount);

      // Generate device fingerprint for security
      const deviceFingerprint = deviceUtils.generateFingerprint();

      // Update user metadata with device info and OAuth source
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          device_fingerprint: deviceFingerprint,
          oauth_provider: 'google',
          last_oauth_signin: new Date().toISOString(),
          signin_method: 'oauth_google',
        }
      });

      if (updateError) {
        console.warn('Failed to update user metadata:', updateError);
        // Don't fail the flow for metadata update errors
      }

      // Log successful OAuth signin
      await logSecurityEvent('OAUTH_SIGNIN_SUCCESS', {
        provider: 'google',
        user_id: user.id,
        device_fingerprint: deviceFingerprint,
        is_new_user: isNewAccount,
      });

      // Determine redirect path
      const returnTo = searchParams?.get('redirect_to') || searchParams?.get('redirectTo');
      let targetPath = '/dashboard';

      // Check onboarding completion
      const onboardingCompleted = user.user_metadata?.onboarding_completed || false;
      
      if (isNewAccount || !onboardingCompleted) {
        targetPath = '/onboarding';
        setState('new_user');
      } else {
        targetPath = returnTo || '/dashboard';
        setState('existing_user');
      }

      setRedirectPath(targetPath);

      // Initialize auth state
      await initialize();

      // Show success message
      if (isNewAccount) {
        toast.success('Welcome to WealthBridge!', {
          description: 'Your Google account has been connected successfully.',
        });
      } else {
        toast.success('Signed in successfully!', {
          description: 'Welcome back to WealthBridge.',
        });
      }

      // Redirect after a short delay
      setTimeout(() => {
        router.push(targetPath);
      }, 2000);

    } catch (err) {
      console.error('OAuth callback error:', err);
      
      setState('error');
      setError({
        message: err.message || 'Authentication failed',
        code: err.code,
        details: err,
      });

      // Log failed OAuth signin
      await logSecurityEvent('OAUTH_SIGNIN_FAILED', {
        provider: 'google',
        error: err.message,
        device_fingerprint: deviceUtils.generateFingerprint(),
      });

      toast.error('Sign in failed', {
        description: err.message || 'Please try again.',
      });
    }
  };

  const logSecurityEvent = async (eventType, details) => {
    try {
      await supabase
        .from('security_events')
        .insert({
          event_type: eventType,
          details,
          device_fingerprint: details.device_fingerprint,
          user_agent: typeof window !== 'undefined' ? navigator.userAgent : null,
          timestamp: new Date().toISOString(),
        });
    } catch (error) {
      console.warn('Failed to log security event:', error);
    }
  };

  const handleRetry = () => {
    // Clear error and retry
    setError(null);
    handleOAuthCallback();
  };

  const handleManualSignIn = () => {
    router.push('/login');
  };

  const getStateContent = () => {
    switch (state) {
      case 'processing':
        return {
          icon: Chrome,
          iconColor: 'from-blue-500 to-cyan-500',
          title: 'Completing Google Sign In',
          description: 'Securely connecting your Google account...',
          showProgress: true,
        };
      case 'new_user':
        return {
          icon: UserPlus,
          iconColor: 'from-green-500 to-emerald-500',
          title: 'Welcome to WealthBridge!',
          description: `Account created successfully for ${userEmail}`,
          showRedirect: true,
          redirectText: 'Redirecting to complete your profile...',
        };
      case 'existing_user':
        return {
          icon: CheckCircle,
          iconColor: 'from-green-500 to-emerald-500',
          title: 'Welcome Back!',
          description: `Successfully signed in as ${userEmail}`,
          showRedirect: true,
          redirectText: 'Redirecting to your dashboard...',
        };
      case 'error':
        return {
          icon: AlertTriangle,
          iconColor: 'from-red-500 to-rose-500',
          title: 'Sign In Failed',
          description: error?.message || 'Something went wrong during authentication',
          showError: true,
        };
      default:
        return {
          icon: Chrome,
          iconColor: 'from-orange-500 to-amber-500',
          title: 'Processing...',
          description: 'Please wait...',
          showProgress: true,
        };
    }
  };

  const content = getStateContent();
  const IconComponent = content.icon;

  return (
    <div className="w-full max-w-md mx-auto">
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
            `bg-gradient-to-r ${content.iconColor}`
          )}
        >
          {state === 'processing' ? (
            <div className="relative">
              <IconComponent className="w-8 h-8 text-white" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-white/30 border-t-white rounded-xl"
              />
            </div>
          ) : (
            <IconComponent className="w-8 h-8 text-white" />
          )}
        </motion.div>

        {/* Title and Description */}
        <h1 className="text-2xl font-bold text-white mb-2">
          {content.title}
        </h1>
        
        <p className="text-gray-400 mb-6">
          {content.description}
        </p>

        {/* Progress Indicator */}
        {content.showProgress && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <Loader2 className="w-5 h-5 animate-spin text-orange-400" />
            <span className="text-sm text-gray-400">Processing authentication...</span>
          </div>
        )}

        {/* Redirect Message */}
        {content.showRedirect && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center gap-3"
          >
            <ArrowRight className="w-5 h-5 text-green-400" />
            <p className="text-green-400 text-sm">{content.redirectText}</p>
          </motion.div>
        )}

        {/* Error Display */}
        {content.showError && error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
          >
            <div className="text-left">
              <p className="text-red-400 font-medium mb-2">Authentication Error</p>
              <p className="text-red-300/80 text-sm mb-3">{error.message}</p>
              
              {error.code && (
                <p className="text-red-300/60 text-xs">Error Code: {error.code}</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {state === 'error' && (
            <>
              <motion.button
                onClick={handleRetry}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-orange-500/25"
              >
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </div>
              </motion.button>

              <motion.button
                onClick={handleManualSignIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/50 bg-gray-800 text-gray-300 hover:bg-gray-700"
              >
                Sign In Manually
              </motion.button>
            </>
          )}
        </div>

        {/* Security Message */}
        {(state === 'processing' || state === 'new_user' || state === 'existing_user') && (
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-blue-400 font-medium text-sm">Secure Connection</p>
                <p className="text-blue-300/80 text-xs mt-1">
                  Your data is encrypted and protected during sign-in
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Dots Animation */}
        {state === 'processing' && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        )}
      </motion.div>
    </div>
  );
}