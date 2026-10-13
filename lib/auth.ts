import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { users } from "@/db/schema";

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

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_authenticated");

  if (!isAuthenticated || isAuthenticated.value !== "true") {
    redirect("/admin");
  }

  if (!(await databaseReady())) {
    redirect("/admin?error=login");
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_authenticated");
  return isAuthenticated?.value === "true";
}
