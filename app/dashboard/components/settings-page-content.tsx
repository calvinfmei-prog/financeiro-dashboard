"use client";

import { LogOut, User, Send, CreditCard, Shield, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type SettingsData = {
  name: string;
  email: string;
  telegramId: string;
  plan: string;
  status: string;
  familyName: string;
};

interface Props {
  settings: SettingsData;
}

export default function SettingsPageContent({ settings }: Props) {
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <InfoCard
        icon={<User />}
        title="Conta"
        items={[
          ["Nome", settings.name],
          ["E-mail", settings.email],
          ["Status", settings.status],
        ]}
      />

      <InfoCard
        icon={<CreditCard />}
        title="Plano"
        items={[
          ["Plano atual", settings.plan],
          ["Cobrança", "Gerenciada manualmente"],
        ]}
      />

      <InfoCard
        icon={<Send />}
        title="Telegram"
        items={[
          ["Telegram ID", settings.telegramId],
          ["Bot", "Vinculado"],
        ]}
      />

      <InfoCard
        icon={<Users />}
        title="Família"
        items={[
          ["Família atual", settings.familyName],
          ["Permissões", "Visualização"],
        ]}
      />

      <InfoCard
        icon={<Shield />}
        title="Segurança"
        items={[
          ["Login", "Supabase Auth"],
          ["Acesso", "Protegido por RLS"],
        ]}
      />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white">
        <h2 className="text-lg font-bold">Sessão</h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
          Saia da sua conta neste dispositivo.
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-slate-950"
        >
          <LogOut size={18} />
          Sair da conta
        </button>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: [string, string][];
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
      <div className="flex items-center gap-2">
        <div className="text-slate-700 dark:text-slate-200">{icon}</div>
        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      <div className="mt-6 space-y-4">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {label}
            </p>

            <p className="mt-1 font-semibold text-slate-900 dark:text-white">
              {value || "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}