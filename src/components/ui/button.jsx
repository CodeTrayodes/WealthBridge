import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-glow-orange transform hover:scale-105 active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-orange-500/30 bg-transparent text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/50 hover:text-orange-300",
        secondary:
          "bg-card/80 backdrop-blur-sm border border-orange-500/20 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/40 hover:text-orange-300",
        ghost:
          "text-gray-300 hover:bg-orange-500/10 hover:text-orange-400",
        link:
          "text-orange-400 underline-offset-4 hover:underline hover:text-orange-300",
        gradient:
          "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 shadow-lg hover:shadow-glow-orange",
        elegant:
          "bg-card/60 backdrop-blur-md border border-orange-500/20 text-white hover:bg-orange-500/10 hover:border-orange-500/40 shadow-lg hover:shadow-glow-orange",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base font-semibold",
        xl: "h-14 rounded-xl px-10 text-lg font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
