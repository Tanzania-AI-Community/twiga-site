"use server";

import { db } from "@/db";
import { users, userStates } from "@/db/schema";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import {
  createSessionToken,
  credentialsMatch,
  databaseReady,
  isAdminAuthenticated,
  SESSION_COOKIE,
  SESSION_MAX_AGE_S,
} from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Create user in review status
export async function submitRegistration(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const schoolName = formData.get("schoolName") as string;
    const whatsappNumber = formData.get("whatsappNumber") as string;

    // Validate required fields
    if (!fullName || !schoolName || !whatsappNumber) {
      return { error: "Please fill in all required fields" };
    }

    // Check for existing WhatsApp number (primary identifier)
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.wa_id, whatsappNumber))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        error: "A user with this WhatsApp number has already been registered.",
      };
    }

    // Insert into users table with in_review status
    await db.insert(users).values({
      name: fullName,
      wa_id: whatsappNumber,
      school_name: schoolName,
      state: "in_review",
      onboarding_state: "new",
      role: "teacher",
      created_at: new Date(),
      updated_at: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to submit registration. Please try again." };
  }
}

export async function adminLogin(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  // Credentials come from ADMIN_USERNAME / ADMIN_PASSWORD; login is disabled
  // when no password is configured.
  if (!credentialsMatch(username, password)) {
    return { error: "Invalid credentials" };
  }
  if (!(await databaseReady())) {
    return { error: "Login failed" };
  }

  const token = createSessionToken();
  if (!token) return { error: "Login failed" };

  // Signed, expiring session: the cookie can't be forged by setting it by hand.
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_S,
  });
  redirect("/admin/dashboard");
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin");
}

type UserState = (typeof userStates)[number];

/** Rejects callers without an admin session and malformed ids. Server actions are public endpoints. */
async function guardUserUpdate(userId: unknown): Promise<string | null> {
  if (!(await isAdminAuthenticated())) return "Not signed in";
  if (!Number.isSafeInteger(userId) || (userId as number) <= 0) return "Invalid user";
  return null;
}

// getUsers moved to lib/data.ts (React cache()-wrapped, throws on error)

export async function updateUserState(userId: number, newState: UserState) {
  const denied = await guardUserUpdate(userId);
  if (denied) return { error: denied };
  if (!userStates.includes(newState)) return { error: "Invalid state" };
  try {
    await db
      .update(users)
      .set({
        state: newState,
        updated_at: new Date(),
      })
      .where(eq(users.id, userId));

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating user state:", error);
    return { error: "Failed to update user state" };
  }
}

// Approving users in review
export async function approveUser(userId: number) {
  const denied = await guardUserUpdate(userId);
  if (denied) return { error: denied };
  try {
    await db
      .update(users)
      .set({
        state: "approved", // When approved, user state becomes "approved"
        updated_at: new Date(),
      })
      .where(eq(users.id, userId));

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error approving user:", error);
    return { error: "Failed to approve user" };
  }
}

// Rejecting users in review
export async function rejectUser(userId: number) {
  const denied = await guardUserUpdate(userId);
  if (denied) return { error: denied };
  try {
    await db
      .update(users)
      .set({
        state: "blocked", // When rejected, user state becomes "blocked"
        updated_at: new Date(),
      })
      .where(eq(users.id, userId));

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error rejecting user:", error);
    return { error: "Failed to reject user" };
  }
}
