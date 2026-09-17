export interface InvoiceData {
  number: string;
  date: string;
  dueDate?: string;
  status: string;
  paymentMethod: string;
  transactionId: string;
  billTo: { name: string; email: string; phone: string; address?: string };
  items: { description: string; detail: string; qty: number; unitPrice: number }[];
  taxRatePct: number;
  notes?: string;
}

const DEFAULT_NOTES =
  "This is a computer-generated invoice and does not require a physical signature. For questions about this bill, contact invincio_soldier@outlook.com.";

const currency = (n: number) =>
  n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const ONES = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

// ponytail: Indian numbering (lakh/crore) rupees-in-words, good up to 99,99,99,999. No library needed for this.
function numberToWordsINR(n: number): string {
  if (n === 0) return "Zero";
  const twoDigits = (num: number): string =>
    num < 20 ? ONES[num] : `${TENS[Math.floor(num / 10)]}${num % 10 ? " " + ONES[num % 10] : ""}`;
  const threeDigits = (num: number): string =>
    num >= 100
      ? `${ONES[Math.floor(num / 100)]} Hundred${num % 100 ? " " + twoDigits(num % 100) : ""}`
      : twoDigits(num);

  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;

  return [
    crore ? `${threeDigits(crore)} Crore` : "",
    lakh ? `${threeDigits(lakh)} Lakh` : "",
    thousand ? `${threeDigits(thousand)} Thousand` : "",
    rest ? threeDigits(rest) : "",
  ]
    .filter(Boolean)
    .join(" ");
}

const InvoiceView = ({ invoice }: { invoice: InvoiceData }) => {
  const subtotal = invoice.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const tax = Math.round((subtotal * invoice.taxRatePct) / 100);
  const total = subtotal + tax;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden print:shadow-none print:border-0 print:rounded-none">
      {/* Brand bar */}
      <div className="h-2 bg-gradient-to-r from-[#00568C] via-[#2FB4E7] to-[#f2a93c] print-exact" />

      <div className="p-8 sm:p-12">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-6 pb-8 border-b border-[#e5e7eb]">
          <div>
            <img src="/assets/logo.png" alt="Invincio Services LLP" className="h-14 w-auto mb-3" />
            <p className="font-sans text-sm text-[#6B7280]">Invincio Services LLP</p>
            <p className="font-sans text-sm text-[#6B7280]">New Delhi, India</p>
            <p className="font-sans text-sm text-[#6B7280]">invincio_soldier@outlook.com</p>
            <p className="font-sans text-sm text-[#6B7280]">+91 86014 07444</p>
          </div>
          <div className="text-right">
            <h1 className="font-serif text-3xl font-bold text-[#111827] tracking-tight">INVOICE</h1>
            <p className="font-sans text-sm text-[#6B7280] mt-2">#{invoice.number}</p>
            <span className="print-exact inline-block mt-2 rounded-full bg-[#e6f7ec] text-[#1a7f3c] text-xs font-sans font-semibold px-3 py-1 tracking-wide">
              {invoice.status}
            </span>
          </div>
        </div>

        {/* Bill to / dates */}
        <div className="flex flex-wrap justify-between gap-6 py-8">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-2">
              Billed To
            </p>
            <p className="font-sans text-sm font-semibold text-[#111827]">{invoice.billTo.name}</p>
            {invoice.billTo.address && (
              <p className="font-sans text-sm text-[#6B7280] max-w-xs">{invoice.billTo.address}</p>
            )}
            <p className="font-sans text-sm text-[#6B7280]">{invoice.billTo.email}</p>
            <p className="font-sans text-sm text-[#6B7280]">{invoice.billTo.phone}</p>
          </div>
          <div className="text-right">
            <p className="font-sans text-sm text-[#6B7280]">
              Invoice Date: <span className="text-[#111827] font-medium">{invoice.date}</span>
            </p>
            {invoice.dueDate && (
              <p className="font-sans text-sm text-[#6B7280] mt-1">
                Due Date: <span className="text-[#111827] font-medium">{invoice.dueDate}</span>
              </p>
            )}
            <p className="font-sans text-sm text-[#6B7280] mt-1">
              Payment Method: <span className="text-[#111827] font-medium">{invoice.paymentMethod}</span>
            </p>
            <p className="font-sans text-sm text-[#6B7280] mt-1">
              Transaction ID: <span className="text-[#111827] font-medium">{invoice.transactionId}</span>
            </p>
          </div>
        </div>

        {/* Line items */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-[#00568C]">
              <th className="font-sans text-xs font-semibold uppercase tracking-wide text-[#6B7280] py-2">
                Description
              </th>
              <th className="font-sans text-xs font-semibold uppercase tracking-wide text-[#6B7280] py-2 text-center">
                Qty
              </th>
              <th className="font-sans text-xs font-semibold uppercase tracking-wide text-[#6B7280] py-2 text-right">
                Unit Price
              </th>
              <th className="font-sans text-xs font-semibold uppercase tracking-wide text-[#6B7280] py-2 text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.description} className="border-b border-[#e5e7eb]">
                <td className="py-4 pr-4">
                  <p className="font-sans text-sm font-medium text-[#111827]">{item.description}</p>
                  <p className="font-sans text-xs text-[#6B7280] mt-0.5">{item.detail}</p>
                </td>
                <td className="py-4 font-sans text-sm text-[#111827] text-center">{item.qty}</td>
                <td className="py-4 font-sans text-sm text-[#111827] text-right">
                  {currency(item.unitPrice)}
                </td>
                <td className="py-4 font-sans text-sm text-[#111827] text-right">
                  {currency(item.qty * item.unitPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end pt-6">
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between font-sans text-sm text-[#6B7280]">
              <span>Subtotal</span>
              <span>{currency(subtotal)}</span>
            </div>
            <div className="flex justify-between font-sans text-sm text-[#6B7280]">
              <span>GST ({invoice.taxRatePct}%)</span>
              <span>{currency(tax)}</span>
            </div>
            <div className="print-exact flex justify-between font-sans text-base font-bold text-[#00568C] bg-[#eef6f8] rounded-lg px-3 py-2.5 mt-1">
              <span>Total Paid</span>
              <span>{currency(total)}</span>
            </div>
          </div>
        </div>

        <p className="font-sans text-xs text-[#6B7280] text-right mt-2 italic">
          Amount in words: Rupees {numberToWordsINR(total)} Only
        </p>

        {/* Notes / footer */}
        <div className="mt-10 pt-6 border-t border-[#e5e7eb]">
          <p className="font-sans text-xs text-[#6B7280] leading-relaxed">{invoice.notes || DEFAULT_NOTES}</p>
          <p className="font-serif text-sm text-[#00568C] font-semibold mt-4">
            Thank you for choosing Invincio Services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
