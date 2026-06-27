"use client";

import { Copy, Users, KeyRound, ShieldCheck } from "lucide-react";

type FamilyMember = {
  id: string;
  name: string;
  role: string;
  active: boolean;
};

type FamilyData = {
  name: string;
  inviteCode: string;
  invitePassword: string;
  active: boolean;
  members: FamilyMember[];
};

interface Props {
  family: FamilyData;
}

export default function FamilyPageContent({ family }: Props) {
  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  const adminsCount = family.members.filter(
    (m) => m.role === "owner" || m.role === "admin"
  ).length;

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white xl:col-span-3">
        <p className="text-sm text-slate-500 dark:text-slate-300">
          Família atual
        </p>

        <h2 className="mt-3 text-4xl font-bold">{family.name}</h2>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
          Status: {family.active ? "Ativa" : "Bloqueada"}
        </p>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
        <div className="flex items-center gap-2">
          <KeyRound size={20} />
          <h2 className="text-lg font-bold">Código de convite</h2>
        </div>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Use esse código para convidar outras pessoas.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">Código</p>

          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-2xl font-bold tracking-wider text-slate-900 dark:text-white">
              {family.inviteCode}
            </p>

            <button
              onClick={() => copy(family.inviteCode)}
              className="rounded-xl bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
        <div className="flex items-center gap-2">
          <ShieldCheck size={20} />
          <h2 className="text-lg font-bold">Senha da família</h2>
        </div>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          A senha confirma a entrada no grupo.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">Senha</p>

          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-2xl font-bold tracking-wider text-slate-900 dark:text-white">
              {family.invitePassword}
            </p>

            <button
              onClick={() => copy(family.invitePassword)}
              className="rounded-xl bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
        <div className="flex items-center gap-2">
          <Users size={20} />
          <h2 className="text-lg font-bold">Resumo</h2>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Membros
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {family.members.length}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Administradores
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {adminsCount}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white xl:col-span-3">
        <h2 className="text-lg font-bold">Membros da família</h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Pessoas vinculadas a este controle financeiro.
        </p>

        <div className="mt-6 divide-y divide-slate-200 dark:divide-slate-800">
          {family.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between py-4"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {member.name}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {member.role === "owner"
                    ? "Dono"
                    : member.role === "admin"
                    ? "Administrador"
                    : "Membro"}
                </p>
              </div>

              <span
                className={
                  member.active
                    ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    : "rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                }
              >
                {member.active ? "Ativo" : "Inativo"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}