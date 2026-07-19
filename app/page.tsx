import { roleHome, getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await getSessionUser();
  redirect(user ? roleHome(user.role) : "/login");
}
