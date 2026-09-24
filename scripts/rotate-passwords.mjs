// Gives every student a fresh random password, keeping their phone number.
//   node scripts/rotate-passwords.mjs "9876543210:old,9123456789:old2"
// Prints the new AUTH_USERS value (paste into Vercel) and a phone → password table to send out.
import { randomInt } from "node:crypto";

// Random lowercase word + 3 random digits, e.g. "tiger482": easy to type, nothing derived from name or phone.
const WORDS = "tiger eagle falcon rocket thunder river mango lotus cobalt summit anchor arrow bravo delta orbit comet maple cedar pearl ember frost harbor jungle kite lantern meadow nectar onyx pepper quartz raven saffron timber velvet walnut zephyr amber bison cactus dragon forest glacier hawk island jasper koala lemon marble nova otter panther ranger shadow storm tango valley willow".split(" ");

export function password() {
  return WORDS[randomInt(WORDS.length)] + String(randomInt(100, 1000));
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
