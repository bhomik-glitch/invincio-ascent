import HeroSection from "@/components/HeroSection";
import CoreOffering from "@/components/CoreOffering";
import ProcessSection from "@/components/ProcessSection";
import ResultsSection from "@/components/ResultsSection";
import PodcastSection from "@/components/PodcastSection";
import CollaborationsSection from "@/components/CollaborationsSection";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";

const homepageFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who are the mentors at Invincio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our core team is comprised exclusively of Ex-SSB Assessors, including GTOs, Technical Officers, Interviewing Officers and Psychologists.",
      },
    },
    {
      "@type": "Question",
      name: "Is Invincio a coaching or mentorship program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Invincio is a dedicated Mentorship Institute. We reject rote memorisation in favour of genuine personality evolution aligned with the 15 Officer Like Qualities.",
      },
    },
    {
      "@type": "Question",
      name: "Do you support SSB repeater candidates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We specialise in repeaters, diagnosing the root causes of previous conference-outs and rebuilding the candidate's psychological profile.",
      },
    },
    {
      "@type": "Question",
      name: "Is online SSB mentorship available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our digital platform delivers the same level of rigorous mentorship remotely, with live sessions, GTO drills and psych tests.",
      },
    },
  ],
};

const Index = () => {
  return (
    <div>
      <SEO
        title="Invincio | SSB Interview Coaching by Ex-SSB Assessors | NDA, CDS, AFCAT"
        description="India's premier SSB interview mentorship by Ex-SSB Assessors (GTOs, IOs, Psychologists). Personalised coaching for NDA, CDS, AFCAT, TES, TGC and all defence entries."
        path="/"
        keywords="SSB interview coaching, NDA coaching, CDS coaching, AFCAT coaching, defence coaching India, Ex-SSB assessor mentorship"
        jsonLd={homepageFaq}
      />
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
