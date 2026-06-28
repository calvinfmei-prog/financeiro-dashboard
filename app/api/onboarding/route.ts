import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const admin = createAdminClient();

    const { data: appUser, error } = await admin
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

    return NextResponse.json({
      linked: Boolean(appUser.telegram_id),
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