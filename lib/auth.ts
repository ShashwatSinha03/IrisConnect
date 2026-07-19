import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findUserById, type Role } from "@/lib/store";

export const SESSION_COOKIE = "iris_connect_session";
const SECRET = process.env.SESSION_SECRET ?? "iris-connect-demo-secret";

type SessionPayload = {
  userId: string;
  role: Role;
};

function encode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("base64url");
}

export function createSessionToken(payload: SessionPayload) {
  const body = encode(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

export function readSessionToken(token: string | undefined | null) {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  if (sign(body) !== signature) return null;

  try {
    return JSON.parse(decode(body)) as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = readSessionToken(token);
  if (!session) return null;

  const user = findUserById(session.userId);
  if (!user || user.role !== session.role) return null;
  return user;
}

export async function requireUser(role?: Role) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  if (role && user.role !== role) {
    redirect(roleHome(user.role));
  }

  return user;
}

export function roleHome(role: Role) {
  return `/${role}`;
}
