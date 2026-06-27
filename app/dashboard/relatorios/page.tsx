import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "../components/page-shell";
import ReportsPageContent from "../components/reports-page-content";
import RealtimeListener from "../components/realtime-listener";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

export default async function RelatoriosPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) redirect("/login");

  const { data: appUser } = await supabase
    .from("app_users")
    .select("id, name, email, plan")
    .eq("email", user.email)
    .single();

  if (!appUser) redirect("/login");

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
        title="Relatórios"
        description="Análise financeira do seu ciclo."
      >
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
          Nenhuma família encontrada.
        </div>
      </PageShell>
    );
  }

  const { data: ciclo } = await supabase
    .from("cycles")
    .select("cycle, starting_balance")
    .eq("group_id", member.group_id)
    .eq("active", true)
    .single();

  const { data: transactionsData } = await supabase
    .from("transactions")
    .select("type, amount, description, category")
    .eq("group_id", member.group_id);

  const { data: fixedExpensesData } = await supabase
    .from("fixed_expenses")
    .select("amount")
    .eq("group_id", member.group_id)
    .eq("active", true);

  const { data: cardData } = await supabase
    .from("card_installments")
    .select("amount")
    .eq("group_id", member.group_id)
    .eq("active", true);

  const transactions = transactionsData ?? [];
  const fixedExpenses = fixedExpensesData ?? [];
  const cardInstallments = cardData ?? [];

  const receitas = transactions
    .filter((item) => item.type === "entrada")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const despesas = transactions
    .filter((item) => item.type === "saida")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const saldoInicial = Number(ciclo?.starting_balance ?? 0);
  const saldoAtual = saldoInicial + receitas - despesas;

  const fixas = fixedExpenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const cartao = cardInstallments.reduce((sum, item) => sum + Number(item.amount), 0);
  const saldoDisponivel = saldoAtual - fixas - cartao;

  const gastosPorCategoria = transactions
    .filter((item) => item.type === "saida")
    .reduce<Record<string, number>>((acc, item) => {
      const categoria = item.category || "Sem categoria";
      acc[categoria] = (acc[categoria] || 0) + Number(item.amount);
      return acc;
    }, {});

  const maiorCategoria = Object.entries(gastosPorCategoria).sort((a, b) => b[1] - a[1])[0];

  const maiorLancamento = transactions
    .filter((item) => item.type === "saida")
    .sort((a, b) => Number(b.amount) - Number(a.amount))[0];

  const percentualFixas = saldoAtual > 0 ? (fixas / saldoAtual) * 100 : 0;
  const percentualCartao = saldoAtual > 0 ? (cartao / saldoAtual) * 100 : 0;

  let healthScore = 100;
  if (saldoDisponivel < 0) healthScore -= 35;
  if (percentualFixas > 50) healthScore -= 20;
  if (percentualCartao > 30) healthScore -= 15;
  if (despesas > receitas && receitas > 0) healthScore -= 20;

  healthScore = Math.max(Math.min(Math.round(healthScore), 100), 0);

  const healthLabel =
    healthScore >= 80
      ? "Excelente"
      : healthScore >= 60
      ? "Boa"
      : healthScore >= 40
      ? "Atenção"
      : "Crítica";

  const report = {
    cycle: ciclo?.cycle || "Ciclo atual",
    revenues: formatBRL(receitas),
    expenses: formatBRL(despesas),
    currentBalance: formatBRL(saldoAtual),
    availableBalance: formatBRL(saldoDisponivel),
    patrimony: formatBRL(saldoAtual),
    fixedExpenses: formatBRL(fixas),
    card: formatBRL(cartao),
    healthScore,
    healthLabel,
    projectedEndBalance: formatBRL(saldoDisponivel),
    biggestCategory: maiorCategoria?.[0] || "Sem categoria",
    biggestCategoryAmount: formatBRL(maiorCategoria?.[1] || 0),
    biggestTransaction: maiorLancamento?.description || "Sem lançamento",
    biggestTransactionAmount: formatBRL(Number(maiorLancamento?.amount || 0)),
    insights: [
      saldoDisponivel >= 0
        ? "Seu saldo disponível está positivo para o restante do ciclo."
        : "Seu saldo disponível está negativo. Vale revisar os próximos gastos.",
      maiorCategoria
        ? `Sua maior categoria de gasto é ${maiorCategoria[0]}.`
        : "Ainda não há gastos categorizados neste ciclo.",
      `Gastos fixos representam aproximadamente ${Math.round(percentualFixas)}% do saldo atual.`,
      `Cartão representa aproximadamente ${Math.round(percentualCartao)}% do saldo atual.`,
    ],
  };

  return (
    <PageShell
      userName={appUser.name}
      plan={appUser.plan}
      cycle={ciclo?.cycle || "Ciclo atual"}
      title="Relatórios"
      description="Resumo executivo, saúde financeira e insights do ciclo."
    >
      <RealtimeListener groupId={member.group_id} />
      <ReportsPageContent report={report} />
    </PageShell>
  );
}