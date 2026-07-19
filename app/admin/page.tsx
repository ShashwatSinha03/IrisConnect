import { SectionCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, monthLabelFromKey } from "@/lib/utils";
import { getAdminDashboard, getStore } from "@/lib/store";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarkFeeAction, QuickNoticeForm } from "@/components/admin/admin-actions";

export default function AdminDashboardPage() {
  const dashboard = getAdminDashboard();
  const store = getStore();

  return (
    <div className="mx-auto max-w-5xl animate-fadeUp space-y-12">
      <div className="relative">
        <div className="absolute -left-4 top-0 h-full w-0.5 rounded-full bg-gradient-to-b from-gold-500/60 to-transparent" />
        <h1 className="text-xl font-semibold tracking-tight text-white">Dashboard</h1>
        <p className="mt-0.5 text-sm text-[#9498ab]">School operations overview</p>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-center">
          <p className="text-xl font-semibold tracking-tight text-white">{dashboard.studentCount}</p>
          <p className="mt-0.5 text-xs text-[#9498ab]">Students</p>
        </div>
        <div className="h-8 w-px bg-[#1e2235]" />
        <div className="text-center">
          <p className="text-xl font-semibold tracking-tight text-white">{dashboard.teacherCount}</p>
          <p className="mt-0.5 text-xs text-[#9498ab]">Teachers</p>
        </div>
        <div className="h-8 w-px bg-[#1e2235]" />
        <div className="text-center">
          <p className="text-xl font-semibold tracking-tight text-gold-400">{dashboard.pendingFees}</p>
          <p className="mt-0.5 text-xs text-[#9498ab]">Fee verifications</p>
        </div>
        <div className="h-8 w-px bg-[#1e2235]" />
        <div className="text-center">
          <p className="text-xl font-semibold tracking-tight text-white">{dashboard.todayAttendance}</p>
          <p className="mt-0.5 text-xs text-[#9498ab]">Attendance today</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <SectionCard
          title="Fee verifications"
          description="Students waiting for approval"
          action={
            <Link href="/admin/fees" className="inline-flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300">
              Open <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <div className="space-y-3">
            {dashboard.submittedFees.length ? (
              dashboard.submittedFees.map((fee) => {
                const student = store.students.find((s) => s.id === fee.studentId);
                return (
                  <div
                    key={fee.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-[#1e2235] bg-surface p-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#f1f3f7]">{student?.name}</p>
                      <p className="text-xs text-[#9498ab]">
                        {monthLabelFromKey(fee.month)} &middot; {formatCurrency(fee.amount)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <Badge className="border-gold-500/30 bg-gold-500/10 text-gold-400">Submitted</Badge>
                      <MarkFeeAction feeId={fee.id} studentName={student?.name ?? "Student"} />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="rounded-lg border border-dashed border-[#2a2e42] p-8 text-center text-sm text-[#5c6070]">
                No fee submissions waiting
              </p>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="Quick notice"
          description="Publish school-wide"
          action={
            <Link href="/admin/notices" className="text-sm text-brand-400 hover:text-brand-300">
              Open
            </Link>
          }
        >
          <QuickNoticeForm />
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <SectionCard title="Today at a glance" description="Operational snapshot">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-[#1a1d2b] p-4">
              <p className="text-xs text-[#9498ab]">Attendance recorded</p>
              <p className="mt-1 text-lg font-semibold tracking-tight text-white">{dashboard.todayAttendance} classes</p>
            </div>
            <div className="rounded-lg bg-[#1a1d2b] p-4">
              <p className="text-xs text-[#9498ab]">Fee month</p>
              <p className="mt-1 text-lg font-semibold tracking-tight text-gold-400">
                {monthLabelFromKey(store.fees[0]?.month ?? "2026-07")}
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Recent notices" description="Latest announcements">
          <div className="divide-y divide-[#1e2235]">
            {dashboard.notices.slice(0, 2).map((notice) => (
              <div key={notice.id} className="py-3 first:pt-0 last:pb-0">
                <p className="text-sm font-medium text-[#f1f3f7]">{notice.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-[#9498ab] line-clamp-2">{notice.body}</p>
                  <p className="mt-1 text-xs text-[#5c6070]">
                  {new Date(notice.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
