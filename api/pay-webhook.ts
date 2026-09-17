import { json, type Req, type Res } from "./_lib.js";
import { hmacOk, ensureInvoiceEmailed, type Payment } from "./_pay.js";

// Razorpay Dashboard → Settings → Webhooks → URL https://<site>/api/pay-webhook,
// event `payment.captured`, secret = RAZORPAY_WEBHOOK_SECRET. Backstop for when
// the payer closes the tab before pay-verify runs; safe to receive twice.

// Signature is over the raw bytes, so keep Vercel from parsing the body first.
export const config = { api: { bodyParser: false } };

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.warn("pay-webhook: RAZORPAY_WEBHOOK_SECRET not set; ignoring event");
    return json(res, 503, { error: "Webhook not configured" });
  }
  try {
    let raw = typeof req.body === "string" ? req.body : "";
    if (!raw && req.body && typeof req.body === "object") raw = JSON.stringify(req.body);
    if (!raw) for await (const chunk of req) raw += chunk;
    const sig = String(req.headers["x-razorpay-signature"] || "");
    if (!hmacOk(secret, raw, sig)) return json(res, 400, { error: "Bad signature" });

    const event = JSON.parse(raw) as { event: string; payload?: { payment?: { entity?: Payment } } };
    if (event.event === "payment.captured" && event.payload?.payment?.entity) {
      await ensureInvoiceEmailed(event.payload.payment.entity);
    }
    json(res, 200, { ok: true });
  } catch (err) {
    console.error("pay-webhook failed:", err);
    json(res, 500, { error: "Webhook handling failed" });
  }
}
