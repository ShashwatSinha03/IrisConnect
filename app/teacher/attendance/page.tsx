import { SectionCard } from "@/components/ui/card";
import { TeacherAttendanceForm } from "@/components/teacher/teacher-actions";
import { getAttendanceForRole, getStore } from "@/lib/store";
import { getSessionUser } from "@/lib/auth";

export default async function TeacherAttendancePage() {
  const user = await getSessionUser();
  const store = getStore();
  const teacher = store.teachers.find((t) => t.userId === user?.id);
  const attendance = teacher ? getAttendanceForRole("teacher", user!.id) : [];

  return (
    <div className="animate-fadeUp">
      <SectionCard title="Mark attendance" description="Simple checkboxes for the current class.">
        <TeacherAttendanceForm
          students={store.students.filter((student) => student.className === teacher?.className && student.section === teacher?.section)}
          attendance={attendance}
          className={teacher?.className ?? "Grade 9"}
          section={teacher?.section ?? "A"}
        />
      </SectionCard>
    </div>
  );
}
