// Prices the server trusts. The browser sends a batchId + optionId; the API
// looks the amount up here, never from the request. Amounts are in rupees,
// GST-inclusive (what the customer actually pays). Imported by api/ and src/.
export const GST_PCT = 18;

export interface PayOption {
  id: string;
  label: string;
  amount: number;
}

export const CATALOGUE: Record<string, { title: string; options: PayOption[] }> = {
  "ssb-offline": {
    title: "SSB Mentorship Program (Offline)",
    options: [
      { id: "registration", label: "Registration amount (non-refundable)", amount: 3600 },
      { id: "full", label: "Full program fee (incl. GST)", amount: 23600 },
    ],
  },
  "officer-online": {
    title: "Online Officer Mentorship Program",
    options: [{ id: "full", label: "Program fee", amount: 17700 }],
  },
  "nda-integrated": {
    title: "NDA Integrated Program (Written + SSB)",
    options: [{ id: "full", label: "Program fee (₹60,000 + 18% GST)", amount: 70800 }],
  },
  "nda-foundation": {
    title: "NDA Foundation Program (Written + SSB)",
    options: [{ id: "full", label: "Program fee (₹60,000 + 18% GST)", amount: 70800 }],
  },
  "cds-integrated": {
    title: "CDS Integrated Program (Written + SSB)",
    options: [{ id: "full", label: "Program fee (₹60,000 + 18% GST)", amount: 70800 }],
  },
};

export function findPrice(batchId: string, optionId: string) {
  const batch = CATALOGUE[batchId];
  const option = batch?.options.find((o) => o.id === optionId);
  return batch && option ? { title: batch.title, option } : null;
}
