// src/components/auth/SignupForm.jsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, 
  Chrome, Linkedin, Apple, Shield, Check, X 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { signUpSchema } from '@/lib/auth/auth-schemas';
import { useAuth } from '@/hooks/useAuth';
import { AuthProvider } from '@/lib/auth/auth-types';
import { passwordUtils } from '@/lib/auth/auth-utils';
import { cn } from '@/lib/utils';

export function SignupForm({ 
  className, 
  onSuccess,
  showLoginLink = true 
}) {
  const router = useRouter();
  const { signUp, signInWithOAuth, isLoading, error, clearError } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      phone: '',
      agreeToTerms: false,
      subscribeNewsletter: true,
      referralCode: '',
    },
  });

  const watchPassword = watch('password');
  const watchFullName = watch('fullName');
  const watchEmail = watch('email');

  // Update password strength when password changes
  React.useEffect(() => {
    if (watchPassword) {
      const strength = passwordUtils.getStrengthScore(watchPassword);
      const feedback = passwordUtils.getStrengthFeedback(watchPassword);
      setPasswordStrength({ score: strength, feedback });
    } else {
      setPasswordStrength({ score: 0, feedback: [] });
    }
  }, [watchPassword]);

  // Update form value when checkbox changes
  React.useEffect(() => {
    setValue('agreeToTerms', agreeToTerms);
    setValue('subscribeNewsletter', subscribeNewsletter);
  }, [agreeToTerms, subscribeNewsletter, setValue]);

  const onSubmit = async (data) => {
    clearError();
    
    if (!agreeToTerms) {
      toast.error('Terms required', {
        description: 'Please agree to the terms and conditions to continue.',
      });
      return;
    }
    
    try {
      const result = await signUp({
        ...data,
        agreeToTerms,
        subscribeNewsletter,
      });

      if (result.success) {
        if (result.data?.needsVerification) {
          toast.success('Account created!', {
            description: 'Please check your email to verify your account.',
          });
          router.push('/verify-email');
        } else {
          toast.success('Welcome to WealthBridge!', {
            description: 'Your account has been created successfully.',
          });
          onSuccess?.();
          router.push('/onboarding');
        }
      } else {
        toast.error('Sign up failed', {
          description: result.error?.message || 'Please check your information and try again.',
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
        toast.error('OAuth sign up failed', {
          description: result.error?.message || 'Please try again.',
        });
      }
    } catch (err) {
      toast.error('OAuth sign up failed', {
        description: 'Please try again later.',
      });
    }
  };

  const getPasswordStrengthColor = (score) => {
    if (score < 30) return 'bg-red-500';
    if (score < 60) return 'bg-yellow-500';
    if (score < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (score) => {
    if (score < 30) return 'Weak';
    if (score < 60) return 'Fair';
    if (score < 80) return 'Good';
    return 'Strong';
  };

  const isFormValid = watchFullName && watchEmail && watchPassword && agreeToTerms && !Object.keys(errors).length;

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
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          
          <h1 className="text-2xl font-bold text-white mb-2">
            Create Account
          </h1>
          <p className="text-gray-400">
            Join WealthBridge and start your investment journey
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
              <p className="text-red-400 font-medium">Sign up failed</p>
              <p className="text-red-300/80 text-sm mt-1">{error.message}</p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name Field */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-300">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('fullName')}
                id="fullName"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                className={cn(
                  "w-full pl-12 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500",
                  "transition-all duration-200",
                  errors.fullName 
                    ? "border-red-500 focus:ring-red-500/50" 
                    : "border-gray-700 hover:border-gray-600"
                )}
              />
            </div>
            {errors.fullName && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.fullName.message}
              </motion.p>
            )}
          </div>

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

          {/* Phone Field (Optional) */}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-300">
              Phone Number <span className="text-gray-500">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('phone')}
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 (555) 123-4567"
                className={cn(
                  "w-full pl-12 pr-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500",
                  "transition-all duration-200",
                  errors.phone 
                    ? "border-red-500 focus:ring-red-500/50" 
                    : "border-gray-700 hover:border-gray-600"
                )}
              />
            </div>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.phone.message}
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
                autoComplete="new-password"
                placeholder="Create a strong password"
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

            {/* Password Strength Indicator */}
            <AnimatePresence>
              {watchPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Password Strength</span>
                    <span className={cn(
                      "text-xs font-medium",
                      passwordStrength.score < 30 ? "text-red-400" :
                      passwordStrength.score < 60 ? "text-yellow-400" :
                      passwordStrength.score < 80 ? "text-blue-400" : "text-green-400"
                    )}>
                      {getPasswordStrengthText(passwordStrength.score)}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${passwordStrength.score}%` }}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        getPasswordStrengthColor(passwordStrength.score)
                      )}
                    />
                  </div>

                  {passwordStrength.feedback.length > 0 && (
                    <div className="space-y-1">
                      {passwordStrength.feedback.map((feedback, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                          <X className="w-3 h-3 text-red-400" />
                          {feedback}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

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

          {/* Referral Code (Optional) */}
          <div className="space-y-2">
            <label htmlFor="referralCode" className="text-sm font-medium text-gray-300">
              Referral Code <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              {...register('referralCode')}
              id="referralCode"
              type="text"
              placeholder="Enter referral code"
              className={cn(
                "w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400",
                "focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500",
                "transition-all duration-200 border-gray-700 hover:border-gray-600"
              )}
            />
          </div>

          {/* Terms and Newsletter */}
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
              />
              <span className="text-sm text-gray-300">
                I agree to the{' '}
                <Link href="/terms" className="text-orange-400 hover:text-orange-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-orange-400 hover:text-orange-300">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={subscribeNewsletter}
                onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
              />
              <span className="text-sm text-gray-300">
                Subscribe to our newsletter for market insights and updates
              </span>
            </label>
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
                Creating account...
              </div>
            ) : (
              'Create Account'
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
            onClick={() => handleOAuthSignIn(AuthProvider.GOOGLE)}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center p-3 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Chrome className="w-5 h-5 text-gray-300" />
          </motion.button>
          
          <motion.button
            type="button"
            onClick={() => handleOAuthSignIn(AuthProvider.LINKEDIN)}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center p-3 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Linkedin className="w-5 h-5 text-blue-400" />
          </motion.button>
          
          <motion.button
            type="button"
            onClick={() => handleOAuthSignIn(AuthProvider.APPLE)}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center p-3 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Apple className="w-5 h-5 text-gray-300" />
          </motion.button>
        </div>

        {/* Login Link */}
        {showLoginLink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}