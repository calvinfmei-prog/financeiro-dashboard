import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "../components/page-shell";
import CategoriesPageContent from "../components/categories-page-content";
import RealtimeListener from "../components/realtime-listener";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

export default async function CategoriasPage() {
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
        title="Categorias"
        description="Entenda para onde seu dinheiro está indo."
      >
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
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
    .select("type, amount, category")
    .eq("group_id", member.group_id);

  const gastosPorCategoria = (transactionsData ?? [])
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
      Amount: amount,
      value:
        totalCategorias > 0
          ? Math.round((amount / totalCategorias) * 100)
          : 0,
      amount: formatBRL(amount),
      icon: "📌",
    }))
    .sort((a, b) => b.Amount - a.Amount);

  return (
    <PageShell
      userName={appUser.name}
      plan={appUser.plan}
      cycle={ciclo?.cycle || "Ciclo atual"}
      title="Categorias"
      description="Veja seus gastos agrupados por categoria no ciclo atual."
    >
      <RealtimeListener groupId={member.group_id} />
      <CategoriesPageContent
        categories={categories}
        total={formatBRL(totalCategorias)}
      />
    </PageShell>
  );
}