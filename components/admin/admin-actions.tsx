"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { formatCurrency, formatDate, monthLabelFromKey } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { AttendanceRecord, FeeRecord, MarkRecord, Notice, Student, Teacher, TimetableEntry } from "@/lib/store";

export function MarkFeeAction({ feeId, studentName }: { feeId: string; studentName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function verifyFee() {
    setLoading(true);
    await fetch("/api/fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "verify", feeId })
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <Button size="sm" onClick={verifyFee} disabled={loading}>
      {loading ? "Verifying..." : `Verify ${studentName.split(" ")[0]}`}
    </Button>
  );
}

export function QuickNoticeForm() {
  const router = useRouter();
  const [title, setTitle] = useState("Holiday Notice");
  const [body, setBody] = useState("The school will remain closed on Friday for maintenance.");
  const [loading, setLoading] = useState(false);

  async function submitNotice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body })
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <form className="space-y-3" onSubmit={submitNotice}>
      <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Notice title" />
      <Textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Notice body" />
      <Button type="submit" disabled={loading}>
        {loading ? "Publishing..." : "Publish notice"}
      </Button>
    </form>
  );
}

export function AddStudentForm() {
  const router = useRouter();
  const [name, setName] = useState("Shantam Sinha");
  const [admissionId, setAdmissionId] = useState("ICS-1002");
  const [password, setPassword] = useState("student123");
  const [loading, setLoading] = useState(false);

  async function submitStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        admissionId,
        password,
        className: "Grade 9",
        section: "A",
        rollNo: 2,
        parentName: "Parent Name",
        parentPhone: "+91 90000 00000"
      })
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <form className="space-y-3" onSubmit={submitStudent}>
      <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Student name" />
      <Input value={admissionId} onChange={(event) => setAdmissionId(event.target.value)} placeholder="Admission ID" />
      <Input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
      <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add student"}</Button>
    </form>
  );
}

export function AddTeacherForm() {
  const router = useRouter();
  const [name, setName] = useState("New Teacher");
  const [employeeId, setEmployeeId] = useState("T-2002");
  const [subject, setSubject] = useState("English");
  const [password, setPassword] = useState("teacher123");
  const [loading, setLoading] = useState(false);

  async function submitTeacher(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await fetch("/api/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        employeeId,
        subject,
        password,
        className: "Grade 9",
        section: "A"
      })
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <form className="space-y-3" onSubmit={submitTeacher}>
      <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Teacher name" />
      <Input value={employeeId} onChange={(event) => setEmployeeId(event.target.value)} placeholder="Employee ID" />
      <Input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Subject" />
      <Input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
      <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add teacher"}</Button>
    </form>
  );
}

export function AttendanceViewer({ attendance }: { attendance: AttendanceRecord[] }) {
  return (
    <div className="space-y-3">
      {attendance.slice(0, 5).map((record) => (
        <div key={record.id} className="rounded-lg border border-[#1e2235] bg-surface p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#f1f3f7]">{record.className} {record.section}</p>
              <p className="text-xs text-[#9498ab]">{formatDate(record.date)}</p>
            </div>
            <Badge className="border-brand-500/30 bg-brand-500/10 text-brand-400">{record.entries.filter((entry) => entry.present).length}/{record.entries.length} present</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminFeeManager({ fees, students }: { fees: FeeRecord[]; students: Student[] }) {
  return (
    <div className="space-y-3">
      {fees.map((fee) => {
        const student = students.find((item) => item.id === fee.studentId);
        return (
          <div key={fee.id} className="flex flex-col gap-3 rounded-lg border border-[#1e2235] bg-surface p-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-[#f1f3f7]">{student?.name}</p>
              <p className="text-xs text-[#9498ab]">{monthLabelFromKey(fee.month)} &middot; {formatCurrency(fee.amount)}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={fee.status === "verified" ? "border-green-500/30 bg-green-500/10 text-green-400" : fee.status === "submitted" ? "border-gold-500/30 bg-gold-500/10 text-gold-400" : ""}>
                {fee.status === "verified" ? "Fee Verified ✓" : fee.status === "submitted" ? "Payment Submitted" : "Pending"}
              </Badge>
              {fee.status === "submitted" ? <MarkFeeAction feeId={fee.id} studentName={student?.name ?? "Student"} /> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function AdminTimetableEditor({ timetable }: { timetable: TimetableEntry[] }) {
  const router = useRouter();
  const [day, setDay] = useState("Monday");
  const [period, setPeriod] = useState("Period 1");
  const [subject, setSubject] = useState("Mathematics");
  const [teacherName, setTeacherName] = useState("Avantika");
  const [time, setTime] = useState("8:00 - 8:40");
  const [loading, setLoading] = useState(false);

  async function submitEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await fetch("/api/timetable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entry: {
          day,
          period,
          subject,
          teacherName,
          time,
          className: "Grade 9",
          section: "A"
        }
      })
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="space-y-5">
      <form className="grid gap-3 rounded-lg bg-[#1a1d2b] p-4 sm:grid-cols-2 lg:grid-cols-5" onSubmit={submitEntry}>
        <Input value={day} onChange={(event) => setDay(event.target.value)} placeholder="Day" />
        <Input value={period} onChange={(event) => setPeriod(event.target.value)} placeholder="Period" />
        <Input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Subject" />
        <Input value={teacherName} onChange={(event) => setTeacherName(event.target.value)} placeholder="Teacher" />
        <Input value={time} onChange={(event) => setTime(event.target.value)} placeholder="Time" />
        <div className="sm:col-span-2 lg:col-span-5">
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save timetable entry"}</Button>
        </div>
      </form>

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
    </div>
  );
}

export function AdminMarksManager({ students, teachers: _teachers, marks }: { students: Student[]; teachers: Teacher[]; marks: MarkRecord[] }) {
  const router = useRouter();
  const [studentId, setStudentId] = useState("student01");
  const [subject, setSubject] = useState("Mathematics");
  const [score, setScore] = useState("90");
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
        <Select value={studentId} onChange={(event) => setStudentId(event.target.value)}>
          {students.map((student) => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </Select>
        <Input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Subject" />
        <Input value={score} onChange={(event) => setScore(event.target.value)} placeholder="Score" />
        <Input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Term" />
        <div className="sm:col-span-2 lg:col-span-4">
          <Button type="submit" disabled={loading}>{loading ? "Publishing..." : "Publish marks"}</Button>
        </div>
      </form>

      <div className="space-y-2">
        {marks.slice(0, 6).map((mark) => {
          const student = students.find((item) => item.id === mark.studentId);
          return (
            <div key={mark.id} className="flex items-center justify-between rounded-lg border border-[#1e2235] bg-surface p-4">
              <div>
                <p className="text-sm font-medium text-[#f1f3f7]">{student?.name}</p>
                <p className="text-xs text-[#9498ab]">{mark.subject} &middot; {mark.term}</p>
              </div>
              <Badge className="border-brand-500/30 bg-brand-500/10 text-brand-400">{mark.score}/{mark.outOf}</Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AdminNoticeManager({ notices }: { notices: Notice[] }) {
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
