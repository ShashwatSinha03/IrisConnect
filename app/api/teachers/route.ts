import { NextResponse } from "next/server";
import { currentStore, jsonError, nextId, requireApiUser } from "@/lib/api";

export async function GET() {
  const auth = await requireApiUser("admin");
  if ("error" in auth) return auth.error;
  return NextResponse.json({ ok: true, teachers: currentStore().teachers });
}

export async function POST(request: Request) {
  const auth = await requireApiUser("admin");
  if ("error" in auth) return auth.error;

  const body = (await request.json().catch(() => null)) as
    | {
        name?: string;
        employeeId?: string;
        password?: string;
        subject?: string;
        className?: string;
        section?: string;
      }
    | null;

  if (!body?.name || !body?.employeeId || !body?.password || !body?.subject) {
    return jsonError("Name, employee ID, subject, and password are required");
  }

  const store = currentStore();
  const id = nextId("teacher");
  store.users.push({
    id,
    password: body.password,
    role: "teacher",
    name: body.name,
    linkedId: id
  });
  store.teachers.push({
    id,
    userId: id,
    employeeId: body.employeeId,
    name: body.name,
    subject: body.subject,
    className: body.className ?? "Grade 9",
    section: body.section ?? "A"
  });
  return NextResponse.json({ ok: true });
}
