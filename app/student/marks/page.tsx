import { SectionCard } from "@/components/ui/card";
import { StudentMarksPanel } from "@/components/student/student-actions";
import { getStudentDashboard } from "@/lib/store";
import { getSessionUser } from "@/lib/auth";

export default async function StudentMarksPage() {
  const user = await getSessionUser();
  const dashboard = user ? getStudentDashboard(user.id) : null;
  if (!dashboard) return null;

  return (
    <div className="animate-fadeUp">
      <SectionCard title="Marks" description="Subject-wise marks for the current term.">
        <StudentMarksPanel marks={dashboard.marks} />
      </SectionCard>
    </div>
  );
}
