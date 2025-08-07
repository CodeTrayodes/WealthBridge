// src/components/layout/Header.jsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, TrendingUp, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "About Us", href: "/", description: "Our mission and vision" },
  { name: "News", href: "/news", description: "Latest financial insights" },
  { name: "Dashboard", href: "/dashboard", description: "Your portfolio overview" },
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-lg" 
          : "bg-transparent"
      )}
    >
      <nav className="container-hero py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-bs-blue-500 to-bs-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-glow-blue transition-all duration-300 group-hover:scale-105">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-bs-blue-500 to-bs-purple-500 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-sm"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-bs-blue-400 to-bs-purple-400 bg-clip-text text-transparent">
                WealthBridge
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">भारतीय Wealth Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative px-3 py-2 text-sm font-medium transition-colors duration-300",
                  isActive(item.href)
                    ? "text-bs-blue-400"
                    : "text-muted-foreground hover:text-white"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-bs-blue-400 to-bs-purple-400 transition-transform duration-300 origin-center",
                  isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}></span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="default" size="sm">
              <Link href="/get-started">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-white transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="absolute top-full left-0 right-0 mt-2 mx-4 bg-card/95 backdrop-blur-lg border border-border/50 rounded-2xl shadow-xl overflow-hidden">
              {/* Mobile Header */}
              <div className="px-6 py-4 border-b border-border/50">
                <Badge variant="hero" size="sm">
                  <BarChart3 className="w-3 h-3" />
                  NRI Wealth Management
                </Badge>
              </div>

              {/* Mobile Navigation Items */}
              <div className="py-4">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group block px-6 py-4 transition-colors duration-300",
                      isActive(item.href)
                        ? "bg-bs-blue-500/10 border-r-2 border-bs-blue-400"
                        : "hover:bg-bs-blue-500/5"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={cn(
                          "text-base font-medium transition-colors duration-300",
                          isActive(item.href)
                            ? "text-bs-blue-400"
                            : "text-foreground group-hover:text-bs-blue-400"
                        )}>
                          {item.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                      <div className={cn(
                        "w-2 h-2 bg-bs-blue-500 rounded-full transition-opacity duration-300",
                        isActive(item.href) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      )}></div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="px-6 py-4 border-t border-border/50 space-y-3">
                <Button variant="ghost" size="sm" className="w-full justify-center" asChild>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Login to Dashboard
                  </Link>
                </Button>
                <Button variant="default" size="sm" className="w-full justify-center" asChild>
                  <Link href="/get-started" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started Today
                  </Link>
                </Button>
              </div>

              {/* Mobile Footer */}
              <div className="px-6 py-3 bg-bs-blue-500/5 text-center">
                <p className="text-xs text-muted-foreground">
                  Trusted by 10,000+ NRI investors worldwide
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header