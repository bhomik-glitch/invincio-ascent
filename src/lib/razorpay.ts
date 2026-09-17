// Browser side of the payment flow: create order → open Razorpay Checkout → verify.
declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open(): void };
  }
}

export interface PayInput {
  batchId: string;
  optionId: string;
  slot: string;
  name: string;
  email: string;
  phone: string;
}

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadCheckout() {
  return new Promise<void>((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const s = document.createElement("script");
    s.src = CHECKOUT_SRC;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load the payment window. Check your connection and try again."));
    document.head.appendChild(s);
  });
}

async function post<T>(url: string, body: unknown): Promise<T> {
  const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = (await r.json().catch(() => ({}))) as T & { error?: string };
  if (!r.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

/** Resolves once the payment is captured and verified. Rejects if the payer closes Checkout. */
export async function payForBatch(input: PayInput): Promise<{ paymentId: string; token: string; emailed: boolean }> {
  const [order] = await Promise.all([
    post<{ orderId: string; amount: number; keyId: string; description: string }>("/api/pay-order", input),
    loadCheckout(),
  ]);

  const response = await new Promise<Record<string, string>>((resolve, reject) => {
    new window.Razorpay!({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: "INR",
      name: "Invincio",
      description: order.description,
      image: "/assets/logo.png",
      prefill: { name: input.name, email: input.email, contact: input.phone },
      notes: { batchId: input.batchId, slot: input.slot },
      theme: { color: "#00568C" },
      handler: resolve,
      modal: { ondismiss: () => reject(new Error("Payment window closed before completing the payment.")) },
    }).open();
  });

  return post("/api/pay-verify", response);
}
