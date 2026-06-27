import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const approvalId = searchParams.get("id");

  if (!approvalId) {
    return NextResponse.json(
      { error: "ID não informado." },
      { status: 400 }
    );
  }

  const admin = createAdminClient();

  const { data: approval } = await admin
    .from("login_approvals")
    .select("id, status, expires_at")
    .eq("id", approvalId)
    .single();

  if (!approval) {
    return NextResponse.json(
      { error: "Solicitação não encontrada." },
      { status: 404 }
    );
  }

  if (
    approval.status === "pending" &&
    new Date(approval.expires_at).getTime() < Date.now()
  ) {
    await admin
      .from("login_approvals")
      .update({ status: "expired" })
      .eq("id", approvalId);

    return NextResponse.json({ status: "expired" });
  }

  return NextResponse.json({ status: approval.status });
}