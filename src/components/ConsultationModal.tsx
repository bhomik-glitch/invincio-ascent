import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Loader2, CheckCircle } from "lucide-react";
import { EASE_OUT, TAP_SCALE, TAP_TRANSITION } from "@/lib/design-system";

interface Props {
  open: boolean;
  onClose: () => void;
  program?: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
}

interface Errors {
  name?: string;
  phone?: string;
  email?: string;
}

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "Full name is required";
  if (!form.phone.trim()) errors.phone = "Phone number is required";
  else if (!/^\+?[\d\s\-()+]{8,}$/.test(form.phone))
    errors.phone = "Enter a valid phone number";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email";
  return errors;
}

// ── Field ────────────────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  autoComplete?: string;
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, id, type, placeholder, value, onChange, onBlur, error, autoComplete }, ref) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-semibold text-[#374151] tracking-wide">
        {label} <span className="text-[#F6B828]">*</span>
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
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

// ── Modal ────────────────────────────────────────────────────────────────────

const ConsultationModal = ({ open, onClose, program }: Props) => {
  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, loading, onClose]);

  // Reset + autofocus on open
  useEffect(() => {
    if (open) {
      setForm({ name: "", phone: "", email: "" });
      setErrors({});
      setTouched({});
      setLoading(false);
      setSuccess(false);
      // Slight delay so animation has started
      const t = setTimeout(() => nameRef.current?.focus(), 90);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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

  const isValid = Object.keys(validate(form)).length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    // Replace with real API call
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
    setTimeout(onClose, 2800);
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
            onClick={() => !loading && onClose()}
            aria-hidden="true"
          />

          {/* Panel wrapper (pointer-events-none so clicks fall through to overlay) */}
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
              {/* Brand top bar — deep blue */}
              <div className="h-[3px] w-full bg-gradient-to-r from-[#00568C]/60 via-[#2FB4E7] to-[#00568C]/60" />

              {/* Close button */}
              <button
                onClick={() => !loading && onClose()}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 rounded-lg p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="px-7 py-7">
                <AnimatePresence mode="wait">
                  {!success ? (
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
                          value={form.name}
                          onChange={(v) => handleChange("name", v)}
                          onBlur={() => handleBlur("name")}
                          error={touched.name ? errors.name : undefined}
                          autoComplete="name"
                        />
                        <Field
                          label="Phone Number"
                          id="cons-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(v) => handleChange("phone", v)}
                          onBlur={() => handleBlur("phone")}
                          error={touched.phone ? errors.phone : undefined}
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

                        {/* Primary CTA */}
                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={!loading ? { y: -1, boxShadow: "0 6px 20px rgba(246,184,40,0.35)" } : undefined}
                          whileTap={!loading ? TAP_SCALE : undefined}
                          transition={TAP_TRANSITION}
                          className="mt-1 w-full flex items-center justify-center gap-2 bg-[#F6B828] text-[#00568C] font-semibold text-sm py-3.5 rounded-xl hover:bg-[#e0a720] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Submitting…
                            </>
                          ) : (
                            "Get Started"
                          )}
                        </motion.button>

                        {/* WhatsApp option */}
                        <a
                          href="https://wa.me/919999999999"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 text-[#6B7280] text-[13px] hover:text-[#25D366] transition-colors duration-150 py-0.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Or WhatsApp Us
                        </a>
                      </form>

                      {/* Trust + badges */}
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
                  ) : (
                    /* Success state */
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
                        We'll contact you shortly
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
