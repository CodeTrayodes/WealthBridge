import { Suspense } from 'react';
import NRINewsHub from '@/components/community/NRINewsHub';
import ErrorBoundary from '@/components/community/ErrorBoundary';
import { Spinner } from '@/components/ui/spinner';

export const metadata = {
  title: "NRI Financial News Hub | WealthBridge",
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
  ].join(", "),
  openGraph: {
    title: "NRI Financial News Hub | WealthBridge",
    description:
      "Stay updated with the latest financial news and investment opportunities for Non-Resident Indians",
    type: "website",
    images: [
      {
        url: "/images/og/news-hub.jpg",
        width: 1200,
        height: 630,
        alt: "NRI Financial News Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NRI Financial News Hub | WealthBridge",
    description:
      "Latest financial news and investment insights for Global Indians",
    images: ["/images/og/news-hub.jpg"],
  },
  alternates: {
    canonical: "https://wealthbridge.com/news",
  },
};

function NewsPageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Spinner size="lg" />
          <p className="text-gray-400 mt-4">Loading latest NRI news...</p>
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<NewsPageLoading />}>
      
        <NRINewsHub />
      
      </Suspense>
    </ErrorBoundary>
  );
}

export const revalidate = 900;
