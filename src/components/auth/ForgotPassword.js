// src/components/auth/ForgotPassword.jsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, AlertCircle, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { passwordResetSchema } from '@/lib/auth/auth-schemas';
import { useAuth } from '@/hooks/useAuth';
import { passwordResetRateLimiter } from '@/lib/auth/auth-utils';
import { cn } from '@/lib/utils';

export function ForgotPassword({ className, onSuccess }) {
  const { resetPassword, isLoading, error, clearError } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const watchEmail = watch('email');

  // Timer for rate limiting display
  React.useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const onSubmit = async (data) => {
    clearError();
    
    // Check rate limiting
    const rateLimitInfo = passwordResetRateLimiter.check(data.email);
    if (rateLimitInfo.remaining === 0) {
      const retryAfter = rateLimitInfo.retryAfter || 0;
      setTimeRemaining(retryAfter);
      toast.error('Too many attempts', {
        description: `Please wait ${retryAfter} seconds before trying again.`,
      });
      return;
    }
    
    try {
      const result = await resetPassword(data.email);

      if (result.success) {
        setIsSubmitted(true);
        setSubmittedEmail(data.email);
        toast.success('Reset email sent!', {
          description: 'Please check your email for password reset instructions.',
        });
        onSuccess?.();
      } else {
        toast.error('Reset failed', {
          description: result.error?.message || 'Please check your email address and try again.',
        });
      }
    } catch (err) {
      toast.error('An unexpected error occurred', {
        description: 'Please try again later.',
      });
    }
  };

  const handleResendEmail = async () => {
    if (!submittedEmail) return;
    
    // Check rate limiting
    const rateLimitInfo = passwordResetRateLimiter.check(submittedEmail);
    if (rateLimitInfo.remaining === 0) {
      const retryAfter = rateLimitInfo.retryAfter || 0;
      setTimeRemaining(retryAfter);
      toast.error('Too many attempts', {
        description: `Please wait ${retryAfter} seconds before trying again.`,
      });
      return;
    }

    try {
      const result = await resetPassword(submittedEmail);
      if (result.success) {
        toast.success('Email resent!', {
          description: 'Please check your email for the new reset link.',
        });
      }
    } catch (err) {
      toast.error('Failed to resend email', {
        description: 'Please try again later.',
      });
    }
  };

  const isFormValid = watchEmail && !Object.keys(errors).length;

  if (isSubmitted) {
    return (
      <div className={cn("w-full max-w-md mx-auto", className)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-6"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>

          <h1 className="text-2xl font-bold text-white mb-2">
            Check Your Email
          </h1>
          
          <p className="text-gray-400 mb-6">
            We've sent password reset instructions to
          </p>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-6">
            <p className="text-orange-400 font-medium">{submittedEmail}</p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Didn't receive the email? Check your spam folder or click below to resend.
            </p>

            {timeRemaining > 0 ? (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                Resend available in {timeRemaining}s
              </div>
            ) : (
              <motion.button
                onClick={handleResendEmail}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-orange-400 hover:text-orange-300 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Resend Email
              </motion.button>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl mb-4"
          >
            <Mail className="w-8 h-8 text-white" />
          </motion.div>
          
          <h1 className="text-2xl font-bold text-white mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-400">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-400 font-medium">Reset failed</p>
              <p className="text-red-300/80 text-sm mt-1">{error.message}</p>
            </div>
          </motion.div>
        )}

        {/* Rate Limit Warning */}
        {timeRemaining > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3"
          >
            <Clock className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-yellow-400 font-medium">Please wait</p>
              <p className="text-yellow-300/80 text-sm mt-1">
                Too many attempts. Try again in {timeRemaining} seconds.
              </p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                className={cn(
                  "w-full pl-12 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500",
                  "transition-all duration-200",
                  errors.email 
                    ? "border-red-500 focus:ring-red-500/50" 
                    : "border-gray-700 hover:border-gray-600"
                )}
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || isLoading || !isFormValid || timeRemaining > 0}
            whileHover={{ scale: isFormValid && timeRemaining === 0 ? 1.02 : 1 }}
            whileTap={{ scale: isFormValid && timeRemaining === 0 ? 0.98 : 1 }}
            className={cn(
              "w-full py-3 px-4 rounded-xl font-medium transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-orange-500/50",
              isFormValid && timeRemaining === 0
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-orange-500/25"
                : "bg-gray-800 text-gray-400 cursor-not-allowed"
            )}
          >
            {isSubmitting || isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending reset email...
              </div>
            ) : timeRemaining > 0 ? (
              `Wait ${timeRemaining}s`
            ) : (
              'Send Reset Instructions'
            )}
          </motion.button>
        </form>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-blue-400 font-medium mb-1">Need help?</p>
              <p className="text-blue-300/80">
                Make sure to check your spam folder. Reset links expire after 1 hour for security.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}