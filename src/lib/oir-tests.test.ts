import { describe, it, expect } from "vitest";
import tests, { isLive } from "../../api/_tests";

const GENERIC = /^Which (one|number|pair|letter group) does not belong with the others\?$|which of these equations is correct\?$/;

describe("OIR test bank", () => {
  it("has well-formed questions", () => {
    expect(new Set(tests.map((t) => t.id)).size).toBe(tests.length);
    for (const t of tests) {
      for (const q of t.questions) {
        expect([4, 5], `${t.id}: ${q.q}`).toContain(q.options.length);
        expect(new Set(q.options).size, `${t.id}: ${q.q}`).toBe(q.options.length);
        expect(q.answer >= 0 && q.answer < q.options.length, `${t.id}: ${q.q}`).toBe(true);
        expect(q.explanation, `${t.id}: ${q.q}`).toBeTruthy();
      }
    }
  });

  it("never repeats a question", () => {
    const seen = new Map<string, string>();
    for (const t of tests) for (const q of t.questions) {
      const key = GENERIC.test(q.q) ? q.q + [...q.options].sort().join("|") : q.q;
      expect(seen.get(key), `${t.id} repeats a question from ${seen.get(key)}: ${q.q}`).toBeUndefined();
      seen.set(key, t.id);
    }
  });

  it("releases five tests every Sunday at midnight IST", () => {
    const byDate = new Map<string, number>();
    for (const t of tests) if (t.releaseAt) byDate.set(t.releaseAt, (byDate.get(t.releaseAt) || 0) + 1);
    const dates = [...byDate.keys()].sort();
    for (const d of dates) {
      expect(byDate.get(d), d).toBe(5);
      expect(d.endsWith("T00:00:00+05:30"), d).toBe(true);
      expect(new Date(d.slice(0, 10) + "T00:00:00Z").getUTCDay(), `${d} is a Sunday`).toBe(0);
    }
    for (let i = 1; i < dates.length; i++) expect(Date.parse(dates[i]) - Date.parse(dates[i - 1])).toBe(7 * 86400000);
  });

  it("hides a test until its release time", () => {
    const t = { id: "x", title: "x", durationMinutes: 1, questions: [], releaseAt: "2026-09-27T00:00:00+05:30" };
    expect(isLive(t, Date.parse("2026-09-26T18:29:59Z"))).toBe(false);
    expect(isLive(t, Date.parse("2026-09-26T18:30:00Z"))).toBe(true);
    expect(isLive({ ...t, releaseAt: undefined })).toBe(true);
  });
});
