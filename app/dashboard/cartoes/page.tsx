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

  const { data: ciclo } = await supabase
    .from("cycles")
    .select("cycle")
    .eq("group_id", member.group_id)
    .eq("active", true)
    .single();

  const { data: installmentsData } = await supabase
    .from("card_installments")
    .select("id, description, amount, current_installment, total_installments, active")
    .eq("group_id", member.group_id)
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

  const total = installments.reduce((sum, item) => sum + item.rawAmount, 0);

  return (
    <PageShell
      userName={appUser.name}
      plan={appUser.plan}
      cycle={ciclo?.cycle || "Ciclo atual"}
      title="Cartões"
      description="Acompanhe parcelas ativas e simule novas compras."
    >
      <RealtimeListener groupId={member.group_id} />
      <CardsPageContent installments={installments} total={formatBRL(total)} />
    </PageShell>
  );
}