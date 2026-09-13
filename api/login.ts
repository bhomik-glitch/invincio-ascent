import { findUser, normalizePhone, setSession, readJson, json, type Req, type Res } from "./_lib.js";

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });
  try {
    const { phone = "", password = "" } = await readJson(req);
    const user = findUser(normalizePhone(String(phone)), String(password));
    if (!user) return json(res, 401, { error: "Wrong phone number or password" });
    setSession(res, user);
    json(res, 200, { phone: user });
  } catch (err) {
    console.error("login failed:", err);
    json(res, 500, { error: err instanceof Error ? err.message : "Login failed" });
  }
}
