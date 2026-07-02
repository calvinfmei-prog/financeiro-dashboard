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

export default async function AdminGruposPage() {
  await requireAdmin();

  const admin = createAdminClient();

  const { data: groups, error } = await admin
    .from("financial_groups")
    .select(`
      id,
      name,
      invite_code,
      active,
      created_at,
      group_members (
        id,
        active,
        role,
        app_users (
          id,
          name,
          email
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-3xl font-bold">Grupos</h1>
        <p className="mt-4 text-red-400">Erro ao carregar grupos.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <Link href="/admin" className="text-sm text-emerald-400">
        ← Voltar ao Admin
      </Link>

      <h1 className="mt-3 text-3xl font-bold">Grupos/Famílias</h1>

      <p className="mt-2 text-slate-400">
        Total: {groups?.length ?? 0} grupo{groups?.length === 1 ? "" : "s"}
      </p>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-5 py-4">Nome</th>
              <th className="px-5 py-4">Código</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Membros ativos</th>
              <th className="px-5 py-4">Criado em</th>
              <th className="px-5 py-4">Membros</th>
            </tr>
          </thead>

          <tbody>
            {(groups ?? []).map((group) => {
              const members = group.group_members ?? [];
              const activeMembers = members.filter((m) => m.active);

              return (
                <tr
                  key={group.id}
                  className="border-t border-slate-800 text-slate-200"
                >
                  <td className="px-5 py-4 font-medium">
                    {group.name || "Sem nome"}
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {group.invite_code || "-"}
                  </td>

                  <td className="px-5 py-4">
                    {group.active ? (
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                        Ativo
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-300">
                        Bloqueado
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {activeMembers.length}
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {formatDate(group.created_at)}
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {activeMembers.length > 0 ? (
                      <div className="space-y-1">
                        {activeMembers.slice(0, 3).map((member) => {
                        const user = Array.isArray(member.app_users)
                            ? member.app_users[0]
                            : member.app_users;

                        return (
                            <div key={member.id}>
                            {user?.name || user?.email || "Usuário sem nome"}

                            <span className="ml-2 text-xs text-slate-500">
                                ({member.role || "member"})
                            </span>
                            </div>
                        );
                        })}

                        {activeMembers.length > 3 && (
                          <div className="text-xs text-slate-500">
                            +{activeMembers.length - 3} membro(s)
                          </div>
                        )}
                      </div>
                    ) : (
                      "-"
                    )}
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