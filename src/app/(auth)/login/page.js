import { Suspense } from "react"
import { LoginForm } from "@/components/auth/LoginForm"
import { AuthLayout } from "@/components/auth/AuthLayout"

export const metadata = {
  title: "Sign In | WealthBridge - भारतीय Wealth Platform",
  description:
    "Sign in to your WealthBridge account and access your personalized investment dashboard. Secure login for NRIs worldwide.",
  keywords: "login, sign in, NRI investment, wealth management, secure access",
  openGraph: {
    title: "Sign In to WealthBridge",
    description:
      "Access your investment portfolio and financial insights with secure login.",
    url: "https://wealthbridge.com/auth/login",
    siteName: "WealthBridge",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In to WealthBridge",
    description:
      "Access your investment portfolio and financial insights with secure login."
  },
  robots: {
    index: false, // Don't index auth pages
    follow: false
  }
}

// Loading component for Suspense fallback
function LoginLoading() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
          {/* Loading skeleton */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-2xl mb-4 animate-pulse" />
            <div className="h-6 bg-gray-800 rounded w-32 mx-auto mb-2 animate-pulse" />
            <div className="h-4 bg-gray-800 rounded w-48 mx-auto animate-pulse" />
          </div>

          <div className="space-y-6">
            {/* Email field skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded w-24 animate-pulse" />
              <div className="h-12 bg-gray-800 rounded-xl animate-pulse" />
            </div>

            {/* Password field skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded w-20 animate-pulse" />
              <div className="h-12 bg-gray-800 rounded-xl animate-pulse" />
            </div>

            {/* Remember me & forgot password skeleton */}
            <div className="flex justify-between">
              <div className="h-4 bg-gray-800 rounded w-24 animate-pulse" />
              <div className="h-4 bg-gray-800 rounded w-32 animate-pulse" />
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
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="h-12 bg-gray-800 rounded-xl animate-pulse"
                />
              ))}
            </div>

            {/* Sign up link skeleton */}
            <div className="text-center">
              <div className="h-4 bg-gray-800 rounded w-48 mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your WealthBridge account"
      showBackButton={true}
      backHref="/"
    >
      <Suspense fallback={<LoginLoading />}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  )
}
