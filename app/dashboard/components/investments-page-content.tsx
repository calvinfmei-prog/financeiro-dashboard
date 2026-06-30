"use client";

import {
  PiggyBank,
  TrendingUp,
  Landmark,
  Sparkles,
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingDown,
} from "lucide-react";

type InvestmentItem = {
  id: string;
  type: string;
  asset: string;
  description: string;
  amount: string;
  createdAt: string;
};

type AssetItem = {
  asset: string;
  amount: string;
};

type InvestmentsPageContentProps = {
  saldoCarteira: string;
  totalAportes: string;
  rendimentos: string;
  lucros: string;
  retiradasVendas: string;
  prejuizos: string;
  porAtivo: AssetItem[];
  investimentos: InvestmentItem[];
};

export default function InvestmentsPageContent({
  saldoCarteira,
  totalAportes,
  rendimentos,
  lucros,
  retiradasVendas,
  prejuizos,
  porAtivo,
  investimentos,
}: InvestmentsPageContentProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white xl:col-span-3">
        <p className="text-sm text-slate-500 dark:text-slate-300">
          Saldo da carteira
        </p>

        <h2 className="mt-3 text-5xl font-bold">{saldoCarteira}</h2>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
          Total considerando aportes, rendimentos, lucros, retiradas, vendas e
          prejuízos.
        </p>
      </div>

      <InfoCard icon={<PiggyBank />} title="Aportes" description={totalAportes} />
      <InfoCard icon={<TrendingUp />} title="Rendimentos" description={rendimentos} />
      <InfoCard icon={<ArrowUpCircle />} title="Lucros" description={lucros} />
      <InfoCard icon={<ArrowDownCircle />} title="Retiradas/Vendas" description={retiradasVendas} />
      <InfoCard icon={<TrendingDown />} title="Prejuízos" description={prejuizos} />
      <InfoCard icon={<Landmark />} title="Movimentações" description={`${investimentos.length} registros`} />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white xl:col-span-3">
        <div className="flex items-center gap-2">
          <Landmark size={20} />
          <h2 className="text-lg font-bold">Por ativo</h2>
        </div>

        <div className="mt-6 space-y-4">
          {porAtivo.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Nenhum ativo registrado ainda.
            </p>
          ) : (
            porAtivo.map((item) => (
              <div
                key={item.asset}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800 md:flex-row md:items-center"
              >
                <p className="font-bold">{item.asset}</p>
                <p className="font-bold text-emerald-500">{item.amount}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white xl:col-span-3">
        <div className="flex items-center gap-2">
          <Sparkles size={20} />
          <h2 className="text-lg font-bold">Últimos investimentos</h2>
        </div>

        <div className="mt-6 space-y-4">
          {investimentos.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Nenhum investimento registrado ainda.
            </p>
          ) : (
            investimentos.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800 md:flex-row md:items-center"
              >
                <div>
                  <p className="font-bold">{item.asset || item.description}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.type} • {item.createdAt}
                  </p>
                </div>

                <p className="font-bold text-emerald-500">{item.amount}</p>
              </div>
            ))
          )}
        </div>
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