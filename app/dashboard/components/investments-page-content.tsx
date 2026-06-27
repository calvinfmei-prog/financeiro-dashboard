"use client";

import { PiggyBank, TrendingUp, Landmark, Sparkles } from "lucide-react";

export default function InvestmentsPageContent() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white xl:col-span-3">
        <p className="text-sm text-slate-500 dark:text-slate-300">
          Patrimônio investido
        </p>

        <h2 className="mt-3 text-5xl font-bold">R$ 0,00</h2>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
          Em breve você poderá cadastrar e acompanhar seus investimentos aqui.
        </p>
      </div>

      <InfoCard
        icon={<PiggyBank />}
        title="Reserva"
        description="Controle sua reserva de emergência."
      />

      <InfoCard
        icon={<TrendingUp />}
        title="Renda variável"
        description="Acompanhe ações, fundos e outros ativos."
      />

      <InfoCard
        icon={<Landmark />}
        title="Renda fixa"
        description="Organize CDBs, Tesouro Direto e aplicações."
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white xl:col-span-3">
        <div className="flex items-center gap-2">
          <Sparkles size={20} />
          <h2 className="text-lg font-bold">Próximo módulo</h2>
        </div>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Esta página será integrada futuramente ao Supabase para registrar ativos,
          valores aplicados, rendimentos, metas e evolução do patrimônio.
        </p>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white">
        {icon}
      </div>

      <h2 className="mt-5 text-lg font-bold">{title}</h2>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}