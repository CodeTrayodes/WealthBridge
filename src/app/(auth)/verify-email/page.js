// app/auth/verify-email/page.js
import { Suspense } from 'react';
import { VerifyEmail } from '@/components/auth/VerifyEmail';
import { AuthLayout } from '@/components/auth/AuthLayout';

export const metadata = {
  title: 'Verify Email | WealthBridge - भारतीय Wealth Platform',
  description: 'Verify your email address to secure your WealthBridge account and unlock full access to your investment dashboard. Quick email verification for NRIs.',
  keywords: 'email verification, verify account, confirm email, account security, email confirmation',
  openGraph: {
    title: 'Verify Your WealthBridge Email',
    description: 'Complete your account setup by verifying your email address. Secure your investment platform access.',
    url: 'https://wealthbridge.com/auth/verify-email',
    siteName: 'WealthBridge',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://wealthbridge.com/og-email-verification.jpg',
        width: 1200,
        height: 630,
        alt: 'WealthBridge Email Verification - Secure Your Account',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verify Your WealthBridge Email',
    description: 'Complete your account setup by verifying your email address. Secure your investment platform access.',
    images: ['https://wealthbridge.com/twitter-email-verification.jpg'],
  },
  robots: {
    index: false, // Don't index auth pages
    follow: false,
  },
  alternates: {
    canonical: 'https://wealthbridge.com/auth/verify-email',
  },
};

// Loading component for pending verification state
function VerifyEmailLoading() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl text-center">
          {/* Loading skeleton */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-2xl mb-6 animate-pulse" />
          
          {/* Title and description skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-6 bg-gray-800 rounded w-32 mx-auto animate-pulse" />
            <div className="space-y-1">
              <div className="h-4 bg-gray-800 rounded w-64 mx-auto animate-pulse" />
              <div className="h-4 bg-gray-800 rounded w-48 mx-auto animate-pulse" />
            </div>
          </div>
          
          {/* Email display skeleton */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-6">
            <div className="h-4 bg-gray-800 rounded w-48 mx-auto animate-pulse" />
          </div>

          {/* Action buttons skeleton */}
          <div className="space-y-4">
            <div className="h-12 bg-gray-800 rounded-xl animate-pulse" />
          </div>

          {/* Help information skeleton */}
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl">
              <div className="flex items-start gap-3 text-left">
                <div className="w-5 h-5 bg-gray-800 rounded mt-0.5 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-32 animate-pulse" />
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-800 rounded w-full animate-pulse" />
                    <div className="h-3 bg-gray-800 rounded w-5/6 animate-pulse" />
                    <div className="h-3 bg-gray-800 rounded w-4/5 animate-pulse" />
                    <div className="h-3 bg-gray-800 rounded w-3/4 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Email app buttons skeleton */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-12 bg-gray-800 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>

          {/* Footer navigation skeleton */}
          <div className="mt-8 pt-6 border-t border-gray-700 space-y-3">
            <div className="h-4 bg-gray-800 rounded w-32 mx-auto animate-pulse" />
            <div className="h-3 bg-gray-800 rounded w-40 mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

// Loading component for verifying state
function VerifyingLoading() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl text-center">
          {/* Verifying animation */}
          <div className="relative mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
            <div className="absolute inset-0 border-2 border-blue-500/30 border-t-blue-500 rounded-2xl animate-spin" />
          </div>
          
          {/* Verifying text */}
          <div className="space-y-2 mb-6">
            <div className="h-6 bg-blue-500/20 rounded w-24 mx-auto animate-pulse" />
            <div className="h-4 bg-blue-500/10 rounded w-56 mx-auto animate-pulse" />
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 text-blue-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

// Loading component for success state
function SuccessLoading() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl text-center">
          {/* Success animation */}
          <div className="relative mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl animate-pulse">
              <div className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Success text */}
          <div className="space-y-2 mb-6">
            <div className="h-6 bg-green-500/20 rounded w-28 mx-auto animate-pulse" />
            <div className="h-4 bg-green-500/10 rounded w-52 mx-auto animate-pulse" />
          </div>
          
          {/* Redirect message */}
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <div className="h-4 bg-green-500/20 rounded w-44 mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

// Loading component for error state
function ErrorLoading() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl text-center">
          {/* Error icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl mb-6 animate-pulse" />
          
          {/* Error text */}
          <div className="space-y-2 mb-6">
            <div className="h-6 bg-red-500/20 rounded w-36 mx-auto animate-pulse" />
            <div className="h-4 bg-red-500/10 rounded w-48 mx-auto animate-pulse" />
          </div>
          
          {/* Error message */}
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-6">
            <div className="space-y-2">
              <div className="h-4 bg-red-500/20 rounded w-28 mx-auto animate-pulse" />
              <div className="h-3 bg-red-500/10 rounded w-40 mx-auto animate-pulse" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            <div className="h-12 bg-red-500/20 rounded-xl animate-pulse" />
            <div className="h-12 bg-gray-800 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function VerifyEmailPage() {
  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="Complete your account setup"
      showBackButton={true}
      backHref="/auth/signup"
    >
      <Suspense fallback={<VerifyEmailLoading />}>
        <VerifyEmail />
      </Suspense>
    </AuthLayout>
  );
}