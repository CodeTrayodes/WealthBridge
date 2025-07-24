// app/auth/callback/page.jsx
import { Suspense } from 'react';
import { OAuthCallback } from '@/components/auth/OAuthCallback';
import { AuthLayout } from '@/components/auth/AuthLayout';

export const metadata = {
  title: 'Completing Sign In | WealthBridge - भारतीय Wealth Platform',
  description: 'Completing your secure Google sign-in to WealthBridge. Please wait while we finalize your authentication.',
  robots: {
    index: false, // Don't index callback pages
    follow: false,
  },
};

// Loading component for OAuth processing
function OAuthCallbackLoading() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl text-center">
          {/* Processing animation */}
          <div className="relative mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
            <div className="absolute inset-0 border-2 border-orange-500/30 border-t-orange-500 rounded-2xl animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
          </div>
          
          {/* Processing text */}
          <div className="space-y-2 mb-6">
            <div className="h-6 bg-orange-500/20 rounded w-32 mx-auto animate-pulse" />
            <div className="space-y-1">
              <div className="h-4 bg-orange-500/10 rounded w-48 mx-auto animate-pulse" />
              <div className="h-4 bg-orange-500/10 rounded w-36 mx-auto animate-pulse" />
            </div>
          </div>
          
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>

          {/* Security message */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <div className="space-y-2">
              <div className="h-4 bg-blue-500/20 rounded w-28 mx-auto animate-pulse" />
              <div className="h-3 bg-blue-500/10 rounded w-52 mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function OAuthCallbackPage() {
  return (
    <AuthLayout
      title="Completing Sign In"
      subtitle="Finalizing your secure authentication"
    >
      <Suspense fallback={<OAuthCallbackLoading />}>
        <OAuthCallback />
      </Suspense>
    </AuthLayout>
  );
}