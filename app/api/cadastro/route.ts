import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function gerarCodigoVinculo(tamanho = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  return Array.from({ length: tamanho }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
}

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Preencha nome, email e senha." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Configuração do Supabase ausente." },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
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

    const linkCode = gerarCodigoVinculo();

    const { error: appUserError } = await supabaseAdmin
      .from("app_users")
      .insert({
        auth_user_id: authData.user.id,
        email,
        name,
        telegram_id: null,
        chat_id: null,
        active: true,
        is_admin: false,
        plan: "individual",
        access_status: "active",
        onboarding_completed: false,
        onboarding_step: 0,
        onboarding_data: {},
        link_code: linkCode,
        link_code_expires_at: new Date(
          Date.now() + 1000 * 60 * 60 * 24
        ).toISOString(),
      });

    if (appUserError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);

      return NextResponse.json(
        { error: appUserError.message || "Erro ao criar perfil." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      linkCode,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro inesperado ao criar conta." },
      { status: 500 }
    );
  }
}