import Link from "next/link";
import { requireAdmin } from "@/lib/auth/subscription";
import { createAdminClient } from "@/lib/supabase/admin";
import ClearLogsButton from "./clear-logs-button";

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

type LogDetails = {
  arquivo?: string;
  funcao?: string;
  linha?: number;
  data?: string;
  tipo_erro?: string | null;
  erro?: string | null;
  traceback?: string;
  [key: string]: unknown;
};

function getDetails(value: unknown): LogDetails {
  if (!value || typeof value !== "object") return {};
  return value as LogDetails;
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value?: unknown;
}) {
  if (value === null || value === undefined || value === "") return null;

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm text-slate-200">{String(value)}</p>
    </div>
  );
}

export default async function LogsPage() {
  await requireAdmin();

  const admin = createAdminClient();

  const { data: logs, error, count } = await admin
    .from("system_logs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(300);

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <Link href="/admin" className="text-emerald-400">
          ← Voltar
        </Link>

        <h1 className="mt-4 text-3xl font-bold">Logs do Sistema</h1>

        <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
          Erro ao carregar logs.
        </p>
      </main>
    );
  }

  const total = count ?? 0;
  const totalExibido = logs?.length ?? 0;
  const errors = logs?.filter((log) => log.level === "ERROR").length ?? 0;
  const warnings = logs?.filter((log) => log.level === "WARNING").length ?? 0;
  const infos = logs?.filter((log) => log.level === "INFO").length ?? 0;

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <Link href="/admin" className="text-emerald-400">
        ← Voltar
      </Link>

      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Logs do Sistema</h1>
          <p className="mt-2 text-slate-400">
            Eventos, erros e auditoria da Patria.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <Link
            href="/admin/logs"
            className="rounded-xl border border-slate-700 px-4 py-2 text-center text-sm font-semibold text-slate-200 transition hover:bg-slate-900"
          >
            Atualizar
          </Link>

          <ClearLogsButton disabled={total === 0} />
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <StatCard title="📝 Total" value={total} />
        <StatCard title="❌ Erros" value={errors} tone="red" />
        <StatCard title="⚠️ Alertas" value={warnings} tone="yellow" />
        <StatCard title="ℹ️ Infos" value={infos} tone="blue" />
      </div>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900">
        <table className="w-full min-w-[1200px] text-left text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="p-4">Data</th>
              <th className="p-4">Nível</th>
              <th className="p-4">Origem</th>
              <th className="p-4">Ação</th>
              <th className="p-4">Mensagem</th>
              <th className="p-4">Detalhes</th>
            </tr>
          </thead>

          <tbody>
            {total === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-12 text-center text-slate-400"
                >
                  <div className="text-4xl">🧹</div>

                  <p className="mt-3 font-semibold text-slate-300">
                    Nenhum log registrado
                  </p>

                  <p className="mt-1 text-sm">
                    Os novos eventos do sistema aparecerão aqui.
                  </p>
                </td>
              </tr>
            )}
            {(logs ?? []).map((log) => {
              const details = getDetails(log.details);

              return (
                <tr
                  key={log.id}
                  className="border-t border-slate-800 align-top hover:bg-slate-800/60"
                >
                  <td className="whitespace-nowrap p-4 text-slate-300">
                    {formatDate(log.created_at)}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        colors[log.level as keyof typeof colors] ??
                        "bg-slate-700 text-white"
                      }`}
                    >
                      {log.level}
                    </span>
                  </td>

                  <td className="p-4 text-slate-300">{log.source}</td>

                  <td className="p-4">
                    <span className="rounded-lg bg-slate-800 px-2 py-1 font-mono text-xs text-emerald-300">
                      {log.action ?? "-"}
                    </span>
                  </td>

                  <td className="max-w-md p-4">
                    <p className="font-medium text-slate-100">{log.message}</p>

                    {details.tipo_erro && (
                      <p className="mt-1 text-xs text-red-300">
                        {details.tipo_erro}: {details.erro}
                      </p>
                    )}

                    {details.arquivo && (
                      <p className="mt-1 text-xs text-slate-500">
                        {details.arquivo}
                        {details.linha ? `:${details.linha}` : ""}
                      </p>
                    )}
                  </td>

                  <td className="max-w-xl p-4">
                    {Object.keys(details).length > 0 ? (
                      <details className="rounded-xl border border-slate-700 bg-slate-950 p-3">
                        <summary className="cursor-pointer text-xs font-bold text-emerald-400">
                          Ver detalhes
                        </summary>

                        <div className="mt-4 grid gap-4">
                          <DetailRow label="Arquivo" value={details.arquivo} />
                          <DetailRow label="Função" value={details.funcao} />
                          <DetailRow label="Linha" value={details.linha} />
                          <DetailRow label="Tipo do erro" value={details.tipo_erro} />
                          <DetailRow label="Erro" value={details.erro} />
                          <DetailRow label="Data interna" value={details.data} />

                          {details.traceback && (
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                Traceback
                              </p>
                              <pre className="mt-2 max-h-80 overflow-auto whitespace-pre-wrap rounded-xl bg-black/40 p-3 text-xs text-slate-300">
                                {details.traceback}
                              </pre>
                            </div>
                          )}

                          <details className="rounded-xl border border-slate-800 p-3">
                            <summary className="cursor-pointer text-xs font-bold text-slate-400">
                              JSON completo
                            </summary>
                            <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap text-xs text-slate-400">
                              {JSON.stringify(details, null, 2)}
                            </pre>
                          </details>
                        </div>
                      </details>
                    ) : (
                      <span className="text-slate-500">-</span>
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

function StatCard({
  title,
  value,
  tone = "slate",
}: {
  title: string;
  value: number;
  tone?: "slate" | "red" | "yellow" | "blue";
}) {
  const tones = {
    slate: "border-slate-800 bg-slate-900 text-white",
    red: "border-red-500/20 bg-red-500/10 text-red-300",
    yellow: "border-yellow-500/20 bg-yellow-500/10 text-yellow-300",
    blue: "border-blue-500/20 bg-blue-500/10 text-blue-300",
  };

  return (
    <div className={`rounded-3xl border p-5 ${tones[tone]}`}>
      <p className="text-sm opacity-70">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}