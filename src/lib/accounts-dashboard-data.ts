export interface PlatformRevenueSlide {
  id: string;
  metric: string;
  label: string;
  growth: string;
  headline: string;
  description: string;
}

export const platformRevenueSlides: PlatformRevenueSlide[] = [
  {
    id: 'rev-slide-1',
    metric: '₹8.30 Cr',
    label: 'Monthly Operating Volume',
    growth: '+14.2% MoM',
    headline: 'All 3 operational verticals reached target liquidity.',
    description: 'Services (₹6.7 Cr), Subscriptions (₹1.2 Cr), and Verification (₹0.4 Cr) driving strong monthly cash inflow.',
  },
  {
    id: 'rev-slide-2',
    metric: '98.4%',
    label: 'Enterprise Renewal Rate',
    growth: '+2.1% vs Q2',
    headline: '3,641 active subscribers with high retention confidence.',
    description: 'Platinum Annual and Growth membership tiers maintain predictable recurring subscription run-rate.',
  },
  {
    id: 'rev-slide-3',
    metric: '₹3.20 Cr',
    label: 'Agent Payouts Disbursed',
    growth: '+18.4% MoM',
    headline: 'Field agent earnings authorized with zero compliance backlog.',
    description: 'Over 142 land deals settled across 5 districts with 66% of quarterly commissions already disbursed.',
  },
];

export interface FarmlandRevenueSlide {
  id: string;
  period: string;
  revenue: string;
  headline: string;
  description: string;
}

export const farmlandRevenueSlides: FarmlandRevenueSlide[] = [
  {
    id: 'slide-1',
    period: 'Weekly',
    revenue: '₹8.30 Cr',
    headline: 'Total Revenue collected from operational services, subscriptions & compliance.',
    description: 'Includes auxiliary infrastructure services, membership tiers, and verification audits.',
  },
];

export interface CommissionMonth {
  month: string;
  paid: number;
  pending: number;
  total: number;
  highlight?: string;
}

export const commissionData: CommissionMonth[] = [
  { month: 'Jan', paid: 1.6, pending: 1.1, total: 2.7 },
  { month: 'Feb', paid: 1.0, pending: 2.4, total: 3.4 },
  { month: 'Mar', paid: 1.4, pending: 1.2, total: 2.6 },
  { month: 'Apr', paid: 1.7, pending: 0.6, total: 2.3 },
  { month: 'May', paid: 1.1, pending: 1.6, total: 2.7 },
  { month: 'Jun', paid: 0.6, pending: 1.3, total: 1.9, highlight: '1.5Cr' },
];

export const commissionYAxis = [
  '3.5 Cr',
  '3 Cr',
  '2.5 Cr',
  '2 Cr',
  '1.5 Cr',
  '1 Cr',
  '50 L',
  '0',
];

export interface DailyPayment {
  day: string;
  amount: string;
  yPercent: number; // 0 to 100 from bottom
  highlight?: boolean;
}

export interface DailyCollectionPoint {
  day: string;
  amount: string;
  category: string;
  yPercent: number;
  highlight?: boolean;
}

export const platformCollectionsData: DailyCollectionPoint[] = [
  { day: 'Mon', amount: '₹1.45 Cr', category: 'Subscriptions', yPercent: 48 },
  { day: 'Tue', amount: '₹2.85 Cr', category: 'Services (Peak)', yPercent: 88, highlight: true },
  { day: 'Wed', amount: '₹1.10 Cr', category: 'Subscriptions', yPercent: 38 },
  { day: 'Thu', amount: '₹1.95 Cr', category: 'Services', yPercent: 62 },
  { day: 'Fri', amount: '₹0.90 Cr', category: 'Verification', yPercent: 30 },
  { day: 'Sat', amount: '₹2.40 Cr', category: 'Services', yPercent: 74 },
  { day: 'Sun', amount: '₹1.80 Cr', category: 'Services', yPercent: 58 },
];

export const farmlandPaymentsData: DailyPayment[] = [
  { day: 'Mon', amount: '₹1.45 Cr', yPercent: 48 },
  { day: 'Tue', amount: '₹2.85 Cr', yPercent: 88, highlight: true },
  { day: 'Wed', amount: '₹1.10 Cr', yPercent: 38 },
  { day: 'Thu', amount: '₹1.95 Cr', yPercent: 62 },
  { day: 'Fri', amount: '₹0.90 Cr', yPercent: 30 },
  { day: 'Sat', amount: '₹2.40 Cr', yPercent: 74 },
  { day: 'Sun', amount: '₹1.80 Cr', yPercent: 58 },
];

export interface AccountsCreditsData {
  total: number;
  available: number;
  used: number;
  period: string;
}

export const accountsCreditsData: AccountsCreditsData = {
  total: 1027,
  available: 682,
  used: 345,
  period: 'Weekly',
};
