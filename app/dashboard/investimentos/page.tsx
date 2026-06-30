import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "../components/page-shell";
import InvestmentsPageContent from "../components/investments-page-content";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

export default async function InvestimentosPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: appUser } = await supabase
    .from("app_users")
    .select("id, name, email, plan")
    .eq("auth_user_id", user.id)
    .single();

  if (!appUser) redirect("/login");

  const { data: member } = await supabase
    .from("group_members")
    .select("group_id")
    .eq("user_id", appUser.id)
    .eq("active", true)
    .single();

  if (!member) redirect("/dashboard");

  const { data: investmentsData } = await supabase
    .from("investment_transactions")
    .select("id, type, asset, description, amount, created_at")
    .eq("group_id", member.group_id)
    .order("created_at", { ascending: false });

  const investments = investmentsData ?? [];

  const aportes = investments
    .filter((item) => item.type === "aporte")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const rendimentos = investments
    .filter((item) => item.type === "rendimento")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const lucros = investments
    .filter((item) => item.type === "lucro")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const vendas = investments
    .filter((item) => item.type === "venda")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const retiradas = investments
    .filter((item) => item.type === "retirada")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const prejuizos = investments
    .filter((item) => item.type === "prejuizo")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const saldoCarteira =
    aportes + rendimentos + lucros - retiradas - prejuizos;

  const porAtivo = investments.reduce<Record<string, number>>((acc, item) => {
    const ativo = item.asset || "Sem ativo";
    const valor = Number(item.amount);

    if (!acc[ativo]) acc[ativo] = 0;

    if (["aporte", "rendimento", "lucro"].includes(item.type)) {
      acc[ativo] += valor;
    }

    if (["venda", "retirada", "prejuizo"].includes(item.type)) {
      acc[ativo] -= valor;
    }

    return acc;
  }, {});

  return (
    <PageShell
      userName={appUser.name}
      plan={appUser.plan}
      title="Investimentos"
      description="Acompanhe seus ativos, patrimônio investido e evolução financeira."
    >
      <InvestmentsPageContent
        saldoCarteira={formatBRL(saldoCarteira)}
        totalAportes={formatBRL(aportes)}
        rendimentos={formatBRL(rendimentos)}
        lucros={formatBRL(lucros)}
        retiradasVendas={formatBRL(retiradas + vendas)}
        prejuizos={formatBRL(prejuizos)}
        porAtivo={Object.entries(porAtivo).map(([asset, amount]) => ({
          asset,
          amount: formatBRL(amount),
        }))}
        investimentos={investments.map((item) => ({
          id: item.id,
          type: item.type,
          asset: item.asset,
          description: item.description,
          amount: formatBRL(Number(item.amount)),
          createdAt: new Date(item.created_at).toLocaleDateString("pt-BR"),
        }))}
      />
    </PageShell>
  );
}