import SEO from "@/components/SEO";

const UPDATED = "May 2026";

const Privacy = () => {
  return (
    <div className="bg-white">
      <SEO
        title="Privacy Policy | Invincio Services"
        description="How Invincio Services LLP collects, uses, stores and protects personal information of website visitors and program enquirers."
        path="/privacy"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24 font-sans text-[#374151]">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#2FB4E7] mb-3">Legal</p>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#00568C] mb-4 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#6B7280] mb-10">Last updated: {UPDATED}</p>

        <section className="space-y-8 leading-relaxed text-[15px]">
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#00568C] mb-3">1. Who we are</h2>
            <p>
              Invincio Services LLP ("Invincio", "we", "us") operates www.invincioservices.com and provides
              mentorship for India's defence officer entries. This policy explains how we handle personal
              information collected through this website, consultations and program enrolments.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#00568C] mb-3">2. Information we collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact details you submit (name, phone, email, course interest).</li>
              <li>Communications with our mentors and admissions team.</li>
              <li>Limited analytics on site usage (page views, device type, referrer).</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#00568C] mb-3">3. How we use it</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to enquiries and schedule consultations.</li>
              <li>To deliver programs you enrol in and share batch updates.</li>
              <li>To improve our website, content and selection-readiness curriculum.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#00568C] mb-3">4. Sharing</h2>
            <p>
              We do not sell personal information. We share data only with trusted service providers
              (e.g. email and analytics) under confidentiality obligations, or where required by law.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#00568C] mb-3">5. Your rights</h2>
            <p>
              You can request access, correction or deletion of your personal data, or withdraw consent
              for marketing communications, by writing to{" "}
              <a href="mailto:invincio_soldier@outlook.com" className="text-[#2FB4E7] underline">
                invincio_soldier@outlook.com
              </a>.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#00568C] mb-3">6. Contact</h2>
            <p>
              Invincio Services LLP, New Delhi, India ·{" "}
              <a href="tel:+918601407444" className="text-[#2FB4E7] underline">+91 86014 07444</a>
            </p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default Privacy;
