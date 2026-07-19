import { NextResponse } from "next/server";
import { currentStore, jsonError, requireApiUser } from "@/lib/api";
import { monthKey } from "@/lib/utils";

export async function GET() {
  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;
  return NextResponse.json({ ok: true, fees: currentStore().fees });
}

export async function POST(request: Request) {
  const auth = await requireApiUser();
  if ("error" in auth) return auth.error;

  const body = (await request.json().catch(() => null)) as { action?: "submit" | "verify"; feeId?: string } | null;
  if (!body?.action || !body.feeId) {
    return jsonError("Action and fee ID are required");
  }

  const store = currentStore();
  const fee = store.fees.find((item) => item.id === body.feeId);
  if (!fee) {
    return jsonError("Fee record not found", 404);
  }

  if (body.action === "submit") {
    const studentRecord = store.students.find((s) => s.userId === auth.user.id);
    if (auth.user.role !== "student" || !studentRecord || fee.studentId !== studentRecord.id) {
      return jsonError("Forbidden", 403);
    }
    fee.status = "submitted";
    fee.submittedAt = new Date().toISOString();
    fee.submittedBy = auth.user.id;
  } else {
    if (auth.user.role !== "admin") {
      return jsonError("Forbidden", 403);
    }
    fee.status = "verified";
    fee.verifiedAt = new Date().toISOString();
    fee.verifiedBy = auth.user.id;
  }

  fee.month = fee.month || monthKey();
  return NextResponse.json({ ok: true, fee });
}
