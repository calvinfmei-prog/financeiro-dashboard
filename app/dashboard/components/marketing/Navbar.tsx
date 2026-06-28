import Link from "next/link";
import { WalletCards } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 text-white backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
            <WalletCards className="h-5 w-5 text-white" />
          </div>

          <div>
            <p className="text-lg font-bold leading-none">Financeiro</p>
            <p className="text-xs text-slate-400">Inteligência financeira</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <a href="#diferenciais" className="hover:text-white">
            Diferenciais
          </a>
          <a href="#comparativo" className="hover:text-white">
            Comparativo
          </a>
          <a href="#como-funciona" className="hover:text-white">
            Como funciona
          </a>
          <a href="#tecnologia" className="hover:text-white">
            Tecnologia
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            Entrar
          </Link>

          <Link
            href="/cadastro"
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
          >
            Começar agora
          </Link>
        </div>
      </nav>
    </header>
  );
}