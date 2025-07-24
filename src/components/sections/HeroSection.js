'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Users, ArrowRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const animatedTexts = [
  "Global Indians",
  "NRI Families", 
  "Cross-Border Investors",
  "Wealth Builders",
  "Smart Investors"
];

const AnimatedText = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentTextIndex}
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.8 }}
        transition={{ 
          duration: 0.6,
          ease: "easeInOut"
        }}
        className="text-hero-accent"
      >
        {animatedTexts[currentTextIndex]}
      </motion.span>
    </AnimatePresence>
  );
};

const HeroSection = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: TrendingUp, text: "Track Global Investments", color: "text-orange-400" },
    { icon: Shield, text: "Bank-Level Security", color: "text-amber-400" },
    { icon: Users, text: "Family Portfolio Management", color: "text-orange-300" },
  ];

  const stats = [
    { 
      label: "Global NRIs Served", 
      value: "1,000+", 
      icon: "🌍",
      description: "Active users across 25+ countries"
    },
    { 
      label: "Assets Under Management", 
      value: "₹100Cr+", 
      icon: "💰",
      description: "Secured and growing wealth"
    },
    { 
      label: "Countries Supported", 
      value: "15+", 
      icon: "🏛️",
      description: "Global presence and compliance"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-16">
      {/* Background */}
      <div className="absolute inset-0 hero-bg"></div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb-1 top-1/4 left-1/4"></div>
        <div className="floating-orb-2 bottom-1/4 right-1/4"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl"></div>
        </div>
      </div>

      <div className="container-hero">
        <div className="text-center max-w-6xl mx-auto">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="heading-hero mb-2"
          >
            <span className="block">All-in-One</span>
            <span className="block">Wealth Management</span>
            <span className="block">Platform for </span>
            <AnimatedText />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-subtitle mb-2"
          >
            Secure, seamless, and smart—track and grow your{' '}
            <span className="text-hero-accent font-semibold">global wealth</span> with
            AI-powered insights and expert-led guidance built specifically for NRIs and their families.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
          >
            <Button className="btn-primary group" size="xl">
              Start Your Wealth Journey
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            {/* Uncomment if needed:
            <Button className="btn-secondary group">
              <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button> */}
          </motion.div>

          {/* Rotating Feature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.8 }}
                transition={{ duration: 0.6 }}
                className="feature-indicator"
              >
                {React.createElement(features[currentFeature].icon, {
                  className: `w-5 h-5 ${features[currentFeature].color}`
                })}
                <span className="font-semibold text-white">{features[currentFeature].text}</span>
              </motion.div>
            </AnimatePresence>

            <div className="flex space-x-3">
              {features.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-500 cursor-pointer ${
                    index === currentFeature
                      ? 'bg-orange-500 w-8 shadow-glow-orange'
                      : 'bg-orange-800 hover:bg-orange-600'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentFeature(index)}
                />
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2 }}
                className="card-stats group cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="stats-value mb-2">{stat.value}</div>
                  <div className="stats-label mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="scroll-indicator"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gradient-to-b from-orange-400 to-amber-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      ></div>
    </section>
  );
};

export default HeroSection;
