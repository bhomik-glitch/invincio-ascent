import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SEO from "@/components/SEO";
import { api, saveScore, type Result, type Test } from "@/lib/api";
import { BG_BASE, BTN_PRIMARY, BTN_SECONDARY, CONTAINER, H2_LIGHT, BODY_LIGHT } from "@/lib/design-system";

const LETTERS = ["A", "B", "C", "D", "E", "F"];
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

const TakeTest = () => {
  const { id = "" } = useParams();
  const { data: test, isLoading, error } = useQuery({
    queryKey: ["test", id],
    queryFn: () => api<Test>(`/api/tests?id=${encodeURIComponent(id)}`),
    staleTime: Infinity,
  });

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const endAt = useRef(0);
  const submitRef = useRef<() => void>(() => {});

  const submit = async () => {
    if (result || submitting) return;
    setSubmitting(true);
    try {
      const r = await api<Result>(`/api/tests?id=${encodeURIComponent(id)}`, { answers });
      saveScore(id, r);
      setResult(r);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  };
  submitRef.current = submit;

  // Timer: counts down from when the test loads, auto-submits at 0.
  useEffect(() => {
    if (!test) return;
    endAt.current = Date.now() + test.durationMinutes * 60_000;
    const tick = () => {
      const left = Math.max(0, Math.round((endAt.current - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) { clearInterval(timer); submitRef.current(); }
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [test]);

  // Warn before leaving mid-test.
  useEffect(() => {
    if (!test || result) return;
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [test, result]);

  if (isLoading) return <div className={`${BG_BASE} min-h-[60vh]`} />;
  if (error || !test) {
    return (
      <section className={`${BG_BASE} min-h-[60vh] flex items-center justify-center`}>
        <div className="text-center">
          <p className={BODY_LIGHT}>{error instanceof Error ? error.message : "Test not found"}</p>
          <Link to="/tests" className={`${BTN_SECONDARY} mt-4`}>Back to tests</Link>
        </div>
      </section>
    );
  }

  const answered = Object.keys(answers).length;
  const total = test.questions.length;
  const onSubmitClick = () => {
    if (answered < total && !window.confirm(`You have ${total - answered} unanswered question(s). Submit anyway?`)) return;
    submit();
  };

  return (
    <section className={`${BG_BASE} pb-16`}>
      <SEO title={`${test.title} | Invincio`} description="Timed OIR practice test." path={`/tests/${id}`} noindex />

      {/* Fixed bar under the navbar (Layout's overflow-x-hidden breaks position: sticky). Spacer below matches its height. */}
      <div className="fixed top-16 left-0 right-0 z-40 h-[68px] bg-white/95 backdrop-blur border-b border-[#e5e7eb]">
        <div className={`${CONTAINER} h-full flex items-center justify-between gap-4`}>
          <div className="min-w-0">
            <h1 className="font-serif text-lg font-bold text-[#00568C] truncate">{test.title}</h1>
            <p className="font-sans text-xs text-[#6B7280]">{result ? `Score ${result.score}/${result.total}` : `${answered}/${total} answered`}</p>
          </div>
          {result ? (
            <Link to="/tests" className={BTN_SECONDARY}>Back to tests</Link>
          ) : (
            <div className="flex items-center gap-4">
              <span className={`font-mono text-xl font-semibold tabular-nums ${secondsLeft !== null && secondsLeft < 60 ? "text-[#E66133]" : "text-[#00568C]"}`} aria-live="polite">
                {secondsLeft === null ? "--:--" : fmt(secondsLeft)}
              </span>
              <button onClick={onSubmitClick} disabled={submitting} className={`${BTN_PRIMARY} !px-5 !py-2.5 disabled:opacity-60`}>
                {submitting ? "Submitting…" : "Submit"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="h-[68px]" aria-hidden />
      <div className={`${CONTAINER} max-w-[800px] pt-8`}>
        {result && (
          <div className="mb-8 rounded-xl bg-[#00568C] text-white p-8 text-center">
            <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#F6B828]">Result</p>
            <p className="font-serif text-5xl font-bold mt-2">{result.score}<span className="text-2xl text-white/60"> / {result.total}</span></p>
            <p className="font-sans text-sm text-white/70 mt-2">Correct answers are marked in green below.</p>
          </div>
        )}

        <ol className="space-y-6">
          {test.questions.map((q, i) => {
            const chosen = answers[i];
            const correct = result?.key[i];
            return (
              <li key={i} className="bg-white border border-[#e5e7eb] rounded-xl p-6">
                <p className="font-sans text-xs font-semibold text-[#6B7280] mb-2">Question {i + 1}</p>
                <p className="font-sans text-base text-[#374151] leading-relaxed">{q.q}</p>
                {q.image && <img src={q.image} alt="" className="mt-4 max-w-full rounded-lg border border-[#e5e7eb]" />}
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {q.options.map((opt, j) => {
                    const isChosen = chosen === j;
                    let cls = "border-[#e5e7eb] hover:border-[#2FB4E7]";
                    if (result) {
                      if (j === correct) cls = "border-green-500 bg-green-50";
                      else if (isChosen) cls = "border-[#E66133] bg-orange-50";
                      else cls = "border-[#e5e7eb] opacity-70";
                    } else if (isChosen) cls = "border-[#00568C] bg-[#00568C]/5";
                    return (
                      <button
                        key={j}
                        type="button"
                        disabled={!!result}
                        onClick={() => setAnswers((a) => ({ ...a, [i]: j }))}
                        className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-left font-sans text-sm text-[#374151] transition-[border-color,background-color] duration-150 active:scale-[0.99] ${cls}`}
                      >
                        <span className={`shrink-0 w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center ${isChosen ? "bg-[#00568C] text-white" : "bg-[#eaf6f8] text-[#00568C]"}`}>{LETTERS[j]}</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ol>

        {!result && (
          <div className="mt-10 text-center">
            <button onClick={onSubmitClick} disabled={submitting} className={`${BTN_PRIMARY} disabled:opacity-60`}>
              {submitting ? "Submitting…" : "Submit test"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TakeTest;
