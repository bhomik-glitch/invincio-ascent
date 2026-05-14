import SEO from "@/components/SEO";

const UPDATED = "May 2026";

const Terms = () => {
  return (
    <div className="bg-white">
      <SEO
        title="Terms of Service | Invincio Services"
        description="Terms governing your use of www.invincioservices.com and enrolment in Invincio Services LLP mentorship programs."
        path="/terms"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ]}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24 font-sans text-[#374151]">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#2FB4E7] mb-3">Legal</p>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#00568C] mb-4 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-[#6B7280] mb-10">Last updated: {UPDATED}</p>

        <section className="space-y-8 leading-relaxed text-[15px]">
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#00568C] mb-3">1. Acceptance</h2>
            <p>
              By accessing www.invincioservices.com or enrolling in an Invincio program, you agree to be
              bound by these terms. If you do not agree, please do not use the site or our services.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#00568C] mb-3">2. Services</h2>
            <p>
              Invincio Services LLP provides mentorship for SSB interviews and defence written exams.
              Mentorship aims to develop Officer Like Qualities; selection at any Services Selection
              Board is not guaranteed and depends on the candidate's own performance.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#00568C] mb-3">3. Enrolment & fees</h2>
            <p>
              Fees, schedules and batch details are confirmed at the time of enrolment. Refund and
              reschedule policies are shared with each candidate before payment.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#00568C] mb-3">4. Conduct</h2>
            <p>
              Candidates are expected to maintain discipline, confidentiality of session content and
              respect toward mentors and peers. Invincio reserves the right to suspend enrolment for
              breach of conduct.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#00568C] mb-3">5. Intellectual property</h2>
            <p>
              All material on the site and within programs — including session recordings, workbooks
              and study notes — is owned by Invincio Services LLP and may not be reproduced or shared
              without written consent.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#00568C] mb-3">6. Governing law</h2>
            <p>
              These terms are governed by the laws of India and the courts of New Delhi shall have
              exclusive jurisdiction.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#00568C] mb-3">7. Contact</h2>
            <p>
              Invincio Services LLP, New Delhi, India ·{" "}
              <a href="mailto:invincio_soldier@outlook.com" className="text-[#2FB4E7] underline">
                invincio_soldier@outlook.com
              </a>
            </p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default Terms;
