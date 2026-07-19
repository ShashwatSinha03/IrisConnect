import { SectionCard } from "@/components/ui/card";
import { StudentFeePanel } from "@/components/student/student-actions";
import { getStudentDashboard } from "@/lib/store";
import { getSessionUser } from "@/lib/auth";

export default async function StudentFeesPage() {
  const user = await getSessionUser();
  const dashboard = user ? getStudentDashboard(user.id) : null;
  if (!dashboard) return null;

  return (
    <div className="animate-fadeUp">
      <SectionCard title="Fees" description="Track the simple payment verification workflow.">
        <StudentFeePanel fee={dashboard.fee} />
      </SectionCard>
    </div>
  );
}
