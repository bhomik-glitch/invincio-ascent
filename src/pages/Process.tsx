import ProcessSection from "@/components/ProcessSection";
import SEO from "@/components/SEO";

const Process = () => {
    return (
        <div className="pt-8 pb-16">
            <SEO
                title="The Invincio Process | How We Build SSB-Ready Officers"
                description="Our step-by-step mentorship process — diagnostic profiling, personalised roadmap, GTO drills, psych tests, mock interviews and conference-level rehearsals."
                path="/process"
                keywords="Invincio process, SSB preparation process, GTO training, psych tests, SSB mock interview"
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "Process", path: "/process" },
                ]}
            />
            <ProcessSection />
        </div>
    );
};

export default Process;
