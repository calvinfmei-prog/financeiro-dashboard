import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import PageShell from "../components/page-shell";
import FamilyPageContent from "../components/family-page-content";
import RealtimeListener from "../components/realtime-listener";

export default async function FamiliaPage() {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

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

  const { data: group } = await adminSupabase
    .from("financial_groups")
    .select("id, name, active, invite_code, invite_password")
    .eq("id", member.group_id)
    .single();

  const { data: membersData } = await adminSupabase
    .from("group_members")
    .select("id, user_id, role, active")
    .eq("group_id", member.group_id)
    .eq("active", true);

  const userIds = (membersData ?? [])
    .map((item) => item.user_id)
    .filter(Boolean);

  const { data: usersData } = userIds.length
    ? await adminSupabase
        .from("app_users")
        .select("id, name")
        .in("id", userIds)
    : { data: [] };

  const usersMap = new Map(
    (usersData ?? []).map((user) => [user.id, user.name])
  );

  const family = {
    name: group?.name || "Família",
    inviteCode: group?.invite_code || "-",
    invitePassword: group?.invite_password || "-",
    active: group?.active ?? false,
    members: (membersData ?? []).map((item) => ({
      id: item.user_id || item.id,
      name: usersMap.get(item.user_id) || "Usuário",
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
      <RealtimeListener groupId={member.group_id} />
      <FamilyPageContent family={family} />
    </PageShell>
  );
}