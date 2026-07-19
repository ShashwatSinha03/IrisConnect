import { SectionCard } from "@/components/ui/card";
import { TeacherMarksForm } from "@/components/teacher/teacher-actions";
import { getStore } from "@/lib/store";
import { getSessionUser } from "@/lib/auth";

export default async function TeacherMarksPage() {
  const user = await getSessionUser();
  const store = getStore();

  return (
    <div className="animate-fadeUp">
      <SectionCard title="Upload marks" description="Publish marks for the demo class.">
        <TeacherMarksForm students={store.students} />
      </SectionCard>
    </div>
  );
}
