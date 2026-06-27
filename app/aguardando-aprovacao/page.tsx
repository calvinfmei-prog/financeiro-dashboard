"use client";

import { useEffect, useState } from "react";

export default function AguardandoAprovacaoPage() {
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const approvalId = localStorage.getItem("approval_id");

    if (!approvalId) {
      setStatus("missing");
      return;
    }

    const interval = setInterval(async () => {
      const response = await fetch(`/api/login-approval/status?id=${approvalId}`);
      const data = await response.json();

      setStatus(data.status);

      if (data.status === "approved") {
        clearInterval(interval);
        window.location.href = "/dashboard";
      }

      if (data.status === "denied" || data.status === "expired") {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-slate-950 shadow-xl">
        <h1 className="text-2xl font-bold">Confirme no Telegram</h1>

        <p className="mt-3 text-sm text-slate-600">
          Enviamos uma solicitação para o seu Telegram. Aprove o acesso para
          entrar no painel.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm">
          {status === "pending" && "Aguardando aprovação..."}
          {status === "approved" && "Acesso aprovado. Redirecionando..."}
          {status === "denied" && "Acesso negado pelo Telegram."}
          {status === "expired" && "Solicitação expirada. Faça login novamente."}
          {status === "missing" && "Solicitação não encontrada. Faça login novamente."}
        </div>

        {(status === "denied" || status === "expired" || status === "missing") && (
          <a
            href="/login"
            className="mt-6 block rounded-2xl bg-slate-950 px-4 py-3 text-center font-semibold text-white"
          >
            Voltar para login
          </a>
        )}
      </div>
    </main>
  );
}