import { SectionCard } from "@/components/ui/card";
import { getTeacherDashboard } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSessionUser } from "@/lib/auth";

export default async function TeacherDashboardPage() {
  const user = await getSessionUser();
  const dashboard = user ? getTeacherDashboard(user.id) : null;
  if (!dashboard) return null;

  return (
    <div className="mx-auto max-w-5xl animate-fadeUp space-y-12">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-white">Dashboard</h1>
        <p className="mt-0.5 text-sm text-[#9498ab]">
          {dashboard.teacher.className} {dashboard.teacher.section} &middot; {dashboard.teacher.subject}
        </p>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-center">
          <p className="text-xl font-semibold tracking-tight text-white">{dashboard.students.length}</p>
          <p className="mt-0.5 text-xs text-[#9498ab]">Students</p>
        </div>
        <div className="h-8 w-px bg-[#1e2235]" />
        <div className="text-center">
          <p className="text-xl font-semibold tracking-tight text-white">{dashboard.notices.length}</p>
          <p className="mt-0.5 text-xs text-[#9498ab]">Notices</p>
        </div>
        <div className="h-8 w-px bg-[#1e2235]" />
        <div className="text-center">
          <p className="text-xl font-semibold tracking-tight text-brand-400">Today</p>
          <p className="mt-0.5 text-xs text-[#9498ab]">Attendance</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <SectionCard
          title="Today's work"
          description="Complete your classroom workflow"
        >
          <div className="flex flex-wrap gap-3">
            <Link
              href="/teacher/attendance"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white shadow-xs transition-all duration-150 hover:bg-brand-600"
            >
              Mark attendance
            </Link>
            <Link
              href="/teacher/marks"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-[#2a2e42] bg-surface px-4 text-sm font-medium text-[#f1f3f7] shadow-xs transition-all duration-150 hover:bg-[#222639]"
            >
              Upload marks
            </Link>
          </div>
          <div className="mt-5 rounded-lg bg-[#1a1d2b] p-4 text-sm">
            <p className="text-xs font-medium text-[#f1f3f7]">Class overview</p>
            <p className="mt-1 text-[#9498ab]">
              {dashboard.teacher.className} {dashboard.teacher.section} &middot; {dashboard.students.length} students
            </p>
          </div>
        </SectionCard>

        <SectionCard
          title="Recent notices"
          description="School-wide announcements"
          action={
            <Link href="/teacher/notices" className="text-sm text-brand-400 hover:text-brand-300">
              View all <ArrowRight className="inline h-3.5 w-3.5" />
            </Link>
          }
        >
          <div className="divide-y divide-[#1e2235]">
            {dashboard.notices.slice(0, 3).map((notice) => (
              <div key={notice.id} className="py-3 first:pt-0 last:pb-0">
                <p className="text-sm font-medium text-[#f1f3f7]">{notice.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-[#9498ab] line-clamp-2">{notice.body}</p>
                <p className="mt-1 text-xs text-[#5c6070]">{formatDate(notice.publishedAt)}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
