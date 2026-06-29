import Link from "next/link";
import {
  Bot,
  Mail,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-4">
          {/* Marca */}

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white">
                💰
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Patria
                </h2>

                <p className="text-sm text-slate-400">
                  Inteligência Financeira
                </p>
              </div>
            </div>

            <p className="mt-6 leading-7">
              Muito além de registrar gastos.
              <br />
              A Patria ajuda você a tomar decisões melhores,
              investir com consciência e construir patrimônio.
            </p>
          </div>

          {/* Produto */}

          <div>
            <h3 className="text-lg font-semibold text-white">
              Produto
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <a href="#como-funciona" className="hover:text-emerald-400">
                  Como funciona
                </a>
              </li>

              <li>
                <Link href="/login" className="hover:text-emerald-400">
                  Entrar
                </Link>
              </li>

              <li>
                <Link href="/cadastro" className="hover:text-emerald-400">
                  Criar conta
                </Link>
              </li>

            </ul>
          </div>

          {/* Recursos */}

          <div>

            <h3 className="text-lg font-semibold text-white">
              Recursos
            </h3>

            <ul className="mt-6 space-y-4">

              <li className="flex items-center gap-2">

                <Bot className="h-4 w-4 text-emerald-400"/>

                Telegram Bot

              </li>

              <li className="flex items-center gap-2">

                <Smartphone className="h-4 w-4 text-emerald-400"/>

                Dashboard Responsivo

              </li>

              <li className="flex items-center gap-2">

                <ShieldCheck className="h-4 w-4 text-emerald-400"/>

                Dados protegidos

              </li>

            </ul>

          </div>

          {/* Contato */}

          <div>

            <h3 className="text-lg font-semibold text-white">
              Contato
            </h3>

            <div className="mt-6 space-y-4">

              <a
                href="mailto:contato@patria.com"
                className="flex items-center gap-3 hover:text-emerald-400"
              >

                <Mail className="h-5 w-5"/>

                contato@patria.com

              </a>

              <a
                href="#"
                className="flex items-center gap-3 hover:text-emerald-400"
              >

                <span className="text-lg">📷</span>

                Instagram

              </a>

            </div>

          </div>

        </div>

        <div className="my-14 h-px bg-white/10"/>

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 lg:flex-row">

          <p>
            © {new Date().getFullYear()} Patria.
            Todos os direitos reservados.
          </p>

          <div className="flex gap-6">

            <Link
              href="/privacidade"
              className="hover:text-white"
            >
              Política de Privacidade
            </Link>

            <Link
              href="/termos"
              className="hover:text-white"
            >
              Termos de Uso
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}