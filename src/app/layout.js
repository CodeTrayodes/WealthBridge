// app/layout.js - Root layout for the entire app
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata = {
  title: 'WealthBridge - भारतीय Wealth Platform',
  description: 'Comprehensive NRI wealth management platform for tracking Indian investments, portfolio analytics, and financial planning.',
  keywords: 'NRI investments, portfolio management, Indian stocks, mutual funds, wealth tracking',
  authors: [{ name: 'WealthBridge Team' }],
  openGraph: {
    title: 'WealthBridge - NRI Wealth Management Platform',
    description: 'Track, analyze, and grow your Indian investments from anywhere in the world',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WealthBridge - NRI Wealth Platform',
    description: 'Comprehensive wealth management for NRIs',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}>
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="relative">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-bs-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-bs-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
      </body>
    </html>
  )
}