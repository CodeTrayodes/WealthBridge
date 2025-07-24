'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, User, Eye, Share2, Bookmark, Twitter, Facebook, Linkedin, Copy,
  ArrowLeft, Tag, ExternalLink, TrendingUp, MessageSquare, ThumbsUp, AlertCircle, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useArticle } from '@/hooks/useArticle';
import { toast } from 'sonner';

const ArticleView = ({ initialArticle }) => {
  const { article, loading, error, relatedArticles } = useArticle(initialArticle.slug);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(initialArticle.likes);
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
        case 'twitter':
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            '_blank',
            'width=550,height=420'
          );
          break;
        case 'facebook':
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            '_blank',
            'width=550,height=420'
          );
          break;
        case 'linkedin':
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            '_blank',
            'width=550,height=420'
          );
          break;
        case 'copy':
          await navigator.clipboard.writeText(url);
          toast.success('Article link copied to clipboard!');
          break;
      }
    } catch (error) {
      toast.error('Failed to share article. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  const handleLike = async () => {
    try {
      const newLikeState = !hasLiked;
      setHasLiked(newLikeState);
      setLikes(prev => newLikeState ? prev + 1 : prev - 1);
      toast.success(newLikeState ? 'Article liked!' : 'Like removed');
    } catch (error) {
      setHasLiked(!hasLiked);
      setLikes(prev => hasLiked ? prev + 1 : prev - 1);
      toast.error('Failed to update like. Please try again.');
    }
  };

  const handleBookmark = async () => {
    try {
      const newBookmarkState = !isBookmarked;
      setIsBookmarked(newBookmarkState);
      toast.success(newBookmarkState ? 'Article bookmarked!' : 'Bookmark removed');
    } catch (error) {
      setIsBookmarked(!isBookmarked);
      toast.error('Failed to update bookmark. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Article Not Found</h1>
            <p className="text-gray-400 mb-8">{error}</p>
            <Link href="/news">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/news">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-400">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
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
            <Badge className="bg-orange-500 text-white capitalize">
              {currentArticle.category.replace('-', ' ')}
            </Badge>
            {currentArticle.urgent && (
              <Badge className="bg-red-500 text-white animate-pulse">
                <AlertCircle className="w-3 h-3 mr-1" />
                URGENT
              </Badge>
            )}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{formatDate(currentArticle.publishedAt)}</span></div>
              <div className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>{currentArticle.readTime} min read</span></div>
              <div className="flex items-center space-x-1"><Eye className="w-4 h-4" /><span>{currentArticle.views.toLocaleString()} views</span></div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {currentArticle.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                {currentArticle.author.avatar ? (
                  <img src={currentArticle.author.avatar} alt={currentArticle.author.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <div className="font-semibold text-white">{currentArticle.author.name}</div>
                <div className="text-sm text-gray-400">{currentArticle.author.bio || 'Financial Analyst'}</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleBookmark} disabled={loading} className={isBookmarked ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : 'border-gray-700 text-gray-400 hover:text-orange-400'}>
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('twitter')} disabled={isSharing} className="border-gray-700 text-gray-400 hover:text-blue-400"><Twitter className="w-4 h-4" /></Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')} disabled={isSharing} className="border-gray-700 text-gray-400 hover:text-blue-600"><Linkedin className="w-4 h-4" /></Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('copy')} disabled={isSharing} className="border-gray-700 text-gray-400 hover:text-orange-400"><Copy className="w-4 h-4" /></Button>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-12">
          <div className="bg-orange-500/10 border-l-4 border-orange-500 pl-6 py-4 mb-8 rounded-r-lg">
            <p className="text-lg text-gray-300 italic leading-relaxed">{currentArticle.excerpt}</p>
          </div>
          <div className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
          {currentArticle.sourceUrl && (
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-8">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <ExternalLink className="w-4 h-4" /><span>Source:</span>
                <a href={currentArticle.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">Official Source</a>
              </div>
            </div>
          )}
        </motion.div>

        {/* Tags */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
          <div className="flex flex-wrap gap-2">
            {currentArticle.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-400"><Tag className="w-3 h-3 mr-1" />{tag}</Badge>
            ))}
          </div>
        </motion.div>

        {/* Like + Comment */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="border-t border-gray-800 pt-8 mb-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant={hasLiked ? "default" : "outline"} size="sm" onClick={handleLike} disabled={loading} className={hasLiked ? "bg-orange-500" : "border-gray-700 text-gray-400 hover:text-orange-400"}>
                <ThumbsUp className="w-4 h-4 mr-2" />
                {likes} Likes
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:text-orange-400"><MessageSquare className="w-4 h-4 mr-2" />Comment</Button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Share this article:</span>
              <Button variant="ghost" size="sm" onClick={() => handleShare('twitter')} disabled={isSharing} className="text-gray-400 hover:text-blue-400"><Twitter className="w-4 h-4" /></Button>
              <Button variant="ghost" size="sm" onClick={() => handleShare('facebook')} disabled={isSharing} className="text-gray-400 hover:text-blue-600"><Facebook className="w-4 h-4" /></Button>
              <Button variant="ghost" size="sm" onClick={() => handleShare('linkedin')} disabled={isSharing} className="text-gray-400 hover:text-blue-600"><Linkedin className="w-4 h-4" /></Button>
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
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-orange-400" />
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
              {relatedArticles.map((relatedArticle, index) => (
                <Link key={relatedArticle.id} href={`/news/${relatedArticle.slug}`}>
                  <div className="card-elegant p-6 group cursor-pointer h-full">
                    <Badge variant="outline" className="text-xs mb-3 capitalize">
                      {relatedArticle.category.replace('-', ' ')}
                    </Badge>
                    <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{relatedArticle.readTime} min read</span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-orange-400 hover:text-orange-300">
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
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated with NRI Financial News</h3>
          <p className="text-gray-300 mb-6">
            Get the latest updates on policies, market trends, and investment opportunities delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 px-6">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Join 15,000+ NRIs • Unsubscribe anytime
          </p>
        </motion.div>
      </div>
    </article>
  );
};

export default ArticleView;
