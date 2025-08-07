// src/components/ui/Button.jsx
"use client"

import { forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-r from-bs-blue-500 to-bs-purple-500",
          "text-white shadow-lg hover:shadow-glow-blue",
          "transform hover:scale-105 active:scale-95",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-bs-blue-400 before:to-bs-purple-400",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
        ],
        secondary: [
          "bg-card/80 backdrop-blur-sm border-2 border-bs-blue-500/30",
          "text-bs-blue-400 hover:text-bs-blue-300",
          "hover:bg-bs-blue-500/10 hover:border-bs-blue-500/50",
          "shadow-md hover:shadow-glow-blue/50"
        ],
        ghost: [
          "text-bs-blue-400 hover:text-white",
          "hover:bg-bs-blue-500/10",
          "backdrop-blur-sm"
        ],
        outline: [
          "border-2 border-bs-blue-500/50 bg-transparent",
          "text-bs-blue-400 hover:text-white",
          "hover:bg-bs-blue-500/20 hover:border-bs-blue-400",
          "backdrop-blur-sm shadow-sm hover:shadow-glow-blue/30"
        ],
        gradient: [
          "bg-gradient-to-r from-bs-blue-500 via-bs-purple-500 to-accent-500",
          "text-white shadow-xl hover:shadow-glow-purple",
          "transform hover:scale-105 active:scale-95",
          "animate-gradient-shift bg-[length:100%_100%]"
        ],
        glass: [
          "bg-white/10 backdrop-blur-md border border-white/20",
          "text-white hover:bg-white/20",
          "shadow-lg hover:shadow-glow-blue/30"
        ],
        destructive: [
          "bg-gradient-to-r from-red-500 to-red-600",
          "text-white hover:shadow-lg hover:shadow-red-500/30",
          "transform hover:scale-105 active:scale-95"
        ]
      },
      size: {
        sm: "h-9 px-4 py-2 text-xs",
        default: "h-11 px-8 py-3 text-sm",
        lg: "h-14 px-10 py-4 text-base",
        xl: "h-16 px-12 py-5 text-lg",
        icon: "h-10 w-10 p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = forwardRef(({ className, variant, size, asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Comp>
  )
})

Button.displayName = "Button"

export { Button, buttonVariants }