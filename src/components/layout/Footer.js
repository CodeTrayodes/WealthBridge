// src/components/layout/Footer.jsx
"use client"

import Link from "next/link"
import { TrendingUp, Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react"
import { Button, Badge } from "@/components/ui"

const footerSections = [
  {
    title: "Platform",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Security", href: "/security" },
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "News & Insights", href: "/news" },
      { name: "Help Center", href: "/help" },
      { name: "API Documentation", href: "/docs" },
      { name: "Tutorials", href: "/tutorials" },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Compliance", href: "/compliance" },
    ]
  }
]

const contactInfo = [
  { icon: Mail, text: "support@wealthbridge.in", href: "mailto:support@wealthbridge.in" },
  { icon: Phone, text: "+91 80XXX XXXXX", href: "tel:+918000000000" },
  { icon: MapPin, text: "Mumbai, Maharashtra, India", href: "#" },
]

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/wealthbridge", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/wealthbridge", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/wealthbridge", label: "GitHub" },
]

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-background to-bs-gray-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-hero-pattern"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="container-hero py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-5">
              <div className="space-y-6">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-bs-blue-500 to-bs-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-glow-blue transition-all duration-300">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-bs-blue-500 to-bs-purple-500 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-sm"></div>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-bs-blue-400 to-bs-purple-400 bg-clip-text text-transparent">
                      WealthBridge
                    </h2>
                    <p className="text-sm text-muted-foreground">भारतीय Wealth Platform</p>
                  </div>
                </Link>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Empowering NRI investors with comprehensive portfolio management, 
                  real-time insights, and secure wealth tracking across global markets.
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                  <Badge variant="hero" size="sm">
                    🏆 Trusted Platform
                  </Badge>
                  <Badge variant="secondary" size="sm">
                    🔒 Bank-Grade Security
                  </Badge>
                  <Badge variant="accent" size="sm">
                    📱 Mobile First
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  {contactInfo.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-bs-blue-400 transition-colors duration-300 group"
                    >
                      <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>{item.text}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {footerSections.map((section) => (
                  <div key={section.title} className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-bs-blue-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border/50">
          <div className="container-hero py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Stay Updated
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get the latest market insights and platform updates
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 min-w-0 sm:min-w-96">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-card/50 border border-border/50 rounded-lg text-sm placeholder:text-muted-foreground focus:border-bs-blue-500/50 focus:ring-1 focus:ring-bs-blue-500/30 transition-all duration-300"
                />
                <Button variant="default" size="sm" className="whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border/50 bg-bs-gray-950/50">
          <div className="container-hero py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="text-sm text-muted-foreground text-center md:text-left">
                © 2025 WealthBridge. All rights reserved. Made with 💙 in India
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-bs-blue-400 hover:bg-bs-blue-500/10 rounded-lg transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 pt-6 border-t border-border/30 text-center">
              <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                <strong>Disclaimer:</strong> WealthBridge is a portfolio management platform. 
                Investments are subject to market risks. Please read all scheme-related documents carefully. 
                Past performance is not indicative of future returns. 
                This platform is designed specifically for Non-Resident Indians (NRIs).
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer