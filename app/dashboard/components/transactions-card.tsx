"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

type Transaction = {
  title: string;
  category: string;
  amount: string;
};

interface Props {
  transactions: Transaction[];
  darkMode: boolean;
}

export default function TransactionsCard({ transactions, darkMode }: Props) {
  const cardBg = darkMode
    ? "bg-slate-900 text-white"
    : "bg-white text-slate-950";

  const softBg = darkMode ? "bg-slate-800" : "bg-slate-50";
  const muted = darkMode ? "text-slate-400" : "text-slate-500";

  return (
    <div className={`rounded-[2rem] p-6 shadow-sm ${cardBg}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Últimos lançamentos</h3>
          <p className={`text-sm ${muted}`}>
            Movimentações recentes do ciclo.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {transactions.length === 0 ? (
          <div className={`rounded-2xl p-4 text-sm ${softBg} ${muted}`}>
            Nenhum lançamento encontrado ainda.
          </div>
        ) : (
          transactions.map((item, index) => {
            const isIncome = item.amount.trim().startsWith("+");

            return (
              <div
                key={`${item.title}-${index}`}
                className={`flex items-center justify-between rounded-2xl p-4 ${softBg}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                      isIncome
                        ? darkMode
                          ? "bg-emerald-950 text-emerald-300"
                          : "bg-emerald-100 text-emerald-700"
                        : darkMode
                        ? "bg-rose-950 text-rose-300"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {isIncome ? (
                      <ArrowUpRight size={18} />
                    ) : (
                      <ArrowDownLeft size={18} />
                    )}
                  </div>

                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className={`text-sm ${muted}`}>{item.category}</p>
                  </div>
                </div>

                <p
                  className={`font-semibold ${
                    isIncome
                      ? "text-emerald-500"
                      : darkMode
                      ? "text-slate-200"
                      : "text-slate-900"
                  }`}
                >
                  {item.amount}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}