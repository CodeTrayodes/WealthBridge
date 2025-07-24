// src/components/auth/AuthGuard.tsx
"use client"
import React, { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Loader2, AlertTriangle, Lock, UserX } from "lucide-react"
import { useAuth, useIsAuthenticated, useAuthUser } from "@/hooks/useAuth"
import { UserRole, UserStatus } from "@/lib/auth/auth-types"
import { cn } from "@/lib/utils"

const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-orange-500/30 border-t-orange-500 rounded-2xl"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">
          Loading WealthBridge
        </h2>
        <p className="text-gray-400">Securing your session...</p>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
        <span className="text-sm text-gray-400">Please wait</span>
      </div>
    </motion.div>
  </div>
)

const ErrorScreen = ({ type, onRetry, onRedirect }) => {
  const getErrorContent = () => {
    switch (type) {
      case "unauthenticated":
        return {
          icon: UserX,
          title: "Authentication Required",
          description: "Please sign in to access this page.",
          actionText: "Sign In",
          actionColor: "from-orange-500 to-amber-500"
        }
      case "forbidden":
        return {
          icon: Lock,
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          actionText: "Go to Dashboard",
          actionColor: "from-red-500 to-rose-500"
        }
      case "verification_required":
        return {
          icon: AlertTriangle,
          title: "Email Verification Required",
          description: "Please verify your email address to continue.",
          actionText: "Verify Email",
          actionColor: "from-blue-500 to-cyan-500"
        }
      case "onboarding_required":
        return {
          icon: Shield,
          title: "Complete Your Profile",
          description: "Please complete your profile setup to continue.",
          actionText: "Complete Setup",
          actionColor: "from-orange-500 to-amber-500"
        }
      case "suspended":
        return {
          icon: AlertTriangle,
          title: "Account Suspended",
          description:
            "Your account has been suspended. Please contact support.",
          actionText: "Contact Support",
          actionColor: "from-red-500 to-rose-500"
        }
      default:
        return {
          icon: AlertTriangle,
          title: "Access Error",
          description: "There was an error accessing this page.",
          actionText: "Try Again",
          actionColor: "from-gray-500 to-gray-600"
        }
    }
  }

  const content = getErrorContent()
  const IconComponent = content.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className={cn(
            "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6",
            `bg-gradient-to-r ${content.actionColor}`
          )}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </motion.div>

        <h1 className="text-2xl font-bold text-white mb-2">{content.title}</h1>

        <p className="text-gray-400 mb-8">{content.description}</p>

        <div className="space-y-4">
          {onRedirect && (
            <motion.button
              onClick={onRedirect}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full py-3 px-4 rounded-xl font-medium transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-orange-500/50",
                `bg-gradient-to-r ${content.actionColor} text-white shadow-lg hover:shadow-orange-500/25`
              )}
            >
              {content.actionText}
            </motion.button>
          )}

          {onRetry && (
            <motion.button
              onClick={onRetry}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/50 bg-gray-800 text-gray-300 hover:bg-gray-700"
            >
              Try Again
            </motion.button>
          )}
        </div>

        {type === "suspended" && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-sm">
              If you believe this is an error, please contact our support team
              with your account details.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export function AuthGuard({
  children,
  requiredRole,
  requireEmailVerification = true,
  requireOnboardingComplete = true,
  fallback,
  redirectTo,
  className
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isInitialized, checkSession } = useAuth()
  const isAuthenticated = useIsAuthenticated()
  const user = useAuthUser()

  const [authState, setAuthState] = useState("loading")
  const [isRetrying, setIsRetrying] = useState(false)

  // Check authentication state
  useEffect(() => {
    const checkAuthState = async () => {
      // Wait for auth to initialize
      if (!isInitialized) {
        setAuthState("loading")
        return
      }

      // Check session validity
      await checkSession()

      // Not authenticated
      if (!isAuthenticated || !user) {
        setAuthState("unauthenticated")
        return
      }

      // Check account status
      if (user.status === UserStatus.SUSPENDED) {
        setAuthState("suspended")
        return
      }

      if (user.status === UserStatus.DEACTIVATED) {
        setAuthState("suspended")
        return
      }

      // Check email verification
      if (requireEmailVerification && !user.emailVerified) {
        setAuthState("verification_required")
        return
      }

      // Check onboarding completion
      if (requireOnboardingComplete && !user.onboardingCompleted) {
        setAuthState("onboarding_required")
        return
      }

      // Check role requirements
      if (requiredRole && user.role !== requiredRole) {
        // Check if user has sufficient role level
        const roleHierarchy = {
          [UserRole.USER]: 0,
          [UserRole.PREMIUM]: 1,
          [UserRole.ADMIN]: 2,
          [UserRole.SUPER_ADMIN]: 3
        }

        const userLevel = roleHierarchy[user.role] || 0
        const requiredLevel = roleHierarchy[requiredRole] || 0

        if (userLevel < requiredLevel) {
          setAuthState("forbidden")
          return
        }
      }

      // All checks passed
      setAuthState("authenticated")
    }

    checkAuthState()
  }, [
    isInitialized,
    isAuthenticated,
    user,
    requiredRole,
    requireEmailVerification,
    requireOnboardingComplete,
    checkSession
  ])

  // Handle redirects
  useEffect(() => {
    if (authState === "loading") return

    const getRedirectPath = () => {
      switch (authState) {
        case "unauthenticated":
          return (
            redirectTo ||
            `/login?redirectTo=${encodeURIComponent(pathname)}`
          )
        case "verification_required":
          return "/verify-email"
        case "onboarding_required":
          return "/onboarding"
        case "forbidden":
          return "/dashboard"
        case "suspended":
          return null // Don't redirect, show error screen
        default:
          return null
      }
    }

    const redirectPath = getRedirectPath()
    if (redirectPath && pathname !== redirectPath) {
      router.push(redirectPath)
    }
  }, [authState, pathname, router, redirectTo])

  const handleRetry = async () => {
    setIsRetrying(true)
    setAuthState("loading")

    try {
      await checkSession()
      // The useEffect will handle the state update
    } catch (error) {
      console.error("Retry failed:", error)
    } finally {
      setIsRetrying(false)
    }
  }

  const handleRedirect = () => {
    switch (authState) {
      case "unauthenticated":
        router.push(
          redirectTo || `/login?redirectTo=${encodeURIComponent(pathname)}`
        )
        break
      case "verification_required":
        router.push("/verify-email")
        break
      case "onboarding_required":
        router.push("/onboarding")
        break
      case "forbidden":
        router.push("/dashboard")
        break
      case "suspended":
        router.push("/support")
        break
    }
  }

  // Show loading screen
  if (authState === "loading" || isRetrying) {
    return fallback || <LoadingScreen />
  }

  // Show error screens for various auth states
  if (authState !== "authenticated") {
    return (
      <ErrorScreen
        type={authState}
        onRetry={handleRetry}
        onRedirect={handleRedirect}
      />
    )
  }

  // User is authenticated and authorized
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="authenticated-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Convenience components for common use cases
export const ProtectedRoute = ({ children, ...props }) => (
  <AuthGuard {...props}>{children}</AuthGuard>
)

export const AdminRoute = ({ children, ...props }) => (
  <AuthGuard requiredRole={UserRole.ADMIN} {...props}>
    {children}
  </AuthGuard>
)

export const SuperAdminRoute = ({ children, ...props }) => (
  <AuthGuard requiredRole={UserRole.SUPER_ADMIN} {...props}>
    {children}
  </AuthGuard>
)

export const PremiumRoute = ({ children, ...props }) => (
  <AuthGuard requiredRole={UserRole.PREMIUM} {...props}>
    {children}
  </AuthGuard>
)
