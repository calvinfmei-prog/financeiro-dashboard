import Link from "next/link";
import { CheckCircle2, Star } from "lucide-react";

const plans = [
  {
    name: "Individual",
    price: "R$ 19,90",
    description: "Para quem quer organizar a própria vida financeira.",
    featured: false,
    features: [
      "Uso individual",
      "Lançamentos pelo Telegram",
      "Dashboard completo",
      "Categorias automáticas",
      "Cartões e gastos fixos",
      "Relatórios mensais",
    ],
  },
  {
    name: "Família",
    price: "R$ 29,90",
    description: "Para casais e famílias que querem crescer juntos.",
    featured: true,
    features: [
      "Tudo do plano Individual",
      "Grupo familiar compartilhado",
      "Lançamentos por membro",
      "Controle conjunto de gastos",
      "Visão familiar do orçamento",
      "Ideal para casal e família",
    ],
  },
  {
    name: "Premium",
    price: "R$ 49,90",
    description: "Para quem quer visão avançada de patrimônio e evolução.",
    featured: false,
    features: [
      "Tudo do plano Família",
      "Carteira de investimento",
      "Metas financeiras",
      "Insights avançados",
      "Prioridade em novidades",
      "Recursos premium futuros",
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
            Escolha como quer construir sua vida financeira.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Do controle individual à gestão familiar, a Patria foi criada
            para acompanhar sua rotina e ajudar você a crescer com clareza.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
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
                className={`mt-4 leading-7 ${
                  plan.featured
                    ? "text-slate-300"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {plan.description}
              </p>

              <div className="mt-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span
                  className={
                    plan.featured
                      ? "text-slate-300"
                      : "text-slate-500 dark:text-slate-400"
                  }
                >
                  /mês
                </span>
              </div>

              <Link
                href="/cadastro"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-6 py-4 text-sm font-bold transition ${
                  plan.featured
                    ? "bg-emerald-500 text-white hover:bg-emerald-400"
                    : "bg-slate-950 text-white hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400"
                }`}
              >
                Começar agora
              </Link>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2
                      className={`mt-0.5 h-5 w-5 shrink-0 ${
                        plan.featured ? "text-emerald-400" : "text-emerald-500"
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

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-6 text-slate-500 dark:text-slate-400">
          Os valores podem ser ajustados conforme a fase de lançamento,
          funcionalidades disponíveis e condições comerciais definidas.
        </p>
      </div>
    </section>
  );
}