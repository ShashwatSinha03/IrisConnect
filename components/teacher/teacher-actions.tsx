"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { todayISO, percentage, formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import type { AttendanceRecord, MarkRecord, Student, TimetableEntry, Notice } from "@/lib/store";

export function TeacherAttendanceForm({ students, attendance, className, section }: { students: Student[]; attendance: AttendanceRecord[]; className: string; section: string }) {
  const router = useRouter();
  const currentDate = todayISO();
  const existing = attendance.find((record) => record.date === currentDate);
  const [entries, setEntries] = useState<Record<string, boolean>>(
    Object.fromEntries(students.map((student) => [student.id, existing?.entries.find((entry) => entry.studentId === student.id)?.present ?? true]))
  );
  const [loading, setLoading] = useState(false);

  const markedCount = useMemo(
    () => Object.values(entries).filter(Boolean).length,
    [entries]
  );

  async function submitAttendance() {
    setLoading(true);
    await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: currentDate,
        className,
        section,
        entries: Object.entries(entries).map(([studentId, present]) => ({ studentId, present }))
      })
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-lg border border-brand-500/30 bg-brand-500/10 px-3 py-1.5 text-xs font-medium text-brand-400">
          {currentDate}
        </span>
        <Badge className="border-gold-500/30 bg-gold-500/10 text-gold-400">{markedCount}/{students.length} marked present</Badge>
      </div>

      <div className="space-y-2">
        {students.map((student) => (
          <label key={student.id} className="flex cursor-pointer items-center justify-between rounded-lg border border-[#1e2235] bg-surface p-4 transition-colors hover:bg-[#1a1d2b]">
            <div>
              <p className="text-sm font-medium text-[#f1f3f7]">{student.name}</p>
              <p className="text-xs text-[#9498ab]">Roll {student.rollNo}</p>
            </div>
            <input
              type="checkbox"
              checked={entries[student.id] ?? false}
              onChange={(event) => setEntries((current) => ({ ...current, [student.id]: event.target.checked }))}
              className="h-4 w-4 rounded border-[#2a2e42] bg-surface-light text-brand-500 transition-colors focus:ring-brand-500/30"
            />
          </label>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={submitAttendance} disabled={loading}>
          {loading ? "Submitting..." : "Submit attendance"}
        </Button>
      </div>
    </div>
  );
}

export function TeacherMarksForm({ students }: { students: Student[] }) {
  const router = useRouter();
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");
  const [subject, setSubject] = useState("Mathematics");
  const [score, setScore] = useState("91");
  const [term, setTerm] = useState("Unit Test 2");
  const [loading, setLoading] = useState(false);

  async function submitMark(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await fetch("/api/marks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId,
        subject,
        score: Number(score),
        outOf: 100,
        term
      })
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="space-y-5">
      <form className="grid gap-3 rounded-lg bg-[#1a1d2b] p-4 sm:grid-cols-2 lg:grid-cols-4" onSubmit={submitMark}>
        <select
          className="h-9 rounded-lg border border-[#2a2e42] bg-surface-light px-3 text-sm text-[#f1f3f7] outline-none transition-all duration-150 focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/15"
          value={studentId}
          onChange={(event) => setStudentId(event.target.value)}
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </select>
        <Input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Subject" />
        <Input value={score} onChange={(event) => setScore(event.target.value)} placeholder="Score" />
        <Input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Term" />
        <div className="sm:col-span-2 lg:col-span-4">
          <Button type="submit" disabled={loading}>{loading ? "Publishing..." : "Upload marks"}</Button>
        </div>
      </form>
      <p className="text-xs text-[#5c6070]">This is intentionally minimal: one form, one result, one workflow.</p>
    </div>
  );
}

export function StudentAttendancePanel({ attendance, studentId }: { attendance: AttendanceRecord[]; studentId: string }) {
  const present = attendance.filter((record) => record.entries.find((entry) => entry.studentId === studentId)?.present).length;
  const total = attendance.length;
  const pct = percentage(present, total);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-[#1e2235] bg-[#1a1d2b] p-5">
        <p className="text-xs text-[#9498ab]">Attendance percentage</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-[#f1f3f7]">{pct}%</p>
      </div>
      <div className="space-y-2">
        {attendance.slice(-6).reverse().map((record) => {
          const entry = record.entries.find((item) => item.studentId === studentId);
          return (
            <div key={record.id} className="flex items-center justify-between rounded-lg border border-[#1e2235] bg-surface p-4">
              <div>
                <p className="text-sm font-medium text-[#f1f3f7]">{formatDate(record.date)}</p>
                <p className="text-xs text-[#9498ab]">Class attendance record</p>
              </div>
              <Badge className={entry?.present ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-red-500/30 bg-red-500/10 text-red-400"}>
                {entry?.present ? "Present" : "Absent"}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StudentMarksPanel({ marks }: { marks: MarkRecord[] }) {
  return (
    <div className="space-y-2">
      {marks.map((mark) => (
        <div key={mark.id} className="flex items-center justify-between rounded-lg border border-[#1e2235] bg-surface p-4">
          <div>
            <p className="text-sm font-medium text-[#f1f3f7]">{mark.subject}</p>
            <p className="text-xs text-[#9498ab]">{mark.term} &middot; Published {formatDate(mark.publishedAt)}</p>
          </div>
          <span className="text-sm font-semibold text-gold-400">{mark.score}/{mark.outOf}</span>
        </div>
      ))}
    </div>
  );
}

export function StudentTimetablePanel({ timetable }: { timetable: TimetableEntry[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#1e2235]">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            <th className="border-b border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]">Day</th>
            <th className="border-b border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]">Period</th>
            <th className="border-b border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]">Subject</th>
            <th className="border-b border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]">Teacher</th>
            <th className="border-b border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]">Time</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((item) => (
            <tr key={item.id} className="[&:last-child>td]:border-b-0">
              <td className="border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]">{item.day}</td>
              <td className="border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]">{item.period}</td>
              <td className="border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]">{item.subject}</td>
              <td className="border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]">{item.teacherName}</td>
              <td className="border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]">{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StudentNoticePanel({ notices }: { notices: Notice[] }) {
  return (
    <div className="divide-y divide-[#1e2235]">
      {notices.map((notice) => (
        <div key={notice.id} className="py-4 first:pt-0 last:pb-0">
          <p className="text-sm font-medium text-[#f1f3f7]">{notice.title}</p>
          <p className="mt-1 text-sm leading-6 text-[#9498ab]">{notice.body}</p>
          <p className="mt-2 text-xs text-[#5c6070]">{formatDate(notice.publishedAt)}</p>
        </div>
      ))}
    </div>
  );
}

export function StudentFeePanel({ fee }: { fee: { id: string; amount: number; status: string; month: string } | null | undefined }) {
  if (!fee) {
    return <p className="text-sm text-[#9498ab]">No fee record found.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#1e2235] bg-[#1a1d2b] p-5">
        <p className="text-xs text-[#9498ab]">Current fee</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-gold-400">₹{fee.amount.toLocaleString("en-IN")}</p>
        <p className="mt-2 text-sm text-[#9498ab]">{fee.status === "verified" ? "Fee Verified ✓" : fee.status === "submitted" ? "Payment Submitted" : "Pending"}</p>
      </div>
      {fee.status === "pending" ? <StudentFeeAction feeId={fee.id} /> : null}
    </div>
  );
}

export function StudentFeeAction({ feeId }: { feeId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function submitFee() {
    setLoading(true);
    await fetch("/api/fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "submit", feeId })
    });
    router.refresh();
    setLoading(false);
  }

  return <Button onClick={submitFee} disabled={loading}>{loading ? "Submitting..." : "I've Paid"}</Button>;
}
