import { createHmac, timingSafeEqual } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";

export type Req = IncomingMessage & { body?: unknown };
export type Res = ServerResponse;

const COOKIE = "session";
const TTL = 30 * 24 * 3600; // 30 days

function secret() {
  const s = process.env.AUTH_SECRET;
  if (s) return s;
  if (process.env.VERCEL) throw new Error("AUTH_SECRET env var is not set");
  return "dev-secret";
}

export function normalizePhone(s: string) {
  return s.replace(/\D/g, "").slice(-10);
}

function safeEq(a: string, b: string) {
  const ab = Buffer.from(a), bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

// AUTH_USERS="9876543210:password1,9123456789:password2"
// ponytail: plaintext passwords in one env var; move to a DB + bcrypt when the list outgrows an env var.
export function findUser(phone: string, password: string): string | null {
  for (const entry of (process.env.AUTH_USERS || "").split(",")) {
    const i = entry.indexOf(":");
    if (i < 0) continue;
    const p = normalizePhone(entry.slice(0, i));
    if (p === phone && safeEq(entry.slice(i + 1).trim(), password)) return p;
  }
  return null;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function setSession(res: Res, phone: string) {
  const payload = `${phone}.${Math.floor(Date.now() / 1000) + TTL}`;
  const secure = process.env.VERCEL ? "; Secure" : "";
  res.setHeader("Set-Cookie", `${COOKIE}=${payload}.${sign(payload)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${TTL}${secure}`);
}

export function clearSession(res: Res) {
  res.setHeader("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

export function getSession(req: Req): string | null {
  const m = (req.headers.cookie || "").match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!m) return null;
  const [phone, exp, sig] = m[1].split(".");
  if (!phone || !exp || !sig) return null;
  if (!safeEq(sig, sign(`${phone}.${exp}`))) return null;
  if (Number(exp) < Date.now() / 1000) return null;
  return phone;
}

// Vercel pre-parses JSON bodies into req.body; the Vite dev server doesn't.
export async function readJson(req: Req): Promise<Record<string, unknown>> {
  if (req.body && typeof req.body === "object") return req.body as Record<string, unknown>;
  let raw = typeof req.body === "string" ? req.body : "";
  if (!raw) for await (const chunk of req) raw += chunk;
  try { return raw ? JSON.parse(raw) : {}; } catch { return {}; }
}

export function json(res: Res, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}
