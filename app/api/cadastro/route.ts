import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const TRIAL_DAYS = 15;
const LINK_CODE_EXPIRATION_HOURS = 24;

function gerarCodigoVinculo(tamanho = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  return Array.from({ length: tamanho }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
}

function validarEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getTrialEndsAt(days = TRIAL_DAYS) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

function getLinkCodeExpiresAt(hours = LINK_CODE_EXPIRATION_HOURS) {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Preencha nome, email e senha." },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { error: "Informe um nome válido." },
        { status: 400 }
      );
    }

    if (!validarEmail(email)) {
      return NextResponse.json(
        { error: "Informe um e-mail válido." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    const admin = createAdminClient();

    const { data: existingUser } = await admin
      .from("app_users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { error: "Já existe uma conta com este e-mail." },
        { status: 409 }
      );
    }

    const { data: authData, error: authError } =
      await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: authError?.message || "Erro ao criar usuário." },
        { status: 400 }
      );
    }

    const now = new Date();
    const linkCode = gerarCodigoVinculo();

    const { error: appUserError } = await admin.from("app_users").insert({
      auth_user_id: authData.user.id,
      email,
      name,

      telegram_id: null,
      chat_id: null,

      active: true,
      is_admin: false,

      plan: "trial",
      plan_cycle: null,
      access_status: "active",
      trial_ends_at: getTrialEndsAt().toISOString(),
      plan_started_at: now.toISOString(),
      plan_expires_at: null,

      asaas_customer_id: null,
      asaas_subscription_id: null,
      last_payment_at: null,
      next_payment_at: null,

      onboarding_completed: false,
      onboarding_step: 0,
      onboarding_data: {},

      link_code: linkCode,
      link_code_expires_at: getLinkCodeExpiresAt().toISOString(),
    });

    if (appUserError) {
      await admin.auth.admin.deleteUser(authData.user.id);

      return NextResponse.json(
        { error: appUserError.message || "Erro ao criar perfil." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      linkCode,
      trialDays: TRIAL_DAYS,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro inesperado ao criar conta." },
      { status: 500 }
    );
  }
}