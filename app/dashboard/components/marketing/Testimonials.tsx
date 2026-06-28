import {
  Quote,
  Users,
  Briefcase,
  HeartHandshake,
} from "lucide-react";

export default function Testimonials() {
  return (
    <section className="bg-slate-100 px-6 py-24 dark:bg-slate-900 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            Construído para pessoas reais
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 dark:text-white">
            O Financeiro nasceu para mudar a forma como lidamos com o dinheiro.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Ainda estamos no início dessa jornada, mas nosso objetivo é claro:
            criar uma plataforma que ajude milhares de pessoas e famílias a
            conquistar tranquilidade financeira e construir patrimônio com mais
            inteligência.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          <VisionCard
            icon={<Users className="h-8 w-8" />}
            title="Famílias"
            description="Organizar as finanças em conjunto, acompanhar metas e tomar decisões financeiras como uma equipe."
          />

          <VisionCard
            icon={<Briefcase className="h-8 w-8" />}
            title="Profissionais"
            description="Ter uma visão clara das finanças pessoais para crescer com segurança e investir com mais confiança."
          />

          <VisionCard
            icon={<HeartHandshake className="h-8 w-8" />}
            title="Nossa missão"
            description="Ajudar pessoas a desenvolverem uma relação mais saudável com o dinheiro, transformando informação em decisões."
          />
        </div>

        <div className="mt-20 rounded-[2rem] border border-dashed border-emerald-300 bg-white p-10 text-center shadow-sm dark:border-emerald-500/20 dark:bg-slate-950">
          <Quote className="mx-auto h-12 w-12 text-emerald-500" />

          <h3 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
            Em breve, esta seção contará histórias reais.
          </h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Conforme nossa comunidade crescer, compartilharemos experiências de
            usuários que organizaram suas finanças, reduziram dívidas,
            aumentaram investimentos e começaram a construir patrimônio usando o
            Financeiro.
          </p>

          <div className="mt-10 inline-flex rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white">
            Você pode ser uma dessas histórias.
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
}