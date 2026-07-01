import { requireTelegramApproval } from "@/lib/auth/telegram-approval";
import { requireActiveSubscription } from "@/lib/auth/subscription";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireTelegramApproval();
  await requireActiveSubscription();

  return <>{children}</>;
}