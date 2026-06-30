"use client";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  PiggyBank,
  CreditCard,
} from "lucide-react";

import { useTheme } from "../hooks/useTheme";
import { DashboardShellProps } from "../types/dashboard";

import Sidebar from "./sidebar";
import Header from "./header";
import HeroCard from "./hero-card";
import MetricCard from "./metric-card";
import CategoriesCard from "./categories-card";
import InsightsCard from "./insights-card";
import TransactionsCard from "./transactions-card";
import DueItemsCard from "./due-items-card";

export function DashboardShell({ userName, plan, data }: DashboardShellProps) {
  
  console.log("DASHBOARD SHELL DATA:", data);
  console.log("INVESTMENTS NO SHELL:", data.investments);
  const { darkMode, setDarkMode, theme } = useTheme();

  return (
    <main className={`min-h-screen transition-colors ${theme?.pageBg ?? "bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white"}`}>
      <div className="flex">
        <Sidebar darkMode={darkMode} plan={plan} />

        <section className="flex-1 p-5 md:p-8">
          <Header
            userName={userName}
            cycle={data.cycle}
            darkMode={darkMode}
            onToggleTheme={() => setDarkMode(!darkMode)}
          />

          <section className="mt-8 grid gap-5 lg:grid-cols-4">
            <HeroCard value={data.canSpendToday} darkMode={darkMode} />

            <MetricCard
              title="Saldo atual"
              value={data.currentBalance}
              icon={<Wallet size={20} />}
              darkMode={darkMode}
            />

            <MetricCard
              title="Patrimônio"
              value={data.patrimony}
              icon={<TrendingUp size={20} />}
              darkMode={darkMode}
            />

            <MetricCard
              title="Investimentos"
              value={data.investments}
              icon={<PiggyBank size={20} />}
              darkMode={darkMode}
            />

            <MetricCard
              title="Receitas"
              value={data.revenues}
              icon={<TrendingUp size={20} />}
              darkMode={darkMode}
            />

            <MetricCard
              title="Despesas"
              value={data.expenses}
              icon={<TrendingDown size={20} />}
              darkMode={darkMode}
            />

            <MetricCard
              title="Gastos fixos"
              value={data.fixedExpenses}
              icon={<CalendarDays size={20} />}
              darkMode={darkMode}
            />

            <MetricCard
              title="Cartão"
              value={data.card}
              icon={<CreditCard size={20} />}
              darkMode={darkMode}
            />
          </section>

          <section className="mt-8 grid gap-5 xl:grid-cols-3">
            <CategoriesCard
              categories={data.categories}
              darkMode={darkMode}
            />

            <InsightsCard
              insights={data.insights}
              darkMode={darkMode}
            />
          </section>

          <section className="mt-8 grid gap-5 lg:grid-cols-2">
            <TransactionsCard
              transactions={data.transactions}
              darkMode={darkMode}
            />

            <DueItemsCard
              dueItems={data.dueItems}
              darkMode={darkMode}
            />
          </section>
        </section>
      </div>
    </main>
  );
}