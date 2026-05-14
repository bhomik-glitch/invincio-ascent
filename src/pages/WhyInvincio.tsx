import DifferentiatorSection from "@/components/DifferentiatorSection";
import ImpactSection from "@/components/ImpactSection";
import SEO from "@/components/SEO";

const WhyInvincio = () => {
    return (
        <div className="bg-white">
            <SEO
                title="Why Invincio | The Ex-SSB Assessor Advantage"
                description="Why aspiring officers choose Invincio: mentorship by Ex-SSB Assessors, personality-led development, repeater specialisation and measurable selection impact."
                path="/difference"
                keywords="why Invincio, Ex-SSB assessor advantage, best SSB coaching, defence mentorship India"
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "Why Invincio", path: "/difference" },
                ]}
            />
            <DifferentiatorSection />
            <ImpactSection />
        </div>
    );
};

export default WhyInvincio;
