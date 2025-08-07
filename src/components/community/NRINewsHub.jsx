"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  Loader2,
  Sparkles,
} from "lucide-react";
import { Button, Badge, FeatureBadge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import Link from "next/link";
import { useNews } from "@/hooks/useNews";
import { toast } from "sonner";

// Categories specific to NRI interests - Updated with new theme colors
const categories = [
  {
    id: "all",
    name: "All News",
    slug: "all",
    icon: "Globe",
    color: "text-bs-blue-400",
    description: "Latest updates for NRIs",
    count: 127,
    isActive: true,
  },
  {
    id: "india-markets",
    name: "India Markets",
    slug: "india-markets",
    icon: "TrendingUp",
    color: "text-emerald-400",
    description: "Stock market & economic updates",
    count: 34,
    isActive: true,
  },
  {
    id: "real-estate",
    name: "Real Estate",
    slug: "real-estate",
    icon: "Home",
    color: "text-bs-purple-400",
    description: "Property market & regulations",
    count: 28,
    isActive: true,
  },
  {
    id: "investment-opportunities",
    name: "Investment Opportunities",
    slug: "investment-opportunities",
    icon: "PiggyBank",
    color: "text-accent",
    description: "New schemes & opportunities",
    count: 22,
    isActive: true,
  },
  {
    id: "tax-updates",
    name: "Tax & Regulatory",
    slug: "tax-updates",
    icon: "Calculator",
    color: "text-amber-400",
    description: "Policy changes & compliance",
    count: 19,
    isActive: true,
  },
  {
    id: "banking",
    name: "Banking & Remittance",
    slug: "banking",
    icon: "Briefcase",
    color: "text-cyan-400",
    description: "Banking updates & money transfer",
    count: 15,
    isActive: true,
  },
  {
    id: "global-markets",
    name: "Global Impact",
    slug: "global-markets",
    icon: "Globe",
    color: "text-indigo-400",
    description: "How global events affect NRIs",
    count: 9,
    isActive: true,
  },
];

// Icon mapping for dynamic rendering
const iconMap = {
  Globe,
  TrendingUp,
  Home,
  PiggyBank,
  Calculator,
  Briefcase,
};

// Input Component (since not in our UI library yet)
const Input = ({ className, ...props }) => (
  <input className={`bs-input ${className}`} {...props} />
);

// Skeleton Component for loading states
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-bs-gray-800 rounded ${className}`}></div>
);

export default function NRINewsHub() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
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
    refresh,
  } = useNews({
    category: selectedCategory,
    search: searchQuery,
    limit: 10,
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

    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSubscribing(true);

    try {
      // In real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Successfully subscribed to NRI Financial News!");
      setNewsletterEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Get featured and trending articles
  const featuredArticles = articles.filter((article) => article.featured);
  const trendingArticles = articles
    .filter((article) => article.trending)
    .slice(0, 5);

  if (error) {
    return (
      <section className="min-h-screen hero-bg py-20">
        <div className="container-hero">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              Unable to Load News
            </h1>
            <p className="text-gray-400 mb-8">{error}</p>
            <Button onClick={refresh} variant="outline" size="lg">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen hero-bg py-20">
      <div className="container-hero">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <FeatureBadge icon={Globe} className="mb-6 mx-auto">
            NRI FINANCIAL NEWS HUB
          </FeatureBadge>

          <h1 className="heading-hero mb-6">
            Stay Ahead with{" "}
            <span className="text-hero-accent">NRI-Focused</span>
            <br />
            Financial News
          </h1>

          <p className="text-subtitle mb-8">
            Latest updates on Indian markets, investment opportunities, tax
            changes, and regulatory updates that matter to Global Indians
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
                disabled={subscribing}
              />
              <Button
                type="submit"
                disabled={subscribing}
                className="whitespace-nowrap"
              >
                <div className="flex">
                  {subscribing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Bell className="w-4 h-4 mr-2" />
                  )}
                  <span>Subscribe</span>
                </div>
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
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
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <Badge
                  variant="destructive"
                  size="sm"
                  className="font-semibold"
                >
                  BREAKING
                </Badge>
              </div>
              <div className="text-white text-sm">
                RBI announces new NRI account guidelines • Digital Rupee now
                available for remittances • Mumbai property prices surge 12%
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search news, policies, market updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
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
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-bs-blue-500 to-bs-purple-500 text-white shadow-glow-blue"
                      : "bg-card/80 text-muted-foreground hover:bg-bs-blue-500/10 hover:text-bs-blue-400 border border-border/50"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm">{category.name}</span>
                  <Badge
                    variant="secondary"
                    size="xs"
                    className="bg-background/20 text-current"
                  >
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
            {selectedCategory === "all" && featuredArticles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <Flame className="w-6 h-6 mr-2 text-bs-blue-400" />
                  Featured Stories
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {featuredArticles.slice(0, 2).map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="relative"
                    >
                      <Card
                        variant="elegant"
                        className="group cursor-pointer hover:shadow-glow-blue"
                      >
                        {article.urgent && (
                          <div className="absolute top-4 right-4 z-10">
                            <Badge
                              variant="destructive"
                              // className="animate-pulse"
                            >
                              <AlertCircle className="w-3 h-3 mr-1" />
                              URGENT
                            </Badge>
                          </div>
                        )}

                        <CardContent className="p-6">
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge
                              variant="outline"
                              size="sm"
                              className="capitalize"
                            >
                              {article.category.replace("-", " ")}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(article.publishedAt)}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-bs-blue-400 transition-colors line-clamp-2">
                            {article.title}
                          </h3>

                          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
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
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-bs-blue-400 hover:text-bs-blue-300"
                              >
                                Read More{" "}
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
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
                <h2 className="text-2xl font-bold text-foreground flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-bs-blue-400" />
                  {selectedCategory === "all"
                    ? "Latest News"
                    : categories.find((cat) => cat.id === selectedCategory)
                        ?.name}
                </h2>
                <div className="text-sm text-muted-foreground">
                  {pagination ? pagination.total : articles.length} articles
                </div>
              </div>

              {/* Loading State */}
              {loading && articles.length === 0 ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} variant="elegant" className="p-6">
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
                    </Card>
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
                    >
                      <Card
                        variant="elegant"
                        className="group cursor-pointer hover:shadow-glow-blue hover:border-bs-blue-500/30"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-3">
                                <Badge
                                  variant="outline"
                                  size="sm"
                                  className="capitalize"
                                >
                                  {article.category.replace("-", " ")}
                                </Badge>
                                {article.trending && (
                                  <Badge
                                    variant="destructive"
                                    size="sm"
                                    className="bg-red-500/20 text-red-400"
                                  >
                                    <Flame className="w-3 h-3 mr-1" />
                                    Trending
                                  </Badge>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {formatTimeAgo(article.publishedAt)}
                                </span>
                              </div>

                              <Link href={`/news/${article.slug}`}>
                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-bs-blue-400 transition-colors cursor-pointer">
                                  {article.title}
                                </h3>
                              </Link>

                              <p className="text-muted-foreground leading-relaxed mb-4">
                                {article.excerpt}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {article.tags
                                  .slice(0, 3)
                                  .map((tag, tagIndex) => (
                                    <Badge
                                      key={tagIndex}
                                      variant="secondary"
                                      size="xs"
                                      className="bg-background/50"
                                    >
                                      <Tag className="w-2 h-2 mr-1" />
                                      {tag}
                                    </Badge>
                                  ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
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
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-muted-foreground hover:text-bs-blue-400"
                              >
                                <BookmarkPlus className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-muted-foreground hover:text-bs-blue-400"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Link href={`/news/${article.slug}`}>
                                <Button size="sm" variant="gradient">
                                  Read Full Article
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
                    className="border-bs-blue-500/30 text-bs-blue-400 hover:bg-bs-blue-500/10"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load More Articles"
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
              >
                <Card variant="elegant" className="p-6">
                  <CardTitle className="text-xl mb-6 flex items-center">
                    <Flame className="w-5 h-5 mr-2 text-bs-blue-400" />
                    Trending Now
                  </CardTitle>

                  {trendingArticles.length > 0 ? (
                    <div className="space-y-4">
                      {trendingArticles.map((article, index) => (
                        <Link key={article.id} href={`/news/${article.slug}`}>
                          <div className="group cursor-pointer">
                            <div className="flex items-start space-x-3">
                              <div className="text-2xl font-bold text-bs-blue-400 mt-1">
                                {(index + 1).toString().padStart(2, "0")}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground group-hover:text-bs-blue-400 transition-colors text-sm leading-tight mb-2 line-clamp-2">
                                  {article.title}
                                </h4>
                                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                                  <span>
                                    {formatTimeAgo(article.publishedAt)}
                                  </span>
                                  <span>
                                    {article.views.toLocaleString()} views
                                  </span>
                                </div>
                              </div>
                            </div>
                            {index < trendingArticles.length - 1 && (
                              <div className="border-b border-border/50 mt-4"></div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Flame className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">
                        No trending articles at the moment
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>

              {/* Market Snapshot */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Card variant="stats" className="p-6">
                  <CardTitle className="text-xl mb-6">
                    Market Snapshot
                  </CardTitle>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Sensex</span>
                      <div className="text-right">
                        <div className="stats-value text-lg">79,856.75</div>
                        <Badge variant="success" size="xs">
                          +1.2%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Nifty 50</span>
                      <div className="text-right">
                        <div className="stats-value text-lg">24,213.30</div>
                        <Badge variant="success" size="xs">
                          +0.9%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">USD/INR</span>
                      <div className="text-right">
                        <div className="stats-value text-lg">83.45</div>
                        <Badge variant="destructive" size="xs">
                          -0.1%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Gold (per 10g)
                      </span>
                      <div className="text-right">
                        <div className="stats-value text-lg">₹63,250</div>
                        <Badge variant="success" size="xs">
                          +0.5%
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-4 border-bs-blue-500/30 text-bs-blue-400"
                  >
                    View Full Market Data
                  </Button>
                </Card>
              </motion.div>

              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
              >
                <Card variant="elegant" className="p-6">
                  <CardTitle className="text-xl mb-4">
                    Daily NRI Digest
                  </CardTitle>
                  <p className="text-muted-foreground text-sm mb-4">
                    Get curated financial news and investment insights delivered
                    to your inbox every morning.
                  </p>

                  <form
                    onSubmit={handleNewsletterSubscribe}
                    className="space-y-3"
                  >
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      disabled={subscribing}
                    />
                    <Button
                      type="submit"
                      disabled={subscribing}
                      className="w-full"
                    >
                      {subscribing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        "Subscribe Now"
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-muted-foreground mt-3">
                    Join 15,000+ NRIs • Unsubscribe anytime
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
