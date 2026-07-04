"use client";

import {
  BarChart3,
  HeartPulse,
  TrendingUp,
  FileText,
  Download,
  Sparkles,
} from "lucide-react";

type ReportData = {
  cycle: string;
  revenues: string;
  expenses: string;
  currentBalance: string;
  availableBalance: string;
  patrimony: string;
  fixedExpenses: string;
  card: string;
  healthScore: number;
  healthLabel: string;
  projectedEndBalance: string;
  biggestCategory: string;
  biggestCategoryAmount: string;
  biggestTransaction: string;
  biggestTransactionAmount: string;
  insights: string[];
};

interface Props {
  report: ReportData;
}

export default function ReportsPageContent({ report }: Props) {
  function exportCSV() {
    window.location.href = "/api/reports/export?format=csv";
  }

  function exportPDF() {
    window.location.href = "/api/reports/export?format=pdf";
  }
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white">
        <p className="text-sm text-slate-500 dark:text-slate-300">
          Relatório do ciclo
        </p>
        <h2 className="mt-3 text-4xl font-bold">{report.cycle}</h2>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
          Visão executiva da sua saúde financeira.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <ReportCard title="Receitas" value={report.revenues} icon={<TrendingUp />} />
        <ReportCard title="Despesas" value={report.expenses} icon={<BarChart3 />} />
        <ReportCard title="Saldo atual" value={report.currentBalance} icon={<FileText />} />
        <ReportCard title="Patrimônio" value={report.patrimony} icon={<TrendingUp />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
          <div className="flex items-center gap-2">
            <HeartPulse size={20} />
            <h3 className="text-lg font-bold">Saúde financeira</h3>
          </div>

          <div className="mt-6 flex items-end gap-2">
            <p className="text-6xl font-bold">{report.healthScore}</p>
            <p className="mb-2 text-slate-500 dark:text-slate-400">/100</p>
          </div>

          <p className="mt-3 font-semibold">{report.healthLabel}</p>

          <div className="mt-5 h-3 rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-3 rounded-full bg-slate-950 dark:bg-white"
              style={{ width: `${report.healthScore}%` }}
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
          <h3 className="text-lg font-bold">Projeção</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Se continuar nesse ritmo, você terminará o ciclo com:
          </p>

          <p className="mt-6 text-4xl font-bold">{report.projectedEndBalance}</p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
          <h3 className="text-lg font-bold">Exportações</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Em breve você poderá baixar relatórios completos.
          </p>

          <div className="mt-6 space-y-3">
            <button
              onClick={exportPDF}
              className="flex w-full items-center justify-between rounded-2xl bg-slate-50 p-4 font-medium text-slate-900 dark:bg-slate-800 dark:text-white"
            >
              Exportar PDF <Download size={18} />
            </button>

            <button
              onClick={exportCSV}
              className="flex w-full items-center justify-between rounded-2xl bg-slate-50 p-4 font-medium text-slate-900 dark:bg-slate-800 dark:text-white"
            >
              Exportar CSV <Download size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
          <h3 className="text-lg font-bold">Destaques</h3>

          <div className="mt-5 space-y-4">
            <Highlight label="Maior categoria" title={report.biggestCategory} value={report.biggestCategoryAmount} />
            <Highlight label="Maior lançamento" title={report.biggestTransaction} value={report.biggestTransactionAmount} />
            <Highlight label="Gastos fixos" title="Total fixo mensal" value={report.fixedExpenses} />
            <Highlight label="Cartão" title="Parcelas ativas" value={report.card} />
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
          <div className="flex items-center gap-2">
            <Sparkles size={20} />
            <h3 className="text-lg font-bold">Insights inteligentes</h3>
          </div>

          <div className="mt-5 space-y-3">
            {report.insights.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white">
        {icon}
      </div>
      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function Highlight({
  label,
  title,
  value,
}: {
  label: string;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
      </div>
      <p className="font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}