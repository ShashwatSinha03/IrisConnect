import { SectionCard } from "@/components/ui/card";
import { AttendanceViewer } from "@/components/admin/admin-actions";
import { getAttendanceForRole } from "@/lib/store";
import { getSessionUser } from "@/lib/auth";

export default async function AdminAttendancePage() {
  const user = await getSessionUser();
  const attendance = getAttendanceForRole("admin", user?.id ?? "");

  return (
    <div className="animate-fadeUp">
      <SectionCard title="Attendance records" description="Review the latest class attendance snapshots.">
        <AttendanceViewer attendance={attendance} />
      </SectionCard>
    </div>
  );
}
