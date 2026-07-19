import { makeLoginResponse, jsonError } from "@/lib/api";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { userId?: string; password?: string } | null;
  if (!body?.userId || !body?.password) {
    return jsonError("User ID and password are required");
  }

  return makeLoginResponse(body.userId.trim(), body.password);
}
