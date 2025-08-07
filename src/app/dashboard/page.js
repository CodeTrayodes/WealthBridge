// app/dashboard/page.js - Main Dashboard Page
import DashboardWrapper from '@/components/dashboard/DashboardWrapper';

export const metadata = {
  title: "Portfolio Dashboard | WealthBridge - भारतीय Wealth Platform",
  description: "Comprehensive NRI portfolio dashboard. Track your Indian investments, stocks, mutual funds, and fixed deposits all in one place. Real-time portfolio analysis and performance tracking.",
  keywords: [
    "NRI portfolio dashboard",
    "Indian investment tracking", 
    "portfolio management",
    "NRI stocks dashboard",
    "mutual fund tracking",
    "investment analytics",
    "PAN linked portfolio",
    "NRI wealth dashboard",
    "Indian market portfolio",
    "investment performance tracking"
  ].join(", "),
  openGraph: {
    title: "NRI Portfolio Dashboard | WealthBridge",
    description: "Track and manage your entire Indian investment portfolio in one comprehensive dashboard",
    type: "website",
    url: "https://wealthbridge.com/dashboard",
    siteName: "WealthBridge",
    images: [
      {
        url: "/images/og/dashboard.jpg",
        width: 1200,
        height: 630,
        alt: "WealthBridge Portfolio Dashboard - NRI Investment Tracking",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: "summary_large_image",
    title: "NRI Portfolio Dashboard | WealthBridge", 
    description: "Comprehensive investment tracking for Global Indians",
    images: ["/images/og/dashboard.jpg"],
    creator: "@WealthBridge",
  },
  alternates: {
    canonical: "https://wealthbridge.com/dashboard",
  },
  robots: {
    index: false, // Dashboard should not be indexed
    follow: false,
  }
};

// Main dashboard page component
export default function DashboardPage() {
  // In a real app, you would get user profile from authentication
  // For now, we'll use mock data
  const mockUserProfile = {
    firstName: 'Rajesh',
    lastName: 'Kumar',
    panNumber: 'ABCDE1234F',
    country: 'UK',
    email: 'rajesh.kumar@example.com',
    isVerified: true,
    lastLogin: new Date().toISOString()
  };

  return <DashboardWrapper userProfile={mockUserProfile} />;
}