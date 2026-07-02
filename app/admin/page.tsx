import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CreditCard,
  FileText,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";
import { requireAdmin } from "@/lib/auth/subscription";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminPage() {
  await requireAdmin();

  const supabase = createAdminClient();

  const [
    usersResult,
    groupsResult,
    logsResult,
    errorsResult,
    warningsResult,
    paymentsResult,
    trialsResult,
    activePlansResult,
  ] = await Promise.all([
    supabase.from("app_users").select("*", { count: "exact", head: true }),
    supabase.from("financial_groups").select("*", { count: "exact", head: true }),
    supabase.from("system_logs").select("*", { count: "exact", head: true }),
    supabase
      .from("system_logs")
      .select("*", { count: "exact", head: true })
      .eq("level", "ERROR"),
    supabase
      .from("system_logs")
      .select("*", { count: "exact", head: true })
      .eq("level", "WARNING"),
    supabase.from("asaas_payments").select("*", { count: "exact", head: true }),
    supabase
      .from("app_users")
      .select("*", { count: "exact", head: true })
      .eq("plan", "trial"),
    supabase
      .from("app_users")
      .select("*", { count: "exact", head: true })
      .in("plan", ["individual", "patrimonio", "founder"]),
  ]);

  const usersCount = usersResult.count ?? 0;
  const groupsCount = groupsResult.count ?? 0;
  const logsCount = logsResult.count ?? 0;
  const errorsCount = errorsResult.count ?? 0;
  const warningsCount = warningsResult.count ?? 0;
  const paymentsCount = paymentsResult.count ?? 0;
  const trialsCount = trialsResult.count ?? 0;
  const activePlansCount = activePlansResult.count ?? 0;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white md:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
              <ShieldCheck size={16} />
              Administração
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Painel Admin
            </h1>

            <p className="mt-2 max-w-2xl text-slate-400">
              Visão geral da Patria Financeiro: usuários, famílias, assinaturas,
              pagamentos e monitoramento do sistema.
            </p>
          </div>

          <Link
            href="/admin/logs"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-emerald-500 hover:text-emerald-300"
          >
            Ver logs do sistema
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Usuários"
            value={usersCount}
            description="Usuários cadastrados"
            href="/admin/usuarios"
            icon={<Users size={22} />}
          />

          <MetricCard
            title="Grupos"
            value={groupsCount}
            description="Famílias financeiras"
            href="/admin/grupos"
            icon={<WalletCards size={22} />}
          />

          <MetricCard
            title="Pagamentos"
            value={paymentsCount}
            description="Registros do Asaas"
            href="/admin/pagamentos"
            icon={<CreditCard size={22} />}
          />

          <MetricCard
            title="Logs"
            value={logsCount}
            description="Eventos registrados"
            href="/admin/logs"
            icon={<FileText size={22} />}
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <StatusCard
            title="Trials"
            value={trialsCount}
            description="Usuários em período de teste"
            tone="blue"
          />

          <StatusCard
            title="Assinaturas"
            value={activePlansCount}
            description="Planos pagos ou founder"
            tone="emerald"
          />

          <StatusCard
            title="Erros"
            value={errorsCount}
            description={`${warningsCount} alertas registrados`}
            tone="red"
          />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-bold">Acessos rápidos</h2>
            <p className="mt-1 text-sm text-slate-400">
              Principais áreas de gestão da plataforma.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <AdminShortcut
                href="/admin/usuarios"
                title="Usuários"
                description="Gerenciar acessos, planos e status."
              />

              <AdminShortcut
                href="/admin/grupos"
                title="Grupos"
                description="Ver famílias, códigos e vínculos."
              />

              <AdminShortcut
                href="/admin/logs"
                title="Logs"
                description="Investigar erros e eventos do sistema."
              />

              <AdminShortcut
                href="/admin/pagamentos"
                title="Pagamentos"
                description="Consultar cobranças e assinaturas."
              />
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-bold">Saúde do sistema</h2>
            <p className="mt-1 text-sm text-slate-400">
              Resumo rápido dos eventos monitorados.
            </p>

            <div className="mt-5 space-y-3">
              <HealthRow label="Total de logs" value={logsCount} />
              <HealthRow label="Erros críticos" value={errorsCount} danger />
              <HealthRow label="Alertas" value={warningsCount} warning />
              <HealthRow label="Usuários em trial" value={trialsCount} />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function MetricCard({
  title,
  value,
  description,
  href,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-6 transition hover:-translate-y-1 hover:border-emerald-500/70 hover:bg-slate-900"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-300">
          {icon}
        </div>

        <ArrowRight
          size={18}
          className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-emerald-300"
        />
      </div>

      <p className="mt-6 text-sm font-medium text-slate-400">{title}</p>
      <p className="mt-2 text-4xl font-bold">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </Link>
  );
}

function StatusCard({
  title,
  value,
  description,
  tone,
}: {
  title: string;
  value: number;
  description: string;
  tone: "blue" | "emerald" | "red";
}) {
  const styles = {
    blue: "border-blue-500/20 bg-blue-500/10 text-blue-300",
    emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    red: "border-red-500/20 bg-red-500/10 text-red-300",
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
      <div
        className={`mb-4 inline-flex rounded-2xl border px-3 py-1 text-sm font-semibold ${styles[tone]}`}
      >
        {title}
      </div>

      <p className="text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{description}</p>
    </div>
  );
}

function AdminShortcut({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-emerald-500/60 hover:bg-slate-950"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-bold">{title}</h3>
        <ArrowRight size={16} className="text-slate-500" />
      </div>

      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {description}
      </p>
    </Link>
  );
}

function HealthRow({
  label,
  value,
  danger,
  warning,
}: {
  label: string;
  value: number;
  danger?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
      <div className="flex items-center gap-2">
        {(danger || warning) && (
          <AlertTriangle
            size={16}
            className={danger ? "text-red-400" : "text-yellow-400"}
          />
        )}

        <span className="text-sm text-slate-300">{label}</span>
      </div>

      <span
        className={
          danger
            ? "font-bold text-red-300"
            : warning
              ? "font-bold text-yellow-300"
              : "font-bold text-white"
        }
      >
        {value}
      </span>
    </div>
  );
}