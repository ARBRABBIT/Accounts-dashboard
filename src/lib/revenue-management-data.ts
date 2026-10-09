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

export type RevenueServiceType = 'Subscriptions' | 'Farmland Services' | 'External Verification';

export interface RecentActivityItem {
  id: string;
  leadName: string;
  avatarUrl: string;
  farmlandId: string;
  serviceType: RevenueServiceType;
  time: string;
  amount: string;
  status: 'Returned' | 'Completed' | 'Pending';
  publishedTime: string;
}

export const recentActivityItems: RecentActivityItem[] = [
  {
    id: 'act-1',
    leadName: 'Ananthu',
    avatarUrl: '/assets/customer-avatar.png',
    farmlandId: 'GLC SOS001',
    serviceType: 'Farmland Services',
    time: '6th Oct - 12.53 PM',
    amount: '25 lacs',
    status: 'Returned',
    publishedTime: '6th Oct - 12.53 PM',
  },
  {
    id: 'act-2',
    leadName: 'Sunil Varma',
    avatarUrl: '/assets/customer-avatar.png',
    farmlandId: 'GLC SOS002',
    serviceType: 'External Verification',
    time: '6th Oct - 12.53 PM',
    amount: '25 lacs',
    status: 'Returned',
    publishedTime: '6th Oct - 12.53 PM',
  },
  {
    id: 'act-3',
    leadName: 'Yakoob',
    avatarUrl: '/assets/customer-avatar.png',
    farmlandId: 'GLC SOS003',
    serviceType: 'Subscriptions',
    time: '6th Oct - 12.53 PM',
    amount: '25 lacs',
    status: 'Returned',
    publishedTime: '6th Oct - 12.53 PM',
  },
  {
    id: 'act-4',
    leadName: 'Priya Sharma',
    avatarUrl: '/assets/customer-avatar.png',
    farmlandId: 'GLC SOS004',
    serviceType: 'Farmland Services',
    time: '6th Oct - 11.40 AM',
    amount: '40 lacs',
    status: 'Returned',
    publishedTime: '6th Oct - 11.40 AM',
  },
  {
    id: 'act-5',
    leadName: 'Rajesh Koothrappali',
    avatarUrl: '/assets/customer-avatar.png',
    farmlandId: 'GLC SOS005',
    serviceType: 'External Verification',
    time: '6th Oct - 10.15 AM',
    amount: '18 lacs',
    status: 'Returned',
    publishedTime: '6th Oct - 10.15 AM',
  },
  {
    id: 'act-6',
    leadName: 'Vikram Malhotra',
    avatarUrl: '/assets/customer-avatar.png',
    farmlandId: 'GLC SOS006',
    serviceType: 'Subscriptions',
    time: '5th Oct - 04.30 PM',
    amount: '32 lacs',
    status: 'Returned',
    publishedTime: '5th Oct - 04.30 PM',
  },
  {
    id: 'act-7',
    leadName: 'Sneha Reddy',
    avatarUrl: '/assets/customer-avatar.png',
    farmlandId: 'GLC SOS007',
    serviceType: 'Farmland Services',
    time: '5th Oct - 02.15 PM',
    amount: '50 lacs',
    status: 'Returned',
    publishedTime: '5th Oct - 02.15 PM',
  },
  {
    id: 'act-8',
    leadName: 'Karthik Raman',
    avatarUrl: '/assets/customer-avatar.png',
    farmlandId: 'GLC SOS008',
    serviceType: 'External Verification',
    time: '5th Oct - 11.05 AM',
    amount: '15 lacs',
    status: 'Returned',
    publishedTime: '5th Oct - 11.05 AM',
  },
  {
    id: 'act-9',
    leadName: 'Harish Patel',
    avatarUrl: '/assets/customer-avatar.png',
    farmlandId: 'GLC SOS009',
    serviceType: 'Subscriptions',
    time: '4th Oct - 03.45 PM',
    amount: '28 lacs',
    status: 'Returned',
    publishedTime: '4th Oct - 03.45 PM',
  },
  {
    id: 'act-10',
    leadName: 'Divya Nair',
    avatarUrl: '/assets/customer-avatar.png',
    farmlandId: 'GLC SOS010',
    serviceType: 'External Verification',
    time: '4th Oct - 01.20 PM',
    amount: '35 lacs',
    status: 'Returned',
    publishedTime: '4th Oct - 01.20 PM',
  },
];
