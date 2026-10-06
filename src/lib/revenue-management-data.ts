export interface RevenueVertical {
  id: string;
  name: string;
  amount: string;
  iconName: string;
  change?: string;
  changePeriod?: string;
  description?: string;
  isFeatured?: boolean;
}

export const secondaryRevenueVerticals: RevenueVertical[] = [
  {
    id: 'subscriptions',
    name: 'Subscriptions',
    amount: '₹3.4M',
    iconName: 'subscriptions',
  },
  {
    id: 'farmland-services',
    name: 'Farmland Services',
    amount: '₹2.7M',
    iconName: 'layers',
  },
  {
    id: 'external-verification',
    name: 'External Verification',
    amount: '₹12.4M',
    iconName: 'shield',
  },
];

export interface RecentActivityItem {
  id: string;
  leadName: string;
  avatarUrl: string;
  farmlandId: string;
  time: string;
  amount: string;
  status: 'Returned' | 'Completed' | 'Pending';
  publishedTime: string;
  actionVariant?: 'primary' | 'soft';
}

export const recentActivityItems: RecentActivityItem[] = [
  {
    id: 'act-1',
    leadName: 'Ananthu',
    avatarUrl: '/assets/lead-1.png',
    farmlandId: 'GLC SOS001',
    time: '6th Oct - 12.53 PM',
    amount: '25 lacs',
    status: 'Returned',
    publishedTime: '6th Oct - 12.53 PM',
    actionVariant: 'primary',
  },
  {
    id: 'act-2',
    leadName: 'Sunil Varma',
    avatarUrl: '/assets/lead-2.png',
    farmlandId: 'GLC SOS001',
    time: '6th Oct - 12.53 PM',
    amount: '25 lacs',
    status: 'Returned',
    publishedTime: '6th Oct - 12.53 PM',
    actionVariant: 'primary',
  },
  {
    id: 'act-3',
    leadName: 'Yakoob',
    avatarUrl: '/assets/avatar.png',
    farmlandId: 'GLC SOS001',
    time: '6th Oct - 12.53 PM',
    amount: '25 lacs',
    status: 'Returned',
    publishedTime: '6th Oct - 12.53 PM',
    actionVariant: 'soft',
  },
];
