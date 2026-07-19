import { NextResponse } from "next/server";
import { currentStore, jsonError, nextId, requireApiUser } from "@/lib/api";

export async function GET() {
  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;
  return NextResponse.json({ ok: true, timetable: currentStore().timetable });
}

export async function POST(request: Request) {
  const auth = await requireApiUser("admin");
  if ("error" in auth) return auth.error;

  const body = (await request.json().catch(() => null)) as
    | {
        entry?: {
          className?: string;
          section?: string;
          day?: string;
          period?: string;
          subject?: string;
          teacherName?: string;
          time?: string;
        };
      }
    | null;

  if (!body?.entry?.day || !body.entry.period || !body.entry.subject || !body.entry.teacherName || !body.entry.time) {
    return jsonError("A timetable entry with day, period, subject, teacher, and time is required");
  }

  const store = currentStore();
  const className = body.entry.className ?? "Grade 9";
  const section = body.entry.section ?? "A";
  const matchIndex = store.timetable.findIndex(
    (item) => item.className === className && item.section === section && item.day === body.entry?.day && item.period === body.entry?.period
  );
  const record = {
    id: matchIndex >= 0 ? store.timetable[matchIndex].id : nextId("tt"),
    className,
    section,
    day: body.entry.day,
    period: body.entry.period,
    subject: body.entry.subject,
    teacherName: body.entry.teacherName,
    time: body.entry.time
  };

  if (matchIndex >= 0) {
    store.timetable[matchIndex] = record;
  } else {
    store.timetable.unshift(record);
  }

  return NextResponse.json({ ok: true, timetable: record });
}
