import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Configuração do Supabase ausente." },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const { data: appUser, error } = await supabaseAdmin
      .from("app_users")
      .select("name,email,link_code,telegram_id")
      .eq("auth_user_id", user.id)
      .single();

    if (error || !appUser) {
      return NextResponse.json(
        { error: "Perfil não encontrado." },
        { status: 404 }
      );
    }

    if (appUser.telegram_id) {
      return NextResponse.json({
        linked: true,
        name: appUser.name,
        email: appUser.email,
        linkCode: null,
      });
    }

    return NextResponse.json({
      linked: false,
      name: appUser.name,
      email: appUser.email,
      linkCode: appUser.link_code,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao carregar onboarding." },
      { status: 500 }
    );
  }
}