import { createHash, createHmac, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";

/** Cookie holding the signed admin session. */
export const SESSION_COOKIE = "admin_session";
/** How long an admin stays signed in. */
export const SESSION_MAX_AGE_S = 60 * 60 * 24;

/**
 * Signing key for admin sessions, derived from the admin credentials so no
 * extra secret has to be deployed. Changing the password signs everyone out.
 * Null when no admin password is configured: admin login is then disabled.
 */
function sessionKey(): string | null {
  if (!env.ADMIN_PASSWORD) return null;
  return createHash("sha256")
    .update(`twiga-admin-session\0${env.ADMIN_USERNAME}\0${env.ADMIN_PASSWORD}`)
    .digest("hex");
}

function sign(payload: string, key: string): string {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

/** Constant-time string comparison (hashes first so lengths never leak). */
function safeEqual(a: string, b: string): boolean {
  const ha = new Uint8Array(createHash("sha256").update(a).digest());
  const hb = new Uint8Array(createHash("sha256").update(b).digest());
  return timingSafeEqual(ha, hb);
}

/** True when the submitted username and password match the configured admin. */
export function credentialsMatch(username: string, password: string): boolean {
  if (!env.ADMIN_PASSWORD) return false;
  const userOk = safeEqual(username, env.ADMIN_USERNAME);
  const passOk = safeEqual(password, env.ADMIN_PASSWORD);
  return userOk && passOk;
}

/** A new signed session token: "<expiry>.<nonce>.<signature>". */
export function createSessionToken(now: number = Date.now()): string | null {
  const key = sessionKey();
  if (!key) return null;
  const expires = Math.floor(now / 1000) + SESSION_MAX_AGE_S;
  const payload = `${expires}.${randomBytes(12).toString("base64url")}`;
  return `${payload}.${sign(payload, key)}`;
}

/** True for an unexpired token signed with the current key. */
export function verifySessionToken(token: string | undefined, now: number = Date.now()): boolean {
  const key = sessionKey();
  if (!key || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expires, nonce, signature] = parts;
  const expiresAt = Number(expires);
  if (!Number.isInteger(expiresAt) || expiresAt * 1000 <= now) return false;
  return safeEqual(signature, sign(`${expires}.${nonce}`, key));
}

/** True when the dashboard can read the users table. */
export async function databaseReady(): Promise<boolean> {
  try {
    await db.select({ id: users.id }).from(users).limit(1);
    return true;
  } catch {
    console.error("Admin login blocked: database unreachable");
    return false;
  }
}

/** True when the request carries a valid admin session. */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

/** Page guard: send visitors without a valid session back to the login page. */
export async function checkAdminAuth() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  if (!(await databaseReady())) {
    redirect("/admin?error=login");
  }
}
