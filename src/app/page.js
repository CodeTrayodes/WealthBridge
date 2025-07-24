// app/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/layout/FeaturesSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <Footer />
      {/* <FeaturesSection /> */}
    </>
  );
}
