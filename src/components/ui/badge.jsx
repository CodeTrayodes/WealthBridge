// src/components/ui/Badge.jsx
"use client"

import { forwardRef } from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: [
          "bg-bs-blue-500/10 border-bs-blue-500/30 text-bs-blue-400",
          "hover:bg-bs-blue-500/20 hover:border-bs-blue-500/50",
          "backdrop-blur-sm"
        ],
        hero: [
          "bg-gradient-to-r from-bs-blue-500/10 to-bs-purple-500/10",
          "border border-bs-blue-500/20 backdrop-blur-sm",
          "text-bs-blue-400 shadow-lg hover:shadow-glow-blue",
          "hover:from-bs-blue-500/20 hover:to-bs-purple-500/20"
        ],
        success: [
          "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
          "hover:bg-emerald-500/20 hover:border-emerald-500/50"
        ],
        warning: [
          "bg-amber-500/10 border-amber-500/30 text-amber-400",
          "hover:bg-amber-500/20 hover:border-amber-500/50"
        ],
        destructive: [
          "bg-red-500/10 border-red-500/30 text-red-400",
          "hover:bg-red-500/20 hover:border-red-500/50"
        ],
        outline: [
          "border-bs-blue-500/50 text-bs-blue-400 bg-transparent",
          "hover:bg-bs-blue-500/10 hover:border-bs-blue-400"
        ],
        secondary: [
          "bg-bs-purple-500/10 border-bs-purple-500/30 text-bs-purple-400",
          "hover:bg-bs-purple-500/20 hover:border-bs-purple-500/50"
        ],
        accent: [
          "bg-accent/10 border-accent/30 text-accent",
          "hover:bg-accent/20 hover:border-accent/50"
        ],
        glass: [
          "bg-white/10 border-white/20 text-white backdrop-blur-md",
          "hover:bg-white/20 hover:border-white/30"
        ],
        gradient: [
          "bg-gradient-to-r from-bs-blue-500 to-bs-purple-500",
          "text-white border-transparent shadow-md",
          "hover:shadow-glow-blue hover:scale-105"
        ],
        status: {
          profit: [
            "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
            "animate-pulse-glow"
          ],
          loss: [
            "bg-red-500/10 border-red-500/30 text-red-400",
            "animate-pulse-glow"
          ],
          neutral: [
            "bg-gray-500/10 border-gray-500/30 text-gray-400"
          ]
        }
      },
      size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1.5 text-xs",
        default: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

const Badge = forwardRef(({ className, variant, size, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </div>
  )
})

// Status Badge for Financial Data
const StatusBadge = forwardRef(({ value, className, ...props }, ref) => {
  const getVariant = (val) => {
    if (val > 0) return "status.profit"
    if (val < 0) return "status.loss"
    return "status.neutral"
  }

  const getPrefix = (val) => {
    if (val > 0) return "+"
    return ""
  }

  return (
    <Badge
      ref={ref}
      variant={getVariant(value)}
      className={className}
      {...props}
    >
      {getPrefix(value)}{value}%
    </Badge>
  )
})

// Feature Badge with Icon
const FeatureBadge = forwardRef(({ icon: Icon, children, className, ...props }, ref) => (
  <Badge
    ref={ref}
    variant="hero"
    className={cn("tracking-wide", className)}
    {...props}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {children}
  </Badge>
))

Badge.displayName = "Badge"
StatusBadge.displayName = "StatusBadge"
FeatureBadge.displayName = "FeatureBadge"

export { Badge, badgeVariants, StatusBadge, FeatureBadge }