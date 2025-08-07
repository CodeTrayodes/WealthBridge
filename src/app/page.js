// app/page.js - Homepage (About Us Landing)
"use client"

import { useState, useEffect } from "react"
import { 
  TrendingUp, 
  Shield, 
  Globe, 
  BarChart3, 
  Users, 
  Star,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Target,
  Heart,
  Zap
} from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, FeatureBadge } from "@/components/ui"

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-bg">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 floating-orb-1"></div>
        <div className="absolute bottom-32 right-20 floating-orb-2"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 floating-orb-3"></div>

        <div className="container-hero text-center space-y-8 relative z-10">
          
          {/* Hero Badge */}
          {/* <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <FeatureBadge icon={Sparkles} className="mx-auto">
              🇮🇳 Made for NRI Investors Worldwide
            </FeatureBadge>
          </div> */}

          {/* Main Headline */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="heading-hero mb-6">
              Wealth Management.
              <br />
              <span className="text-hero-accent">Reimagined.</span>
            </h1>
            <p className="text-subtitle mb-8">
              Bridge the gap between your global success and Indian investments. 
              Track, analyze, and grow your wealth with the most advanced NRI portfolio platform.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button variant="default" size="xl" className="group">
              Start Your Journey
            
            </Button>
            <Button variant="glass" size="xl">
              Watch Demo
            </Button>
          </div>

          {/* Stats Preview */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
              {[
                { value: "₹50Cr+", label: "Assets Tracked" },
                { value: "10K+", label: "NRI Investors" },
                { value: "50+", label: "Countries" },
                { value: "99.9%", label: "Uptime" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="stats-value">{stat.value}</div>
                  <div className="stats-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="scroll-indicator">
              <div className="w-1 h-3 bg-bs-blue-400 rounded-full animate-float"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-24 relative">
        <div className="container-hero">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <Badge variant="hero" size="lg">
                <Target className="w-4 h-4" />
                Our Mission
              </Badge>
              
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Impossible?
                  <br />
                  <span className="text-hero-accent">Maybe not.</span>
                </h2>
                
                <p className="text-xl text-gray-300 leading-relaxed">
                  For years, NRIs struggled with fragmented wealth tracking across multiple platforms, 
                  currency conversions, and regulatory complexities. We thought there had to be a better way.
                </p>
                
                <p className="text-lg text-gray-400 leading-relaxed">
                  Today, WealthBridge serves thousands of Indian investors worldwide, 
                  providing unified portfolio management, real-time insights, and regulatory compliance 
                  in one beautiful platform.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Badge variant="success" size="lg">
                  <Heart className="w-4 h-4" />
                  Trusted by 10,000+
                </Badge>
                <Badge variant="secondary" size="lg">
                  <Globe className="w-4 h-4" />
                  50+ Countries
                </Badge>
                <Badge variant="accent" size="lg">
                  <Zap className="w-4 h-4" />
                  Real-time Data
                </Badge>
              </div>
            </div>

            <div className="relative">
              <Card variant="elegant" className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-bs-blue-500 to-bs-purple-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Live Portfolio</h3>
                      <p className="text-sm text-muted-foreground">Real-time tracking</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { name: "Indian Equities", value: "₹15,67,890", change: "+12.4%" },
                      { name: "Mutual Funds", value: "₹8,45,200", change: "+8.9%" },
                      { name: "Fixed Deposits", value: "₹5,20,000", change: "+6.2%" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-bs-blue-500/5 rounded-lg border border-bs-blue-500/10">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.value}</div>
                        </div>
                        <Badge variant="success" size="sm">
                          {item.change}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-bs-purple-500 to-accent opacity-20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-bs-blue-500 to-bs-purple-500 opacity-30 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pb-20 lg:pb-24 bg-gradient-to-b from-background to-bs-gray-950">
        <div className="container-hero">
          
          <div className="text-center mb-16">
            <Badge variant="hero" className="mb-6">
              <Sparkles className="w-4 h-4" />
              Platform Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Everything you need to manage
              <span className="text-hero-accent"> NRI wealth</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From portfolio tracking to tax optimization, we've built every feature 
              with the unique needs of Non-Resident Indians in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Real-time Portfolio Tracking",
                description: "Monitor all your Indian investments in real-time with live market data, performance analytics, and detailed insights."
              },
              {
                icon: Shield,
                title: "Bank-grade Security",
                description: "Your data is protected with enterprise-level encryption, secure APIs, and compliance with international standards."
              },
              {
                icon: Globe,
                title: "Multi-currency Support",
                description: "View your portfolio in INR, USD, EUR, GBP, and more. Automatic currency conversion with live exchange rates."
              },
              {
                icon: Users,
                title: "Family Portfolio Management",
                description: "Manage multiple family member portfolios from a single dashboard with role-based access and permissions."
              },
              {
                icon: Star,
                title: "Tax Optimization",
                description: "Get personalized tax planning advice for NRIs including LTCG, STCG, and treaty benefits across countries."
              },
              {
                icon: TrendingUp,
                title: "Advanced Analytics",
                description: "Deep insights into asset allocation, performance attribution, risk analysis, and market correlation studies."
              }
            ].map((feature, index) => (
              <Card key={index} variant="feature" className="group hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-bs-blue-500 to-bs-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-glow-blue transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg"></div>
        
        <div className="container-hero text-center relative z-10">
          <Badge variant="gradient" size="xl" className="mb-8">
            <Zap className="w-5 h-5" />
            Ready to Transform Your Wealth Management?
          </Badge>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            Your financial future
            <br />
            <span className="text-hero-accent">starts here.</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of NRIs who trust WealthBridge to manage their Indian investments. 
            Start your journey today with a free account.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="default" size="xl" className="group">
              Start Free Trial
            </Button>
            <Button variant="outline" size="xl">
              Schedule Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-12 border-t border-border/30">
            <p className="text-sm text-muted-foreground mb-6">Trusted by investors from</p>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
              {['🇺🇸 USA', '🇬🇧 UK', '🇨🇦 Canada', '🇦🇺 Australia', '🇸🇬 Singapore', '🇦🇪 UAE'].map((country, index) => (
                <div key={index} className="text-sm font-medium">
                  {country}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage