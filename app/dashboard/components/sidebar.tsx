"use client";

import { useEffect, useState } from "react";
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
  CalendarClock,
  Menu,
  X,
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
  { icon: CalendarClock, label: "Gastos Fixos", href: "/dashboard/fixas" },
  {
    icon: Landmark,
    label: "Investimentos",
    href: "/dashboard/investimentos",
  },
  { icon: CreditCard, label: "Cartões", href: "/dashboard/cartoes" },
  { icon: Users, label: "Família", href: "/dashboard/familia" },
  { icon: BarChart3, label: "Relatórios", href: "/dashboard/relatorios" },
  {
    icon: Settings,
    label: "Configurações",
    href: "/dashboard/configuracoes",
  },
];

export default function Sidebar({ darkMode, plan }: SidebarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const sidebarContent = (
    <>
      <div className="flex items-start justify-between">
        <div>
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              darkMode
                ? "bg-white text-slate-900"
                : "bg-slate-900 text-white"
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

          <p
            className={`text-sm ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Painel Inteligente
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className={`flex h-10 w-10 items-center justify-center rounded-xl lg:hidden ${
            darkMode
              ? "bg-slate-800 text-white"
              : "bg-slate-100 text-slate-900"
          }`}
          aria-label="Fechar menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="mt-8 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const active = isActive(menu.href);

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
              <span>{menu.label}</span>
            </Link>
          );
        })}
      </nav>

      <div
        className={`mt-8 rounded-3xl p-5 ${
          darkMode
            ? "bg-white text-slate-900"
            : "bg-slate-900 text-white"
        }`}
      >
        <p className="text-sm opacity-70">Plano atual</p>
        <h2 className="mt-1 text-xl font-bold capitalize">
          {plan ?? "Free"}
        </h2>
      </div>
    </>
  );

  return (
    <>
      {/* Barra móvel */}
      <div
        className={`fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b px-4 lg:hidden ${
          darkMode
            ? "border-slate-800 bg-slate-950 text-white"
            : "border-slate-200 bg-white text-slate-900"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              darkMode
                ? "bg-white text-slate-900"
                : "bg-slate-900 text-white"
            }`}
          >
            <Wallet size={19} />
          </div>

          <div>
            <p className="text-sm font-bold leading-tight">
              Patria Financeiro
            </p>
            <p
              className={`text-xs ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Painel financeiro
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            darkMode
              ? "bg-slate-800 text-white"
              : "bg-slate-100 text-slate-900"
          }`}
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Fundo escuro do menu móvel */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Menu móvel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[86%] max-w-80 overflow-y-auto border-r p-6 transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          darkMode
            ? "border-slate-800 bg-slate-900"
            : "border-slate-200 bg-white"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Sidebar desktop */}
      <aside
        className={`sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto border-r p-6 lg:block ${
          darkMode
            ? "border-slate-800 bg-slate-900"
            : "border-slate-200 bg-white"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}