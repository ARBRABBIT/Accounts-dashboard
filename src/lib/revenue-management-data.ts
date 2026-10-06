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
  {
    id: 'act-4',
    leadName: 'Priya Sharma',
    avatarUrl: '/assets/agent-1.png',
    farmlandId: 'GLC HYD042',
    time: '6th Oct - 11.40 AM',
    amount: '40 lacs',
    status: 'Returned',
    publishedTime: '6th Oct - 11.40 AM',
    actionVariant: 'primary',
  },
  {
    id: 'act-5',
    leadName: 'Rajesh Koothrappali',
    avatarUrl: '/assets/agent-2.png',
    farmlandId: 'GLC BLR018',
    time: '6th Oct - 10.15 AM',
    amount: '18 lacs',
    status: 'Returned',
    publishedTime: '6th Oct - 10.15 AM',
    actionVariant: 'soft',
  },
  {
    id: 'act-6',
    leadName: 'Vikram Malhotra',
    avatarUrl: '/assets/agent-3.png',
    farmlandId: 'GLC DEL009',
    time: '5th Oct - 04.30 PM',
    amount: '32 lacs',
    status: 'Returned',
    publishedTime: '5th Oct - 04.30 PM',
    actionVariant: 'primary',
  },
  {
    id: 'act-7',
    leadName: 'Sneha Reddy',
    avatarUrl: '/assets/agent-4.png',
    farmlandId: 'GLC GOA003',
    time: '5th Oct - 02.15 PM',
    amount: '50 lacs',
    status: 'Returned',
    publishedTime: '5th Oct - 02.15 PM',
    actionVariant: 'primary',
  },
  {
    id: 'act-8',
    leadName: 'Karthik Raman',
    avatarUrl: '/assets/agent-5.png',
    farmlandId: 'GLC CHN021',
    time: '5th Oct - 11.05 AM',
    amount: '15 lacs',
    status: 'Returned',
    publishedTime: '5th Oct - 11.05 AM',
    actionVariant: 'soft',
  },
  {
    id: 'act-9',
    leadName: 'Harish Patel',
    avatarUrl: '/assets/agent-6.png',
    farmlandId: 'GLC AHM012',
    time: '4th Oct - 03.45 PM',
    amount: '28 lacs',
    status: 'Returned',
    publishedTime: '4th Oct - 03.45 PM',
    actionVariant: 'primary',
  },
  {
    id: 'act-10',
    leadName: 'Divya Nair',
    avatarUrl: '/assets/avatar_test1.png',
    farmlandId: 'GLC COK007',
    time: '4th Oct - 01.20 PM',
    amount: '35 lacs',
    status: 'Returned',
    publishedTime: '4th Oct - 01.20 PM',
    actionVariant: 'primary',
  },
];
