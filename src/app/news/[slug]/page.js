// app/news/page.js - Updated News Page
import { Suspense } from 'react';
import NRINewsHub from '@/components/community/NRINewsHub';
import ErrorBoundary from '@/components/community/ErrorBoundary';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const metadata = {
  title: "NRI Financial News Hub | WealthBridge - भारतीय Wealth Platform",
  description:
    "Latest financial news, investment opportunities, and market updates specifically curated for Non-Resident Indians. Stay informed about Indian markets, tax updates, and NRI-focused financial content.",
  keywords: [
    "NRI news",
    "India investment news", 
    "NRI banking updates",
    "Indian market news",
    "NRI tax updates",
    "real estate news India",
    "NRI financial news",
    "Indian stock market",
    "NRI investment opportunities",
    "global indian finance",
    "NRI wealth management",
    "indian mutual funds"
  ].join(", "),
  openGraph: {
    title: "NRI Financial News Hub | WealthBridge",
    description:
      "Stay updated with the latest financial news and investment opportunities for Non-Resident Indians",
    type: "website",
    url: "https://wealthbridge.com/news",
    siteName: "WealthBridge",
    images: [
      {
        url: "/images/og/news-hub.jpg",
        width: 1200,
        height: 630,
        alt: "NRI Financial News Hub - Latest Indian Market Updates",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: "summary_large_image",
    title: "NRI Financial News Hub | WealthBridge",
    description:
      "Latest financial news and investment insights for Global Indians",
    images: ["/images/og/news-hub.jpg"],
    creator: "@WealthBridge",
  },
  alternates: {
    canonical: "https://wealthbridge.com/news",
  },
  robots: {
    index: true,
    follow: true,
  }
};

function NewsPageLoading() {
  return (
    <div className="min-h-screen hero-bg py-20">
      <div className="container-hero">
        <div className="text-center mb-16 space-y-6">
          {/* Loading Hero Section */}
          <div className="animate-pulse space-y-4">
            <div className="w-64 h-8 bg-bs-blue-500/20 rounded-full mx-auto"></div>
            <div className="w-96 h-12 bg-bs-purple-500/20 rounded-lg mx-auto"></div>
            <div className="w-80 h-6 bg-bs-gray-800 rounded mx-auto"></div>
          </div>
          
          <LoadingSpinner size="xl" className="mx-auto" />
          <p className="text-muted-foreground mt-4">Loading latest NRI news and market updates...</p>
          
          {/* Loading Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-elegant p-6 animate-pulse">
                <div className="w-20 h-4 bg-bs-blue-500/20 rounded mb-3"></div>
                <div className="w-full h-6 bg-bs-gray-800 rounded mb-3"></div>
                <div className="w-3/4 h-6 bg-bs-gray-800 rounded mb-4"></div>
                <div className="w-full h-16 bg-bs-gray-800/50 rounded mb-4"></div>
                <div className="flex justify-between">
                  <div className="w-24 h-4 bg-bs-gray-800 rounded"></div>
                  <div className="w-20 h-8 bg-bs-blue-500/20 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsError({ error, retry }) {
  return (
    <div className="min-h-screen hero-bg py-20">
      <div className="container-hero">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Unable to Load News Feed</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're having trouble loading the latest NRI financial news. 
            Please check your connection and try again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={retry}
              className="bs-button"
            >
              Try Again
            </button>
            <a 
              href="/dashboard"
              className="bs-button bg-card/80 text-bs-blue-400 hover:bg-bs-blue-500/10"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  return (
    <ErrorBoundary fallback={NewsError}>
      <Suspense fallback={<NewsPageLoading />}>
        <NRINewsHub />
      </Suspense>
    </ErrorBoundary>
  );
}

// Enable ISR for better performance
export const revalidate = 900; // 15 minutes