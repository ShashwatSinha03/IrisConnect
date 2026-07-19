import { SectionCard } from "@/components/ui/card";
import { AdminMarksManager } from "@/components/admin/admin-actions";
import { getStore } from "@/lib/store";

export default function AdminMarksPage() {
  const store = getStore();

  return (
    <div className="animate-fadeUp">
      <SectionCard title="Marks" description="Publish or review subject marks.">
        <AdminMarksManager students={store.students} teachers={store.teachers} marks={store.marks} />
      </SectionCard>
    </div>
  );
}
