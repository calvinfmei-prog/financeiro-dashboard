import Link from "next/link";
import { ArrowRight, Bot, LineChart, PiggyBank } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-slate-950 px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-emerald-500 via-emerald-600 to-slate-900 p-8 shadow-2xl sm:p-12 lg:p-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
              Pronto para evoluir?
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Organize suas finanças como quem está construindo patrimônio.
            </h2>

            <p className="mt-6 text-lg leading-8 text-emerald-50">
              Saia do modelo tradicional de apenas anotar gastos. Tenha clareza
              sobre quanto pode gastar, quanto deve investir e como seu dinheiro
              está trabalhando para você.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/cadastro"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-4 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
              >
                Começar agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Já tenho conta
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <MiniCard
              icon={<Bot className="h-6 w-6" />}
              title="Lance pelo Telegram"
              description="Rápido como enviar uma mensagem."
            />

            <MiniCard
              icon={<LineChart className="h-6 w-6" />}
              title="Visualize no Dashboard"
              description="Gráficos, cartões, categorias e relatórios."
            />

            <MiniCard
              icon={<PiggyBank className="h-6 w-6" />}
              title="Construa patrimônio"
              description="Controle com foco em crescimento financeiro."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600">
        {icon}
      </div>

      <h3 className="font-bold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-emerald-50">{description}</p>
    </div>
  );
}