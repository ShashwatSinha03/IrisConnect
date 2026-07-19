import { SectionCard } from "@/components/ui/card";
import { StudentNoticePanel } from "@/components/student/student-actions";
import { getNotices } from "@/lib/store";

export default function StudentNoticesPage() {
  return (
    <div className="animate-fadeUp">
      <SectionCard title="Notices" description="School-wide announcements.">
        <StudentNoticePanel notices={getNotices()} />
      </SectionCard>
    </div>
  );
}
