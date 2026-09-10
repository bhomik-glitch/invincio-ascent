import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import SEO from "@/components/SEO";
import { api } from "@/lib/api";
import { BG_BASE, BTN_PRIMARY, CONTAINER, EYEBROW, H2_LIGHT, BODY_LIGHT } from "@/lib/design-system";

const INPUT =
  "w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 font-sans text-sm text-[#374151] outline-none focus:border-[#2FB4E7] focus:ring-2 focus:ring-[#2FB4E7]/20 transition-[border-color,box-shadow] duration-150";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const from = (location.state as { from?: string } | null)?.from || "/tests";

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const me = await api<{ phone: string }>("/api/login", { phone, password });
      queryClient.setQueryData(["me"], me);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={`${BG_BASE} min-h-[80vh] flex items-center py-14`}>
      <SEO title="Student Login | Invincio" description="Log in to attempt OIR practice tests." path="/login" noindex />
      <div className={`${CONTAINER} w-full`}>
        <form onSubmit={submit} className="mx-auto max-w-md bg-white border border-[#e5e7eb] rounded-xl p-8 shadow-[0_8px_32px_rgba(0,86,140,0.06)]">
          <p className={EYEBROW}>Student portal</p>
          <h1 className={`${H2_LIGHT} mt-2 mb-2`}>Log in</h1>
          <p className={`${BODY_LIGHT} mb-6`}>Use the phone number and password given to you by Invincio.</p>

          <label className="block mb-4">
            <span className="block mb-1.5 font-sans text-xs font-semibold tracking-wide uppercase text-[#6B7280]">Phone number</span>
            <input className={INPUT} type="tel" inputMode="numeric" autoComplete="username" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" />
          </label>
          <label className="block mb-6">
            <span className="block mb-1.5 font-sans text-xs font-semibold tracking-wide uppercase text-[#6B7280]">Password</span>
            <input className={INPUT} type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          {error && <p role="alert" className="mb-4 font-sans text-sm text-[#E66133]">{error}</p>}

          <button type="submit" disabled={busy} className={`${BTN_PRIMARY} w-full justify-center disabled:opacity-60`}>
            {busy ? "Logging in…" : "Log in"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
