import { RoleShell } from "@/components/shell/role-shell";
import { requireUser } from "@/lib/auth";
import type { ReactNode } from "react";

export default async function AdminLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await requireUser("admin");
  return <RoleShell role="admin" userName={user.name}>{children}</RoleShell>;
}
