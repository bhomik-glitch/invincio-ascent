import { describe, it, expect } from "vitest";
import { today, plusDays, isCurrent, SSB_VISIBLE_DAYS } from "./batch-visibility";

describe("batch visibility", () => {
  it("formats today as YYYY-MM-DD", () => {
    expect(today()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("adds days across month and year boundaries", () => {
    expect(plusDays("2026-08-28", 7)).toBe("2026-09-04");
    expect(plusDays("2026-12-29", 7)).toBe("2027-01-05");
  });

  it("keeps an SSB batch on its start day and drops it the day after", () => {
    expect(isCurrent({ until: plusDays(today(), SSB_VISIBLE_DAYS) })).toBe(true);
    expect(isCurrent({ until: plusDays(plusDays(today(), -1), SSB_VISIBLE_DAYS) })).toBe(false);
  });

  it("keeps a batch on its final day and drops it the next", () => {
    expect(isCurrent({ until: today() })).toBe(true);
    expect(isCurrent({ until: plusDays(today(), -1) })).toBe(false);
  });
});
