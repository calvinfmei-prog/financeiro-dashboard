import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "../components/page-shell";
import CardsPageContent from "../components/cards-page-content";
import RealtimeListener from "../components/realtime-listener";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

export default async function CartoesPage() {
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
        title="Cartões"
        description="Parcelas e simulações do cartão."
      >
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
          Nenhuma família encontrada.
        </div>
      </PageShell>
    );
  }

  const groupId = member.group_id;

  const { data: ciclo } = await supabase
    .from("cycles")
    .select("cycle, starting_balance")
    .eq("group_id", groupId)
    .eq("active", true)
    .single();

  const { data: transactionsData } = await supabase
    .from("transactions")
    .select("type, amount")
    .eq("group_id", groupId)
    .eq("cycle", ciclo?.cycle);

  const { data: fixedExpensesData } = await supabase
    .from("fixed_expenses")
    .select("amount")
    .eq("group_id", groupId)
    .eq("active", true);

  const { data: installmentsData } = await supabase
    .from("card_installments")
    .select(
      "id, description, amount, current_installment, total_installments, active, created_at"
    )
    .eq("group_id", groupId)
    .eq("active", true)
    .order("created_at", { ascending: false });

  const installments = (installmentsData ?? []).map((item) => {
    const current = Number(item.current_installment || 0);
    const total = Number(item.total_installments || 1);
    const progress = Math.min(Math.round((current / total) * 100), 100);

    return {
      id: item.id,
      description: item.description || "Sem descrição",
      rawAmount: Number(item.amount),
      amount: formatBRL(Number(item.amount)),
      currentInstallment: current,
      totalInstallments: total,
      progress,
    };
  });

  const receitas = (transactionsData ?? [])
    .filter((item) => item.type === "entrada")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const despesas = (transactionsData ?? [])
    .filter((item) => item.type === "saida")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const fixas = (fixedExpensesData ?? []).reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalCartao = installments.reduce(
    (sum, item) => sum + item.rawAmount,
    0
  );

  const saldoInicial = Number(ciclo?.starting_balance ?? 0);

  const saldoDisponivel =
    saldoInicial + receitas - despesas - fixas - totalCartao;

  return (
    <PageShell
      userName={appUser.name}
      plan={appUser.plan}
      cycle={ciclo?.cycle || "Ciclo atual"}
      title="Cartões"
      description="Acompanhe parcelas ativas e simule novas compras."
    >
      <RealtimeListener groupId={groupId} />

      <CardsPageContent
        installments={installments}
        total={formatBRL(totalCartao)}
        totalRaw={totalCartao}
        availableBalanceRaw={saldoDisponivel}
      />
    </PageShell>
  );
}