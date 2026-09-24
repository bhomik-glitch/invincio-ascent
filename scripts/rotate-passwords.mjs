// Gives every student a fresh random password, keeping their phone number.
//   node scripts/rotate-passwords.mjs "9876543210:old,9123456789:old2"
// Prints the new AUTH_USERS value (paste into Vercel) and a phone → password table to send out.
import { randomInt } from "node:crypto";

// No 0/O, 1/l/I — easy to read out over WhatsApp. No symbols — easy to type on a phone.
const SETS = ["ABCDEFGHJKLMNPQRSTUVWXYZ", "abcdefghijkmnpqrstuvwxyz", "23456789"];
const ALL = SETS.join("");

export function password(len = 10) {
  const chars = SETS.map((s) => s[randomInt(s.length)]); // at least one of each kind
  while (chars.length < len) chars.push(ALL[randomInt(ALL.length)]);
  for (let i = chars.length - 1; i > 0; i--) { const j = randomInt(i + 1); [chars[i], chars[j]] = [chars[j], chars[i]]; }
  return chars.join("");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = process.argv[2] ?? process.env.AUTH_USERS ?? "";
  const phones = input.split(",").map((e) => e.split(":")[0].trim()).filter(Boolean);
  if (!phones.length) { console.error('Usage: node scripts/rotate-passwords.mjs "phone:pw,phone:pw"'); process.exit(1); }
  const rows = phones.map((p) => [p, password()]);
  console.log("AUTH_USERS=" + rows.map((r) => r.join(":")).join(","));
  console.log();
  for (const [p, pw] of rows) console.log(`${p}\t${pw}`);
}
