import { requireTelegramApproval } from "@/lib/auth/telegram-approval";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireTelegramApproval();

  return <>{children}</>;
}