export type DashboardCategory = {
  name: string;
  rawAmount: number;
  value: number;
  amount: string;
  icon: string;
};

export type DashboardTransaction = {
  title: string;
  category: string;
  amount: string;
};

export type DashboardDueItem = {
  title: string;
  date: string;
  amount: string;
};

export type DashboardInsight = {
  type: "info" | "category" | "success" | "warning";
  title: string;
  description: string;
};

export type DashboardData = {
  cycle: string;
  canSpendToday: string;
  currentBalance: string;
  availableBalance: string;
  patrimony: string;
  investments: string;
  revenues: string;
  expenses: string;
  fixedExpenses: string;
  card: string;
  categories: DashboardCategory[];
  transactions: DashboardTransaction[];
  dueItems: DashboardDueItem[];
  insights: DashboardInsight[];
};

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

export type DashboardShellProps = {
  userName: string;
  plan?: string | null;
  subscription?: SubscriptionStatus;
  data: DashboardData;
};

export type TransactionListItem = {
  id: string;
  title: string;
  category: string;
  amount: string;
  rawAmount: number;
  createdBy?: string;
  type: "entrada" | "saida";
  date: string;
};