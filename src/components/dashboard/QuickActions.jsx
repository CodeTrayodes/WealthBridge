// src/components/dashboard/QuickActions.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  TrendingUp,
  Repeat,
  Calculator,
  Target,
  PieChart,
  Smartphone,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const QuickActions = () => {
  const actions = [
    {
      id: 'add-money',
      title: 'Add Money',
      description: 'Fund your account',
      icon: Plus,
      color: 'from-emerald-500 to-emerald-600',
      action: () => console.log('Add money')
    },
    {
      id: 'buy-stocks',
      title: 'Buy Stocks',
      description: 'Purchase equity',
      icon: TrendingUp,
      color: 'from-bs-blue-500 to-bs-blue-600',
      action: () => console.log('Buy stocks')
    },
    {
      id: 'start-sip',
      title: 'Start SIP',
      description: 'Systematic investment',
      icon: Repeat,
      color: 'from-bs-purple-500 to-bs-purple-600',
      action: () => console.log('Start SIP')
    },
    {
      id: 'tax-planning',
      title: 'Tax Planning',
      description: 'Optimize taxes',
      icon: Calculator,
      color: 'from-amber-500 to-amber-600',
      action: () => console.log('Tax planning')
    },
    {
      id: 'goal-setting',
      title: 'Set Goals',
      description: 'Financial planning',
      icon: Target,
      color: 'from-cyan-500 to-cyan-600',
      action: () => console.log('Set goals')
    },
    {
      id: 'portfolio-review',
      title: 'Portfolio Review',
      description: 'Annual checkup',
      icon: PieChart,
      color: 'from-indigo-500 to-indigo-600',
      action: () => console.log('Portfolio review')
    }
  ];

  return (
    <Card variant="elegant">
      <CardHeader>
        <CardTitle className="text-xl">Quick Actions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Common investment actions
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.action}
                className={`group p-4 rounded-xl bg-gradient-to-br ${action.color} hover:scale-105 active:scale-95 transition-all duration-300 text-left`}
              >
                <div className="flex flex-col items-start space-y-2">
                  <IconComponent className="w-6 h-6 text-white" />
                  <div>
                    <h4 className="font-semibold text-white text-sm group-hover:text-gray-100">
                      {action.title}
                    </h4>
                    <p className="text-xs text-white/80 group-hover:text-white/90">
                      {action.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-6 space-y-2">
          <Button variant="outline" size="sm" className="w-full">
            <Smartphone className="w-4 h-4 mr-2" />
            Download Mobile App
          </Button>
          <Button variant="ghost" size="sm" className="w-full text-bs-blue-400">
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat with Advisor
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;