import HeroSection from "@/components/HeroSection";
import CoreOffering from "@/components/CoreOffering";
import ProcessSection from "@/components/ProcessSection";
import ResultsSection from "@/components/ResultsSection";
import PodcastSection from "@/components/PodcastSection";
import CollaborationsSection from "@/components/CollaborationsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div>
      <HeroSection showCarousel={true} />
      <CoreOffering />
      <ProcessSection />
      <ResultsSection />
      <PodcastSection />
      <CollaborationsSection />
      <CTASection />
    </div>
  );
};

export default Index;
