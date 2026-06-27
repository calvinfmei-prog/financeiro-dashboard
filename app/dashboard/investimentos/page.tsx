import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "../components/page-shell";
import InvestmentsPageContent from "../components/investments-page-content";

export default async function InvestimentosPage() {
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

  return (
    <PageShell
      userName={appUser.name}
      plan={appUser.plan}
      title="Investimentos"
      description="Acompanhe seus ativos, patrimônio investido e evolução financeira."
    >
      <InvestmentsPageContent />
    </PageShell>
  );
}