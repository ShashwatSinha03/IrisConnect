import { SectionCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAttendanceForRole, getStore } from "@/lib/store";
import { formatDate, percentage } from "@/lib/utils";
import { getSessionUser } from "@/lib/auth";

export default async function StudentAttendancePage() {
  const user = await getSessionUser();
  const store = getStore();
  const student = store.students.find((s) => s.userId === user?.id);
  const attendance = user ? getAttendanceForRole("student", user.id) : [];

  const presentCount = attendance.reduce(
    (count, record) =>
      count + (record.entries.find((e) => e.studentId === student?.id)?.present ? 1 : 0),
    0
  );
  const totalDays = attendance.length;
  const pct = percentage(presentCount, totalDays);
  const absentCount = totalDays - presentCount;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference * (1 - pct / 100);

  return (
    <div className="animate-fadeUp space-y-6">
      <SectionCard title="Attendance" description="Present vs absent breakdown">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="relative flex shrink-0 items-center justify-center">
            <svg viewBox="0 0 120 120" className="h-28 w-28">
              <circle cx="60" cy="60" r="45" fill="none" stroke="#1a1d2b" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute text-lg font-semibold text-[#f1f3f7]">{pct}%</span>
          </div>

          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center justify-between rounded-lg bg-[#1a1d2b] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                <span className="text-sm text-[#f1f3f7]">Present</span>
              </div>
              <span className="text-sm font-medium text-[#f1f3f7]">{presentCount}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#1a1d2b] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2a2e42]" />
                <span className="text-sm text-[#f1f3f7]">Absent</span>
              </div>
              <span className="text-sm font-medium text-[#f1f3f7]">{absentCount}</span>
            </div>
            <p className="mt-1 text-xs text-[#5c6070]">
              {totalDays} school days recorded this term
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="History" description="Recent attendance records">
        <div className="space-y-2">
          {attendance
            .slice(-6)
            .reverse()
            .map((record) => {
              const entry = record.entries.find((e) => e.studentId === student?.id);
              return (
                <div
                  key={record.id}
                  className="flex items-center justify-between rounded-lg border border-[#1e2235] bg-surface p-4"
                >
                  <p className="text-sm text-[#f1f3f7]">{formatDate(record.date)}</p>
                  <Badge
                    className={
                      entry?.present
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : "border-red-500/30 bg-red-500/10 text-red-400"
                    }
                  >
                    {entry?.present ? "Present" : "Absent"}
                  </Badge>
                </div>
              );
            })}
        </div>
      </SectionCard>
    </div>
  );
}
