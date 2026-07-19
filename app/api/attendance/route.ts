import { NextResponse } from "next/server";
import { currentStore, jsonError, requireApiUser } from "@/lib/api";
import { todayISO } from "@/lib/utils";

export async function GET() {
  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;
  return NextResponse.json({ ok: true, attendance: currentStore().attendance });
}

export async function POST(request: Request) {
  const auth = await requireApiUser("teacher");
  if ("error" in auth) return auth.error;

  const body = (await request.json().catch(() => null)) as
    | {
        date?: string;
        className?: string;
        section?: string;
        entries?: Array<{ studentId: string; present: boolean }>;
      }
    | null;

  if (!body?.date || !body?.className || !body?.section || !Array.isArray(body.entries)) {
    return jsonError("Date, class, section, and entries are required");
  }

  const store = currentStore();
  const existingIndex = store.attendance.findIndex(
    (item) => item.date === body.date && item.className === body.className && item.section === body.section
  );
  const record = {
    id: existingIndex >= 0 ? store.attendance[existingIndex].id : `att-${Date.now()}`,
    className: body.className,
    section: body.section,
    date: body.date ?? todayISO(),
    markedByTeacherId: auth.user.id,
    entries: body.entries
  };

  if (existingIndex >= 0) {
    store.attendance[existingIndex] = record;
  } else {
    store.attendance.unshift(record);
  }

  return NextResponse.json({ ok: true, attendance: record });
}
