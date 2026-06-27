"use client";

import { ArrowDownLeft, ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import type { TransactionListItem } from "../types/dashboard";

interface Props {
  transactions: TransactionListItem[];
}

export default function TransactionsPageContent({ transactions }: Props) {
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((item) => {
    const term = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.amount.toLowerCase().includes(term)
    );
  });

  const grouped = filtered.reduce<Record<string, TransactionListItem[]>>(
    (acc, item) => {
      acc[item.date] = acc[item.date] || [];
      acc[item.date].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700">
          <Search size={18} className="text-slate-500 dark:text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por descrição, categoria ou valor..."
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
        {Object.keys(grouped).length === 0 ? (
          <div className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            Nenhuma transação encontrada.
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([date, items]) => (
              <section key={date}>
                <h3 className="mb-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {date}
                </h3>

                <div className="space-y-3">
                  {items.map((item) => {
                    const isIncome = item.type === "entrada";

                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={
                              isIncome
                                ? "flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                                : "flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                            }
                          >
                            {isIncome ? (
                              <ArrowUpRight size={18} />
                            ) : (
                              <ArrowDownLeft size={18} />
                            )}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {item.title}
                            </p>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {item.category}
                            </p>
                          </div>
                        </div>

                        <p
                          className={
                            isIncome
                              ? "font-semibold text-emerald-500 dark:text-emerald-400"
                              : "font-semibold text-slate-900 dark:text-slate-200"
                          }
                        >
                          {item.amount}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}