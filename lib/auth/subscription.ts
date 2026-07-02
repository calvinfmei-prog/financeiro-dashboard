import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SubscriptionStatus = {
  allowed: boolean;
  reason: string;
  plan?: string | null;
  plan_cycle?: string | null;
  access_status?: string | null;
  trial_ends_at?: string | null;
  plan_expires_at?: string | null;
  days_left?: number | null;
};

export async function getCurrentSubscriptionStatus() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: appUser } = await supabase
    .from("app_users")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (!appUser) {
    redirect("/login");
  }

  const { data, error } = await supabase.rpc("get_subscription_status", {
    target_user_id: appUser.id,
  });

  if (error || !data) {
    redirect("/planos");
  }

  return data as SubscriptionStatus;
}

export async function requireActiveSubscription() {
  const status = await getCurrentSubscriptionStatus();

  if (!status.allowed) {
    redirect("/planos");
  }

  return status;
}

export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: appUser } = await supabase
    .from("app_users")
    .select("id, plan, access_status")
    .eq("auth_user_id", user.id)
    .single();

  if (!appUser) {
    redirect("/login");
  }

  if (appUser.plan !== "admin") {
    redirect("/dashboard");
  }

  return appUser;
}