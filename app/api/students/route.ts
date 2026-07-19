import { NextResponse } from "next/server";
import { currentStore, jsonError, nextId, requireApiUser } from "@/lib/api";
import { monthKey } from "@/lib/utils";

export async function GET() {
  const auth = await requireApiUser("admin");
  if ("error" in auth) return auth.error;
  return NextResponse.json({ ok: true, students: currentStore().students });
}

export async function POST(request: Request) {
  const auth = await requireApiUser("admin");
  if ("error" in auth) return auth.error;

  const body = (await request.json().catch(() => null)) as
    | {
        name?: string;
        admissionId?: string;
        password?: string;
        className?: string;
        section?: string;
        rollNo?: number;
        parentName?: string;
        parentPhone?: string;
      }
    | null;

  if (!body?.name || !body?.admissionId || !body?.password) {
    return jsonError("Name, admission ID, and password are required");
  }

  const store = currentStore();
  const id = nextId("student");
  store.users.push({
    id,
    password: body.password,
    role: "student",
    name: body.name,
    linkedId: id
  });
  store.students.push({
    id,
    userId: id,
    admissionId: body.admissionId,
    name: body.name,
    className: body.className ?? "Grade 9",
    section: body.section ?? "A",
    rollNo: body.rollNo ?? store.students.length + 1,
    parentName: body.parentName ?? "Parent Name",
    parentPhone: body.parentPhone ?? "+91 90000 00000"
  });
  store.fees.unshift({
    id: nextId("fee"),
    studentId: id,
    month: monthKey(),
    amount: 5000,
    status: "pending"
  });
  return NextResponse.json({ ok: true });
}
