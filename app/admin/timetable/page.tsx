import { SectionCard } from "@/components/ui/card";
import { AdminTimetableEditor } from "@/components/admin/admin-actions";
import { getTimetable } from "@/lib/store";

export default function AdminTimetablePage() {
  return (
    <div className="animate-fadeUp">
      <SectionCard title="Timetable" description="Create or update a simple weekly timetable.">
        <AdminTimetableEditor timetable={getTimetable()} />
      </SectionCard>
    </div>
  );
}
