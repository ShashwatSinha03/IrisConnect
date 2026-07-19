import { RoleShell } from "@/components/shell/role-shell";
import { requireUser } from "@/lib/auth";
import type { ReactNode } from "react";

export default async function StudentLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await requireUser("student");
  return <RoleShell role="student" userName={user.name}>{children}</RoleShell>;
}
