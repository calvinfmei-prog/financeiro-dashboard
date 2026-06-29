import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardShell } from "./components/dashboardshell";
import type { DashboardData } from "./types/dashboard";
import RealtimeListener from "./components/realtime-listener";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: appUser } = await supabase
    .from("app_users")
    .select("id, name, email, telegram_id, active, plan, access_status")
    .eq("auth_user_id", user.id)
    .single();

  if (!appUser) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-3xl font-bold">Usuário não encontrado</h1>
        <p className="mt-2 text-slate-300">
          Seu usuário ainda não está vinculado corretamente ao sistema.
        </p>
      </main>
    );
  }

  const { data: member } = await supabase
    .from("group_members")
    .select("group_id")
    .eq("user_id", appUser.id)
    .eq("active", true)
    .single();

  if (!member) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-3xl font-bold">Nenhuma família encontrada</h1>
      </main>
    );
  }

  const groupId = member.group_id;

  const { data: ciclo } = await supabase
    .from("cycles")
    .select("*")
    .eq("group_id", groupId)
    .eq("active", true)
    .single();

  const { data: transactionsData } = await supabase
    .from("transactions")
    .select("id, type, amount, description, category, created_at")
    .eq("group_id", groupId)
    .order("created_at", { ascending: false });

  const transactions = transactionsData ?? [];

  const { data: fixedExpensesData } = await supabase
    .from("fixed_expenses")
    .select("id, description, amount, due_day, active")
    .eq("group_id", groupId)
    .eq("active", true);

  const fixedExpenses = fixedExpensesData ?? [];

  const { data: cardInstallmentsData } = await supabase
    .from("card_installments")
    .select("id, description, amount, current_installment, total_installments, active")
    .eq("group_id", groupId)
    .eq("active", true);

  const cardInstallments = cardInstallmentsData ?? [];

  const receitas = transactions
    .filter((item) => item.type === "entrada")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const despesas = transactions
    .filter((item) => item.type === "saida")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const fixas = fixedExpenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const cartao = cardInstallments.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const saldoInicial = Number(ciclo?.starting_balance ?? 0);
  const saldoAtual = saldoInicial + receitas - despesas;
  const saldoDisponivel = saldoAtual - fixas - cartao;

  const hoje = new Date();
  const ultimoDiaMes = new Date(
    hoje.getFullYear(),
    hoje.getMonth() + 1,
    0
  ).getDate();

  const diasRestantes = Math.max(ultimoDiaMes - hoje.getDate() + 1, 1);
  const podeGastarHoje = saldoDisponivel / diasRestantes;

  const gastosPorCategoria = transactions
    .filter((item) => item.type === "saida")
    .reduce<Record<string, number>>((acc, item) => {
      const categoria = item.category || "Sem categoria";
      acc[categoria] = (acc[categoria] || 0) + Number(item.amount);
      return acc;
    }, {});

  const totalCategorias = Object.values(gastosPorCategoria).reduce(
    (sum, value) => sum + value,
    0
  );

  const categories = Object.entries(gastosPorCategoria)
    .map(([name, amount]) => ({
      name,
      rawAmount: amount,
      value: totalCategorias > 0 ? Math.round((amount / totalCategorias) * 100) : 0,
      amount: formatBRL(amount),
      icon: "📌",
    }))
    .sort((a, b) => b.rawAmount - a.rawAmount)
    .slice(0, 4);

  const latestTransactions = transactions.slice(0, 5).map((item) => ({
    title: item.description,
    category: item.category || "Sem categoria",
    amount:
      item.type === "entrada"
        ? `+ ${formatBRL(Number(item.amount))}`
        : `- ${formatBRL(Number(item.amount))}`,
  }));

  const dueItems = fixedExpenses
    .slice(0, 5)
    .map((item) => ({
      title: item.description,
      date: `Dia ${item.due_day || "-"}`,
      amount: formatBRL(Number(item.amount)),
    }));

  const dashboardData: DashboardData = {
    cycle: ciclo?.cycle || "Ciclo atual",
    canSpendToday: formatBRL(podeGastarHoje),
    currentBalance: formatBRL(saldoAtual),
    availableBalance: formatBRL(saldoDisponivel),
    patrimony: formatBRL(saldoAtual),
    revenues: formatBRL(receitas),
    expenses: formatBRL(despesas),
    fixedExpenses: formatBRL(fixas),
    card: formatBRL(cartao),
    categories,
    transactions: latestTransactions,
    dueItems,
    insights: [
      {
        type: "info",
        title: "Dias restantes",
        description: `Você tem ${diasRestantes} dias restantes neste ciclo.`,
      },
      {
        type: "category",
        title: "Maior categoria",
        description: categories[0]
          ? `Sua maior categoria este mês é ${categories[0].name}.`
          : "Nenhum gasto categorizado ainda.",
      },
      {
        type: saldoDisponivel >= 0 ? "success" : "warning",
        title: saldoDisponivel >= 0 ? "Saldo positivo" : "Atenção ao saldo",
        description:
          saldoDisponivel >= 0
            ? "Seu saldo disponível está positivo."
            : "Seu saldo disponível está negativo. Atenção aos próximos gastos.",
      },
    ],
  };

  return (
  <>
    <RealtimeListener groupId={member.group_id} />

    <DashboardShell
      userName={appUser.name}
      plan={appUser.plan}
      data={dashboardData}
    />
  </>
);
}