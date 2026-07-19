import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/subscription";
import { createAdminClient } from "@/lib/supabase/admin";

export async function DELETE() {
  try {
    await requireAdmin();

    const admin = createAdminClient();

    const { count, error } = await admin
      .from("system_logs")
      .delete({ count: "exact" })
      .not("id", "is", null);

    if (error) {
      console.error("Erro ao limpar logs:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Não foi possível limpar os logs.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      deleted: count ?? 0,
    });
  } catch (error) {
    console.error("Erro na rota de limpeza de logs:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Você não possui permissão para realizar esta ação.",
      },
      { status: 403 }
    );
  }
}