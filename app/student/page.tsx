import { getStudentDashboard } from "@/lib/store";
import { monthLabelFromKey, percentage } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, CalendarDays, ClipboardList, Megaphone, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StudentFeeAction, StudentAttendancePanel, StudentMarksPanel, StudentTimetablePanel, StudentNoticePanel } from "@/components/student/student-actions";
import { getSessionUser } from "@/lib/auth";

export default async function StudentDashboardPage() {
  const user = await getSessionUser();
  const dashboard = user ? getStudentDashboard(user.id) : null;
  if (!dashboard) return null;

  const feeLabel = dashboard.fee ? monthLabelFromKey(dashboard.fee.month) : "Current month";

  return (
    <div className="mx-auto max-w-5xl animate-fadeUp space-y-12">
      <div className="relative">
        <div className="absolute -left-4 top-0 h-full w-0.5 rounded-full bg-gradient-to-b from-gold-500/60 to-transparent" />
        <h1 className="text-xl font-semibold tracking-tight text-white">Dashboard</h1>
        <p className="mt-0.5 text-sm text-[#9498ab]">Academic overview</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_1fr]">
        <div className="rounded-xl border border-[#1e2235] bg-surface p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#9498ab]">Attendance</p>
              <p className="mt-1.5 text-2xl font-semibold tracking-tight text-brand-400">
                {percentage(dashboard.attendance.present, dashboard.attendance.total)}%
              </p>
            </div>
            <ClipboardList className="h-8 w-8 text-brand-400/30" />
          </div>
          <p className="mt-3 text-xs text-[#5c6070]">
            Present {dashboard.attendance.present} of {dashboard.attendance.total} classes this term
          </p>
        </div>

        <div className="rounded-xl border border-[#1e2235] bg-surface p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#9498ab]">Fee status</p>
              <p className="mt-1.5 text-xl font-semibold tracking-tight text-gold-400">₹{dashboard.fee?.amount?.toLocaleString("en-IN") || "0"}</p>
              <Badge className={
                dashboard.fee?.status === "verified" ? "border-green-500/30 bg-green-500/10 text-green-400" :
                dashboard.fee?.status === "submitted" ? "border-gold-500/30 bg-gold-500/10 text-gold-400" :
                dashboard.fee?.status === "pending" ? "border-[#5c6070] bg-[#1a1d2b] text-[#5c6070]" :
                "border-[#2a2e42] bg-[#1a1d2b] text-[#9498ab]"
              }>
                {dashboard.fee?.status === "verified" ? "Verified ✓" :
                 dashboard.fee?.status === "submitted" ? "Submitted" :
                 dashboard.fee?.status === "pending" ? "Pending" :
                 "N/A"}
              </Badge>
            </div>
            <IndianRupee className="h-8 w-8 text-gold-400/30" />
          </div>
          <div className="mt-4">
            {dashboard.fee?.status === "pending" && <StudentFeeAction feeId={dashboard.fee.id} />}
          </div>
        </div>

        <div className="rounded-xl border border-[#1e2235] bg-surface p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#9498ab]">Timetable</p>
              <p className="mt-1.5 text-lg font-semibold tracking-tight text-white">{dashboard.timetable[0]?.period ?? "N/A"}</p>
              <p className="mt-0.5 text-xs text-[#9498ab]">{dashboard.timetable[0]?.subject ?? "N/A"}</p>
              <p className="mt-0.5 text-xs text-[#5c6070]">{dashboard.timetable[0]?.time}</p>
            </div>
            <CalendarDays className="h-8 w-8 text-brand-400/30" />
          </div>
        </div>

        <div className="rounded-xl border border-[#1e2235] bg-surface p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#9498ab]">Notices</p>
              <p className="mt-1.5 text-xl font-semibold tracking-tight text-white">{dashboard.notices.length}</p>
              <p className="mt-0.5 text-xs text-[#5c6070]">New school updates</p>
            </div>
            <Megaphone className="h-8 w-8 text-gold-400/30" />
          </div>
          <div className="mt-4">
            <Link href="/student/notices" className="inline-flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
        <StudentAttendancePanel attendance={dashboard.attendance.records} studentId={dashboard.id} />
        <StudentNoticePanel notices={dashboard.notices} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <StudentMarksPanel marks={dashboard.marks} />
        <StudentTimetablePanel timetable={dashboard.timetable} />
      </div>
    </div>
  );
}
