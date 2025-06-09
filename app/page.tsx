import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="md:px-16 lg:px-24 xl:px-36 py-1">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <HeroSection />
    </div>
  );
}
