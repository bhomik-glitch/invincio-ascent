import { json, type Req, type Res } from "./_lib.js";
import { rzp, invoiceFromPayment, invoiceToken, type Payment } from "./_pay.js";
import { timingSafeEqual } from "node:crypto";

// GET /api/invoice?id=pay_xxx&t=<token> → invoice JSON for /invoice/:id
export default async function handler(req: Req, res: Res) {
  const q = new URL(req.url || "/", "http://x").searchParams;
  const id = q.get("id") || "", t = q.get("t") || "";
  if (!/^pay_[A-Za-z0-9]+$/.test(id)) return json(res, 400, { error: "Bad invoice id" });
  const expected = invoiceToken(id);
  if (t.length !== expected.length || !timingSafeEqual(Buffer.from(t), Buffer.from(expected))) {
    return json(res, 403, { error: "This invoice link is not valid" });
  }
  try {
    const payment = await rzp<Payment>(`/payments/${id}`);
    json(res, 200, { ...invoiceFromPayment(payment), emailed: !!payment.notes?.invoice_sent });
  } catch (err) {
    console.error("invoice failed:", err);
    json(res, 500, { error: err instanceof Error ? err.message : "Could not load invoice" });
  }
}
