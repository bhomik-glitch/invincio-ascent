import { readJson, json, type Req, type Res } from "./_lib.js";
import { env, hmacOk, rzp, ensureInvoiceEmailed, invoiceToken, type Payment } from "./_pay.js";

// POST { razorpay_order_id, razorpay_payment_id, razorpay_signature } (from Checkout's handler)
// → { paymentId, token, emailed }. Verifies the signature, then emails the invoice.
export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });
  try {
    const b = await readJson(req);
    const orderId = String(b.razorpay_order_id || ""), paymentId = String(b.razorpay_payment_id || ""), sig = String(b.razorpay_signature || "");
    if (!orderId || !paymentId || !sig) return json(res, 400, { error: "Missing payment details" });
    if (!hmacOk(env("RAZORPAY_KEY_SECRET"), `${orderId}|${paymentId}`, sig)) {
      return json(res, 400, { error: "Payment could not be verified" });
    }
    const payment = await rzp<Payment>(`/payments/${paymentId}`);
    if (payment.order_id !== orderId) return json(res, 400, { error: "Payment does not match order" });

    const { emailed } = await ensureInvoiceEmailed(payment);
    json(res, 200, { paymentId, token: invoiceToken(paymentId), emailed });
  } catch (err) {
    console.error("pay-verify failed:", err);
    json(res, 500, { error: err instanceof Error ? err.message : "Verification failed" });
  }
}
