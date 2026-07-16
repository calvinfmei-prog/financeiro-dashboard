import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "../components/page-shell";
import FixedExpensesPageContent from "../components/fixed-expenses-page-content";
import RealtimeListener from "../components/realtime-listener";

export interface FixedExpenseItem {
  id: string;
  description: string;
  amount: number;
  dueDay: number | null;
  active: boolean;
  createdAt: string | null;
}

export default async function FixasPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  const { data: appUser } = await supabase
    .from("app_users")
    .select("id, name, email, plan")
    .eq("email", user.email)
    .single();

  if (!appUser) {
    redirect("/login");
  }

  const { data: member } = await supabase
    .from("group_members")
    .select("group_id")
    .eq("user_id", appUser.id)
    .eq("active", true)
    .single();

  if (!member) {
    return (
      <PageShell
        userName={appUser.name}
        plan={appUser.plan}
        title="Gastos Fixos"
        description="Gerencie as despesas recorrentes da família."
      >
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
          Nenhuma família ativa foi encontrada.
        </div>
      </PageShell>
    );
  }

  const groupId = member.group_id;

  const { data: ciclo } = await supabase
    .from("cycles")
    .select("cycle")
    .eq("group_id", groupId)
    .eq("active", true)
    .single();

  const { data: fixedExpensesData, error } = await supabase
    .from("fixed_expenses")
    .select("id, description, amount, due_day, active, created_at")
    .eq("group_id", groupId)
    .order("active", { ascending: false })
    .order("due_day", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar gastos fixos:", error);
  }

  const fixedExpenses: FixedExpenseItem[] = (
    fixedExpensesData ?? []
  ).map((item) => ({
    id: item.id,
    description: item.description || "Sem descrição",
    amount: Number(item.amount || 0),
    dueDay:
      item.due_day === null || item.due_day === undefined
        ? null
        : Number(item.due_day),
    active: item.active !== false,
    createdAt: item.created_at,
  }));

  return (
    <PageShell
      userName={appUser.name}
      plan={appUser.plan}
      cycle={ciclo?.cycle || "Ciclo atual"}
      title="Gastos Fixos"
      description="Gerencie as despesas recorrentes da família."
    >
      <RealtimeListener groupId={groupId} />

      <FixedExpensesPageContent initialExpenses={fixedExpenses} />
    </PageShell>
  );
}