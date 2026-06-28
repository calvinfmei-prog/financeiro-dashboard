"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ApprovalStatus =
  | "pending"
  | "approved"
  | "denied"
  | "expired"
  | "missing"
  | "error";

export default function AguardandoAprovacaoPage() {
  const [status, setStatus] = useState<ApprovalStatus>("pending");
  const supabase = createClient();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    async function resetToLogin() {
      localStorage.removeItem("approval_id");
      await supabase.auth.signOut();
      window.location.href = "/login";
    }

    const approvalId = localStorage.getItem("approval_id");

    if (!approvalId) {
      setStatus("missing");

      setTimeout(() => {
        resetToLogin();
      }, 1500);

      return;
    }

    interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/login-approval/status?id=${approvalId}`);
        const data = await response.json();

        if (!response.ok || data.error || !data.status) {
          clearInterval(interval);
          setStatus("error");

          setTimeout(() => {
            resetToLogin();
          }, 1500);

          return;
        }

        setStatus(data.status);

        if (data.status === "approved") {
          clearInterval(interval);
          localStorage.removeItem("approval_id");
          window.location.href = "/dashboard";
          return;
        }

        if (
          data.status === "denied" ||
          data.status === "expired" ||
          data.status === "missing"
        ) {
          clearInterval(interval);

          setTimeout(() => {
            resetToLogin();
          }, 1500);
        }
      } catch (error) {
        console.error(error);

        clearInterval(interval);
        setStatus("error");

        setTimeout(() => {
          resetToLogin();
        }, 1500);
      }
    }, 2000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [supabase]);

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
          {status === "denied" && "Acesso negado. Voltando para o login..."}
          {status === "expired" && "Solicitação expirada. Voltando para o login..."}
          {status === "missing" && "Solicitação não encontrada. Voltando para o login..."}
          {status === "error" && "Não foi possível validar a solicitação. Voltando para o login..."}
        </div>

        {(status === "denied" ||
          status === "expired" ||
          status === "missing" ||
          status === "error") && (
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