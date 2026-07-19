import { SectionCard } from "@/components/ui/card";
import { AdminNoticeManager } from "@/components/admin/admin-actions";
import { getNotices } from "@/lib/store";
import { QuickNoticeForm } from "@/components/admin/admin-actions";

export default function AdminNoticesPage() {
  return (
    <div className="animate-fadeUp grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <SectionCard title="Publish notice" description="School-wide announcements for the prototype walkthrough.">
        <QuickNoticeForm />
      </SectionCard>

      <SectionCard title="Notice feed" description="Recent notices visible to every role.">
        <AdminNoticeManager notices={getNotices()} />
      </SectionCard>
    </div>
  );
}
