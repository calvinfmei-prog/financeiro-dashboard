import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function requireTelegramApproval() {
  const supabase = await createClient();
  const admin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: appUser } = await admin
    .from("app_users")
    .select("id, telegram_id, chat_id")
    .eq("auth_user_id", user.id)
    .single();

  if (!appUser) {
    redirect("/login");
  }

  if (!appUser.telegram_id || !appUser.chat_id) {
    redirect("/onboarding");
  }

  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();

  const { data: approval } = await admin
    .from("login_approvals")
    .select("id")
    .eq("user_id", appUser.id)
    .eq("status", "approved")
    .gte("approved_at", tenMinutesAgo)
    .order("approved_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!approval) {
    redirect("/aguardando-aprovacao");
  }
}