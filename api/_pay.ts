// Razorpay + Resend helpers shared by pay-order, pay-verify, pay-webhook and invoice.
import { createHmac, timingSafeEqual } from "node:crypto";
import { secret } from "./_lib.js";
import { CATALOGUE, GST_PCT, findPrice } from "../src/data/catalogue.js";

export function env(key: string) {
  const v = process.env[key];
  if (!v) throw new Error(`${key} env var is not set`);
  return v;
}

export function hmacOk(secret: string, payload: string, signature: string) {
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const a = Buffer.from(expected), b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Razorpay REST with basic auth; small enough that the SDK isn't worth a dependency.
export async function rzp<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const auth = Buffer.from(`${env("RAZORPAY_KEY_ID")}:${env("RAZORPAY_KEY_SECRET")}`).toString("base64");
  const r = await fetch(`https://api.razorpay.com/v1${path}`, {
    method: init?.method || "GET",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: init?.body === undefined ? undefined : JSON.stringify(init.body),
  });
  const body = (await r.json()) as { error?: { description?: string } };
  if (!r.ok) throw new Error(body?.error?.description || `Razorpay responded ${r.status}`);
  return body as T;
}

// Order notes carry everything the invoice needs, so no database is required.
export interface OrderNotes {
  batchId: string;
  optionId: string;
  slot: string;
  name: string;
  email: string;
  phone: string;
  invoice_sent?: string;
}

export interface Payment {
  id: string;
  order_id: string;
  amount: number; // paise
  status: string;
  method?: string;
  email?: string;
  contact?: string;
  created_at: number;
  notes?: Partial<OrderNotes>;
}

export interface Invoice {
  number: string;
  date: string;
  status: string;
  paymentMethod: string;
  transactionId: string;
  billTo: { name: string; email: string; phone: string };
  items: { description: string; detail: string; qty: number; unitPrice: number }[];
  taxRatePct: number;
}

const fmtDate = (unix: number) =>
  new Date(unix * 1000).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

export function invoiceFromPayment(p: Payment): Invoice {
  const n = p.notes || {};
  const price = findPrice(n.batchId || "", n.optionId || "");
  const total = p.amount / 100;
  // unitPrice is ex-GST; the invoice view adds GST back and lands on `total`.
  const base = Math.round(total / (1 + GST_PCT / 100));
  return {
    // ponytail: number derived from the payment id, not sequential. Add a DB counter if the CA needs strict sequence.
    number: `INV-${new Date(p.created_at * 1000).getFullYear()}-${p.id.replace(/^pay_/, "").toUpperCase()}`,
    date: fmtDate(p.created_at),
    status: p.status === "captured" ? "PAID" : p.status.toUpperCase(),
    paymentMethod: (p.method || "online").toUpperCase(),
    transactionId: p.id,
    billTo: { name: n.name || "", email: p.email || n.email || "", phone: p.contact || n.phone || "" },
    items: [
      {
        description: price?.title || CATALOGUE[n.batchId || ""]?.title || "Invincio program fee",
        detail: [price?.option.label, n.slot && `Batch starting ${n.slot}`].filter(Boolean).join(" · "),
        qty: 1,
        unitPrice: base,
      },
    ],
    taxRatePct: GST_PCT,
  };
}

// Signed link so only the payer (via the email / redirect) can open /invoice/:id.
export const invoiceToken = (paymentId: string) =>
  createHmac("sha256", secret()).update(`invoice:${paymentId}`).digest("base64url");

export const invoiceUrl = (paymentId: string) =>
  `${(process.env.SITE_URL || "https://www.invincioservices.com").replace(/\/$/, "")}/invoice/${paymentId}?t=${invoiceToken(paymentId)}`;

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function invoiceEmailHtml(inv: Invoice, link: string) {
  const subtotal = inv.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const tax = Math.round((subtotal * inv.taxRatePct) / 100);
  const rows = inv.items
    .map(
      (i) =>
        `<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb"><div style="font-weight:600;color:#111827">${i.description}</div><div style="font-size:12px;color:#6b7280">${i.detail}</div></td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:right;color:#111827">${inr(i.qty * i.unitPrice)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="margin:0;background:#eef6f8;padding:24px;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
<tr><td style="height:6px;background:#00568C"></td></tr>
<tr><td style="padding:32px">
  <p style="margin:0 0 4px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#6b7280">Payment receipt</p>
  <h1 style="margin:0 0 16px;font-size:22px;color:#111827">Thank you, ${inv.billTo.name || "Aspirant"}.</h1>
  <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#374151">We have received your payment. Your invoice <strong>${inv.number}</strong> is below. Our team will reach out on <strong>${inv.billTo.phone}</strong> with joining instructions.</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">${rows}
    <tr><td style="padding:8px 0;color:#6b7280">Subtotal</td><td style="padding:8px 0;text-align:right;color:#6b7280">${inr(subtotal)}</td></tr>
    <tr><td style="padding:4px 0;color:#6b7280">GST (${inv.taxRatePct}%)</td><td style="padding:4px 0;text-align:right;color:#6b7280">${inr(tax)}</td></tr>
    <tr><td style="padding:12px 0;font-weight:700;color:#00568C;font-size:16px">Total paid</td><td style="padding:12px 0;text-align:right;font-weight:700;color:#00568C;font-size:16px">${inr(subtotal + tax)}</td></tr>
  </table>
  <p style="margin:8px 0 24px;font-size:12px;color:#6b7280">Invoice date ${inv.date} · ${inv.paymentMethod} · Transaction ${inv.transactionId}</p>
  <a href="${link}" style="display:inline-block;background:#00568C;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:8px">View / download invoice</a>
  <p style="margin:28px 0 0;font-size:12px;line-height:1.6;color:#6b7280">This is a computer-generated invoice and does not require a signature. Questions? Reply to this email or WhatsApp +91 86014 07444.</p>
</td></tr>
<tr><td style="padding:16px 32px;background:#f9fafb;font-size:12px;color:#6b7280">Invincio Services LLP · New Delhi, India</td></tr>
</table></td></tr></table></body></html>`;
}

export async function sendInvoiceEmail(inv: Invoice, link: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn(`RESEND_API_KEY not set; invoice email skipped for ${inv.transactionId}`);
    return false;
  }
  if (!inv.billTo.email) return false;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.INVOICE_FROM_EMAIL || "Invincio <billing@invincioservices.com>",
      to: [inv.billTo.email],
      bcc: process.env.INVOICE_BCC_EMAIL ? [process.env.INVOICE_BCC_EMAIL] : undefined,
      subject: `Payment receipt ${inv.number} — Invincio`,
      html: invoiceEmailHtml(inv, link),
    }),
  });
  if (!r.ok) throw new Error(`Resend responded ${r.status}: ${await r.text()}`);
  return true;
}

// Both the browser (pay-verify) and Razorpay (pay-webhook) call this; the
// `invoice_sent` note on the payment keeps the customer from getting it twice.
export async function ensureInvoiceEmailed(p: Payment) {
  const inv = invoiceFromPayment(p);
  if (p.notes?.invoice_sent) return { invoice: inv, emailed: true };
  const emailed = await sendInvoiceEmail(inv, invoiceUrl(p.id));
  if (emailed) {
    await rzp(`/payments/${p.id}`, { method: "PATCH", body: { notes: { ...p.notes, invoice_sent: "1" } } });
  }
  return { invoice: inv, emailed };
}
