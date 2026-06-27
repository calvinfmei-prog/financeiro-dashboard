import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "../components/page-shell";
import SettingsPageContent from "../components/settings-page-content";
import RealtimeListener from "../components/realtime-listener";


export default async function ConfiguracoesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) redirect("/login");

  const { data: appUser } = await supabase
    .from("app_users")
    .select("id, name, email, telegram_id, plan, access_status")
    .eq("email", user.email)
    .single();

  if (!appUser) redirect("/login");

  const { data: member } = await supabase
    .from("group_members")
    .select("group_id")
    .eq("user_id", appUser.id)
    .eq("active", true)
    .single();

  let familyName = "Sem família";

  if (member) {
    const { data: group } = await supabase
      .from("financial_groups")
      .select("name")
      .eq("id", member.group_id)
      .single();

    familyName = group?.name || "Sem família";
  }

  return (
    <PageShell
      userName={appUser.name}
      plan={appUser.plan}
      title="Configurações"
      description="Dados da conta, plano, segurança e integração com Telegram."
    >
      {member && <RealtimeListener groupId={member.group_id} />}
      <SettingsPageContent
        settings={{
          name: appUser.name || "-",
          email: appUser.email || user.email,
          telegramId: String(appUser.telegram_id || "-"),
          plan: appUser.plan || "Free",
          status: appUser.access_status || "active",
          familyName,
        }}
      />
    </PageShell>
  );
}