import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

function serializeExpense(expense: {
  id: string;
  description: string;
  amount: number | string;
  due_day: number | null;
  active: boolean | null;
  created_at: string | null;
}) {
  return {
    id: expense.id,
    description: expense.description,
    amount: Number(expense.amount || 0),
    dueDay: expense.due_day,
    active: expense.active !== false,
    createdAt: expense.created_at,
  };
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const { data: appUser } = await adminSupabase
      .from("app_users")
      .select("id")
      .eq("email", user.email)
      .single();

    if (!appUser) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    const { data: member } = await adminSupabase
      .from("group_members")
      .select("group_id")
      .eq("user_id", appUser.id)
      .eq("active", true)
      .single();

    if (!member) {
      return NextResponse.json(
        { error: "Nenhuma família ativa encontrada." },
        { status: 404 }
      );
    }

    const body = await request.json();

    const description = String(body.description || "").trim();
    const amount = Number(body.amount);
    const dueDay = Number(body.dueDay);

    if (!description) {
      return NextResponse.json(
        { error: "Informe a descrição." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Informe um valor válido." },
        { status: 400 }
      );
    }

    if (!Number.isInteger(dueDay) || dueDay < 1 || dueDay > 31) {
      return NextResponse.json(
        { error: "O vencimento deve estar entre 1 e 31." },
        { status: 400 }
      );
    }

    const { data: expense, error } = await adminSupabase
      .from("fixed_expenses")
      .insert({
        group_id: member.group_id,
        description,
        amount,
        due_day: dueDay,
        active: true,
      })
      .select(
        "id, description, amount, due_day, active, created_at"
      )
      .single();

    if (error || !expense) {
      console.error("Erro ao criar gasto fixo:", error);

      return NextResponse.json(
        { error: "Não foi possível criar o gasto fixo." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      expense: serializeExpense(expense),
    });
  } catch (error) {
    console.error("Erro inesperado ao criar gasto fixo:", error);

    return NextResponse.json(
      { error: "Erro interno ao criar o gasto fixo." },
      { status: 500 }
    );
  }
}