import { readJson, json, type Req, type Res } from "./_lib.js";
import { env, rzp, type OrderNotes } from "./_pay.js";
import { findPrice } from "../src/data/catalogue.js";

// POST { batchId, optionId, slot, name, email, phone } → { orderId, amount, keyId }
export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });
  try {
    const b = await readJson(req);
    const s = (k: string) => String(b[k] ?? "").trim();
    const notes: OrderNotes = {
      batchId: s("batchId"), optionId: s("optionId"), slot: s("slot").slice(0, 40),
      name: s("name").slice(0, 80), email: s("email").toLowerCase().slice(0, 120), phone: s("phone").replace(/\D/g, "").slice(-10),
    };
    const price = findPrice(notes.batchId, notes.optionId);
    if (!price) return json(res, 400, { error: "Unknown program or fee option" });
    if (notes.name.length < 2) return json(res, 400, { error: "Please enter your full name" });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(notes.email)) return json(res, 400, { error: "Please enter a valid email — your invoice is sent there" });
    if (notes.phone.length !== 10) return json(res, 400, { error: "Please enter a 10-digit mobile number" });

    const order = await rzp<{ id: string; amount: number }>("/orders", {
      method: "POST",
      body: { amount: price.option.amount * 100, currency: "INR", receipt: `${notes.batchId}-${Date.now()}`, notes },
    });
    json(res, 200, { orderId: order.id, amount: order.amount, keyId: env("RAZORPAY_KEY_ID"), description: `${price.title} — ${price.option.label}` });
  } catch (err) {
    console.error("pay-order failed:", err);
    json(res, 500, { error: err instanceof Error ? err.message : "Could not start payment" });
  }
}
