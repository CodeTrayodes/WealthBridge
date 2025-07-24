'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  Globe,
  Shield,
  Users,
  Brain,
  FileText,
  Calculator,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Feature data
const features = [
  {
    icon: Globe,
    title: "Unified Global View",
    description: "Track all your investments across India and abroad in one comprehensive dashboard",
    details: [
      { text: "Multi-currency portfolio tracking" },
      { text: "Real-time exchange rate conversion" },
      { text: "Consolidated performance metrics" },
      { text: "Cross-border asset allocation" }
    ],
    color: "primary"
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get personalized recommendations and predictive analytics powered by advanced AI",
    details: [
      { text: "Smart investment recommendations" },
      { text: "Risk assessment and optimization" },
      { text: "Market trend predictions" },
      { text: "Tax-efficient strategies" }
    ],
    color: "secondary"
  },
  {
    icon: Users,
    title: "Family Portfolio Management",
    description: "Seamlessly manage and track investments for your entire family across borders",
    details: [
      { text: "Multi-generational tracking" },
      { text: "Shared portfolio access" },
      { text: "Family wealth planning" },
      { text: "Inheritance planning tools" }
    ],
    color: "profit"
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Enterprise-grade security with end-to-end encryption and regulatory compliance",
    details: [
      { text: "256-bit encryption" },
      { text: "Two-factor authentication" },
      { text: "SOC 2 Type II compliance" },
      { text: "Regular security audits" }
    ],
    color: "heritage-saffron"
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    description: "AI-powered document processing for statements, tax forms, and legal documents",
    details: [
      { text: "OCR statement processing" },
      { text: "Smart categorization" },
      { text: "Tax document analysis" },
      { text: "Compliance tracking" }
    ],
    color: "primary"
  },
  {
    icon: Calculator,
    title: "Tax Optimization",
    description: "Maximize your returns with intelligent tax planning across jurisdictions",
    details: [
      { text: "Multi-country tax planning" },
      { text: "DTAA optimization" },
      { text: "TDS management" },
      { text: "Capital gains planning" }
    ],
    color: "secondary"
  }
];

// Utility function for color classes
const getColorClasses = (color) => {
  const colorMap = {
    primary: "text-primary bg-primary/10 border-primary/20",
    secondary: "text-secondary bg-secondary/10 border-secondary/20",
    profit: "text-profit bg-profit/10 border-profit/20",
    "heritage-saffron": "text-heritage-saffron bg-heritage-saffron/10 border-heritage-saffron/20"
  };
  return colorMap[color];
};

// Feature Card Component
const FeatureCard = ({ feature, index, variants }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div variants={variants}>
      <Card
        className="h-full transition-all duration-500 cursor-pointer group hover:shadow-xl hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-4">
          <motion.div
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-14 h-14 rounded-xl border ${getColorClasses(feature.color)} 
                       flex items-center justify-center mb-4`}
          >
            <feature.icon className="w-7 h-7" />
          </motion.div>

          <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
            {feature.title}
          </CardTitle>

          <CardDescription className="text-muted-foreground leading-relaxed">
            {feature.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={isHovered ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 pt-2 border-t border-border/50">
              {feature.details.map((detail, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -10, opacity: 0 }}
                  animate={isHovered ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="flex items-center space-x-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="w-3 h-3 text-profit flex-shrink-0" />
                  <span>{detail.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main Features Section Component
const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      ref={ref}
      className="section-padding bg-gradient-to-b from-background to-muted/20"
      id="features"
    >
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            POWERFUL FEATURES
          </Badge>
          <h2 className="heading-2 mb-6 text-balance">
            Everything You Need to{' '}
            <span className="text-gradient-primary">Manage Wealth</span>{' '}
            Across Borders
          </h2>
          <p className="body-large text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform combines cutting-edge technology with deep understanding 
            of NRI investment challenges to deliver unmatched wealth management experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={`feature-${index}`}
              feature={feature}
              index={index}
              variants={itemVariants}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.8 } }
          }}
          className="text-center"
        >
          <Button
            size="xl"
            className="bg-gradient-primary hover:shadow-glow-primary group"
          >
            Explore All Features
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
