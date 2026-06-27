import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "../components/page-shell";
import TransactionsPageContent from "../components/transactions-page-content";
import type { TransactionListItem } from "../types/dashboard";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function TransacoesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
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
        title="Transações"
        description="Todos os lançamentos do ciclo atual."
      >
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
          Nenhuma família encontrada.
        </div>
      </PageShell>
    );
  }

  const { data: ciclo } = await supabase
    .from("cycles")
    .select("cycle")
    .eq("group_id", member.group_id)
    .eq("active", true)
    .single();

  const { data: transactionsData } = await supabase
    .from("transactions")
    .select("id, type, amount, description, category, created_at")
    .eq("group_id", member.group_id)
    .order("created_at", { ascending: false });

  const transactions: TransactionListItem[] = (transactionsData ?? []).map(
    (item) => {
      const rawAmount = Number(item.amount);
      const isIncome = item.type === "entrada";

      return {
        id: item.id,
        title: item.description || "Sem descrição",
        category: item.category || "Sem categoria",
        rawAmount,
        type: item.type,
        date: formatDate(item.created_at),
        amount: `${isIncome ? "+" : "-"} ${formatBRL(rawAmount)}`,
      };
    }
  );

  return (
    <PageShell
      userName={appUser.name}
      plan={appUser.plan}
      cycle={ciclo?.cycle || "Ciclo atual"}
      title="Transações"
      description="Todos os lançamentos do ciclo atual."
    >
      <TransactionsPageContent transactions={transactions} />
    </PageShell>
  );
}