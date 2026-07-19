import { Card, CardContent, SectionCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStore, getStudentsList } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { AddStudentForm } from "@/components/admin/admin-actions";

export default function AdminStudentsPage() {
  const students = getStudentsList();
  const store = getStore();

  return (
    <div className="animate-fadeUp grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <SectionCard title="Add student" description="Minimal create form for the prototype workflow.">
        <AddStudentForm />
      </SectionCard>

      <Card className="overflow-hidden">
        <div className="border-b border-[#1e2235] px-5 py-4">
          <h2 className="text-sm font-semibold text-[#f1f3f7]">Student roster</h2>
          <p className="mt-0.5 text-xs text-[#9498ab]">All enrolled students for {store.students[0]?.className} {store.students[0]?.section}.</p>
        </div>
        <CardContent className="p-0">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="border-b-2 border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]">Student</th>
                <th className="border-b-2 border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]">Admission</th>
                <th className="border-b-2 border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]">Class</th>
                <th className="border-b-2 border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]">Parent</th>
                <th className="border-b-2 border-[#1e2235] px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#9498ab]">Joined</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="[&:last-child>td]:border-b-0">
                  <td className="border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]">
                    <p className="font-medium text-[#f1f3f7]">{student.name}</p>
                    <p className="text-xs text-[#9498ab]">Roll {student.rollNo}</p>
                  </td>
                  <td className="border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]">{student.admissionId}</td>
                  <td className="border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]">
                    <Badge className="border-brand-500/30 bg-brand-500/10 text-brand-400">{student.className} {student.section}</Badge>
                  </td>
                  <td className="border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]">
                    <p className="font-medium text-[#f1f3f7]">{student.parentName}</p>
                    <p className="text-xs text-[#9498ab]">{student.parentPhone}</p>
                  </td>
                  <td className="border-b border-[#1a1d2b] px-4 py-3 text-sm text-[#c8cbd8]">{formatDate(new Date())}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
