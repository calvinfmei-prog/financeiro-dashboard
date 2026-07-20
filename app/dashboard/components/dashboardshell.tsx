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
import SubscriptionBanner from "./subscription-banner";

export function DashboardShell({
  userName,
  plan,
  subscription,
  data,
}: DashboardShellProps) {
  const { darkMode, setDarkMode, theme } = useTheme();

  return (
    <main
      className={`min-h-screen w-full max-w-full overflow-x-hidden transition-colors ${theme.pageBg}`}
    >
      <div className="flex min-h-screen w-full max-w-full">
        <Sidebar darkMode={darkMode} plan={plan} />

        <section className="min-w-0 w-full max-w-full flex-1 overflow-x-hidden p-4 sm:p-5 md:p-8">
          <div className="mx-auto min-w-0 w-full max-w-[1600px]">
            <Header
              userName={userName}
              cycle={data.cycle}
              darkMode={darkMode}
              plan={plan}
              onToggleTheme={() => setDarkMode(!darkMode)}
            />

            <div className="mt-5 min-w-0 w-full max-w-full">
              <SubscriptionBanner subscription={subscription} />
            </div>

            <section className="mt-6 grid min-w-0 w-full max-w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              <HeroCard
                title="Saldo disponível"
                value={data.availableBalance}
                description="Valor restante após receitas, despesas, gastos fixos e cartão."
                darkMode={darkMode}
              />

              <MetricCard
                title="Saldo atual"
                value={data.currentBalance}
                icon={<Wallet size={20} />}
                darkMode={darkMode}
              />

              <MetricCard
                title="Pode gastar hoje"
                value={data.canSpendToday}
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

            <section className="mt-6 grid min-w-0 w-full max-w-full grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-3">
              <CategoriesCard
                categories={data.categories}
                darkMode={darkMode}
              />

              <InsightsCard
                insights={data.insights}
                darkMode={darkMode}
              />
            </section>

            <section className="mt-6 grid min-w-0 w-full max-w-full grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
              <TransactionsCard
                transactions={data.transactions}
                darkMode={darkMode}
              />

              <DueItemsCard
                dueItems={data.dueItems}
                darkMode={darkMode}
              />
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}