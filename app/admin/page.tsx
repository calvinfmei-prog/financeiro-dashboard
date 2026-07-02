import Link from "next/link";
import { requireAdmin } from "@/lib/auth/subscription";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminPage() {
  await requireAdmin();

  const supabase = await createClient();

  const { count: usersCount } = await supabase
    .from("app_users")
    .select("*", { count: "exact", head: true });

  const { count: groupsCount } = await supabase
    .from("financial_groups")
    .select("*", { count: "exact", head: true });

  const { count: logsCount } = await supabase
    .from("system_logs")
    .select("*", { count: "exact", head: true });

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="text-3xl font-bold">Painel Admin</h1>
      <p className="mt-2 text-slate-400">
        Visão geral da Patria.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card title="Usuários" value={usersCount ?? 0} href="/admin/usuarios" />
        <Card title="Grupos" value={groupsCount ?? 0} href="/admin/grupos" />
        <Card title="Logs" value={logsCount ?? 0} href="/admin/logs" />
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <AdminLink href="/admin/usuarios">Usuários</AdminLink>
        <AdminLink href="/admin/grupos">Grupos</AdminLink>
        <AdminLink href="/admin/logs">Logs</AdminLink>
        <AdminLink href="/admin/pagamentos">Pagamentos</AdminLink>
      </div>
    </main>
  );
}

function Card({
  title,
  value,
  href,
}: {
  title: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-500"
    >
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-3 text-4xl font-bold">{value}</p>
    </Link>
  );
}

function AdminLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white hover:bg-emerald-400"
    >
      {children}
    </Link>
  );
}