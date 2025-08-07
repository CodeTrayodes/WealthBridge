// src/components/ui/Card.jsx
"use client"

import { forwardRef } from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-xl transition-all duration-300",
  {
    variants: {
      variant: {
        default: [
          "bg-card/80 backdrop-blur-sm border border-border/50",
          "shadow-card-elegant hover:shadow-card-hover",
          "hover:border-primary/20"
        ],
        glass: [
          "bg-white/5 backdrop-blur-md border border-white/10",
          "shadow-xl hover:shadow-glow-blue/20",
          "hover:bg-white/10"
        ],
        stats: [
          "bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md",
          "border border-bs-blue-500/20 shadow-lg",
          "hover:shadow-glow-blue",
          "bg-gradient-to-br from-bs-blue-500/8 to-bs-purple-500/5"
        ],
        elegant: [
          "bg-card/50 backdrop-blur-md border border-bs-blue-500/20",
          "shadow-xl hover:shadow-glow-blue",
          "bg-gradient-to-br from-bs-blue-500/5 via-bs-purple-500/3 to-transparent"
        ],
        feature: [
          "bg-gradient-to-br from-bs-blue-500/10 to-bs-purple-500/5",
          "border border-bs-blue-500/30 backdrop-blur-sm",
          "shadow-lg hover:shadow-glow-purple/30",
          "hover:border-bs-purple-500/40"
        ],
        minimal: [
          "bg-card border border-border",
          "shadow-sm hover:shadow-md"
        ]
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

const Card = forwardRef(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, size }), className)}
    {...props}
  />
))

const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 pb-4", className)}
    {...props}
  />
))

const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-tight tracking-tight text-foreground",
      "bg-gradient-to-r from-bs-blue-400 to-bs-purple-400 bg-clip-text text-transparent",
      className
    )}
    {...props}
  />
))

const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
))

const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-4", className)} {...props} />
))

const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between pt-4 border-t border-border/50", className)}
    {...props}
  />
))

Card.displayName = "Card"
CardHeader.displayName = "CardHeader"
CardTitle.displayName = "CardTitle"
CardDescription.displayName = "CardDescription"
CardContent.displayName = "CardContent"
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}