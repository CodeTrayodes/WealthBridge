// app/layout.jsx
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "WealthBridge - NRI Wealth Management Platform",
  description:
    "Secure, seamless, and smart wealth management platform for Global Indians and NRI families",
  keywords:
    "NRI, wealth management, investments, India, global, portfolio tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`font-sans antialiased ${inter.className}`}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
