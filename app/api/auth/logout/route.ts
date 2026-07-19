import { clearSessionCookie } from "@/lib/api";

export async function POST() {
  return clearSessionCookie();
}
