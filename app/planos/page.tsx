import Link from "next/link";
import { CheckCircle2, Crown, Sparkles, Users } from "lucide-react";

const plans = [
  {
    name: "Patria Individual",
    monthlyPrice: "R$ 14,90",
    annualMonthlyPrice: "R$ 9,90",
    annualTotal: "R$ 118,80",
    icon: Sparkles,
    description: "Para organizar sua vida financeira pessoal.",
    features: [
      "Controle de gastos e receitas",
      "Dashboard completo",
      "Investimentos",
      "Lembretes",
      "Telegram + Web",
    ],
  },
  {
    name: "Patria Patrimônio",
    monthlyPrice: "R$ 29,90",
    annualMonthlyPrice: "R$ 19,90",
    annualTotal: "R$ 238,80",
    icon: Users,
    description: "Para casais e famílias que constroem patrimônio juntos.",
    features: [
      "Até 6 membros",
      "Controle financeiro familiar",
      "Investimentos compartilhados",
      "Gestão por pessoa",
      "Permissões futuras por membro",
    ],
    featured: true,
  },
];

export default function PlanosPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500">
            <Crown className="h-7 w-7" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Escolha seu plano Patria
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Continue construindo patrimônio com inteligência, organização e
            segurança.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={`relative rounded-[2rem] border p-8 shadow-2xl ${
                  plan.featured
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-8 rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold">
                    Mais indicado
                  </div>
                )}

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900">
                  <Icon className="h-6 w-6 text-emerald-400" />
                </div>

                <h2 className="mt-6 text-2xl font-bold">{plan.name}</h2>

                <p className="mt-3 text-slate-300">{plan.description}</p>

                <div className="mt-8">
                  <p className="text-sm uppercase tracking-wide text-slate-400">
                    Plano mensal
                  </p>

                  <div className="mt-2">
                    <span className="text-4xl font-bold">
                      {plan.monthlyPrice}
                    </span>
                    <span className="text-slate-400">/mês</span>
                  </div>

                  <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                    <p className="text-sm font-semibold text-emerald-300">
                      Melhor custo-benefício no anual
                    </p>

                    <p className="mt-2 text-3xl font-bold text-white">
                      {plan.annualMonthlyPrice}
                      <span className="text-lg font-medium text-slate-300">
                        /mês
                      </span>
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      Cobrado anualmente em{" "}
                      <strong>{plan.annualTotal}</strong>.
                    </p>
                  </div>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-10 w-full rounded-xl px-5 py-4 font-bold transition ${
                    plan.featured
                      ? "bg-emerald-500 text-white hover:bg-emerald-400"
                      : "bg-white text-slate-950 hover:bg-slate-200"
                  }`}
                >
                  Assinar em breve
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-400 hover:text-white"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    </main>
  );
}