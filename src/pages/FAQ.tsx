import FAQSection from "@/components/FAQSection";
import SEO from "@/components/SEO";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Who are the mentors at Invincio?", acceptedAnswer: { "@type": "Answer", text: "Our core team is comprised exclusively of Ex-SSB Assessors, including GTOs, TOs, and Interviewing Officers." } },
    { "@type": "Question", name: "Is this a coaching or mentorship program?", acceptedAnswer: { "@type": "Answer", text: "We are a dedicated Mentorship Institute. We reject rote memorization in favor of genuine personality evolution." } },
    { "@type": "Question", name: "How is the program personalized?", acceptedAnswer: { "@type": "Answer", text: "Recognizing that every candidate is unique, we create a bespoke development roadmap for each aspirant." } },
    { "@type": "Question", name: "Do you support repeater candidates?", acceptedAnswer: { "@type": "Answer", text: "Yes. We specialize in repeaters, addressing the psychological aspects of previous attempts." } },
    { "@type": "Question", name: "What is the duration of the 2026 programs?", acceptedAnswer: { "@type": "Answer", text: "Flagship programs typically range from 2–4 weeks depending on the specific track." } },
    { "@type": "Question", name: "Is online mentorship available?", acceptedAnswer: { "@type": "Answer", text: "Yes. Our digital platform provides the same level of rigorous mentorship remotely." } },
  ],
};

const FAQ = () => {
    return (
        <>
            <SEO
                title="SSB Interview FAQs | Invincio Mentorship by Ex-SSB Assessors"
                description="Answers to common questions about Invincio's SSB mentorship — mentors, personalised roadmaps, repeater support, online programs, durations and selection process."
                path="/faq"
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "FAQ", path: "/faq" },
                ]}
                jsonLd={faqLd}
            />
            <FAQSection />
        </>
    );
};

export default FAQ;
