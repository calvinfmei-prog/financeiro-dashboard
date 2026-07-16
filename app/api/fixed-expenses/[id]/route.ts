import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

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

async function getAuthenticatedContext() {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return {
      error: NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      ),
    };
  }

  const { data: appUser } = await adminSupabase
    .from("app_users")
    .select("id")
    .eq("email", user.email)
    .single();

  if (!appUser) {
    return {
      error: NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      ),
    };
  }

  const { data: member } = await adminSupabase
    .from("group_members")
    .select("group_id")
    .eq("user_id", appUser.id)
    .eq("active", true)
    .single();

  if (!member) {
    return {
      error: NextResponse.json(
        { error: "Nenhuma família ativa encontrada." },
        { status: 404 }
      ),
    };
  }

  return {
    adminSupabase,
    groupId: member.group_id,
  };
}

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const authContext = await getAuthenticatedContext();

    if ("error" in authContext) {
      return authContext.error;
    }

    const { adminSupabase, groupId } = authContext;
    const body = await request.json();

    const { data: existingExpense } = await adminSupabase
      .from("fixed_expenses")
      .select("id")
      .eq("id", id)
      .eq("group_id", groupId)
      .maybeSingle();

    if (!existingExpense) {
      return NextResponse.json(
        { error: "Gasto fixo não encontrado." },
        { status: 404 }
      );
    }

    const updates: {
      description?: string;
      amount?: number;
      due_day?: number;
      active?: boolean;
    } = {};

    if (body.description !== undefined) {
      const description = String(body.description).trim();

      if (!description) {
        return NextResponse.json(
          { error: "Informe a descrição." },
          { status: 400 }
        );
      }

      updates.description = description;
    }

    if (body.amount !== undefined) {
      const amount = Number(body.amount);

      if (!Number.isFinite(amount) || amount <= 0) {
        return NextResponse.json(
          { error: "Informe um valor válido." },
          { status: 400 }
        );
      }

      updates.amount = amount;
    }

    if (body.dueDay !== undefined) {
      const dueDay = Number(body.dueDay);

      if (
        !Number.isInteger(dueDay) ||
        dueDay < 1 ||
        dueDay > 31
      ) {
        return NextResponse.json(
          { error: "O vencimento deve estar entre 1 e 31." },
          { status: 400 }
        );
      }

      updates.due_day = dueDay;
    }

    if (body.active !== undefined) {
      if (typeof body.active !== "boolean") {
        return NextResponse.json(
          { error: "O status informado é inválido." },
          { status: 400 }
        );
      }

      updates.active = body.active;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "Nenhuma alteração foi informada." },
        { status: 400 }
      );
    }

    const { data: expense, error } = await adminSupabase
      .from("fixed_expenses")
      .update(updates)
      .eq("id", id)
      .eq("group_id", groupId)
      .select(
        "id, description, amount, due_day, active, created_at"
      )
      .single();

    if (error || !expense) {
      console.error("Erro ao atualizar gasto fixo:", error);

      return NextResponse.json(
        { error: "Não foi possível atualizar o gasto fixo." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      expense: serializeExpense(expense),
    });
  } catch (error) {
    console.error("Erro inesperado ao atualizar gasto fixo:", error);

    return NextResponse.json(
      { error: "Erro interno ao atualizar o gasto fixo." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const authContext = await getAuthenticatedContext();

    if ("error" in authContext) {
      return authContext.error;
    }

    const { adminSupabase, groupId } = authContext;

    const { data: existingExpense } = await adminSupabase
      .from("fixed_expenses")
      .select("id")
      .eq("id", id)
      .eq("group_id", groupId)
      .maybeSingle();

    if (!existingExpense) {
      return NextResponse.json(
        { error: "Gasto fixo não encontrado ou já excluído." },
        { status: 404 }
      );
    }

    const { error } = await adminSupabase
      .from("fixed_expenses")
      .delete()
      .eq("id", id)
      .eq("group_id", groupId);

    if (error) {
      console.error("Erro ao excluir gasto fixo:", error);

      return NextResponse.json(
        { error: "Não foi possível excluir o gasto fixo." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Erro inesperado ao excluir gasto fixo:", error);

    return NextResponse.json(
      { error: "Erro interno ao excluir o gasto fixo." },
      { status: 500 }
    );
  }
}