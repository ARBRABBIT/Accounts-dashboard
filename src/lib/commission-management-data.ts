export interface PropertyCommissionDeal {
  id: string;
  landId: string;
  customerName: string;
  location: string;
  imageUrl: string;
  saleValue: string;
  earnedAmount: string;
  pendingAmount: string;
  status: 'Settled' | 'Pending';
}

export interface AgentCommission {
  id: string;
  name: string;
  agentId: string;
  avatarUrl: string;
  role?: string;
  region: string;
  district?: string;
  mandal?: string;
  areaOrDistrict: string;
  areaLabel: 'Area' | 'District';
  landId: string;
  date: string;
  amount: number;
  formattedAmount: string;
  status: 'Paid' | 'Pending';
  phone?: string;
  email?: string;
  bankAccount?: string;
  ifscCode?: string;
  plotSize?: string;
  commissionRate?: string;
  transactionRef?: string;
  payoutDate?: string;
  isTopPerformer?: boolean;
  isVerified?: boolean;
  deals?: PropertyCommissionDeal[];
}

export const samplePropertyDeals: PropertyCommissionDeal[] = [
  {
    id: 'prop-1',
    landId: 'GLC SOS 01',
    customerName: 'Venkatesh Rao',
    location: 'Mahabubnagar, Jadcherla',
    imageUrl: '/assets/property-1.png',
    saleValue: '₹15,00,000',
    earnedAmount: '₹75,000',
    pendingAmount: '₹0',
    status: 'Settled',
  },
  {
    id: 'prop-2',
    landId: 'GLC SOS 01',
    customerName: 'Venkatesh Rao',
    location: 'Mahabubnagar, Jadcherla',
    imageUrl: '/assets/property-2.png',
    saleValue: '₹15,00,000',
    earnedAmount: '₹34,000',
    pendingAmount: '₹23,000',
    status: 'Pending',
  },
  {
    id: 'prop-3',
    landId: 'GLC SOS 01',
    customerName: 'Venkatesh Rao',
    location: 'Mahabubnagar, Jadcherla',
    imageUrl: '/assets/property-3.png',
    saleValue: '₹15,00,000',
    earnedAmount: '₹75,000',
    pendingAmount: '₹0',
    status: 'Settled',
  },
  {
    id: 'prop-4',
    landId: 'GLC SOS 01',
    customerName: 'Venkatesh Rao',
    location: 'Mahabubnagar, Jadcherla',
    imageUrl: '/assets/property-4.png',
    saleValue: '₹15,00,000',
    earnedAmount: '₹75,000',
    pendingAmount: '₹0',
    status: 'Settled',
  },
];

export const agentCommissions: AgentCommission[] = [
  {
    id: 'comm-1',
    name: 'Ravi Kumar',
    agentId: 'ID-8327492',
    avatarUrl: '/assets/agent-1.png',
    role: 'Senior Sales Agent',
    region: 'Mahabubnagar',
    district: 'Mahabubnagar',
    mandal: 'Jadcherla',
    areaOrDistrict: 'Jadcherla',
    areaLabel: 'Area',
    landId: 'GLC SOS 01',
    date: '29 May 2025',
    amount: 75000,
    formattedAmount: '₹75,000',
    status: 'Paid',
    phone: '+91 98490 23145',
    email: 'ravi.kumar@glc-agents.in',
    bankAccount: 'HDFC •••• 4120',
    ifscCode: 'HDFC0001824',
    plotSize: '2.5 Acres',
    commissionRate: '2.5% on Land Deal',
    transactionRef: 'TXN-9824719284',
    payoutDate: '29 May 2025, 03:45 PM',
    isTopPerformer: true,
    isVerified: true,
    deals: samplePropertyDeals,
  },
  {
    id: 'comm-2',
    name: 'Kiran Shetty',
    agentId: 'ID-8327492',
    avatarUrl: '/assets/agent-2.png',
    role: 'Field Acquisition Partner',
    region: 'Vikarabad',
    district: 'Vikarabad',
    mandal: 'Pargi',
    areaOrDistrict: 'Pargi',
    areaLabel: 'District',
    landId: 'GLC SOS 56',
    date: '29 May 2025',
    amount: 45000,
    formattedAmount: '₹45,000',
    status: 'Pending',
    phone: '+91 98481 99201',
    email: 'kiran.shetty@glc-agents.in',
    bankAccount: 'ICICI •••• 8831',
    ifscCode: 'ICIC0000491',
    plotSize: '1.8 Acres',
    commissionRate: '2.0% on Land Deal',
    transactionRef: 'TXN-PENDING-041',
    payoutDate: 'Pending Authorization',
    isTopPerformer: false,
    isVerified: true,
    deals: samplePropertyDeals.map((d, i) => ({
      ...d,
      id: `prop-kiran-${i}`,
      landId: 'GLC SOS 56',
      location: 'Vikarabad, Pargi',
    })),
  },
  {
    id: 'comm-3',
    name: 'Arjun',
    agentId: 'ID-8327492',
    avatarUrl: '/assets/agent-3.png',
    role: 'Senior Sales Agent',
    region: 'Mahabubnagar',
    district: 'Mahabubnagar',
    mandal: 'Jadcherla',
    areaOrDistrict: 'Patancheru',
    areaLabel: 'District',
    landId: 'GLC SOS 321',
    date: '29 May 2025',
    amount: 53000,
    formattedAmount: '₹53,000',
    status: 'Pending',
    phone: '+91 98765 43210',
    email: 'arjun.reddy@glc-agents.in',
    bankAccount: 'SBI •••• 9924',
    ifscCode: 'SBIN0008432',
    plotSize: '2.0 Acres',
    commissionRate: '2.2% on Land Deal',
    transactionRef: 'TXN-PENDING-089',
    payoutDate: 'Pending Authorization',
    isTopPerformer: true,
    isVerified: true,
    deals: samplePropertyDeals,
  },
  {
    id: 'comm-4',
    name: 'Meghana Patel',
    agentId: 'ID-8327492',
    avatarUrl: '/assets/agent-4.png',
    role: 'Executive Land Specialist',
    region: 'Hyderabad',
    district: 'Hyderabad',
    mandal: 'Patancheru',
    areaOrDistrict: 'Patancheru',
    areaLabel: 'District',
    landId: 'GLC SOS 01',
    date: '29 May 2025',
    amount: 65000,
    formattedAmount: '₹65,000',
    status: 'Paid',
    phone: '+91 97012 33418',
    email: 'meghana.patel@glc-agents.in',
    bankAccount: 'Axis •••• 6612',
    ifscCode: 'UTIB0001021',
    plotSize: '3.0 Acres',
    commissionRate: '2.5% on Land Deal',
    transactionRef: 'TXN-8812947102',
    payoutDate: '29 May 2025, 05:12 PM',
    isTopPerformer: true,
    isVerified: true,
    deals: samplePropertyDeals.map((d, i) => ({
      ...d,
      id: `prop-meghana-${i}`,
      location: 'Hyderabad, Patancheru',
    })),
  },
  {
    id: 'comm-5',
    name: 'Venu Goud',
    agentId: 'ID-8327492',
    avatarUrl: '/assets/agent-5.png',
    role: 'Regional Deal Partner',
    region: 'Mahabubnagar',
    district: 'Mahabubnagar',
    mandal: 'Gachibowli',
    areaOrDistrict: 'Gachibowli',
    areaLabel: 'District',
    landId: 'GLC SOS 12',
    date: '29 May 2025',
    amount: 48000,
    formattedAmount: '₹48,000',
    status: 'Pending',
    phone: '+91 94401 77312',
    email: 'venu.goud@glc-agents.in',
    bankAccount: 'HDFC •••• 1928',
    ifscCode: 'HDFC0001824',
    plotSize: '1.5 Acres',
    commissionRate: '2.0% on Land Deal',
    transactionRef: 'TXN-PENDING-112',
    payoutDate: 'Pending Authorization',
    isTopPerformer: false,
    isVerified: true,
    deals: samplePropertyDeals.map((d, i) => ({
      ...d,
      id: `prop-venu-${i}`,
      landId: 'GLC SOS 12',
    })),
  },
  {
    id: 'comm-6',
    name: 'Suresh Babu',
    agentId: 'ID-8327492',
    avatarUrl: '/assets/agent-6.png',
    role: 'Senior Sales Agent',
    region: 'Ranga Reddy',
    district: 'Ranga Reddy',
    mandal: 'Gachibowli',
    areaOrDistrict: 'Gachibowli',
    areaLabel: 'District',
    landId: 'GLC SOS 23',
    date: '29 May 2025',
    amount: 52000,
    formattedAmount: '₹52,000',
    status: 'Paid',
    phone: '+91 98852 44109',
    email: 'suresh.babu@glc-agents.in',
    bankAccount: 'Kotak •••• 5543',
    ifscCode: 'KKBK0000213',
    plotSize: '2.2 Acres',
    commissionRate: '2.4% on Land Deal',
    transactionRef: 'TXN-7731092481',
    payoutDate: '29 May 2025, 01:20 PM',
    isTopPerformer: true,
    isVerified: true,
    deals: samplePropertyDeals.map((d, i) => ({
      ...d,
      id: `prop-suresh-${i}`,
      landId: 'GLC SOS 23',
      location: 'Ranga Reddy, Gachibowli',
    })),
  },
];
