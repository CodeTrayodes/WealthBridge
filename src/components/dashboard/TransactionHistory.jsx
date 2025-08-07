// src/components/dashboard/TransactionHistory.jsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Search,
  MoreHorizontal,
  Download,
  TrendingUp,
  TrendingDown,
  Building,
  PieChart,
  Landmark,
  ExternalLink,
  Calendar,
  Tag
} from 'lucide-react';
import { Badge, StatusBadge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';


const TransactionHistory = ({ transactions, isBalanceVisible }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockTransactions = [
    {
      id: 'TXN001',
      type: 'buy',
      asset: 'HDFC Bank Ltd',
      category: 'equity',
      quantity: 50,
      price: 1680.50,
      amount: 84025,
      date: '2025-01-15T10:30:00Z',
      status: 'completed',
      exchange: 'NSE',
      charges: 125.50,
      icon: TrendingUp,
      color: 'text-emerald-400'
    },
    {
      id: 'TXN002',
      type: 'sell',
      asset: 'Axis Small Cap Fund',
      category: 'mutual-fund',
      quantity: 100,
      price: 65.25,
      amount: 6525,
      date: '2025-01-14T15:45:00Z',
      status: 'completed',
      exchange: 'MF',
      charges: 0,
      icon: PieChart,
      color: 'text-bs-purple-400'
    },
    {
      id: 'TXN003',
      type: 'buy',
      asset: 'Kotak Mahindra Bank FD',
      category: 'fixed-deposit',
      quantity: 1,
      price: 250000,
      amount: 250000,
      date: '2025-01-13T11:20:00Z',
      status: 'processing',
      exchange: 'Bank',
      charges: 0,
      icon: Landmark,
      color: 'text-emerald-400'
    },
    {
      id: 'TXN004',
      type: 'dividend',
      asset: 'Infosys Ltd',
      category: 'equity',
      quantity: 200,
      price: 18.50,
      amount: 3700,
      date: '2025-01-12T09:00:00Z',
      status: 'completed',
      exchange: 'NSE',
      charges: 0,
      icon: TrendingUp,
      color: 'text-bs-blue-400'
    },
    {
      id: 'TXN005',
      type: 'sip',
      asset: 'SBI Bluechip Fund',
      category: 'mutual-fund',
      quantity: 25.45,
      price: 78.62,
      amount: 2000,
      date: '2025-01-10T06:00:00Z',
      status: 'completed',
      exchange: 'MF',
      charges: 0,
      icon: PieChart,
      color: 'text-bs-purple-400'
    },
    {
      id: 'TXN006',
      type: 'buy',
      asset: 'Embassy Office Parks REIT',
      category: 'reit',
      quantity: 10,
      price: 385.75,
      amount: 3857.50,
      date: '2025-01-08T14:30:00Z',
      status: 'completed',
      exchange: 'NSE',
      charges: 45.20,
      icon: Building,
      color: 'text-amber-400'
    }
  ];

  const filters = [
    { id: 'all', label: 'All', count: mockTransactions.length },
    { id: 'buy', label: 'Purchases', count: mockTransactions.filter(t => t.type === 'buy').length },
    { id: 'sell', label: 'Sales', count: mockTransactions.filter(t => t.type === 'sell').length },
    { id: 'dividend', label: 'Dividends', count: mockTransactions.filter(t => t.type === 'dividend').length },
    { id: 'sip', label: 'SIP', count: mockTransactions.filter(t => t.type === 'sip').length }
  ];

  const formatCurrency = (amount) => {
    if (!isBalanceVisible) return '****';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-IN', { 
        day: '2-digit', 
        month: 'short' 
      }),
      time: date.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      })
    };
  };

  const getTransactionTypeInfo = (type) => {
    const types = {
      buy: { label: 'Purchase', icon: ArrowUpRight, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
      sell: { label: 'Sale', icon: ArrowDownLeft, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
      dividend: { label: 'Dividend', icon: TrendingUp, color: 'text-bs-blue-400', bg: 'bg-bs-blue-500/10', border: 'border-bs-blue-500/20' },
      sip: { label: 'SIP', icon: PieChart, color: 'text-bs-purple-400', bg: 'bg-bs-purple-500/10', border: 'border-bs-purple-500/20' }
    };
    return types[type] || types.buy;
  };

  const getStatusBadge = (status) => {
    const statuses = {
      completed: { label: 'Completed', variant: 'success' },
      processing: { label: 'Processing', variant: 'secondary' },
      failed: { label: 'Failed', variant: 'destructive' },
      pending: { label: 'Pending', variant: 'secondary' }
    };
    return statuses[status] || statuses.pending;
  };

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.type === filter;
    const matchesSearch = transaction.asset.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Card variant="elegant">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Clock className="w-5 h-5 mr-2 text-bs-blue-400" />
              Recent Transactions
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track your latest investment activities
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        
        {/* Filters and Search */}
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bs-input pl-10 w-full"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === filterOption.id
                    ? 'bg-gradient-to-r from-bs-blue-500 to-bs-purple-500 text-white shadow-md'
                    : 'bg-background/50 text-muted-foreground hover:text-foreground hover:bg-background/80'
                }`}
              >
                <span>{filterOption.label}</span>
                <Badge variant="secondary" size="xs" className="bg-background/20 text-current">
                  {filterOption.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No transactions found</p>
              <p className="text-sm text-muted-foreground/70">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredTransactions.map((transaction, index) => {
              const typeInfo = getTransactionTypeInfo(transaction.type);
              const statusInfo = getStatusBadge(transaction.status);
              const IconComponent = transaction.icon;
              const TypeIcon = typeInfo.icon;
              const formattedDate = formatDate(transaction.date);

              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-background/30 hover:bg-background/50 rounded-lg p-4 border border-border/50 hover:border-bs-blue-500/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Asset Icon */}
                      <div className={`w-10 h-10 bg-gradient-to-br from-bs-blue-500 to-bs-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-5 h-5 text-white`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-foreground group-hover:text-bs-blue-400 transition-colors">
                            {transaction.asset}
                          </h4>
                          <Badge variant="outline" size="xs" className="capitalize">
                            {transaction.category.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <TypeIcon className={`w-3 h-3 ${typeInfo.color}`} />
                            <span>{typeInfo.label}</span>
                          </div>
                          
                          {transaction.quantity && (
                            <div className="flex items-center space-x-1">
                              <Tag className="w-3 h-3" />
                              <span>{transaction.quantity} units</span>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formattedDate.date} at {formattedDate.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className={`font-semibold ${
                            transaction.type === 'sell' || transaction.type === 'dividend' 
                              ? 'text-emerald-400' 
                              : 'text-foreground'
                          }`}>
                            {transaction.type === 'sell' || transaction.type === 'dividend' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </p>
                          {transaction.charges > 0 && (
                            <p className="text-xs text-muted-foreground">
                              Charges: {formatCurrency(transaction.charges)}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-end space-y-1">
                          <Badge 
                            variant={statusInfo.variant} 
                            size="sm"
                          >
                            {statusInfo.label}
                          </Badge>
                          
                          <Badge variant="outline" size="xs">
                            {transaction.exchange}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Details (Expandable) */}
                  {transaction.status === 'processing' && (
                    <div className="mt-3 pt-3 border-t border-border/30">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expected completion:</span>
                        <span className="text-foreground">Within 2 business days</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>

        {/* Load More */}
        {filteredTransactions.length > 0 && (
          <div className="text-center pt-4">
            <Button variant="outline" size="sm" className="border-bs-blue-500/30 text-bs-blue-400">
              Load More Transactions
            </Button>
          </div>
        )}

        {/* Transaction Summary */}
        <div className="bg-gradient-to-r from-bs-blue-500/5 to-bs-purple-500/5 rounded-lg p-4 border border-bs-blue-500/10">
          <h4 className="font-semibold text-foreground mb-3">Transaction Summary (This Month)</h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <p className="text-muted-foreground mb-1">Total Invested</p>
              <p className="text-lg font-bold text-foreground">{formatCurrency(336882.5)}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-1">Total Redeemed</p>
              <p className="text-lg font-bold text-emerald-400">{formatCurrency(6525)}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-1">Dividends Received</p>
              <p className="text-lg font-bold text-bs-blue-400">{formatCurrency(3700)}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-1">Total Charges</p>
              <p className="text-lg font-bold text-muted-foreground">{formatCurrency(170.70)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;