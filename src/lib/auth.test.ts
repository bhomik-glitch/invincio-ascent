import { describe, it, expect, beforeAll } from "vitest";
import { ServerResponse, IncomingMessage } from "node:http";
import { Socket } from "node:net";
import { findUser, normalizePhone, setSession, getSession } from "../../api/_lib";

const fakeRes = () => new ServerResponse(new IncomingMessage(new Socket()));
const reqWithCookie = (cookie: string) => Object.assign(new IncomingMessage(new Socket()), { headers: { cookie } });

describe("auth", () => {
  beforeAll(() => { process.env.AUTH_USERS = "+91 98765-43210:secret, 9123456789:pw2"; });

  it("normalizes phone numbers to the last 10 digits", () => {
    expect(normalizePhone("+91 98765-43210")).toBe("9876543210");
  });

  it("finds preset users and rejects wrong passwords", () => {
    expect(findUser("9876543210", "secret")).toBe("9876543210");
    expect(findUser("9123456789", "pw2")).toBe("9123456789");
    expect(findUser("9876543210", "wrong")).toBeNull();
    expect(findUser("0000000000", "secret")).toBeNull();
  });

  it("round-trips a signed session cookie and rejects tampering", () => {
    const res = fakeRes();
    setSession(res, "9876543210");
    const cookie = String(res.getHeader("Set-Cookie")).split(";")[0];
    expect(getSession(reqWithCookie(cookie))).toBe("9876543210");
    expect(getSession(reqWithCookie(cookie.replace("9876543210", "9123456789")))).toBeNull();
    expect(getSession(reqWithCookie(""))).toBeNull();
  });
});
