import Link from "next/link";
import { CheckCircle2, Star } from "lucide-react";

const plans = [
  {
    name: "Patria Individual",
    monthly: "R$ 14,90",
    yearly: "R$ 118,80",
    equivalent: "R$ 9,90/mês",
    description:
      "Ideal para quem deseja organizar sua vida financeira com simplicidade e inteligência.",
    featured: false,
    features: [
      "15 dias de teste grátis",
      "Uso individual",
      "Lançamentos pelo Telegram",
      "Dashboard completo",
      "Categorias automáticas",
      "Cartões e despesas recorrentes",
      "Relatórios financeiros",
    ],
  },
  {
    name: "Patria Patrimônio",
    monthly: "R$ 29,90",
    yearly: "R$ 238,80",
    equivalent: "R$ 19,90/mês",
    description:
      "Perfeito para casais e famílias que desejam administrar o patrimônio juntos.",
    featured: true,
    features: [
      "Tudo do Individual",
      "Até 6 integrantes",
      "Família compartilhada",
      "Controle por membro",
      "Visão consolidada do patrimônio",
      "Relatórios familiares",
      "15 dias de teste grátis",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="bg-slate-100 px-6 py-24 dark:bg-slate-900 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            Planos
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Escolha o plano ideal para sua jornada financeira.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Todos os novos usuários começam com <strong>15 dias gratuitos</strong>,
            sem necessidade de cartão de crédito.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[2rem] border p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl ${
                plan.featured
                  ? "border-emerald-400 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-bold text-white shadow-lg">
                  <Star className="h-4 w-4" />
                  Mais recomendado
                </div>
              )}

              <h3 className="text-2xl font-bold">{plan.name}</h3>

              <p
                className={`mt-4 ${
                  plan.featured
                    ? "text-slate-300"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {plan.description}
              </p>

              <div className="mt-8 rounded-2xl bg-black/5 p-5 dark:bg-white/5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm opacity-70">Mensal</p>
                    <p className="text-4xl font-bold">{plan.monthly}</p>
                  </div>

                  <span className="opacity-70">/mês</span>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-sm opacity-70">Anual</p>

                  <p className="text-2xl font-bold">{plan.yearly}</p>

                  <p className="mt-1 text-sm text-emerald-400">
                    Equivale a {plan.equivalent}
                  </p>
                </div>
              </div>

              <Link
                href="/cadastro"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-6 py-4 text-sm font-bold transition ${
                  plan.featured
                    ? "bg-emerald-500 text-white hover:bg-emerald-400"
                    : "bg-slate-950 text-white hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400"
                }`}
              >
                Começar gratuitamente
              </Link>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2
                      className={`mt-0.5 h-5 w-5 shrink-0 ${
                        plan.featured
                          ? "text-emerald-400"
                          : "text-emerald-500"
                      }`}
                    />

                    <span
                      className={
                        plan.featured
                          ? "text-slate-200"
                          : "text-slate-600 dark:text-slate-300"
                      }
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-5">
          <p className="text-center text-slate-500 dark:text-slate-400">
            💚 Todos os novos usuários começam com <strong>15 dias gratuitos</strong>.
            Você só escolhe um plano quando decidir continuar usando a Patria.
          </p>

          <Link
            href="/planos"
            className="inline-flex items-center justify-center rounded-xl border border-emerald-500 px-6 py-3 font-semibold text-emerald-600 transition hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
          >
            Comparar planos completos
          </Link>
        </div>
      </div>
    </section>
  );
}