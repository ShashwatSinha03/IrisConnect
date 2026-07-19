import { NextResponse } from "next/server";
import { getSessionUser, createSessionToken, SESSION_COOKIE, roleHome } from "@/lib/auth";
import { findUserByCredentials, getStore, type Role } from "@/lib/store";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function requireApiUser(role?: Role) {
  const user = await getSessionUser();
  if (!user) {
    return { error: jsonError("Unauthorized", 401) };
  }

  if (role && user.role !== role) {
    return { error: jsonError("Forbidden", 403) };
  }

  return { user };
}

export function makeLoginResponse(userId: string, password: string) {
  const user = findUserByCredentials(userId, password);
  if (!user) {
    return jsonError("Invalid credentials", 401);
  }

  const response = NextResponse.json({
    ok: true,
    role: user.role,
    redirectTo: roleHome(user.role)
  });
  response.cookies.set(SESSION_COOKIE, createSessionToken({ userId: user.id, role: user.role }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
  return response;
}

export function clearSessionCookie() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
  return response;
}

export function nextId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function currentStore() {
  return getStore();
}
