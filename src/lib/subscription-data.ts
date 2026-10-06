export interface SubscriptionPlan {
  id: string;
  name: string;
  subscribers: string;
  monthlyRevenue: string;
  annualRevenue: string;
  icon: 'star' | 'award' | 'layers';
  growth?: string;
  description?: string;
  renewalRate?: string;
  tierColor?: string;
}

export interface EnterpriseMetrics {
  totalRevenue: string;
  subscribers: string;
  renewalRate: string;
  planName: string;
  description: string;
  tag: string;
}

export const enterpriseMetrics: EnterpriseMetrics = {
  tag: 'PRIMARY ASSET',
  planName: 'Enterprise Plan',
  description:
    'Comprehensive institutional coverage with 24/7 dedicated support and unlimited seat architecture.',
  totalRevenue: '₹29.40 Cr',
  subscribers: '3,641',
  renewalRate: '98.4%',
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'platinum-annual',
    name: 'Platinum Annual',
    subscribers: '1,245',
    monthlyRevenue: '₹2.45 Cr',
    annualRevenue: '₹29.40 Cr',
    icon: 'star',
    growth: '+18.4%',
    description:
      'High-tier institutional license with multi-district GIS integration and priority underwriting.',
    renewalRate: '99.1%',
  },
  {
    id: 'growth-plan',
    name: 'Growth Plan',
    subscribers: '1008',
    monthlyRevenue: '₹1.06 Cr',
    annualRevenue: '₹12.72 Cr',
    icon: 'award',
    growth: '+12.6%',
    description:
      'Mid-market institutional tier covering standard registry automation and audit tools.',
    renewalRate: '97.8%',
  },
  {
    id: 'starter-plan',
    name: 'Starter Plan',
    subscribers: '968',
    monthlyRevenue: '₹4.45 Cr',
    annualRevenue: '₹5.40 Cr',
    icon: 'layers',
    growth: '+8.2%',
    description:
      'Essential operational tier providing verified registry access and escrow processing.',
    renewalRate: '96.5%',
  },
];

export interface LandHolding {
  farmlandId: string;
  surveyNumber: string;
  mandal: string;
  district: string;
  acres: string;
  createdDate: string;
  status: string;
  passbookNo?: string;
  landUse?: string;
  verificationStatus?: 'Dharani Verified' | 'Registry Synchronized';
}

export interface InvoiceRecord {
  invoiceId: string;
  date: string;
  amount: string;
  cycle: string;
  paymentMethod: string;
  status: 'Paid' | 'Processing';
}

export interface FarmlandDocument {
  id: string;
  farmlandId: string;
  location: string;
  acres: string;
  unlockedDate: string;
  status: 'Unlocked' | 'Verified' | 'Active';
  surveyNumber?: string;
  name?: string;
  parcel?: string;
  category?: string;
  fileSize?: string;
  docNumber?: string;
}

export interface SubscriberRecord {
  id: string;
  name: string;
  avatarUrl: string;
  amountPaid: string;
  cycle: 'ANNUAL' | 'MONTHLY';
  startDate: string;
  endDate: string;
  status: 'Active' | 'Pending Renewal';
  planId: string;
  email?: string;
  quota?: string;
  phone?: string;
  company?: string;
  customerId?: string;
  memberSince?: string;
  accountManager?: string;
  dharaniStatus?: string;
  passbookNumber?: string;
  totalAreaCovered?: string;
  holdings?: LandHolding[];
  invoices?: InvoiceRecord[];
  documents?: FarmlandDocument[];
  availableCredits?: number;
  totalCredits?: number;
}

export const defaultSubscribers: SubscriberRecord[] = [
  {
    id: 'sub-1',
    name: 'Mahesh E',
    avatarUrl: '/assets/lead-1.png',
    amountPaid: '₹2,45,000',
    cycle: 'ANNUAL',
    startDate: 'OCT 12, 2023',
    endDate: 'OCT 12, 2023',
    status: 'Active',
    planId: 'platinum-annual',
    email: 'mahesh.e@glc-enterprises.in',
    quota: 'Unlimited Seats • Priority GIS',
  },
  {
    id: 'sub-2',
    name: 'Nithin D',
    avatarUrl: '/assets/lead-2.png',
    amountPaid: '₹2,45,000',
    cycle: 'ANNUAL',
    startDate: 'JAN 05, 2024',
    endDate: 'OCT 12, 2023',
    status: 'Active',
    planId: 'platinum-annual',
    email: 'nithin.d@glc-holdings.in',
    quota: 'Unlimited Seats • Priority GIS',
  },
  {
    id: 'sub-3',
    name: 'Priya Varma',
    avatarUrl: '/assets/avatar_test3.png',
    amountPaid: '₹2,45,000',
    cycle: 'ANNUAL',
    startDate: 'NOV 22, 2023',
    endDate: 'OCT 12, 2023',
    status: 'Active',
    planId: 'platinum-annual',
    email: 'priya.varma@agriland-fund.in',
    quota: 'Unlimited Seats • Priority GIS',
  },
  {
    id: 'sub-4',
    name: 'Rahul Sharma',
    avatarUrl: '/assets/avatar_test2.png',
    amountPaid: '₹2,45,000',
    cycle: 'ANNUAL',
    startDate: 'DEC 15, 2023',
    endDate: 'OCT 12, 2023',
    status: 'Active',
    planId: 'platinum-annual',
    email: 'rahul.s@deccanfarms.in',
    quota: 'Unlimited Seats • Priority GIS',
  },
  // Growth Plan Subscribers
  {
    id: 'sub-growth-1',
    name: 'Suresh Nair',
    avatarUrl: '/assets/lead-1.png',
    amountPaid: '₹1,26,000',
    cycle: 'ANNUAL',
    startDate: 'NOV 10, 2023',
    endDate: 'NOV 10, 2024',
    status: 'Active',
    planId: 'growth-plan',
    email: 'suresh.nair@nairagro.in',
    quota: '50 Institutional Seats • Automated Registry',
  },
  {
    id: 'sub-growth-2',
    name: 'Ananya Rao',
    avatarUrl: '/assets/avatar_test1.png',
    amountPaid: '₹1,26,000',
    cycle: 'ANNUAL',
    startDate: 'DEC 01, 2023',
    endDate: 'DEC 01, 2024',
    status: 'Active',
    planId: 'growth-plan',
    email: 'ananya.rao@raocorp.in',
    quota: '50 Institutional Seats • Automated Registry',
  },
  {
    id: 'sub-growth-3',
    name: 'Karthik V',
    avatarUrl: '/assets/lead-2.png',
    amountPaid: '₹1,26,000',
    cycle: 'ANNUAL',
    startDate: 'JAN 15, 2024',
    endDate: 'JAN 15, 2025',
    status: 'Active',
    planId: 'growth-plan',
    email: 'karthik.v@deccanbuild.in',
    quota: '50 Institutional Seats • Automated Registry',
  },
  {
    id: 'sub-growth-4',
    name: 'Deepa Patel',
    avatarUrl: '/assets/avatar_test3.png',
    amountPaid: '₹1,26,000',
    cycle: 'ANNUAL',
    startDate: 'FEB 20, 2024',
    endDate: 'FEB 20, 2025',
    status: 'Active',
    planId: 'growth-plan',
    email: 'deepa.p@patelfarms.in',
    quota: '50 Institutional Seats • Automated Registry',
  },
  // Starter Plan Subscribers
  {
    id: 'sub-starter-1',
    name: 'Vikram Joshi',
    avatarUrl: '/assets/avatar_test2.png',
    amountPaid: '₹55,000',
    cycle: 'ANNUAL',
    startDate: 'OCT 05, 2023',
    endDate: 'OCT 05, 2024',
    status: 'Active',
    planId: 'starter-plan',
    email: 'vikram.j@joshiland.in',
    quota: '10 Operator Seats • Escrow Processing',
  },
  {
    id: 'sub-starter-2',
    name: 'Swathi Mehra',
    avatarUrl: '/assets/avatar_test3.png',
    amountPaid: '₹55,000',
    cycle: 'ANNUAL',
    startDate: 'NOV 18, 2023',
    endDate: 'NOV 18, 2024',
    status: 'Active',
    planId: 'starter-plan',
    email: 'swathi.m@mehradevelopers.in',
    quota: '10 Operator Seats • Escrow Processing',
  },
  {
    id: 'sub-starter-3',
    name: 'Arun Teja',
    avatarUrl: '/assets/lead-1.png',
    amountPaid: '₹55,000',
    cycle: 'ANNUAL',
    startDate: 'DEC 28, 2023',
    endDate: 'DEC 28, 2024',
    status: 'Active',
    planId: 'starter-plan',
    email: 'arun.teja@tejaproperties.in',
    quota: '10 Operator Seats • Escrow Processing',
  },
  {
    id: 'sub-starter-4',
    name: 'Meera Sen',
    avatarUrl: '/assets/avatar_test1.png',
    amountPaid: '₹55,000',
    cycle: 'ANNUAL',
    startDate: 'FEB 10, 2024',
    endDate: 'FEB 10, 2025',
    status: 'Active',
    planId: 'starter-plan',
    email: 'meera.sen@senfarmland.in',
    quota: '10 Operator Seats • Escrow Processing',
  },
];

export function getSubscribersForPlan(planId: string): SubscriberRecord[] {
  const matched = defaultSubscribers.filter((s) => s.planId === planId);
  return matched.length > 0 ? matched : defaultSubscribers.slice(0, 4);
}

export function getSubscriberDetails(subscriber: SubscriberRecord): Required<SubscriberRecord> {
  const defaultHoldings: LandHolding[] = [
    {
      farmlandId: 'GLCSOS1',
      surveyNumber: 'Sy. No. 412/A',
      mandal: 'Shamshabad',
      district: 'Rangareddy',
      acres: '24.50 Acres',
      createdDate: 'OCT 12, 2023',
      status: 'Active',
      passbookNo: subscriber.passbookNumber || 'T28190048123',
      landUse: 'Commercial Agroforestry',
      verificationStatus: 'Dharani Verified',
    },
    {
      farmlandId: 'GLCSOS2',
      surveyNumber: 'Sy. No. 89/B',
      mandal: 'Maheshwaram',
      district: 'Rangareddy',
      acres: '18.25 Acres',
      createdDate: 'NOV 18, 2023',
      status: 'Active',
      passbookNo: subscriber.passbookNumber || 'T28190048123',
      landUse: 'High-Yield Horticulture',
      verificationStatus: 'Dharani Verified',
    },
    {
      farmlandId: 'GLCSOS3',
      surveyNumber: 'Sy. No. 204/C',
      mandal: 'Ibrahimpatnam',
      district: 'Rangareddy',
      acres: '21.45 Acres',
      createdDate: 'DEC 15, 2023',
      status: 'Active',
      passbookNo: subscriber.passbookNumber || 'T28190048123',
      landUse: 'Managed Farmland Reserve',
      verificationStatus: 'Registry Synchronized',
    },
  ];

  const defaultInvoices: InvoiceRecord[] = [
    {
      invoiceId: `INV-${subscriber.id.toUpperCase()}-2023`,
      date: subscriber.startDate,
      amount: subscriber.amountPaid,
      cycle: `${subscriber.cycle === 'ANNUAL' ? 'Annual Fiscal Period' : 'Monthly Retainer'}`,
      paymentMethod: 'RTGS Corporate Escrow',
      status: 'Paid',
    },
    {
      invoiceId: `INV-${subscriber.id.toUpperCase()}-2022`,
      date: 'OCT 10, 2022',
      amount: subscriber.amountPaid,
      cycle: 'Previous Annual Fiscal',
      paymentMethod: 'Corporate NetBanking',
      status: 'Paid',
    },
  ];

  const defaultDocuments: FarmlandDocument[] = [
    {
      id: 'DOC-101',
      farmlandId: 'GLCSOS1',
      surveyNumber: 'Sy. No. 412/A',
      location: 'Shamshabad, Rangareddy',
      acres: '24.50 Acres',
      name: 'Dharani Digital RoR-1B Title Record',
      parcel: 'Sy. No. 412/A · Shamshabad',
      category: 'Title & Ownership',
      unlockedDate: subscriber.startDate || 'OCT 12, 2023',
      fileSize: '2.4 MB',
      status: 'Unlocked',
      docNumber: `DHR-1B-${subscriber.passbookNumber || 'T28190048123'}`,
    },
    {
      id: 'DOC-102',
      farmlandId: 'GLCSOS2',
      surveyNumber: 'Sy. No. 412/B',
      location: 'Shamshabad, Rangareddy',
      acres: '12.00 Acres',
      name: '30-Year Encumbrance Certificate (Nil-EC)',
      parcel: 'Sy. No. 412/B · Shamshabad',
      category: 'Encumbrance (EC)',
      unlockedDate: 'NOV 04, 2023',
      fileSize: '3.1 MB',
      status: 'Unlocked',
      docNumber: 'EC-REG-2023-8841',
    },
    {
      id: 'DOC-103',
      farmlandId: 'GLCSOS3',
      surveyNumber: 'Sy. No. 89/B',
      location: 'Maheshwaram, Rangareddy',
      acres: '18.25 Acres',
      name: 'Cadastral Tippon & Geo-FMB Boundary Map',
      parcel: 'Sy. No. 89/B · Maheshwaram',
      category: 'Cadastral Survey Map',
      unlockedDate: 'NOV 18, 2023',
      fileSize: '5.8 MB',
      status: 'Unlocked',
      docNumber: 'FMB-MH-89B-2023',
    },
    {
      id: 'DOC-104',
      farmlandId: 'GLCSOS4',
      surveyNumber: 'Sy. No. 204/C',
      location: 'Ibrahimpatnam, Rangareddy',
      acres: '21.45 Acres',
      name: 'Sec 22-A Prohibited Land Verification Report',
      parcel: 'Sy. No. 204/C · Ibrahimpatnam',
      category: '22-A Clearance',
      unlockedDate: 'DEC 02, 2023',
      fileSize: '1.9 MB',
      status: 'Unlocked',
      docNumber: 'CLR-22A-TS-9021',
    },
    {
      id: 'DOC-105',
      farmlandId: 'GLCSOS5',
      surveyNumber: 'Sy. No. 510/D',
      location: 'Chevella, Rangareddy',
      acres: '15.80 Acres',
      name: 'Soil Chemistry & Aquifer Telemetry Assessment',
      parcel: 'Sy. No. 510/D · Chevella',
      category: 'Soil & Hydro Telemetry',
      unlockedDate: 'DEC 15, 2023',
      fileSize: '4.2 MB',
      status: 'Unlocked',
      docNumber: 'TEL-GEO-204C-23',
    },
  ];

  return {
    ...subscriber,
    email: subscriber.email || `${subscriber.name.toLowerCase().replace(/\s+/g, '.')}@glc-client.in`,
    quota: subscriber.quota || 'Institutional License • Multi-District GIS',
    phone: subscriber.phone || '+91 98492 88412',
    company: subscriber.company || `${subscriber.name.split(' ')[0]} Agro Holdings Ltd`,
    customerId: subscriber.customerId || `GLC-SUB-${subscriber.id.toUpperCase()}`,
    memberSince: subscriber.memberSince || 'October 2022',
    accountManager: subscriber.accountManager || 'Rajesh Kumar (GLC Institutional Desk)',
    dharaniStatus: subscriber.dharaniStatus || 'Verified & Synchronized (RoR-1B)',
    passbookNumber: subscriber.passbookNumber || 'T28190048123',
    totalAreaCovered: subscriber.totalAreaCovered || '64.20 Acres',
    holdings: subscriber.holdings || defaultHoldings,
    invoices: subscriber.invoices || defaultInvoices,
    documents: subscriber.documents || defaultDocuments,
    availableCredits: subscriber.availableCredits ?? 4,
    totalCredits: subscriber.totalCredits ?? 5,
  };
}

