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

export default function CategoriesCard({ categories, darkMode }: Props) {
  const cardBg = darkMode
    ? "bg-slate-900 text-white"
    : "bg-white text-slate-950";

  const muted = darkMode ? "text-slate-400" : "text-slate-500";
  const barBg = darkMode ? "bg-slate-800" : "bg-slate-100";
  const barFill = darkMode ? "bg-white" : "bg-slate-900";
  const tooltipBg = darkMode ? "#0F172A" : "#FFFFFF";
  const tooltipBorder = darkMode ? "#334155" : "#E2E8F0";
  const tooltipText = darkMode ? "#FFFFFF" : "#0F172A";

  const COLORS = ["#2563eb", "#10b981", "#f97316", "#8b5cf6", "#ec4899", "#14b8a6"];

  const chartData = categories.map((category) => ({
  ...category,
  chartValue: category.rawAmount ?? category.Amount ?? category.value ?? 0,
}));

  return (
    <div className={`rounded-[2rem] p-6 shadow-sm xl:col-span-2 ${cardBg}`}>
      <h3 className="text-lg font-bold">Gastos por categoria</h3>
      <p className={`text-sm ${muted}`}>Distribuição dos gastos deste ciclo.</p>

      <div className="mt-8 flex items-center gap-10">
        <div className="h-[240px] w-[300px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="chartValue"
                nameKey="name"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: 16,
                  color: tooltipText,
                }}
                labelStyle={{ color: tooltipText }}
                itemStyle={{ color: tooltipText }}
                formatter={(value) => [
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(value ?? 0)),
                  "",
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-5">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="mb-2 flex justify-between gap-4 text-sm">
                <span>{category.icon} {category.name}</span>
                <span className={muted}>{category.amount}</span>
              </div>

              <div className={`h-3 rounded-full ${barBg}`}>
                <div
                  className={`h-3 rounded-full ${barFill}`}
                  style={{ width: `${category.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}