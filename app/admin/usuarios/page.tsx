import Link from "next/link";
import { requireAdmin } from "@/lib/auth/subscription";
import { createAdminClient } from "@/lib/supabase/admin";

function formatDate(date?: string | null) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatPlan(plan?: string | null) {
  const plans: Record<string, string> = {
    trial: "Trial",
    individual: "Individual",
    patrimonio: "Patrimônio",
    founder: "Founder",
    admin: "Admin",
  };

  return plans[plan || ""] || plan || "-";
}

function formatStatus(status?: string | null) {
  const statuses: Record<string, string> = {
    active: "Ativo",
    pending_payment: "Pagamento pendente",
    expired: "Expirado",
    cancelled: "Cancelado",
    blocked: "Bloqueado",
  };

  return statuses[status || ""] || status || "-";
}

export default async function AdminUsuariosPage() {
  await requireAdmin();

  const admin = createAdminClient();

  const { data: users, error } = await admin
    .from("app_users")
    .select(`
      id,
      name,
      email,
      telegram_id,
      plan,
      plan_cycle,
      access_status,
      trial_ends_at,
      plan_expires_at,
      next_payment_at,
      created_at,
      active
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-3xl font-bold">Usuários</h1>
        <p className="mt-4 text-red-400">Erro ao carregar usuários.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/admin" className="text-sm text-emerald-400">
            ← Voltar ao Admin
          </Link>

          <h1 className="mt-3 text-3xl font-bold">Usuários</h1>

          <p className="mt-2 text-slate-400">
            Total: {users?.length ?? 0} usuário{users?.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-5 py-4">Nome</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Plano</th>
              <th className="px-5 py-4">Ciclo</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Trial até</th>
              <th className="px-5 py-4">Expira em</th>
              <th className="px-5 py-4">Telegram</th>
              <th className="px-5 py-4">Ativo</th>
            </tr>
          </thead>

          <tbody>
            {(users ?? []).map((user) => (
              <tr
                key={user.id}
                className="border-t border-slate-800 text-slate-200"
              >
                <td className="px-5 py-4 font-medium">
                  {user.name || "Sem nome"}
                </td>

                <td className="px-5 py-4 text-slate-400">
                  {user.email || "-"}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                    {formatPlan(user.plan)}
                  </span>
                </td>

                <td className="px-5 py-4 text-slate-400">
                  {user.plan_cycle === "monthly"
                    ? "Mensal"
                    : user.plan_cycle === "yearly"
                    ? "Anual"
                    : "-"}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-bold text-slate-200">
                    {formatStatus(user.access_status)}
                  </span>
                </td>

                <td className="px-5 py-4 text-slate-400">
                  {formatDate(user.trial_ends_at)}
                </td>

                <td className="px-5 py-4 text-slate-400">
                  {formatDate(user.plan_expires_at || user.next_payment_at)}
                </td>

                <td className="px-5 py-4 text-slate-400">
                  {user.telegram_id ? "Vinculado" : "Não vinculado"}
                </td>

                <td className="px-5 py-4">
                  {user.active ? (
                    <span className="text-emerald-400">Sim</span>
                  ) : (
                    <span className="text-red-400">Não</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}