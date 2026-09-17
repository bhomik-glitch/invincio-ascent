import { describe, it, expect } from "vitest";
import { invoiceFromPayment, hmacOk, invoiceToken } from "../../api/_pay";
import { CATALOGUE } from "@/data/catalogue";

const payment = (amountRupees: number, notes: Record<string, string>) => ({
  id: "pay_TestAbc123",
  order_id: "order_x",
  amount: amountRupees * 100,
  status: "captured",
  method: "upi",
  email: "a@b.com",
  contact: "+919876543210",
  created_at: 1789000000,
  notes,
});

describe("invoice from a Razorpay payment", () => {
  it("splits every catalogue price into ex-GST + 18% that adds back to the amount paid", () => {
    for (const [batchId, { options }] of Object.entries(CATALOGUE)) {
      for (const o of options) {
        const inv = invoiceFromPayment(payment(o.amount, { batchId, optionId: o.id, slot: "01 Oct 2026", name: "A" }));
        const subtotal = inv.items[0].unitPrice;
        expect(subtotal + Math.round(subtotal * 0.18)).toBe(o.amount);
        expect(inv.items[0].description).toBe(CATALOGUE[batchId].title);
      }
    }
  });

  it("fills bill-to from the payment and flags captured as PAID", () => {
    const inv = invoiceFromPayment(payment(3600, { batchId: "ssb-offline", optionId: "registration", name: "Aryan" }));
    expect(inv.status).toBe("PAID");
    expect(inv.billTo).toEqual({ name: "Aryan", email: "a@b.com", phone: "+919876543210" });
    expect(inv.number).toBe("INV-2026-TESTABC123");
    expect(inv.items[0].detail).toContain("Registration amount");
  });

  it("verifies Razorpay signatures and rejects tampering", () => {
    const { createHmac } = require("node:crypto") as typeof import("node:crypto");
    const sig = createHmac("sha256", "s3cret").update("order_1|pay_1").digest("hex");
    expect(hmacOk("s3cret", "order_1|pay_1", sig)).toBe(true);
    expect(hmacOk("s3cret", "order_1|pay_2", sig)).toBe(false);
    expect(hmacOk("s3cret", "order_1|pay_1", sig.slice(1))).toBe(false);
  });

  it("issues a stable per-payment invoice token", () => {
    expect(invoiceToken("pay_1")).toBe(invoiceToken("pay_1"));
    expect(invoiceToken("pay_1")).not.toBe(invoiceToken("pay_2"));
  });
});
