import { describe, it, expect } from "vitest";
import { batches } from "./batches";
import { today } from "@/lib/batch-visibility";

describe("batches data", () => {
  it("only lists batches with at least one open slot, each labelled like '15 Sep 2026'", () => {
    for (const b of batches) {
      expect(b.slots.length).toBeGreaterThan(0);
      for (const s of b.slots) {
        expect(s.label).toMatch(/^\d{2} [A-Z][a-z]{2} \d{4}$/);
        expect(s.until >= today()).toBe(true);
      }
      expect(b.fee).toMatch(/₹/);
    }
  });
});
