"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

interface Category {
  name: string;
  rawAmount?: number;
  Amount?: number;
  value: number;
  amount: string;
  icon: string;
}

interface Props {
  categories: Category[];
  darkMode: boolean;
}

export default function CategoriesCard({
  categories,
  darkMode,
}: Props) {
  const cardBg = darkMode
    ? "bg-slate-900 text-white"
    : "bg-white text-slate-950";

  const muted = darkMode ? "text-slate-400" : "text-slate-500";
  const barBg = darkMode ? "bg-slate-800" : "bg-slate-100";

  const COLORS = [
    "#2563eb",
    "#10b981",
    "#f97316",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
  ];

  const chartData = categories.map((category) => ({
    ...category,
    chartValue:
      category.rawAmount ??
      category.Amount ??
      category.value ??
      0,
  }));

  return (
    <div
      className={`min-w-0 w-full overflow-hidden rounded-[2rem] p-5 shadow-sm sm:p-6 xl:col-span-2 ${cardBg}`}
    >
      <h3 className="text-lg font-bold">Gastos por categoria</h3>

      <p className={`mt-1 text-sm ${muted}`}>
        Distribuição dos gastos deste ciclo.
      </p>

      {categories.length === 0 ? (
        <div
          className={`mt-8 rounded-2xl p-6 text-center text-sm ${
            darkMode
              ? "bg-slate-800 text-slate-400"
              : "bg-slate-50 text-slate-500"
          }`}
        >
          Nenhum gasto categorizado neste ciclo.
        </div>
      ) : (
        <div className="mt-6 flex min-w-0 flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          <div className="mx-auto h-[220px] w-full max-w-[280px] shrink-0 sm:h-[240px] sm:max-w-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="chartValue"
                  nameKey="name"
                  innerRadius="53%"
                  outerRadius="82%"
                  paddingAngle={3}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`${chartData[index].name}-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#0f172a" : "#ffffff",
                    borderColor: darkMode ? "#334155" : "#e2e8f0",
                    borderRadius: "12px",
                    color: darkMode ? "#ffffff" : "#0f172a",
                  }}
                  itemStyle={{
                    color: darkMode ? "#ffffff" : "#0f172a",
                  }}
                  formatter={(value, name) => [
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(value ?? 0)),
                    `📌 ${String(name)}`,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="min-w-0 w-full flex-1 space-y-5">
            {categories.map((category, index) => (
              <div key={category.name} className="min-w-0">
                <div className="mb-2 flex min-w-0 items-start justify-between gap-3 text-sm">
                  <span className="min-w-0 break-words font-medium">
                    {category.icon} {category.name}
                  </span>

                  <span className={`shrink-0 ${muted}`}>
                    {category.amount}
                  </span>
                </div>

                <div
                  className={`h-3 w-full overflow-hidden rounded-full ${barBg}`}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(
                        Math.max(category.value, 0),
                        100
                      )}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}