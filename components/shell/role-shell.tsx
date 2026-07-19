"use client";

import { cn } from "@/lib/utils";
import { BarChart3, BookOpen, CalendarDays, ChevronLeft, ClipboardList, GraduationCap, IndianRupee, LayoutDashboard, LogOut, Megaphone, Menu, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";

const navByRole: Record<string, Array<{ href: string; label: string; icon: typeof LayoutDashboard }>> = {
  admin: [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/students", label: "Students", icon: Users },
    { href: "/admin/teachers", label: "Teachers", icon: ShieldCheck },
    { href: "/admin/attendance", label: "Attendance", icon: ClipboardList },
    { href: "/admin/fees", label: "Fees", icon: IndianRupee },
    { href: "/admin/timetable", label: "Timetable", icon: CalendarDays },
    { href: "/admin/marks", label: "Marks", icon: BarChart3 },
    { href: "/admin/notices", label: "Notices", icon: Megaphone }
  ],
  teacher: [
    { href: "/teacher", label: "Dashboard", icon: LayoutDashboard },
    { href: "/teacher/attendance", label: "Attendance", icon: ClipboardList },
    { href: "/teacher/marks", label: "Marks", icon: BarChart3 }
  ],
  student: [
    { href: "/student", label: "Dashboard", icon: LayoutDashboard },
    { href: "/student/attendance", label: "Attendance", icon: ClipboardList },
    { href: "/student/marks", label: "Marks", icon: BarChart3 },
    { href: "/student/timetable", label: "Timetable", icon: CalendarDays },
    { href: "/student/notices", label: "Notices", icon: Megaphone },
    { href: "/student/fees", label: "Fees", icon: IndianRupee }
  ]
};

const roleMeta = {
  admin: {
    label: "Admin",
    iconBg: "bg-brand-500",
    iconColor: "text-brand-400",
    bgActive: "bg-brand-500/10",
    textActive: "text-brand-300",
    textInactive: "text-[#6b7088]",
    hoverBg: "hover:bg-[#1a1d2b]",
    hoverText: "hover:text-[#f1f3f7]"
  },
  teacher: {
    label: "Teacher",
    iconBg: "bg-gold-500",
    iconColor: "text-gold-400",
    bgActive: "bg-gold-500/10",
    textActive: "text-gold-300",
    textInactive: "text-[#6b7088]",
    hoverBg: "hover:bg-[#1a1d2b]",
    hoverText: "hover:text-[#f1f3f7]"
  },
  student: {
    label: "Student",
    iconBg: "bg-brand-500",
    iconColor: "text-brand-400",
    bgActive: "bg-brand-500/10",
    textActive: "text-brand-300",
    textInactive: "text-[#6b7088]",
    hoverBg: "hover:bg-[#1a1d2b]",
    hoverText: "hover:text-[#f1f3f7]"
  }
} as const;

function roleIcon(role: keyof typeof roleMeta) {
  switch (role) {
    case "admin":
      return ShieldCheck;
    case "teacher":
      return BookOpen;
    case "student":
      return GraduationCap;
  }
}

export function RoleShell({
  role,
  userName,
  children
}: {
  role: keyof typeof roleMeta;
  userName: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const meta = roleMeta[role];
  const navItems = navByRole[role] ?? [];

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-surface-dark">
      <div className="pointer-events-none fixed inset-0 bg-hero-grid bg-[size:28px_28px] opacity-25" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px]">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-surface-darker border-r border-[#1a1d2b]",
            "transition-transform duration-200 ease-out",
            "xl:static xl:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
          )}
        >
          <div className="flex items-center justify-between border-b border-[#1a1d2b] px-4 py-4">
            <div className="flex items-center gap-2.5">
              <img src="/icon.png" alt="Iris Connect" className="h-8 w-8" />
              <div>
                <p className="text-sm font-semibold text-white">Iris Connect</p>
                <p className="text-[11px] text-[#6b7088]">{meta.label}</p>
              </div>
            </div>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-md text-[#6b7088] hover:bg-[#1a1d2b] hover:text-[#c8cbd8] xl:hidden"
              onClick={() => setOpen(false)}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-0.5 p-3">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                    active
                      ? cn(meta.bgActive, meta.textActive)
                      : cn(meta.textInactive, meta.hoverBg, meta.hoverText)
                  )}
                >
                  {active ? (
                    <div className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gold-500/60" />
                  ) : null}
                  <ItemIcon className={cn("h-4 w-4", active ? meta.iconColor : "text-[#4a4f69]")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-[#1a1d2b] p-3">
            <div className="rounded-lg bg-[#111420] px-3 py-2.5">
              <p className="text-[10px] font-medium uppercase tracking-widest text-[#6b7088]">Signed in</p>
              <p className="mt-0.5 truncate text-sm font-medium text-[#c8cbd8]">{userName}</p>
            </div>
          </div>
        </aside>

        {open ? (
          <button
            aria-label="Close navigation"
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm xl:hidden"
            onClick={() => setOpen(false)}
          />
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-[#1e2235] bg-surface/80 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#2a2e42] bg-surface-light text-[#9498ab] hover:bg-[#1a1d2b] xl:hidden"
                  onClick={() => setOpen(true)}
                >
                  <Menu className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                  <img src="/icon.png" alt="" className="h-5 w-5" />
                  <div>
                    <p className="text-xs font-medium text-[#9498ab]">{meta.label}</p>
                    <h1 className="text-base font-semibold text-[#f1f3f7]">Iris Crown School</h1>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-[#1a1d2b] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                  <span className="text-xs font-medium text-[#9498ab]">Prototype</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-[#9498ab] transition-colors hover:bg-[#1a1d2b] hover:text-[#f1f3f7]"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
          <footer className="flex justify-center border-t border-[#1a1d2b] px-4 py-5 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/[0.06] px-4 py-1.5 text-xs text-gold-400/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500/70" />
              designed with love by shantam sinha
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
