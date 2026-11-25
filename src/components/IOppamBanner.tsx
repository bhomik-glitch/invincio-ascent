/** i-OPPAM announcement card, shared by the landing page and the OIR test area. */
const IOppamBanner = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col gap-5 rounded-xl bg-[#00568C] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${className}`}>
    <div>
      <p className="inline-block rounded-full bg-[#F6B828] px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#00568C]">
        First in India
      </p>
      <h2 className="mt-3 font-serif text-2xl font-bold text-white md:text-3xl">
        i-OPPAM <span className="text-lg font-normal text-white/75 md:text-xl">(Invincio OPPAM)</span>
      </h2>
      <p className="mt-2 font-sans text-base text-white">Officer&apos;s Potential and Personality Assessment Measure</p>
      <p className="mt-1 font-sans text-sm text-white/75">
        On the lines of OPAM. Invincio is the first in India to offer it.
      </p>
    </div>
    <div className="flex shrink-0 items-baseline gap-2 sm:flex-col sm:items-center sm:gap-0">
      <span className="font-serif text-4xl font-bold text-[#F6B828] md:text-5xl">120</span>
      <span className="font-sans text-sm font-semibold text-white">questions</span>
    </div>
  </div>
);

export default IOppamBanner;
