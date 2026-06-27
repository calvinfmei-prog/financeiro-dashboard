"use client";

import { useTheme } from "@/app/dashboard/hooks/useTheme";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

type CategoryItem = {
  name: string;
  Amount: number;
  value: number;
  amount: string;
  icon: string;
};

interface Props {
  categories: CategoryItem[];
  total: string;
}

export default function CategoriesPageContent({ categories, total }: Props) {
  const COLORS = ["#2563eb", "#10b981", "#f97316", "#8b5cf6", "#ec4899", "#14b8a6"];

  const { isDark } = useTheme();

  const axisColor = isDark ? "#CBD5E1" : "#475569";
  const tooltipBg = isDark ? "#0F172A" : "#FFFFFF";
  const tooltipBorder = isDark ? "#334155" : "#E2E8F0";
  const tooltipText = isDark ? "#FFFFFF" : "#0F172A";

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white xl:col-span-2">
        <h2 className="text-lg font-bold">Distribuição por categoria</h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Total gasto no ciclo: {total}
        </p>

        <div className="mt-8 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categories}>
              <XAxis
                dataKey="name"
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: axisColor }}
                tickLine={{ stroke: axisColor }}
              />

              <YAxis
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: axisColor }}
                tickLine={{ stroke: axisColor }}
              />

              <Tooltip
                contentStyle={{
                  background: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: 16,
                  color: tooltipText,
                }}
                labelStyle={{
                  color: tooltipText,
                }}
                itemStyle={{
                  color: tooltipText,
                }}
                formatter={(value) =>
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(value ?? 0))
                }
              />

              <Bar
                dataKey="Amount"
                radius={[12, 12, 0, 0]}
                fill={isDark ? "#60A5FA" : "#2563EB"}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
        <h2 className="text-lg font-bold">Resumo</h2>

        <div className="mt-6 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                dataKey="Amount"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {categories.map((_, index) => (
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
                labelStyle={{
                  color: tooltipText,
                }}
                itemStyle={{
                  color: tooltipText,
                }}
                formatter={(value) =>
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(value ?? 0))
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 space-y-4">
          {categories.map((item, index) => (
            <div key={`${item.name}-${index}`}>
              <div className="mb-2 flex justify-between text-sm">
                <span>
                  {item.icon} {item.name}
                </span>

                <span className="text-slate-500 dark:text-slate-400">
                  {item.value}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-3 rounded-full bg-slate-950 dark:bg-white"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white xl:col-span-3">
        <h2 className="text-lg font-bold">Ranking de categorias</h2>

        <div className="mt-5 divide-y divide-slate-200 dark:divide-slate-800">
          {categories.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center justify-between py-4"
            >
              <div>
                <p className="font-semibold">
                  #{index + 1} {item.icon} {item.name}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.value}% dos gastos
                </p>
              </div>

              <p className="font-bold">{item.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}