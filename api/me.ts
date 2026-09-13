import { getSession, json, type Req, type Res } from "./_lib.js";

export default function handler(req: Req, res: Res) {
  const phone = getSession(req);
  if (!phone) return json(res, 401, { error: "Please log in" });
  json(res, 200, { phone });
}
