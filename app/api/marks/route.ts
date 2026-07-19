import { NextResponse } from "next/server";
import { currentStore, jsonError, nextId, requireApiUser } from "@/lib/api";

export async function GET() {
  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;
  return NextResponse.json({ ok: true, marks: currentStore().marks });
}

export async function POST(request: Request) {
  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;
  if (auth.user.role !== "teacher" && auth.user.role !== "admin") {
    return jsonError("Forbidden", 403);
  }

  const body = (await request.json().catch(() => null)) as
    | {
        studentId?: string;
        subject?: string;
        score?: number;
        outOf?: number;
        term?: string;
      }
    | null;

  if (!body?.studentId || !body?.subject || typeof body.score !== "number" || !body.term) {
    return jsonError("Student, subject, score, and term are required");
  }

  const store = currentStore();
  const mark = {
    id: nextId("mark"),
    studentId: body.studentId,
    subject: body.subject,
    score: body.score,
    outOf: body.outOf ?? 100,
    term: body.term,
    publishedAt: new Date().toISOString(),
    publishedBy: auth.user.id
  };
  store.marks.unshift(mark);
  return NextResponse.json({ ok: true, mark });
}
