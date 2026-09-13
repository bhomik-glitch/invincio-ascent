import { clearSession, json, type Req, type Res } from "./_lib.js";

export default function handler(_req: Req, res: Res) {
  clearSession(res);
  json(res, 200, { ok: true });
}
