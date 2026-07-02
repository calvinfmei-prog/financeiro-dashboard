import Link from "next/link";
import { requireAdmin } from "@/lib/auth/subscription";
import { createAdminClient } from "@/lib/supabase/admin";

function formatDate(date?: string | null) {
  if (!date) return "-";

  return new Date(date).toLocaleString("pt-BR");
}

const colors = {
  INFO: "bg-blue-500/10 text-blue-300",
  WARNING: "bg-yellow-500/10 text-yellow-300",
  ERROR: "bg-red-500/10 text-red-300",
  PAYMENT: "bg-emerald-500/10 text-emerald-300",
  SECURITY: "bg-purple-500/10 text-purple-300",
};

export default async function LogsPage() {
  await requireAdmin();

  const admin = createAdminClient();

  const { data: logs } = await admin
    .from("system_logs")
    .select(`
      *,
      app_users (
        name,
        email
      ),
      financial_groups (
        name
      )
    `)
    .order("created_at", {
      ascending: false,
    })
    .limit(300);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">

      <Link
        href="/admin"
        className="text-emerald-400"
      >
        ← Voltar
      </Link>

      <h1 className="mt-4 text-3xl font-bold">
        Logs do Sistema
      </h1>

      <p className="mt-2 text-slate-400">
        Eventos registrados pela Patria.
      </p>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-800">

        <table className="w-full text-sm">

          <thead className="bg-slate-900">

            <tr>

              <th className="p-4 text-left">Data</th>

              <th className="p-4 text-left">Nível</th>

              <th className="p-4 text-left">Origem</th>

              <th className="p-4 text-left">Usuário</th>

              <th className="p-4 text-left">Grupo</th>

              <th className="p-4 text-left">Ação</th>

              <th className="p-4 text-left">Mensagem</th>

            </tr>

          </thead>

          <tbody>

            {(logs ?? []).map((log) => {

              const user = Array.isArray(log.app_users)
                ? log.app_users[0]
                : log.app_users;

              const group = Array.isArray(log.financial_groups)
                ? log.financial_groups[0]
                : log.financial_groups;

              return (

                <tr
                  key={log.id}
                  className="border-t border-slate-800 hover:bg-slate-900"
                >

                  <td className="p-4 whitespace-nowrap">
                    {formatDate(log.created_at)}
                  </td>

                  <td className="p-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        colors[
                          log.level as keyof typeof colors
                        ] ?? "bg-slate-700 text-white"
                      }`}
                    >
                      {log.level}
                    </span>

                  </td>

                  <td className="p-4">
                    {log.source}
                  </td>

                  <td className="p-4">
                    {user?.name ?? user?.email ?? "-"}
                  </td>

                  <td className="p-4">
                    {group?.name ?? "-"}
                  </td>

                  <td className="p-4">
                    {log.action ?? "-"}
                  </td>

                  <td className="p-4 max-w-md">
                    {log.message}
                  </td>

                </tr>

              );
            })}

          </tbody>

        </table>

      </div>

    </main>
  );
}