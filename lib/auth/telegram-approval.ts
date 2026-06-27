import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function requireTelegramApproval() {
  const supabase = await createClient();
  const admin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
  }

  const { data: appUser } = await admin
    .from("app_users")
    .select("id")
    .eq("email", user.email)
    .single();

  if (!appUser) {
    redirect("/login");
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