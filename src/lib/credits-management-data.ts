export interface CreditTransaction {
  id: string;
  date: string;
  landId: string;
  type: 'Credit Allocation' | 'Credit Consumption' | 'Cash Redemption';
  credits: number;
  cashEquivalent: string;
  status: 'Completed' | 'Pending' | 'Authorized';
}

export type CreditActivityCategory =
  | 'Land Based Credits'
  | 'Referral Credits'
  | 'Buyer Lead Credits'
  | 'Credit Redemptions';

export interface LandCreditActivity {
  id: string;
  landId: string;
  category: CreditActivityCategory;
  creditType: string;
  credits: number;
  earnedOn: string;
  cashEarned: string;
}

export const sampleLandCreditActivities: LandCreditActivity[] = [
  {
    id: 'act-1',
    landId: 'GLC SOS234',
    category: 'Land Based Credits',
    creditType: 'Initial Land Sourcing',
    credits: 10,
    earnedOn: '24 JUNE 2026',
    cashEarned: '20,000',
  },
  {
    id: 'act-2',
    landId: 'GLC SOS234',
    category: 'Land Based Credits',
    creditType: 'Initial Land Sourcing',
    credits: 30,
    earnedOn: '24 JUNE 2026',
    cashEarned: '20,000',
  },
  {
    id: 'act-3',
    landId: 'GLC SOS234',
    category: 'Land Based Credits',
    creditType: 'Initial Land Sourcing',
    credits: 5,
    earnedOn: '24 JUNE 2026',
    cashEarned: '20,000',
  },
  {
    id: 'act-4',
    landId: 'GLC KND108',
    category: 'Land Based Credits',
    creditType: 'Boundary Verification',
    credits: 15,
    earnedOn: '18 JUNE 2026',
    cashEarned: '30,000',
  },
  {
    id: 'act-5',
    landId: 'GLC WAL055',
    category: 'Referral Credits',
    creditType: 'Direct Peer Referral',
    credits: 25,
    earnedOn: '12 JUNE 2026',
    cashEarned: '50,000',
  },
  {
    id: 'act-6',
    landId: 'GLC TNK012',
    category: 'Buyer Lead Credits',
    creditType: 'Institutional Lead Conversion',
    credits: 40,
    earnedOn: '05 JUNE 2026',
    cashEarned: '80,000',
  },
  {
    id: 'act-7',
    landId: 'GLC VZG089',
    category: 'Credit Redemptions',
    creditType: 'Quarterly Settlement Payout',
    credits: 50,
    earnedOn: '01 JUNE 2026',
    cashEarned: '1,00,000',
  },
];

export interface AgentCredit {
  id: string;
  agentId: string;
  name: string;
  avatarUrl: string;
  location: string;
  region?: string;
  district?: string;
  mandal?: string;
  dateTime: string;
  totalCredits: number;
  creditsUsed: number;
  creditsRemaining: number;
  cashEarned: number;
  formattedCashEarned: string;
  phone: string;
  email: string;
  role: string;
  status: 'Authorized' | 'Pending';
  entityType?: 'Agent' | 'User';
  isTopPerformer?: boolean;
  isVerified?: boolean;
  activities?: LandCreditActivity[];
  recentTransactions?: CreditTransaction[];
}

export const agentCredits: AgentCredit[] = [
  {
    id: 'cred-1',
    agentId: 'ID-87348',
    name: 'Ram Varma',
    avatarUrl: '/assets/agent-1.png',
    location: 'WEST GODAVARI, TANUKU',
    dateTime: '6th Oct – 12:53 PM',
    totalCredits: 450,
    creditsUsed: 120,
    creditsRemaining: 330,
    cashEarned: 80000,
    formattedCashEarned: '₹80,000.00',
    phone: '+91 98490 12845',
    email: 'ram.varma@greenlandcapital.in',
    role: 'Senior Field Partner',
    status: 'Authorized',
    entityType: 'Agent',
    recentTransactions: [
      {
        id: 'tx-101',
        date: '06 Oct 2026, 12:30 PM',
        landId: 'GLC SOS 01',
        type: 'Credit Consumption',
        credits: 40,
        cashEquivalent: '₹26,666.67',
        status: 'Completed',
      },
      {
        id: 'tx-102',
        date: '04 Oct 2026, 03:15 PM',
        landId: 'GLC KND 03',
        type: 'Credit Consumption',
        credits: 80,
        cashEquivalent: '₹53,333.33',
        status: 'Completed',
      },
      {
        id: 'tx-103',
        date: '01 Oct 2026, 10:00 AM',
        landId: 'GLC WAL 02',
        type: 'Credit Allocation',
        credits: 450,
        cashEquivalent: '₹3,00,000.00',
        status: 'Authorized',
      },
    ],
  },
  {
    id: 'cred-2',
    agentId: 'ID-34934',
    name: 'Ananya Rao',
    avatarUrl: '/assets/agent-2.png',
    location: 'EAST GODAVARI, KAKINADA',
    dateTime: '7th Oct – 10:15 AM',
    totalCredits: 450,
    creditsUsed: 120,
    creditsRemaining: 330,
    cashEarned: 80000,
    formattedCashEarned: '₹80,000.00',
    phone: '+91 94402 78321',
    email: 'ananya.rao@greenlandcapital.in',
    role: 'Lead Farmland Specialist',
    status: 'Authorized',
    entityType: 'Agent',
    recentTransactions: [
      {
        id: 'tx-201',
        date: '07 Oct 2026, 09:45 AM',
        landId: 'GLC KAK 04',
        type: 'Credit Consumption',
        credits: 60,
        cashEquivalent: '₹40,000.00',
        status: 'Completed',
      },
      {
        id: 'tx-202',
        date: '05 Oct 2026, 02:20 PM',
        landId: 'GLC RJY 01',
        type: 'Credit Consumption',
        credits: 60,
        cashEquivalent: '₹40,000.00',
        status: 'Completed',
      },
    ],
  },
  {
    id: 'cred-3',
    agentId: 'ID-39443',
    name: 'K. Sastry',
    avatarUrl: '/assets/agent-3.png',
    location: 'VIZAG, ANAKAPALLE',
    dateTime: '8th Oct – 09:30 AM',
    totalCredits: 450,
    creditsUsed: 120,
    creditsRemaining: 330,
    cashEarned: 80000,
    formattedCashEarned: '₹80,000.00',
    phone: '+91 97033 45612',
    email: 'k.sastry@greenlandcapital.in',
    role: 'Regional Deal Associate',
    status: 'Authorized',
    entityType: 'Agent',
    recentTransactions: [
      {
        id: 'tx-301',
        date: '08 Oct 2026, 09:10 AM',
        landId: 'GLC VZG 09',
        type: 'Credit Consumption',
        credits: 120,
        cashEquivalent: '₹80,000.00',
        status: 'Completed',
      },
    ],
  },
  {
    id: 'cred-4',
    agentId: 'ID-93842',
    name: 'Ram Varma',
    avatarUrl: '/assets/agent-4.png',
    location: 'WEST GODAVARI, TANUKU',
    dateTime: '6th Oct – 12:53 PM',
    totalCredits: 450,
    creditsUsed: 120,
    creditsRemaining: 330,
    cashEarned: 80000,
    formattedCashEarned: '₹80,000.00',
    phone: '+91 98495 99120',
    email: 'r.varma.tanuku@greenlandcapital.in',
    role: 'Field Agent Partner',
    status: 'Pending',
    entityType: 'Agent',
    recentTransactions: [
      {
        id: 'tx-401',
        date: '06 Oct 2026, 11:00 AM',
        landId: 'GLC TNK 02',
        type: 'Credit Consumption',
        credits: 120,
        cashEquivalent: '₹80,000.00',
        status: 'Completed',
      },
    ],
  },
  {
    id: 'cred-5',
    agentId: 'ID-84539',
    name: 'Ananya Rao',
    avatarUrl: '/assets/agent-5.png',
    location: 'EAST GODAVARI, KAKINADA',
    dateTime: '7th Oct – 10:15 AM',
    totalCredits: 450,
    creditsUsed: 120,
    creditsRemaining: 330,
    cashEarned: 80000,
    formattedCashEarned: '₹80,000.00',
    phone: '+91 98481 33452',
    email: 'ananya.kakinada@greenlandcapital.in',
    role: 'Senior Acquisition Agent',
    status: 'Authorized',
    entityType: 'Agent',
    recentTransactions: [
      {
        id: 'tx-501',
        date: '07 Oct 2026, 10:00 AM',
        landId: 'GLC KAK 07',
        type: 'Credit Consumption',
        credits: 120,
        cashEquivalent: '₹80,000.00',
        status: 'Completed',
      },
    ],
  },
  {
    id: 'cred-6',
    agentId: 'ID-87348',
    name: 'Ram Varma',
    avatarUrl: '/assets/agent-6.png',
    location: 'WEST GODAVARI, TANUKU',
    dateTime: '6th Oct – 12:53 PM',
    totalCredits: 450,
    creditsUsed: 120,
    creditsRemaining: 330,
    cashEarned: 80000,
    formattedCashEarned: '₹80,000.00',
    phone: '+91 98662 55431',
    email: 'ram.varma2@greenlandcapital.in',
    role: 'Field Sales Associate',
    status: 'Pending',
    entityType: 'Agent',
    recentTransactions: [
      {
        id: 'tx-601',
        date: '06 Oct 2026, 12:45 PM',
        landId: 'GLC TNK 05',
        type: 'Credit Consumption',
        credits: 120,
        cashEquivalent: '₹80,000.00',
        status: 'Completed',
      },
    ],
  },
  {
    id: 'cred-7',
    agentId: 'ID-51209',
    name: 'Suresh Reddy',
    avatarUrl: '/assets/agent-1.png',
    location: 'GUNTUR, TENALI',
    dateTime: '9th Oct – 02:45 PM',
    totalCredits: 600,
    creditsUsed: 240,
    creditsRemaining: 360,
    cashEarned: 160000,
    formattedCashEarned: '₹1,60,000.00',
    phone: '+91 99882 11223',
    email: 'suresh.reddy@greenlandcapital.in',
    role: 'Senior Cluster Manager',
    status: 'Authorized',
    entityType: 'Agent',
    recentTransactions: [
      {
        id: 'tx-701',
        date: '09 Oct 2026, 02:00 PM',
        landId: 'GLC GNT 11',
        type: 'Credit Consumption',
        credits: 240,
        cashEquivalent: '₹1,60,000.00',
        status: 'Completed',
      },
    ],
  },
  {
    id: 'cred-8',
    agentId: 'ID-62391',
    name: 'Pooja Hegde',
    avatarUrl: '/assets/agent-2.png',
    location: 'KRISHNA, VIJAYAWADA',
    dateTime: '10th Oct – 11:20 AM',
    totalCredits: 500,
    creditsUsed: 150,
    creditsRemaining: 350,
    cashEarned: 100000,
    formattedCashEarned: '₹1,00,000.00',
    phone: '+91 91234 56789',
    email: 'pooja.h@greenlandcapital.in',
    role: 'Channel Partner Head',
    status: 'Authorized',
    entityType: 'Agent',
    recentTransactions: [
      {
        id: 'tx-801',
        date: '10 Oct 2026, 11:00 AM',
        landId: 'GLC VJA 03',
        type: 'Credit Consumption',
        credits: 150,
        cashEquivalent: '₹1,00,000.00',
        status: 'Completed',
      },
    ],
  },
];

export const userCredits: AgentCredit[] = [
  {
    id: 'usr-1',
    agentId: 'USR-94812',
    name: 'Dr. Ramesh Gupta',
    avatarUrl: '/assets/avatar.png',
    location: 'HYDERABAD, GACHIBOWLI',
    dateTime: '5th Oct – 11:20 AM',
    totalCredits: 600,
    creditsUsed: 180,
    creditsRemaining: 420,
    cashEarned: 120000,
    formattedCashEarned: '₹1,20,000.00',
    phone: '+91 98480 77123',
    email: 'ramesh.gupta@medcorp.in',
    role: 'Platinum Farmland Investor',
    status: 'Authorized',
    entityType: 'User',
    recentTransactions: [
      {
        id: 'tx-u1',
        date: '05 Oct 2026, 11:00 AM',
        landId: 'GLC SOS 01',
        type: 'Credit Consumption',
        credits: 60,
        cashEquivalent: '₹40,000.00',
        status: 'Completed',
      },
    ],
  },
  {
    id: 'usr-2',
    agentId: 'USR-38194',
    name: 'Sunita Verma',
    avatarUrl: '/assets/avatar_test1.png',
    location: 'BENGALURU, WHITEFIELD',
    dateTime: '6th Oct – 03:15 PM',
    totalCredits: 400,
    creditsUsed: 100,
    creditsRemaining: 300,
    cashEarned: 75000,
    formattedCashEarned: '₹75,000.00',
    phone: '+91 99001 23456',
    email: 'sunita.v@techventures.io',
    role: 'Growth Plan Subscriber',
    status: 'Authorized',
    entityType: 'User',
    recentTransactions: [
      {
        id: 'tx-u2',
        date: '06 Oct 2026, 03:00 PM',
        landId: 'GLC KND 03',
        type: 'Credit Consumption',
        credits: 100,
        cashEquivalent: '₹75,000.00',
        status: 'Completed',
      },
    ],
  },
  {
    id: 'usr-3',
    agentId: 'USR-82015',
    name: 'Naveen Chandra',
    avatarUrl: '/assets/avatar_test2.png',
    location: 'VIZAG, MVP COLONY',
    dateTime: '7th Oct – 09:40 AM',
    totalCredits: 350,
    creditsUsed: 120,
    creditsRemaining: 230,
    cashEarned: 90000,
    formattedCashEarned: '₹90,000.00',
    phone: '+91 97003 44556',
    email: 'naveen.chandra@gmail.com',
    role: 'Agri-Pool Member',
    status: 'Authorized',
    entityType: 'User',
    recentTransactions: [
      {
        id: 'tx-u3',
        date: '07 Oct 2026, 09:30 AM',
        landId: 'GLC VZG 09',
        type: 'Credit Consumption',
        credits: 120,
        cashEquivalent: '₹90,000.00',
        status: 'Completed',
      },
    ],
  },
  {
    id: 'usr-4',
    agentId: 'USR-55219',
    name: 'Kavitha Reddy',
    avatarUrl: '/assets/avatar_test3.png',
    location: 'VIJAYAWADA, BENZ CIRCLE',
    dateTime: '8th Oct – 04:10 PM',
    totalCredits: 800,
    creditsUsed: 300,
    creditsRemaining: 500,
    cashEarned: 250000,
    formattedCashEarned: '₹2,50,000.00',
    phone: '+91 98850 11992',
    email: 'kavitha.reddy@reddyinfra.com',
    role: 'Institutional Buyer',
    status: 'Authorized',
    entityType: 'User',
    recentTransactions: [
      {
        id: 'tx-u4',
        date: '08 Oct 2026, 04:00 PM',
        landId: 'GLC VJA 03',
        type: 'Credit Consumption',
        credits: 300,
        cashEquivalent: '₹2,50,000.00',
        status: 'Completed',
      },
    ],
  },
  {
    id: 'usr-5',
    agentId: 'USR-71642',
    name: 'Deepak Nair',
    avatarUrl: '/assets/lead-1.png',
    location: 'WARANGAL, KAZIPET',
    dateTime: '9th Oct – 01:25 PM',
    totalCredits: 300,
    creditsUsed: 80,
    creditsRemaining: 220,
    cashEarned: 60000,
    formattedCashEarned: '₹60,000.00',
    phone: '+91 94412 88334',
    email: 'deepak.nair@nairagri.in',
    role: 'Farmland Owner',
    status: 'Pending',
    entityType: 'User',
    recentTransactions: [
      {
        id: 'tx-u5',
        date: '09 Oct 2026, 01:00 PM',
        landId: 'GLC TNK 02',
        type: 'Credit Consumption',
        credits: 80,
        cashEquivalent: '₹60,000.00',
        status: 'Completed',
      },
    ],
  },
  {
    id: 'usr-6',
    agentId: 'USR-63028',
    name: 'Priya Sharma',
    avatarUrl: '/assets/lead-2.png',
    location: 'GUNTUR, BRODIPET',
    dateTime: '10th Oct – 10:50 AM',
    totalCredits: 450,
    creditsUsed: 150,
    creditsRemaining: 300,
    cashEarned: 100000,
    formattedCashEarned: '₹1,00,000.00',
    phone: '+91 98765 12098',
    email: 'priya.sharma@sharmaconsult.com',
    role: 'Verified Subscriber',
    status: 'Authorized',
    entityType: 'User',
    recentTransactions: [
      {
        id: 'tx-u6',
        date: '10 Oct 2026, 10:30 AM',
        landId: 'GLC GNT 11',
        type: 'Credit Consumption',
        credits: 150,
        cashEquivalent: '₹1,00,000.00',
        status: 'Completed',
      },
    ],
  },
];
