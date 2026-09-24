import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock, ListChecks, LogOut } from "lucide-react";
import SEO from "@/components/SEO";
import { api, lastScore, type TestSummary } from "@/lib/api";
import { BG_BASE, BTN_PRIMARY, CARD_LIGHT, CONTAINER, EYEBROW, H2_LIGHT, H3_LIGHT, BODY_LIGHT, SECTION_PAD } from "@/lib/design-system";

const Tests = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: tests = [], isLoading } = useQuery({ queryKey: ["tests"], queryFn: () => api<TestSummary[]>("/api/tests") });

  const logout = async () => {
    await api("/api/logout", {});
    queryClient.clear();
    navigate("/login", { replace: true });
  };

  return (
    <section className={`${BG_BASE} ${SECTION_PAD} min-h-[70vh]`}>
      <SEO title="OIR Practice Tests | Invincio" description="Attempt timed OIR practice tests." path="/tests" noindex />
      <div className={CONTAINER}>
        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <p className={EYEBROW}>Student portal</p>
            <h1 className={`${H2_LIGHT} mt-2`}>OIR Practice Tests</h1>
            <p className={`${BODY_LIGHT} mt-2`}>Timed tests. The timer starts the moment you open a test, and it auto-submits when time runs out. Five new tests are added every Sunday.</p>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[#6B7280] hover:text-[#00568C] transition-colors">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>

        {isLoading ? (
          <p className={BODY_LIGHT}>Loading…</p>
        ) : tests.length === 0 ? (
          <p className={BODY_LIGHT}>No tests published yet. Check back soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tests.map((t) => {
              const last = lastScore(t.id);
              return (
                <div key={t.id} className={CARD_LIGHT}>
                  <h2 className={H3_LIGHT}>{t.title}</h2>
                  <div className="mt-3 flex flex-wrap gap-4 font-sans text-sm text-[#6B7280]">
                    <span className="inline-flex items-center gap-1.5"><ListChecks className="w-4 h-4" />{t.questionCount} questions</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" />{t.durationMinutes} min</span>
                  </div>
                  <p className="mt-3 font-sans text-sm text-[#374151] min-h-[1.25rem]">
                    {last ? `Last attempt: ${last.score}/${last.total}` : "Not attempted yet"}
                  </p>
                  <Link to={`/tests/${t.id}`} className={`${BTN_PRIMARY} mt-5 w-full justify-center`}>
                    {last ? "Attempt again" : "Start test"}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tests;
