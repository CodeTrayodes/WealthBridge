"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Eye,
  Share2,
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  ArrowLeft,
  Tag,
  ExternalLink,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button, Badge } from "@/components/ui";
import Link from "next/link";
import { useArticle } from "@/hooks/useArticle";
import { toast } from "sonner";

// Skeleton Component (inline since we don't have it in UI)
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-bs-gray-800 rounded ${className}`}></div>
);

const ArticleView = ({ initialArticle }) => {
  const { article, loading, error, relatedArticles } = useArticle(
    initialArticle.slug
  );
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(initialArticle.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const currentArticle = article || initialArticle;

  const handleShare = async (platform) => {
    if (isSharing) return;
    setIsSharing(true);

    try {
      const url = window.location.href;
      const text = `${currentArticle.title} - ${currentArticle.excerpt}`;

      switch (platform) {
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            "_blank",
            "width=550,height=420"
          );
          break;
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            "_blank",
            "width=550,height=420"
          );
          break;
        case "linkedin":
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            "_blank",
            "width=550,height=420"
          );
          break;
        case "copy":
          await navigator.clipboard.writeText(url);
          toast.success("Article link copied to clipboard!");
          break;
      }
    } catch (error) {
      toast.error("Failed to share article. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  const handleLike = async () => {
    try {
      const newLikeState = !hasLiked;
      setHasLiked(newLikeState);
      setLikes((prev) => (newLikeState ? prev + 1 : prev - 1));
      toast.success(newLikeState ? "Article liked!" : "Like removed");
    } catch (error) {
      setHasLiked(!hasLiked);
      setLikes((prev) => (hasLiked ? prev + 1 : prev - 1));
      toast.error("Failed to update like. Please try again.");
    }
  };

  const handleBookmark = async () => {
    try {
      const newBookmarkState = !isBookmarked;
      setIsBookmarked(newBookmarkState);
      toast.success(
        newBookmarkState ? "Article bookmarked!" : "Bookmark removed"
      );
    } catch (error) {
      setIsBookmarked(!isBookmarked);
      toast.error("Failed to update bookmark. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen hero-bg py-20">
        <div className="container-hero">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Article Not Found
            </h1>
            <p className="text-muted-foreground mb-8">{error}</p>
            <Link href="/news">
              <Button variant="gradient">
                <div className="flex">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span>Back to News</span>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen hero-bg py-20">
      <div className="container-hero">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/news">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-bs-blue-400"
            >
              <div className="flex">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </div>
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge variant="hero" className="capitalize">
              {currentArticle.category.replace("-", " ")}
            </Badge>
            {currentArticle.urgent && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertCircle className="w-3 h-3 mr-1" />
                URGENT
              </Badge>
            )}
            {currentArticle.trending && (
              <Badge
                variant="secondary"
                className="bg-bs-purple-500/20 text-bs-purple-400"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(currentArticle.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{currentArticle.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>
                  {currentArticle.views?.toLocaleString() || "0"} views
                </span>
              </div>
            </div>
          </div>

          <h1 className="heading-hero mb-6">{currentArticle.title}</h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-bs-blue-500 to-bs-purple-500 rounded-full flex items-center justify-center">
                {currentArticle.author?.avatar ? (
                  <img
                    src={currentArticle.author.avatar}
                    alt={currentArticle.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <div className="font-semibold text-foreground">
                  {currentArticle.author?.name || "Editorial Team"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentArticle.author?.bio || "Financial Analyst"}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmark}
                disabled={loading}
                className={
                  isBookmarked
                    ? "bg-bs-blue-500/20 border-bs-blue-500/50 text-bs-blue-400"
                    : "border-border/50 text-muted-foreground hover:text-bs-blue-400"
                }
              >
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("twitter")}
                disabled={isSharing}
                className="border-border/50 text-muted-foreground hover:text-blue-400"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("linkedin")}
                disabled={isSharing}
                className="border-border/50 text-muted-foreground hover:text-blue-600"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("copy")}
                disabled={isSharing}
                className="border-border/50 text-muted-foreground hover:text-bs-blue-400"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="bg-bs-blue-500/10 border-l-4 border-bs-blue-500 pl-6 py-4 mb-8 rounded-r-lg backdrop-blur-sm">
            <p className="text-lg text-muted-foreground italic leading-relaxed">
              {currentArticle.excerpt}
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-muted-foreground leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
          </div>

          {currentArticle.sourceUrl && (
            <div className="card-elegant p-4 mt-8">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <ExternalLink className="w-4 h-4" />
                <span>Source:</span>
                <a
                  href={currentArticle.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bs-blue-400 hover:text-bs-blue-300 underline"
                >
                  Official Source
                </a>
              </div>
            </div>
          )}
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {currentArticle.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" size="sm">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            )) || []}
          </div>
        </motion.div>

        {/* Like + Comment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="border-t border-border/50 pt-8 mb-16"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant={hasLiked ? "gradient" : "outline"}
                size="sm"
                onClick={handleLike}
                disabled={loading}
                className={
                  !hasLiked
                    ? "border-border/50 text-muted-foreground hover:text-bs-blue-400"
                    : ""
                }
              >
                <div className="flex">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                {likes} Likes
                </div>
                
              </Button>
              {/* <Button
                variant="outline"
                size="sm"
                className="border-border/50 text-muted-foreground hover:text-bs-blue-400"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Comment
              </Button> */}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Share this article:
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare("twitter")}
                disabled={isSharing}
                className="text-muted-foreground hover:text-blue-400"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare("facebook")}
                disabled={isSharing}
                className="text-muted-foreground hover:text-blue-600"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare("linkedin")}
                disabled={isSharing}
                className="text-muted-foreground hover:text-blue-600"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Related Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-bs-blue-400" />
            Related Articles
          </h3>

          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="card-elegant p-6">
                  <Skeleton className="h-4 w-20 mb-3" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {(relatedArticles || []).map((relatedArticle, index) => (
                <Link
                  key={relatedArticle.id}
                  href={`/news/${relatedArticle.slug}`}
                >
                  <div className="card-elegant p-6 group cursor-pointer h-full hover:shadow-glow-blue">
                    <Badge
                      variant="outline"
                      size="sm"
                      className="mb-3 capitalize"
                    >
                      {relatedArticle.category.replace("-", " ")}
                    </Badge>
                    <h4 className="font-semibold text-foreground group-hover:text-bs-blue-400 transition-colors mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{relatedArticle.readTime} min read</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-bs-blue-400 hover:text-bs-blue-300"
                      >
                        Read More <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="card-elegant p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Stay Updated with NRI Financial News
          </h3>
          <p className="text-muted-foreground mb-6">
            Get the latest updates on policies, market trends, and investment
            opportunities delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="bs-input flex-1"
            />
            <Button variant="gradient" className="px-6">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Join 15,000+ NRIs • Unsubscribe anytime
          </p>
        </motion.div>
      </div>
    </article>
  );
};

export default ArticleView;
