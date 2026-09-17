import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Calendar, ArrowRight, ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { EASE_OUT, TAP_SCALE } from "@/lib/design-system";
import { batches } from "@/data/batches";
import { CATALOGUE } from "@/data/catalogue";
import { payForBatch } from "@/lib/razorpay";
import { useModalLock } from "@/lib/modal-lock";
import { WA_LABEL_SITE, trackWhatsApp } from "@/lib/whatsapp";
import { useEffect, useState } from "react";

interface NewCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Open straight on this batch (id from the catalogue) instead of the grid. */
  initialBatch?: string;
}

const WA_NUMBER = "918601407444";


const NewCoursesModal = ({ isOpen, onClose, initialBatch }: NewCoursesModalProps) => {
  const [activeBatch, setActiveBatch] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [optionId, setOptionId] = useState<string>("");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeBatch !== null) {
          setActiveBatch(null);
          setSelectedSlot(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose, activeBatch]);

  useModalLock(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setActiveBatch(null);
      setSelectedSlot(null);
      setPayError("");
      return;
    }
    const idx = initialBatch ? batches.findIndex((b) => b.id === initialBatch) : -1;
    if (idx >= 0) {
      setActiveBatch(idx);
      setSelectedSlot(batches[idx].slots[0].label); // soonest date preselected
    }
  }, [isOpen, initialBatch]);

  // Default to the first fee option whenever the batch changes.
  useEffect(() => {
    if (activeBatch !== null) setOptionId(CATALOGUE[batches[activeBatch].id].options[0].id);
    setPayError("");
  }, [activeBatch]);

  const handleBook = () => {
    if (activeBatch === null || !selectedSlot) return;
    const text = `Hi Invincio, I'd like to book a slot for *${batches[activeBatch].title}* starting *${selectedSlot}*. Please confirm availability.`;
    trackWhatsApp(WA_LABEL_SITE);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const handlePay = async () => {
    if (activeBatch === null || !selectedSlot || paying) return;
    setPaying(true);
    setPayError("");
    try {
      const { paymentId, token } = await payForBatch({
        batchId: batches[activeBatch].id, optionId, slot: selectedSlot, ...form,
      });
      window.location.assign(`/invoice/${paymentId}?t=${token}`);
    } catch (e) {
      setPayError(e instanceof Error ? e.message : "Payment failed. Please try again.");
      setPaying(false);
    }
  };

  const batch = activeBatch !== null ? batches[activeBatch] : null;
  const options = batch ? CATALOGUE[batch.id].options : [];
  const amount = options.find((o) => o.id === optionId)?.amount ?? options[0]?.amount ?? 0;
  const canPay =
    !!selectedSlot && !paying && form.name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.phone.replace(/\D/g, "").length >= 10;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (activeBatch !== null) { setActiveBatch(null); setSelectedSlot(null); }
              else onClose();
            }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-[3px]"
          />

          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.35)] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#00568C] to-[#004471]">
                <div className="flex items-center gap-3">
                  {activeBatch !== null && (
                    <button
                      onClick={() => { setActiveBatch(null); setSelectedSlot(null); }}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors mr-1"
                    >
                      <ArrowLeft className="w-4 h-4 text-white/80" />
                    </button>
                  )}
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                    <BookOpen className="w-5 h-5 text-[#F6B828]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-white tracking-tight">
                      {batch ? batch.title : "New Course Batches"}
                    </h2>
                    <p className="text-[11px] text-white/60 font-sans uppercase tracking-widest">
                      {batch ? "Select a start date & enroll" : "Admissions Open — 2026"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <X className="w-5 h-5 text-white/70 group-hover:text-white" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeBatch === null ? (
                  /* Batch Grid */
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="max-h-[65vh] overflow-y-auto p-6 grid sm:grid-cols-2 gap-4 bg-gray-50/50"
                  >
                    {batches.length === 0 && (
                      <p className="sm:col-span-2 text-center text-[13px] text-gray-500 py-8">
                        Dates for the next cohort are being finalised. Message us on WhatsApp to be notified first.
                      </p>
                    )}
                    {batches.map((b, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + index * 0.05, duration: 0.25 }}
                        whileTap={TAP_SCALE}
                        onClick={() => { setActiveBatch(index); setSelectedSlot(null); }}
                        className="group bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#00568C]/20 transition-all duration-200 flex flex-col text-left cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[10px] font-bold text-[#00568C] bg-[#f0f9ff] px-2 py-0.5 rounded-full border border-[#00568C]/10 uppercase">
                            {b.highlight}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">
                            {b.slots.length > 0 ? `${b.slots.length} slot${b.slots.length > 1 ? "s" : ""}` : "Open"}
                          </span>
                        </div>
                        <h3 className="text-[15px] font-bold text-[#1F2937] group-hover:text-[#00568C] transition-colors mb-1">
                          {b.title}
                        </h3>
                        <p className="text-[11px] text-[#C6A15B] font-medium italic mb-2 leading-tight">
                          {b.tagline}
                        </p>
                        <p className="text-[12px] text-gray-500 mb-4 line-clamp-2">
                          {b.description}
                        </p>
                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700">
                            {b.slots.length > 0 ? (
                              <>
                                <Calendar className="w-3 h-3 text-gray-400" />
                                {b.slots[0].label}{b.slots.length > 1 ? ` + ${b.slots.length - 1} more` : ""}
                              </>
                            ) : (
                              <span className="text-green-600 font-semibold uppercase tracking-wider text-[10px]">
                                Enrollments Open
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-semibold text-[#00568C] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {b.slots.length > 0 ? "Pick slot" : "Register"} <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                ) : (
                  /* Slot Picker */
                  <motion.div
                    key="slots"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 bg-gray-50/50"
                  >
                    <p className="text-[11px] text-[#C6A15B] font-medium italic mb-4">{batch!.tagline}</p>
                    <p className="text-[12px] text-gray-500 mb-3">{batch!.description}</p>
                    <div className="mb-5">
                      <p className="text-[15px] font-bold text-[#1F2937]">{batch!.fee}</p>
                      {batch!.note && <p className="text-[11px] text-gray-500 mt-1">{batch!.note}</p>}
                    </div>

                    <p className="text-[11px] font-bold text-[#00568C]/60 uppercase tracking-widest mb-3">
                      Available Start Dates
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                      {batch!.slots.map(({ label: slot }) => {
                        const isSelected = selectedSlot === slot;
                        return (
                          <motion.button
                            key={slot}
                            whileTap={TAP_SCALE}
                            onClick={() => setSelectedSlot(slot)}
                            className={`relative flex items-center justify-center gap-2 p-3 rounded-xl border text-[13px] font-semibold transition-all duration-200 ${
                              isSelected
                                ? "bg-[#00568C] border-[#00568C] text-white shadow-md"
                                : "bg-white border-gray-200 text-[#374151] hover:border-[#00568C]/40 hover:shadow-sm"
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                            {slot}
                          </motion.button>
                        );
                      })}
                    </div>

                    <p className="text-[11px] font-bold text-[#00568C]/60 uppercase tracking-widest mb-3">
                      Your Details
                    </p>
                    <div className="grid sm:grid-cols-3 gap-2.5 mb-4">
                      {(["name", "email", "phone"] as const).map((field) => (
                        <input
                          key={field}
                          type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                          inputMode={field === "phone" ? "numeric" : undefined}
                          autoComplete={field === "phone" ? "tel" : field}
                          placeholder={field === "name" ? "Full name" : field === "email" ? "Email (invoice is sent here)" : "10-digit mobile"}
                          value={form[field]}
                          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                          className="w-full p-3 rounded-xl border border-gray-200 bg-white text-[13px] text-[#374151] placeholder:text-gray-400 focus:outline-none focus:border-[#00568C]/60 focus:ring-2 focus:ring-[#00568C]/10"
                        />
                      ))}
                    </div>

                    {options.length > 1 && (
                      <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
                        {options.map((o) => (
                          <label
                            key={o.id}
                            className={`flex-1 flex items-center justify-between gap-3 p-3 rounded-xl border text-[13px] cursor-pointer transition-colors ${
                              optionId === o.id ? "border-[#00568C] bg-[#f0f9ff]" : "border-gray-200 bg-white hover:border-[#00568C]/40"
                            }`}
                          >
                            <span className="flex items-center gap-2 text-[#374151]">
                              <input type="radio" name="fee-option" checked={optionId === o.id} onChange={() => setOptionId(o.id)} className="accent-[#00568C]" />
                              {o.label}
                            </span>
                            <span className="font-bold text-[#1F2937]">₹{o.amount.toLocaleString("en-IN")}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {payError && <p className="text-[12px] text-red-600 mb-3">{payError}</p>}

                    <motion.button
                      whileTap={TAP_SCALE}
                      onClick={handlePay}
                      disabled={!canPay}
                      className={`w-full py-3.5 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all duration-200 ${
                        canPay
                          ? "bg-[#00568C] text-white hover:bg-[#004471] shadow-md hover:shadow-lg"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Lock className="w-4 h-4" />
                      {paying ? "Opening secure payment…" : selectedSlot ? `Pay ₹${amount.toLocaleString("en-IN")} & Enroll` : "Select a date to continue"}
                    </motion.button>

                    <button
                      type="button"
                      onClick={handleBook}
                      disabled={!selectedSlot}
                      className="w-full mt-3 text-[12px] font-semibold text-[#00568C] hover:underline disabled:text-gray-400 disabled:no-underline"
                    >
                      Prefer bank transfer / UPI to our account? Book via WhatsApp instead
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer */}
              <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
                <p className="text-[10px] text-gray-400 font-sans uppercase tracking-[0.1em]">
                  Secure payments via Razorpay · Invoice emailed instantly
                </p>
                <a
                  href="/programs"
                  onClick={onClose}
                  className="flex items-center gap-1.5 text-[12px] font-bold text-[#00568C] hover:underline"
                >
                  View Details <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewCoursesModal;
