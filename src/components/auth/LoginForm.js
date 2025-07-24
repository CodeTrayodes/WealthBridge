// src/components/auth/LoginForm.jsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Chrome, Linkedin, Apple } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { loginSchema } from '@/lib/auth/auth-schemas';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export function LoginForm({ 
  className, 
  onSuccess,
  showSignupLink = true 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo') || '/dashboard';
  
  const { signIn, signInWithOAuth, isLoading, error, clearError } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const watchEmail = watch('email');
  const watchPassword = watch('password');

  const onSubmit = async (data) => {
    clearError();
    
    try {
      const result = await signIn({
        ...data,
        rememberMe,
      });

      if (result.success) {
        toast.success('Welcome back!', {
          description: 'You have been successfully signed in.',
        });
        
        onSuccess?.();
        router.push(redirectTo);
      } else {
        toast.error('Sign in failed', {
          description: result.error?.message || 'Please check your credentials and try again.',
        });
      }
    } catch (err) {
      toast.error('An unexpected error occurred', {
        description: 'Please try again later.',
      });
    }
  };

  const handleOAuthSignIn = async (provider) => {
    clearError();
    
    try {
      const result = await signInWithOAuth(provider);
      
      if (result.success && result.data?.url) {
        window.location.href = result.data.url;
      } else {
        toast.error('OAuth sign in failed', {
          description: result.error?.message || 'Please try again.',
        });
      }
    } catch (err) {
      toast.error('OAuth sign in failed', {
        description: 'Please try again later.',
      });
    }
  };

  const isFormValid = watchEmail && watchPassword && !Object.keys(errors).length;

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
            <Lock className="w-8 h-8 text-white" />
          </motion.div>
          
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400">
            Sign in to your WealthBridge account
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
              <p className="text-red-400 font-medium">Sign in failed</p>
              <p className="text-red-300/80 text-sm mt-1">{error.message}</p>
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
                placeholder="Enter your email"
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

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('password')}
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                className={cn(
                  "w-full pl-12 pr-12 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500",
                  "transition-all duration-200",
                  errors.password 
                    ? "border-red-500 focus:ring-red-500/50" 
                    : "border-gray-700 hover:border-gray-600"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.password.message}
              </motion.p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
              />
              <span className="text-sm text-gray-300">Remember me</span>
            </label>
            
            <Link
              href="/forgot-password"
              className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || isLoading || !isFormValid}
            whileHover={{ scale: isFormValid ? 1.02 : 1 }}
            whileTap={{ scale: isFormValid ? 0.98 : 1 }}
            className={cn(
              "w-full py-3 px-4 rounded-xl font-medium transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-orange-500/50",
              isFormValid
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-orange-500/25"
                : "bg-gray-800 text-gray-400 cursor-not-allowed"
            )}
          >
            {isSubmitting || isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-4 text-sm text-gray-400">or continue with</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            type="button"
            onClick={() => handleOAuthSignIn('GOOGLE')}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center p-3 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Chrome className="w-5 h-5 text-gray-300" />
          </motion.button>
          
          <motion.button
            type="button"
            onClick={() => handleOAuthSignIn('LINKEDIN')}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center p-3 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Linkedin className="w-5 h-5 text-blue-400" />
          </motion.button>
          
          <motion.button
            type="button"
            onClick={() => handleOAuthSignIn('APPLE')}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center p-3 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Apple className="w-5 h-5 text-gray-300" />
          </motion.button>
        </div>

        {/* Sign Up Link */}
        {showSignupLink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}