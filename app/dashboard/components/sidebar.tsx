"use client";

import {
  Home,
  List,
  PieChart,
  CreditCard,
  Landmark,
  Users,
  BarChart3,
  Settings,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  darkMode: boolean;
  plan?: string | null;
}

const menus = [
  { icon: Home, label: "Hoje", href: "/dashboard" },
  { icon: List, label: "Transações", href: "/dashboard/transacoes" },
  { icon: PieChart, label: "Categorias", href: "/dashboard/categorias" },
  { icon: Landmark, label: "Investimentos", href: "/dashboard/investimentos" },
  { icon: CreditCard, label: "Cartões", href: "/dashboard/cartoes" },
  { icon: Users, label: "Família", href: "/dashboard/familia" },
  { icon: BarChart3, label: "Relatórios", href: "/dashboard/relatorios" },
  { icon: Settings, label: "Configurações", href: "/dashboard/configuracoes" },
];

export default function Sidebar({ darkMode, plan }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`hidden min-h-screen w-72 border-r p-6 lg:block ${
        darkMode
          ? "border-slate-800 bg-slate-900"
          : "border-slate-200 bg-white"
      }`}
    >
      <div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            darkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"
          }`}
        >
          <Wallet size={22} />
        </div>

        <h1
          className={`mt-4 text-xl font-bold ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Financeiro
        </h1>

        <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Painel Inteligente
        </p>
      </div>

      <nav className="mt-10 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const active = pathname === menu.href;

          return (
            <Link
              href={menu.href}
              key={menu.href}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? darkMode
                    ? "bg-white text-slate-900"
                    : "bg-slate-900 text-white"
                  : darkMode
                  ? "text-slate-300 hover:bg-slate-800"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={18} />
              {menu.label}
            </Link>
          );
        })}
      </nav>

      <div
        className={`mt-10 rounded-3xl p-5 ${
          darkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"
        }`}
      >
        <p className="text-sm opacity-70">Plano Atual</p>

        <h2 className="mt-1 text-xl font-bold">{plan ?? "Free"}</h2>
      </div>
    </aside>
  );
}