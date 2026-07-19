import { NextResponse } from "next/server";
import { currentStore, jsonError, nextId, requireApiUser } from "@/lib/api";

export async function GET() {
  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;
  return NextResponse.json({ ok: true, notices: currentStore().notices });
}

export async function POST(request: Request) {
  const auth = await requireApiUser("admin");
  if ("error" in auth) return auth.error;

  const body = (await request.json().catch(() => null)) as { title?: string; body?: string } | null;
  if (!body?.title || !body?.body) {
    return jsonError("Title and body are required");
  }

  const store = currentStore();
  const notice = {
    id: nextId("notice"),
    title: body.title,
    body: body.body,
    publishedAt: new Date().toISOString(),
    publishedBy: auth.user.id
  };
  store.notices.unshift(notice);
  return NextResponse.json({ ok: true, notice });
}
