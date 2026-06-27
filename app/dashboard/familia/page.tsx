import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PageShell from "../components/page-shell";
import FamilyPageContent from "../components/family-page-content";

export default async function FamiliaPage() {
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
        title="Família"
        description="Convites, membros e permissões."
      >
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
          Nenhuma família encontrada.
        </div>
      </PageShell>
    );
  }

  const { data: group } = await supabase
    .from("financial_groups")
    .select("id, name, active, invite_code, invite_password")
    .eq("id", member.group_id)
    .single();

  const { data: membersData } = await supabase
    .from("group_members")
    .select(`
      id,
      role,
      active,
      app_users (
        id,
        name
      )
    `)
    .eq("group_id", member.group_id);

  const family = {
    name: group?.name || "Família",
    inviteCode: group?.invite_code || "-",
    invitePassword: group?.invite_password || "-",
    active: group?.active ?? false,
    members: (membersData ?? []).map((item: any) => ({
      id: item.app_users?.id || item.id,
      name: item.app_users?.name || "Usuário",
      role: item.role || "member",
      active: item.active ?? true,
    })),
  };

  return (
    <PageShell
      userName={appUser.name}
      plan={appUser.plan}
      title="Família"
      description="Gerencie convites e visualize os membros da família."
    >
      <FamilyPageContent family={family} />
    </PageShell>
  );
}