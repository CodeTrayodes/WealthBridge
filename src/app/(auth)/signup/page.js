// app/auth/signup/page.jsx
import { Suspense } from 'react';
import { SignupForm } from '@/components/auth/SignUpForm';
import { AuthLayout } from '@/components/auth/AuthLayout';

export const metadata = {
  title: 'Create Account | WealthBridge - भारतीय Wealth Platform',
  description: 'Join thousands of NRIs worldwide who trust WealthBridge for their investment journey. Create your free account and start building wealth today.',
  keywords: 'signup, create account, NRI investment, wealth management, register, join',
  openGraph: {
    title: 'Join WealthBridge - Start Your Investment Journey',
    description: 'Create your free WealthBridge account and access AI-powered investment insights designed for NRIs.',
    url: 'https://wealthbridge.com/auth/signup',
    siteName: 'WealthBridge',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://wealthbridge.com/og-signup.jpg',
        width: 1200,
        height: 630,
        alt: 'Join WealthBridge - NRI Investment Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join WealthBridge - Start Your Investment Journey',
    description: 'Create your free WealthBridge account and access AI-powered investment insights designed for NRIs.',
    images: ['https://wealthbridge.com/twitter-signup.jpg'],
  },
  robots: {
    index: false, // Don't index auth pages
    follow: false,
  },
  alternates: {
    canonical: 'https://wealthbridge.com/auth/signup',
  },
};

// Loading component for Suspense fallback
function SignupLoading() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
          {/* Loading skeleton */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-2xl mb-4 animate-pulse" />
            <div className="h-6 bg-gray-800 rounded w-32 mx-auto mb-2 animate-pulse" />
            <div className="h-4 bg-gray-800 rounded w-56 mx-auto animate-pulse" />
          </div>
          
          <div className="space-y-6">
            {/* Full name field skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded w-20 animate-pulse" />
              <div className="h-12 bg-gray-800 rounded-xl animate-pulse" />
            </div>
            
            {/* Email field skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded w-24 animate-pulse" />
              <div className="h-12 bg-gray-800 rounded-xl animate-pulse" />
            </div>
            
            {/* Phone field skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded w-28 animate-pulse" />
              <div className="h-12 bg-gray-800 rounded-xl animate-pulse" />
            </div>
            
            {/* Password field skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded w-20 animate-pulse" />
              <div className="h-12 bg-gray-800 rounded-xl animate-pulse" />
              {/* Password strength indicator skeleton */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-800 rounded w-24 animate-pulse" />
                  <div className="h-3 bg-gray-800 rounded w-16 animate-pulse" />
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gray-800 h-2 rounded-full w-1/3 animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Referral code field skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded w-32 animate-pulse" />
              <div className="h-12 bg-gray-800 rounded-xl animate-pulse" />
            </div>
            
            {/* Terms and newsletter checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 bg-gray-800 rounded mt-0.5 animate-pulse" />
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-gray-800 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse" />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 bg-gray-800 rounded mt-0.5 animate-pulse" />
                <div className="h-4 bg-gray-800 rounded w-4/5 animate-pulse" />
              </div>
            </div>
            
            {/* Submit button skeleton */}
            <div className="h-12 bg-gray-800 rounded-xl animate-pulse" />
            
            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-700" />
              <div className="px-4 h-4 bg-gray-800 rounded w-32 animate-pulse" />
              <div className="flex-1 border-t border-gray-700" />
            </div>
            
            {/* OAuth buttons skeleton */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-800 rounded-xl animate-pulse" />
              ))}
            </div>
            
            {/* Login link skeleton */}
            <div className="text-center">
              <div className="h-4 bg-gray-800 rounded w-44 mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join WealthBridge and start your investment journey"
      showBackButton={true}
      backHref="/"
    >
      <Suspense fallback={<SignupLoading />}>
        <SignupForm />
      </Suspense>
    </AuthLayout>
  );
}