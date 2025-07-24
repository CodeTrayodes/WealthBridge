'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Globe, 
  Clock, 
  Eye,
  BookmarkPlus,
  Share2,
  ArrowRight,
  Calendar,
  Tag,
  Search,
  Filter,
  Bell,
  ExternalLink,
  ChevronRight,
  Flame,
  AlertCircle,
  DollarSign,
  Home,
  PiggyBank,
  Briefcase,
  Calculator,
  MapPin,
  User,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useNews } from '@/hooks/useNews';
import { toast } from 'sonner';

// Categories specific to NRI interests
const categories = [
  {
    id: 'all',
    name: 'All News',
    slug: 'all',
    icon: 'Globe',
    color: 'text-orange-400',
    description: 'Latest updates for NRIs',
    count: 127,
    isActive: true
  },
  {
    id: 'india-markets',
    name: 'India Markets',
    slug: 'india-markets',
    icon: 'TrendingUp',
    color: 'text-green-400',
    description: 'Stock market & economic updates',
    count: 34,
    isActive: true
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    icon: 'Home',
    color: 'text-blue-400',
    description: 'Property market & regulations',
    count: 28,
    isActive: true
  },
  {
    id: 'investment-opportunities',
    name: 'Investment Opportunities',
    slug: 'investment-opportunities',
    icon: 'PiggyBank',
    color: 'text-purple-400',
    description: 'New schemes & opportunities',
    count: 22,
    isActive: true
  },
  {
    id: 'tax-updates',
    name: 'Tax & Regulatory',
    slug: 'tax-updates',
    icon: 'Calculator',
    color: 'text-yellow-400',
    description: 'Policy changes & compliance',
    count: 19,
    isActive: true
  },
  {
    id: 'banking',
    name: 'Banking & Remittance',
    slug: 'banking',
    icon: 'Briefcase',
    color: 'text-cyan-400',
    description: 'Banking updates & money transfer',
    count: 15,
    isActive: true
  },
  {
    id: 'global-markets',
    name: 'Global Impact',
    slug: 'global-markets',
    icon: 'Globe',
    color: 'text-indigo-400',
    description: 'How global events affect NRIs',
    count: 9,
    isActive: true
  }
];

// Icon mapping for dynamic rendering
const iconMap = {
  Globe,
  TrendingUp,
  Home,
  PiggyBank,
  Calculator,
  Briefcase
};

export default function NRINewsHub(){
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  // Use our optimized hook for data fetching
  const { 
    articles, 
    loading, 
    error, 
    pagination, 
    hasMore, 
    updateFilters, 
    loadMore, 
    refresh 
  } = useNews({
    category: selectedCategory,
    search: searchQuery,
    limit: 10
  });

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    updateFilters({ category: categoryId, page: 1 });
  };

  // Handle search with debouncing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      updateFilters({ search: searchQuery, page: 1 });
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, updateFilters]);

  // Newsletter subscription
  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSubscribing(true);
    
    try {
      // In real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Successfully subscribed to NRI Financial News!');
      setNewsletterEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Get featured and trending articles
  const featuredArticles = articles.filter(article => article.featured);
  const trendingArticles = articles.filter(article => article.trending).slice(0, 5);

  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Unable to Load News</h1>
            <p className="text-gray-400 mb-8">{error}</p>
            <Button onClick={refresh} className="bg-gradient-to-r from-orange-500 to-orange-600">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="badge-hero mb-6">
            <Globe className="w-5 h-5 mr-2" />
            NRI FINANCIAL NEWS HUB
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Stay Ahead with </span>
            <span className="text-hero-accent">NRI-Focused</span>
            <span className="text-white"> Financial News</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Latest updates on Indian markets, investment opportunities, tax changes, and regulatory updates that matter to Global Indians
          </p>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto mb-8"
          >
            <form onSubmit={handleNewsletterSubscribe} className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter email for daily NRI updates"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                disabled={subscribing}
              />
              <Button 
                type="submit"
                disabled={subscribing}
                className="bg-gradient-to-r from-orange-500 to-orange-600 whitespace-nowrap"
              >
                {subscribing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Bell className="w-4 h-4 mr-2" />
                )}
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              Join 15,000+ NRIs getting daily financial updates
            </p>
          </motion.div>
        </motion.div>

        {/* Breaking News Ticker */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="bg-red-600/10 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-semibold text-sm">BREAKING</span>
              </div>
              <div className="text-white text-sm">
                RBI announces new NRI account guidelines • Digital Rupee now available for remittances • Mumbai property prices surge 12%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search news, policies, market updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon] || Globe;
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-glow-orange'
                      : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-orange-400 border border-gray-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm">{category.name}</span>
                  <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                    {category.count}
                  </Badge>
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Featured Articles */}
            {selectedCategory === 'all' && featuredArticles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Flame className="w-6 h-6 mr-2 text-orange-400" />
                  Featured Stories
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredArticles.slice(0, 2).map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="card-elegant group cursor-pointer relative overflow-hidden"
                    >
                      {article.urgent && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-red-500 text-white animate-pulse">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            URGENT
                          </Badge>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant="outline" className="text-xs capitalize">
                            {article.category.replace('-', ' ')}
                          </Badge>
                          <span className="text-xs text-gray-400">{formatTimeAgo(article.publishedAt)}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-gray-400">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{article.author.name}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{article.readTime} min read</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{article.views.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <Link href={`/news/${article.slug}`}>
                            <Button size="sm" variant="ghost" className="text-orange-400 hover:text-orange-300">
                              Read More <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* All Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-orange-400" />
                  {selectedCategory === 'all' ? 'Latest News' : categories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
                <div className="text-sm text-gray-400">
                  {pagination ? pagination.total : articles.length} articles
                </div>
              </div>

              {/* Loading State */}
              {loading && articles.length === 0 ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="card-elegant p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-6 w-full mb-3" />
                      <Skeleton className="h-6 w-3/4 mb-4" />
                      <Skeleton className="h-16 w-full mb-4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {articles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.05 }}
                      className="card-elegant group cursor-pointer hover:border-orange-500/30 transition-all duration-300"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-3">
                              <Badge 
                                variant="outline" 
                                className="text-xs capitalize"
                              >
                                {article.category.replace('-', ' ')}
                              </Badge>
                              {article.trending && (
                                <Badge className="bg-red-500/20 text-red-400 text-xs">
                                  <Flame className="w-3 h-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                              <span className="text-xs text-gray-400">{formatTimeAgo(article.publishedAt)}</span>
                            </div>
                            
                            <Link href={`/news/${article.slug}`}>
                              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors cursor-pointer">
                                {article.title}
                              </h3>
                            </Link>
                            
                            <p className="text-gray-300 leading-relaxed mb-4">
                              {article.excerpt}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {article.tags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs bg-gray-800 text-gray-400">
                                  <Tag className="w-2 h-2 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-xs text-gray-400">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{article.author.name}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{article.readTime} min read</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{article.views.toLocaleString()}</span>
                            </div>
                            {article.sourceUrl && (
                              <div className="flex items-center space-x-1">
                                <ExternalLink className="w-3 h-3" />
                                <span>Source</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-orange-400">
                              <BookmarkPlus className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-orange-400">
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Link href={`/news/${article.slug}`}>
                              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600">
                                Read Full Article
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-12">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={loadMore}
                    disabled={loading}
                    className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      'Load More Articles'
                    )}
                  </Button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Trending Articles */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="card-elegant p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Flame className="w-5 h-5 mr-2 text-orange-400" />
                  Trending Now
                </h3>
                
                {trendingArticles.length > 0 ? (
                  <div className="space-y-4">
                    {trendingArticles.map((article, index) => (
                      <Link key={article.id} href={`/news/${article.slug}`}>
                        <div className="group cursor-pointer">
                          <div className="flex items-start space-x-3">
                            <div className="text-2xl font-bold text-orange-400 mt-1">
                              {(index + 1).toString().padStart(2, '0')}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors text-sm leading-tight mb-2 line-clamp-2">
                                {article.title}
                              </h4>
                              <div className="flex items-center space-x-3 text-xs text-gray-400">
                                <span>{formatTimeAgo(article.publishedAt)}</span>
                                <span>{article.views.toLocaleString()} views</span>
                              </div>
                            </div>
                          </div>
                          {index < trendingArticles.length - 1 && (
                            <div className="border-b border-gray-800 mt-4"></div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <Flame className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No trending articles at the moment</p>
                  </div>
                )}
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="card-elegant p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6">Market Snapshot</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Sensex</span>
                    <div className="text-right">
                      <div className="text-white font-semibold">79,856.75</div>
                      <div className="text-green-400 text-xs">+1.2%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Nifty 50</span>
                    <div className="text-right">
                      <div className="text-white font-semibold">24,213.30</div>
                      <div className="text-green-400 text-xs">+0.9%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">USD/INR</span>
                    <div className="text-right">
                      <div className="text-white font-semibold">83.45</div>
                      <div className="text-red-400 text-xs">-0.1%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Gold (per 10g)</span>
                    <div className="text-right">
                      <div className="text-white font-semibold">₹63,250</div>
                      <div className="text-green-400 text-xs">+0.5%</div>
                    </div>
                  </div>
                </div>
                
                <Button size="sm" variant="outline" className="w-full mt-4 border-orange-500/30 text-orange-400">
                  View Full Market Data
                </Button>
              </motion.div>

              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="card-elegant p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Daily NRI Digest</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Get curated financial news and investment insights delivered to your inbox every morning.
                </p>
                
                <form onSubmit={handleNewsletterSubscribe} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                    disabled={subscribing}
                  />
                  <Button 
                    type="submit"
                    disabled={subscribing}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600"
                  >
                    {subscribing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      'Subscribe Now'
                    )}
                  </Button>
                </form>
                
                <p className="text-xs text-gray-500 mt-3">
                  Join 15,000+ NRIs • Unsubscribe anytime
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
