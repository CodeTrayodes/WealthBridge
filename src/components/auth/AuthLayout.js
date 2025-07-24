// src/components/auth/AuthLayout.tsx
"use client"
import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Shield, TrendingUp, Globe, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your data is protected with enterprise-level encryption"
  },
  {
    icon: TrendingUp,
    title: "Smart Investing",
    description: "AI-powered insights for better investment decisions"
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Manage your wealth from anywhere in the world"
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Dedicated support from financial experts"
  }
]

export function AuthLayout({
  children,
  title,
  subtitle,
  showBackButton = false,
  backHref = "/",
  className
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Universal Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-12 w-64 h-64 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-12 w-48 h-48 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-full blur-3xl" />

      {/* Mobile Layout */}
      <div className="md:hidden relative z-10">
        {/* Mobile Header */}
        <div className="bg-black/20 backdrop-blur-xl border-b border-gray-800/30 p-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white">WealthBridge</h1>
                <p className="text-xs text-gray-400">भारतीय Wealth Platform</p>
              </div>
            </Link>
            <div className="w-12" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="p-4">
          {/* Page Title */}
          {(title || subtitle) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              {title && (
                <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
              )}
              {subtitle && <p className="text-gray-400">{subtitle}</p>}
            </motion.div>
          )}

          {/* Form Content */}
          <div className={cn("w-full max-w-sm mx-auto mb-8", className)}>
            {children}
          </div>

          {/* Mobile Features */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4">
                Why choose WealthBridge?
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-black/20 backdrop-blur-xl border border-gray-800/30 rounded-xl p-3 text-center"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <feature.icon className="w-4 h-4 text-orange-400" />
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="bg-black/20 backdrop-blur-xl border-t border-gray-800/30 p-4 mt-8">
          <div className="text-center text-xs text-gray-400">
            <p className="mb-2">© 2025 WealthBridge. All rights reserved.</p>
            <div className="flex justify-center gap-4">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/support"
                className="hover:text-white transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Equal 6-6 Split */}
      <div className="hidden md:flex min-h-screen relative z-10">
        {/* Left Side - Branding & Features (6/12) */}
        <div className="w-1/2 flex flex-col p-6 lg:p-10 text-white">
          {/* Header */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">WealthBridge</h1>
                <p className="text-sm text-gray-400">भारतीय Wealth Platform</p>
              </div>
            </Link>
          </div>

          {/* Main Content - Centered */}
          <div className="space-y-8 my-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                Your Global
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  {" "}
                  Wealth Journey{" "}
                </span>
                Starts Here
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Secure, seamless, and smart—track and grow your wealth with
                AI-powered insights and expert-led guidance built specifically
                for NRIs and their families.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Side - Auth Forms (6/12) */}
        <div className="w-1/2 flex flex-col justify-center p-6 lg:p-10">
          {/* Page Title */}
          {/* {(title || subtitle) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              {title && (
                <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
              )}
              {subtitle && (
                <p className="text-gray-400">{subtitle}</p>
              )}
            </motion.div>
          )} */}

          {/* Form Content */}
          <div className={cn("w-full max-w-md mx-auto", className)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
