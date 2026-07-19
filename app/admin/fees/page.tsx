import { SectionCard } from "@/components/ui/card";
import { AdminFeeManager } from "@/components/admin/admin-actions";
import { getStore } from "@/lib/store";

export default function AdminFeesPage() {
  const store = getStore();

  return (
    <div className="animate-fadeUp">
      <SectionCard title="Fee verification" description="Approve student fee submissions one by one.">
        <AdminFeeManager fees={store.fees} students={store.students} />
      </SectionCard>
    </div>
  );
}
