import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SEO from "@/components/SEO";
import InvoiceView, { type InvoiceData } from "@/components/InvoiceView";

// /invoice/:id?t=<token> — the page the payer lands on after checkout and the
// link in the receipt email. Data comes from /api/invoice, which checks the token.
const Invoice = () => {
  const { id = "" } = useParams();
  const [params] = useSearchParams();
  const [invoice, setInvoice] = useState<(InvoiceData & { emailed?: boolean }) | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/invoice?id=${encodeURIComponent(id)}&t=${encodeURIComponent(params.get("t") || "")}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || "Could not load invoice");
        setInvoice(data);
      })
      .catch((e: Error) => setError(e.message));
  }, [id, params]);

  return (
    <div className="min-h-screen bg-[#eef6f8] py-10 px-4 print:bg-white print:py-0">
      <SEO title="Invoice | Invincio Services" description="Payment invoice for Invincio Services." path={`/invoice/${id}`} noindex />

      {error && (
        <p className="max-w-3xl mx-auto text-center font-sans text-sm text-red-600 py-20">{error}</p>
      )}
      {!error && !invoice && (
        <p className="max-w-3xl mx-auto text-center font-sans text-sm text-[#6B7280] py-20">Loading your invoice…</p>
      )}

      {invoice && (
        <>
          <div className="max-w-3xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
            <div>
              <p className="font-serif text-xl font-bold text-[#111827]">Payment successful 🎉</p>
              <p className="font-sans text-sm text-[#6B7280]">
                {invoice.emailed ? (
                  <>A copy of this invoice has been emailed to <span className="font-medium text-[#111827]">{invoice.billTo.email}</span>. </>
                ) : (
                  <>Save or print this page for your records. </>
                )}
                Our team will reach out shortly with joining instructions.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="rounded-lg bg-[#00568C] text-white font-sans text-sm font-semibold px-5 py-2.5 hover:bg-[#00456f] transition-colors shadow-sm"
            >
              Download / Print PDF
            </button>
          </div>
          <InvoiceView invoice={invoice} />
        </>
      )}
    </div>
  );
};

export default Invoice;
