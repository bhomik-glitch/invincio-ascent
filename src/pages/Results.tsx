import ResultsSection from "@/components/ResultsSection";
import TransformationSection from "@/components/TransformationSection";
import SEO from "@/components/SEO";

const Results = () => {
    return (
        <div>
            <SEO
                title="SSB Results & Success Stories | Invincio Recommended Candidates"
                description="Real selection stories from Invincio mentees: recommended candidates across NDA, CDS, AFCAT, TES and TGC entries. See the transformations behind the results."
                path="/results"
                keywords="Invincio results, SSB recommended candidates, NDA success stories, CDS results, AFCAT selection"
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "Results", path: "/results" },
                ]}
            />
            <ResultsSection />
            <TransformationSection />
        </div>
    );
};

export default Results;
