"use client";

import Link from "next/link";
import { Crown, Sparkles, TriangleAlert } from "lucide-react";
import type { SubscriptionStatus } from "../types/dashboard";

type Props = {
  subscription?: SubscriptionStatus;
};

export default function SubscriptionBanner({ subscription }: Props) {
  if (!subscription) return null;

  const plan = subscription.plan;
  const daysLeft = subscription.days_left ?? null;

  if (plan === "admin") return null;

  if (plan === "founder") {
    return (
      <Banner
        icon={<Crown className="h-5 w-5" />}
        title="Patria Founder"
        description="Você faz parte dos primeiros usuários da Patria. Seu acesso especial está ativo."
        tone="emerald"
      />
    );
  }

  if (plan === "trial") {
    const urgent = daysLeft !== null && daysLeft <= 3;
    const warning = daysLeft !== null && daysLeft <= 7;

    return (
      <Banner
        icon={
          urgent ? (
            <TriangleAlert className="h-5 w-5" />
          ) : (
            <Sparkles className="h-5 w-5" />
          )
        }
        title="Trial Patria"
        description={
          daysLeft && daysLeft > 0
            ? `Faltam ${daysLeft} dia${daysLeft === 1 ? "" : "s"} para terminar seu período gratuito.`
            : "Seu período gratuito terminou. Escolha um plano para continuar usando a Patria."
        }
        tone={urgent ? "red" : warning ? "yellow" : "emerald"}
        actionLabel="Ver planos"
        actionHref="/planos"
      />
    );
  }

  if (plan === "individual" || plan === "patrimonio") {
    const planName =
      plan === "individual" ? "Patria Individual" : "Patria Patrimônio";

    return (
      <Banner
        icon={<Crown className="h-5 w-5" />}
        title={`${planName} ativo`}
        description={
          daysLeft
            ? `Sua assinatura está ativa. Faltam ${daysLeft} dia${
                daysLeft === 1 ? "" : "s"
              } para a renovação.`
            : "Sua assinatura está ativa."
        }
        tone="emerald"
      />
    );
  }

  if (!subscription.allowed) {
    return (
      <Banner
        icon={<TriangleAlert className="h-5 w-5" />}
        title="Acesso expirado"
        description="Escolha um plano para continuar registrando lançamentos, investimentos e acompanhando sua evolução financeira."
        tone="red"
        actionLabel="Escolher plano"
        actionHref="/planos"
      />
    );
  }

  return null;
}

function Banner({
  icon,
  title,
  description,
  tone,
  actionLabel,
  actionHref,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tone: "emerald" | "yellow" | "red";
  actionLabel?: string;
  actionHref?: string;
}) {
  const styles = {
    emerald: {
      container:
        "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10",
      title: "text-emerald-900 dark:text-emerald-100",
      text: "text-emerald-700 dark:text-emerald-200",
      icon:
        "bg-emerald-100 text-emerald-700 dark:bg-slate-900/40 dark:text-emerald-200",
    },
    yellow: {
      container:
        "border-yellow-300 bg-yellow-50 dark:border-yellow-500/20 dark:bg-yellow-500/10",
      title: "text-yellow-900 dark:text-yellow-100",
      text: "text-yellow-800 dark:text-yellow-200",
      icon:
        "bg-yellow-100 text-yellow-700 dark:bg-slate-900/40 dark:text-yellow-200",
    },
    red: {
      container:
        "border-red-300 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10",
      title: "text-red-900 dark:text-red-100",
      text: "text-red-700 dark:text-red-200",
      icon:
        "bg-red-100 text-red-700 dark:bg-slate-900/40 dark:text-red-200",
    },
  };

  return (
    <div
      className={`mb-6 flex flex-col gap-4 rounded-3xl border p-5 md:flex-row md:items-center md:justify-between ${styles[tone].container}`}
    >
      <div className="flex gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${styles[tone].icon}`}
        >
          {icon}
        </div>

        <div>
          <p className={`font-bold ${styles[tone].title}`}>{title}</p>
          <p className={`mt-1 text-sm ${styles[tone].text}`}>
            {description}
          </p>
        </div>
      </div>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex shrink-0 justify-center rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}