import { RoleShell } from "@/components/shell/role-shell";
import { requireUser } from "@/lib/auth";
import type { ReactNode } from "react";

export default async function TeacherLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await requireUser("teacher");
  return <RoleShell role="teacher" userName={user.name}>{children}</RoleShell>;
}
