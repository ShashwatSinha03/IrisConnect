import { SectionCard } from "@/components/ui/card";
import { StudentTimetablePanel } from "@/components/student/student-actions";
import { getStore, getTimetable } from "@/lib/store";
import { getSessionUser } from "@/lib/auth";

export default async function StudentTimetablePage() {
  const user = await getSessionUser();
  const store = getStore();
  const student = store.students.find((s) => s.userId === user?.id);
  const timetable = student
    ? getTimetable().filter((t) => t.className === student.className && t.section === student.section)
    : getTimetable();

  return (
    <div className="animate-fadeUp">
      <SectionCard title="Timetable" description="Read-only weekly schedule.">
        <StudentTimetablePanel timetable={timetable} />
      </SectionCard>
    </div>
  );
}
