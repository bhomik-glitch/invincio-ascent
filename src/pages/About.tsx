import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import SEO from "@/components/SEO";

const About = () => {
    return (
        <div className="pt-8 pb-16">
            <SEO
                title="About Invincio | Ex-SSB Assessors Mentoring Future Officers"
                description="Meet the Ex-SSB Assessors behind Invincio — GTOs, Interviewing Officers and Psychologists who have personally evaluated thousands of candidates at SSB Boards."
                path="/about"
                keywords="about Invincio, Ex-SSB assessors, GTO, Interviewing Officer, SSB psychologist"
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "About", path: "/about" },
                ]}
            />
            <AboutSection />
            <TeamSection />
        </div>
    );
};

export default About;
