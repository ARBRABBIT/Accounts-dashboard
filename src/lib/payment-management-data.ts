export interface PaymentVerticalCard {
  id: string;
  title: string;
  description: string;
  amount: string;
  rawAmount: number;
  iconName: 'farmland' | 'subscriptions' | 'pool' | 'services' | 'verification';
  targetRoute?: string;
  metricLabel: string;
  volumeShare?: string;
  monthlyGrowth?: string;
  breakdown?: { label: string; value: string; percentage: number }[];
}

export const paymentVerticals: PaymentVerticalCard[] = [
  {
    id: 'pay-subscriptions',
    title: 'Subscriptions',
    description: 'Recurring revenue from premium membership tiers.',
    amount: '₹1.2 Cr',
    rawAmount: 12000000,
    iconName: 'subscriptions',
    targetRoute: '/payment-management/subscriptions',
    metricLabel: 'Recurring Annual Run-Rate',
    volumeShare: '10%',
    monthlyGrowth: '+8.5%',
    breakdown: [
      { label: 'Platinum Annual Tier', value: '₹0.75 Cr', percentage: 62 },
      { label: 'Growth Plan Access', value: '₹0.30 Cr', percentage: 25 },
      { label: 'Starter Farmland Plan', value: '₹0.15 Cr', percentage: 13 },
    ],
  },
  {
    id: 'pay-services',
    title: 'Services',
    description: 'Auxiliary services including maintenance and consulting.',
    amount: '₹6.7 Cr',
    rawAmount: 67000000,
    iconName: 'services',
    targetRoute: '/farmland-services',
    metricLabel: 'Operational Auxiliary Revenue',
    volumeShare: '11%',
    monthlyGrowth: '+11.0%',
    breakdown: [
      { label: 'Farmhouse Construction', value: '₹3.10 Cr', percentage: 46 },
      { label: 'Organic Farming Contracts', value: '₹1.85 Cr', percentage: 28 },
      { label: 'Fencing & Perimeter Security', value: '₹1.15 Cr', percentage: 17 },
      { label: 'Borewell Drilling & Water', value: '₹0.60 Cr', percentage: 9 },
    ],
  },
  {
    id: 'pay-verification',
    title: 'Verification',
    description: 'Income from due diligence and legal verification processes.',
    amount: '₹0.4 Cr',
    rawAmount: 4000000,
    iconName: 'verification',
    metricLabel: 'Legal & Compliance Fees',
    volumeShare: '1%',
    monthlyGrowth: '+5.4%',
    breakdown: [
      { label: 'Title Deed & Revenue Search', value: '₹0.22 Cr', percentage: 55 },
      { label: 'Dharani Registry Audits', value: '₹0.12 Cr', percentage: 30 },
      { label: 'Satellite Boundary Verification', value: '₹0.06 Cr', percentage: 15 },
    ],
  },
];

export interface RevenueInsightData {
  tag: string;
  headline: string;
  projectedAmount: string;
  description: string;
  projections: {
    period: string;
    target: string;
    confidence: string;
  }[];
}

export const revenueInsightData: RevenueInsightData = {
  tag: 'REVENUE INSIGHT',
  headline: 'Subscription & service payments are projected to hit',
  projectedAmount: '₹20M',
  description: 'next week based on pending closures.',
  projections: [
    { period: 'Next Week (W42)', target: '₹2.00 Cr', confidence: '94%' },
    { period: 'Month End (Oct)', target: '₹8.50 Cr', confidence: '89%' },
    { period: 'Quarter Close (Q3)', target: '₹24.00 Cr', confidence: '91%' },
  ],
};

