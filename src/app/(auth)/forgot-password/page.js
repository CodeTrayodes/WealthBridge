// app/auth/forgot-password/page.js
import { Suspense } from 'react';
import { ForgotPassword } from '@/components/auth/ForgotPassword';
import { AuthLayout } from '@/components/auth/AuthLayout';

export const metadata = {
  title: 'Reset Password | WealthBridge - भारतीय Wealth Platform',
  description: 'Forgot your WealthBridge password? Reset it securely and regain access to your investment portfolio. Quick and secure password recovery for NRIs.',
  keywords: 'forgot password, reset password, password recovery, account recovery, secure reset',
  openGraph: {
    title: 'Reset Your WealthBridge Password',
    description: 'Securely reset your password and regain access to your investment portfolio.',
    url: 'https://wealthbridge.com/auth/forgot-password',
    siteName: 'WealthBridge',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://wealthbridge.com/og-password-reset.jpg',
        width: 1200,
        height: 630,
        alt: 'WealthBridge Password Reset - Secure Recovery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reset Your WealthBridge Password',
    description: 'Securely reset your password and regain access to your investment portfolio.',
    images: ['https://wealthbridge.com/twitter-password-reset.jpg'],
  },
  robots: {
    index: false, // Don't index auth pages
    follow: false,
  },
  alternates: {
    canonical: 'https://wealthbridge.com/auth/forgot-password',
  },
};

// Loading component for Suspense fallback
function ForgotPasswordLoading() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
          {/* Loading skeleton */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-2xl mb-4 animate-pulse" />
            <div className="h-6 bg-gray-800 rounded w-36 mx-auto mb-2 animate-pulse" />
            <div className="space-y-1">
              <div className="h-4 bg-gray-800 rounded w-64 mx-auto animate-pulse" />
              <div className="h-4 bg-gray-800 rounded w-48 mx-auto animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Email field skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded w-24 animate-pulse" />
              <div className="h-12 bg-gray-800 rounded-xl animate-pulse" />
            </div>
            
            {/* Submit button skeleton */}
            <div className="h-12 bg-gray-800 rounded-xl animate-pulse" />
          </div>

          {/* Help information skeleton */}
          <div className="mt-6 p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-gray-800 rounded mt-0.5 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-800 rounded w-20 animate-pulse" />
                <div className="space-y-1">
                  <div className="h-3 bg-gray-800 rounded w-full animate-pulse" />
                  <div className="h-3 bg-gray-800 rounded w-5/6 animate-pulse" />
                  <div className="h-3 bg-gray-800 rounded w-4/5 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Back to login skeleton */}
          <div className="mt-8 text-center">
            <div className="h-4 bg-gray-800 rounded w-28 mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

// Success state loading skeleton
function SuccessStateLoading() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl text-center">
          {/* Success icon skeleton */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-2xl mb-6 animate-pulse" />
          
          {/* Title and description skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-6 bg-gray-800 rounded w-32 mx-auto animate-pulse" />
            <div className="h-4 bg-gray-800 rounded w-48 mx-auto animate-pulse" />
          </div>
          
          {/* Email display skeleton */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-6">
            <div className="h-4 bg-gray-800 rounded w-40 mx-auto animate-pulse" />
          </div>

          {/* Help text skeleton */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="h-4 bg-gray-800 rounded w-56 mx-auto animate-pulse" />
              <div className="h-4 bg-gray-800 rounded w-44 mx-auto animate-pulse" />
            </div>
            
            {/* Resend button skeleton */}
            <div className="h-10 bg-gray-800 rounded w-24 mx-auto animate-pulse" />
          </div>

          {/* Back to login skeleton */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="h-4 bg-gray-800 rounded w-28 mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="We'll help you get back into your account"
      showBackButton={true}
      backHref="/auth/login"
    >
      <Suspense fallback={<ForgotPasswordLoading />}>
        <ForgotPassword />
      </Suspense>
    </AuthLayout>
  );
}