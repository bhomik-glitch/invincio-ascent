import SEO from "@/components/SEO";
import InvoiceView, { type InvoiceData } from "@/components/InvoiceView";

// Sample data so the layout can be reviewed without a real payment. Live invoices render at /invoice/:id.
const invoice: InvoiceData = {
  number: "INV-2026-0001",
  date: "11 Sep 2026",
  dueDate: "18 Sep 2026",
  status: "PAID",
  paymentMethod: "UPI",
  transactionId: "T2609112034587412",
  billTo: {
    name: "Cadet Aryan Sharma",
    email: "aryan.sharma@example.com",
    phone: "+91 98765 43210",
    address: "House No. 42, Sector 15, Gurugram, Haryana 122001",
  },
  items: [
    {
      description: "SSB Interview Coaching — Full Program",
      detail: "1-on-1 mentorship, 12 sessions, Ex-SSB Assessor",
      qty: 1,
      unitPrice: 24999,
    },
    {
      description: "Written Exam Prep Add-on",
      detail: "OIR + PPDT test series with review",
      qty: 1,
      unitPrice: 4999,
    },
  ],
  taxRatePct: 18,
  notes:
    "This is a computer-generated invoice and does not require a physical signature. For questions about this bill, contact invincio_soldier@outlook.com.",
};

const InvoiceDemo = () => (
  <div className="min-h-screen bg-[#eef6f8] py-10 px-4 print:bg-white print:py-0">
    <SEO title="Invoice | Invincio Services" description="Payment invoice for Invincio Services." path="/invoice-demo" noindex />
    <div className="max-w-3xl mx-auto mb-6 flex justify-end print:hidden">
      <button
        onClick={() => window.print()}
        className="rounded-lg bg-[#00568C] text-white font-sans text-sm font-semibold px-5 py-2.5 hover:bg-[#00456f] transition-colors shadow-sm"
      >
        Download / Print PDF
      </button>
    </div>
    <InvoiceView invoice={invoice} />
  </div>
);

export default InvoiceDemo;
