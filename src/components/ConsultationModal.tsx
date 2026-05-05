import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Loader2, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { EASE_OUT, TAP_SCALE, TAP_TRANSITION } from "@/lib/design-system";

// ── EmailJS config ────────────────────────────────────────────────────────────
const EJ_SERVICE  = "service_2daf7np";
const EJ_TEMPLATE = "template_kkpre0a";   // lead notification → invincioleads@gmail.com
const EJ_KEY      = "SvrHhhstrSZ11Wbwx";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Props {
  open: boolean;
  onClose: () => void;
  program?: string;
}

interface FormState {
  full_name:    string;
  phone_number: string;
  email:        string;
}

interface Errors {
  full_name?:    string;
  phone_number?: string;
  email?:        string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ── Validation ────────────────────────────────────────────────────────────────
function validate(form: FormState): Errors {
  const errors: Errors = {};

  if (!form.full_name.trim())
    errors.full_name = "Full name is required";
  else if (form.full_name.trim().length < 2)
    errors.full_name = "Name must be at least 2 characters";

  if (!form.phone_number.trim())
    errors.phone_number = "Phone number is required";
  else if (!/^\d{10}$/.test(form.phone_number.trim()))
    errors.phone_number = "Enter a valid 10-digit number";

  if (!form.email.trim())
    errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address";

  return errors;
}

// ── Field component ───────────────────────────────────────────────────────────
interface FieldProps {
  label:        string;
  id:           string;
  type:         string;
  placeholder?: string;
  value:        string;
  onChange:     (v: string) => void;
  onBlur?:      () => void;
  error?:       string;
  autoComplete?: string;
  inputMode?:   React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, id, type, placeholder, value, onChange, onBlur, error, autoComplete, inputMode }, ref) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-semibold text-[#374151] tracking-wide">
        {label} <span className="text-[#F6B828]">*</span>
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        className={[
          "w-full px-3.5 py-2.5 text-sm rounded-lg border outline-none transition-all duration-150",
          "placeholder:text-gray-400 text-[#374151]",
          "focus:ring-2",
          error
            ? "border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-400"
            : "border-[#e5e7eb] bg-[#F1FFFF] hover:border-[#2FB4E7]/40 focus:ring-[#2FB4E7]/20 focus:border-[#2FB4E7]",
        ].join(" ")}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-[11px] text-red-500 mt-0.5 leading-none"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
);
Field.displayName = "Field";

// ── Modal ─────────────────────────────────────────────────────────────────────
const ConsultationModal = ({ open, onClose, program }: Props) => {
  const [form, setForm]       = useState<FormState>({ full_name: "", phone_number: "", email: "" });
  const [errors, setErrors]   = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus]   = useState<SubmitStatus>("idle");
  const nameRef = useRef<HTMLInputElement>(null);

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  // ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, isLoading, onClose]);

  // Reset on open + autofocus
  useEffect(() => {
    if (open) {
      setForm({ full_name: "", phone_number: "", email: "" });
      setErrors({});
      setTouched({});
      setStatus("idle");
      const t = setTimeout(() => nameRef.current?.focus(), 90);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleBlur = (field: keyof FormState) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleChange = (field: keyof FormState, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) setErrors(validate(next));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ full_name: true, phone_number: true, email: true });

    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");

    const payload = {
      name:  form.full_name.trim(),
      phone: form.phone_number.trim(),
      email: form.email.trim(),
      title: program
        ? `New Defence Consultation Lead — ${program}`
        : "New Defence Consultation Lead",
    };

    try {
      await emailjs.send(EJ_SERVICE, EJ_TEMPLATE, payload, EJ_KEY);
      setStatus("success");
      // Auto-close after 2.8 s
      setTimeout(onClose, 2800);
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-[3px]"
            onClick={() => !isLoading && onClose()}
            aria-hidden="true"
          />

          {/* Panel wrapper */}
          <div className="fixed inset-0 z-[81] flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.26, ease: EASE_OUT }}
              className="relative w-full max-w-[440px] bg-white rounded-2xl overflow-hidden pointer-events-auto"
              style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.12)" }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-heading"
            >
              {/* Brand top bar */}
              <div className="h-[3px] w-full bg-gradient-to-r from-[#00568C]/60 via-[#2FB4E7] to-[#00568C]/60" />

              {/* Close button */}
              <button
                onClick={() => !isLoading && onClose()}
                aria-label="Close"
                disabled={isLoading}
                className="absolute top-4 right-4 z-10 rounded-lg p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-40"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="px-7 py-7">
                <AnimatePresence mode="wait">

                  {/* ── Success state ── */}
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.28, ease: EASE_OUT }}
                      className="flex flex-col items-center text-center py-10"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.08 }}
                        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F6B828]/10"
                      >
                        <CheckCircle className="w-8 h-8 text-[#F6B828]" strokeWidth={1.75} />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.18 }}
                        className="font-serif text-xl font-bold text-[#00568C] mb-2"
                      >
                        Request Received!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.26 }}
                        className="text-[13px] text-[#6B7280] max-w-[260px] leading-relaxed"
                      >
                        Our team will reach out within 24 hours with your personalised selection roadmap.
                      </motion.p>
                    </motion.div>

                  ) : (
                  /* ── Form state ── */
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                    >
                      {/* Header */}
                      <div className="mb-6">
                        <h2
                          id="modal-heading"
                          className="font-serif text-[1.5rem] font-bold text-[#00568C] leading-tight mb-1.5"
                        >
                          {program ? `Register — ${program}` : "Book Your Free Consultation"}
                        </h2>
                        <p className="text-[13px] text-[#6B7280] leading-relaxed">
                          {program
                            ? "Fill in your details and our team will reach out to confirm your spot."
                            : "Speak with our experts and get a clear roadmap to selection."}
                        </p>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                        <Field
                          ref={nameRef}
                          label="Full Name"
                          id="cons-name"
                          type="text"
                          placeholder="Arjun Sharma"
                          value={form.full_name}
                          onChange={(v) => handleChange("full_name", v)}
                          onBlur={() => handleBlur("full_name")}
                          error={touched.full_name ? errors.full_name : undefined}
                          autoComplete="name"
                        />
                        <Field
                          label="Phone Number"
                          id="cons-phone"
                          type="tel"
                          inputMode="numeric"
                          placeholder="98765 43210"
                          value={form.phone_number}
                          onChange={(v) => handleChange("phone_number", v.replace(/\D/g, "").slice(0, 10))}
                          onBlur={() => handleBlur("phone_number")}
                          error={touched.phone_number ? errors.phone_number : undefined}
                          autoComplete="tel"
                        />
                        <Field
                          label="Email"
                          id="cons-email"
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(v) => handleChange("email", v)}
                          onBlur={() => handleBlur("email")}
                          error={touched.email ? errors.email : undefined}
                          autoComplete="email"
                        />

                        {/* API error banner */}
                        <AnimatePresence>
                          {status === "error" && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-[12px] text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-center"
                            >
                              Something went wrong. Please try again or&nbsp;
                              <a href="https://wa.me/918601407444" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                                WhatsApp us
                              </a>.
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {/* Submit CTA */}
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          whileHover={!isLoading ? { y: -1, boxShadow: "0 6px 20px rgba(246,184,40,0.35)" } : undefined}
                          whileTap={!isLoading ? TAP_SCALE : undefined}
                          transition={TAP_TRANSITION}
                          className="mt-1 w-full flex items-center justify-center gap-2 bg-[#F6B828] text-[#00568C] font-semibold text-sm py-3.5 rounded-xl hover:bg-[#e0a720] disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-150"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Sending…
                            </>
                          ) : (
                            "Get Started"
                          )}
                        </motion.button>

                        {/* WhatsApp fallback */}
                        <a
                          href="https://wa.me/918601407444"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 text-[#6B7280] text-[13px] hover:text-[#25D366] transition-colors duration-150 py-0.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Or WhatsApp Us
                        </a>
                      </form>

                      {/* Trust badges */}
                      <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col items-center gap-2.5">
                        <p className="text-[11px] text-[#9CA3AF] tracking-wide">
                          No spam. Only serious guidance.
                        </p>
                        <div className="flex items-center gap-2">
                          {["500+ Selections", "10+ Years"].map((b) => (
                            <span
                              key={b}
                              className="text-[10px] font-semibold text-[#F6B828] border border-[#F6B828]/35 rounded-full px-2.5 py-0.5 bg-[#F6B828]/5 tracking-wide"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConsultationModal;
