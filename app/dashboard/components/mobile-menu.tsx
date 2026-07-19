"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  CalendarClock,
  CreditCard,
  Home,
  Landmark,
  List,
  Menu,
  PieChart,
  Settings,
  Users,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
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

export default function MobileMenu({
  darkMode,
  plan,
}: MobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl lg:hidden ${
          darkMode
            ? "bg-slate-900 text-white"
            : "bg-white text-slate-700 shadow-sm"
        }`}
        aria-label="Abrir menu"
        aria-expanded={open}
      >
        <Menu size={21} />
      </button>

      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-label="Fechar menu"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[85%] max-w-80 overflow-y-auto border-r p-5 transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${
          darkMode
            ? "border-slate-800 bg-slate-900"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                darkMode
                  ? "bg-white text-slate-900"
                  : "bg-slate-900 text-white"
              }`}
            >
              <Wallet size={21} />
            </div>

            <h2
              className={`mt-3 text-xl font-bold ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Patria Financeiro
            </h2>

            <p
              className={`text-sm ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Painel inteligente
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              darkMode
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-7 space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const active = isActive(menu.href);

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
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

          <p className="mt-1 text-lg font-bold capitalize">
            {plan ?? "Free"}
          </p>
        </div>
      </aside>
    </>
  );
}