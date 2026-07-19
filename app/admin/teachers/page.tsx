import { Card, CardContent, SectionCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTeachersList } from "@/lib/store";
import { AddTeacherForm } from "@/components/admin/admin-actions";

export default function AdminTeachersPage() {
  const teachers = getTeachersList();

  return (
    <div className="animate-fadeUp grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <SectionCard title="Add teacher" description="Minimal create form for the prototype workflow.">
        <AddTeacherForm />
      </SectionCard>

      <Card className="overflow-hidden">
        <div className="border-b border-[#1e2235] px-5 py-4">
          <h2 className="text-sm font-semibold text-[#f1f3f7]">Teacher roster</h2>
          <p className="mt-0.5 text-xs text-[#9498ab]">Teachers assigned to the demo class.</p>
        </div>
        <CardContent className="p-0">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="border-b-2 border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]">Teacher</th>
                <th className="border-b-2 border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]">Employee ID</th>
                <th className="border-b-2 border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]">Subject</th>
                <th className="border-b-2 border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]">Class</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="[&:last-child>td]:border-b-0">
                  <td className="border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]">
                    <p className="font-medium text-[#f1f3f7]">{teacher.name}</p>
                    <p className="text-xs text-[#9498ab]">User ID {teacher.userId}</p>
                  </td>
                  <td className="border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]">{teacher.employeeId}</td>
                  <td className="border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]">{teacher.subject}</td>
                  <td className="border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]">
                    <Badge className="border-gold-500/30 bg-gold-500/10 text-gold-400">{teacher.className} {teacher.section}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
