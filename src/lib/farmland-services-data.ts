export interface ServiceCategory {
  id: string;
  name: string;
  revenue: string;
  icon: 'home' | 'leaf' | 'shield' | 'droplet';
  description: string;
}

export interface ZoneServiceStat {
  id: string;
  district: string;
  mandal: string;
  revenue: string;
  completedProjects: number;
  pendingRevenue: string;
  ongoingProjects: number;
  avgDuration: string;
}

export interface OrganicFarmingStat {
  id: string;
  district: string;
  mandal: string;
  efficiency: string;
  revenue: string;
  farms: number;
  liquidity: string;
  organicShare: string;
  category: 'standard' | 'timber';
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'farmhouse-construction',
    name: 'Farmhouse Construction',
    revenue: '₹1.10 Cr',
    icon: 'home',
    description: 'Turnkey eco-villa and luxury farmhouse development contracts across verified plots.',
  },
  {
    id: 'organic-farming',
    name: 'Organic Farming Revenue',
    revenue: '₹0.65 Cr',
    icon: 'leaf',
    description: 'High-yield horticulture, drip irrigation, and managed agro-forestry services.',
  },
  {
    id: 'fencing-security',
    name: 'Fencing & Security',
    revenue: '₹0.55 Cr',
    icon: 'shield',
    description: 'Perimeter chain-link solar fencing, remote camera surveillance, and boundary markers.',
  },
  {
    id: 'borewell-drilling',
    name: 'Borewell Drilling',
    revenue: '₹0.40 Cr',
    icon: 'droplet',
    description: 'Geological water survey, deep rotary drilling, and pump energization projects.',
  },
];

export const zoneServiceStats: ZoneServiceStat[] = [
  {
    id: 'zone-1',
    district: 'Mahabubnagar',
    mandal: 'Jadcherla',
    revenue: '₹19.60 L',
    completedProjects: 56,
    pendingRevenue: '₹4.50 L',
    ongoingProjects: 12,
    avgDuration: '4.5 Months',
  },
  {
    id: 'zone-2',
    district: 'Rangareddy',
    mandal: 'Chevella',
    revenue: '₹24.80 L',
    completedProjects: 68,
    pendingRevenue: '₹5.20 L',
    ongoingProjects: 15,
    avgDuration: '4.2 Months',
  },
  {
    id: 'zone-3',
    district: 'Sangareddy',
    mandal: 'Zaheerabad',
    revenue: '₹18.40 L',
    completedProjects: 44,
    pendingRevenue: '₹3.80 L',
    ongoingProjects: 9,
    avgDuration: '5.0 Months',
  },
  {
    id: 'zone-4',
    district: 'Karimnagar',
    mandal: 'Choppadandi',
    revenue: '₹16.50 L',
    completedProjects: 38,
    pendingRevenue: '₹2.90 L',
    ongoingProjects: 8,
    avgDuration: '3.8 Months',
  },
  {
    id: 'zone-5',
    district: 'Nalgonda',
    mandal: 'Choutuppal',
    revenue: '₹15.20 L',
    completedProjects: 32,
    pendingRevenue: '₹3.10 L',
    ongoingProjects: 7,
    avgDuration: '4.0 Months',
  },
  {
    id: 'zone-6',
    district: 'Siddipet',
    mandal: 'Gajwel',
    revenue: '₹14.90 L',
    completedProjects: 29,
    pendingRevenue: '₹2.40 L',
    ongoingProjects: 6,
    avgDuration: '3.6 Months',
  },
];

export const organicFarmingStats: OrganicFarmingStat[] = [
  {
    id: 'org-1',
    district: 'Mahabubnagar',
    mandal: 'Jadcherla Region',
    efficiency: '82%',
    revenue: '₹19.60 L',
    farms: 12,
    liquidity: '₹4.50 L',
    organicShare: '75%',
    category: 'standard',
  },
  {
    id: 'org-2',
    district: 'Rangareddy',
    mandal: 'Chevella Valley',
    efficiency: '88%',
    revenue: '₹22.40 L',
    farms: 16,
    liquidity: '₹5.80 L',
    organicShare: '85%',
    category: 'standard',
  },
  {
    id: 'org-3',
    district: 'Sangareddy',
    mandal: 'Zaheerabad Belt',
    efficiency: '79%',
    revenue: '₹14.80 L',
    farms: 10,
    liquidity: '₹3.60 L',
    organicShare: '70%',
    category: 'standard',
  },
  {
    id: 'org-4',
    district: 'Karimnagar',
    mandal: 'Choppadandi Basin',
    efficiency: '85%',
    revenue: '₹12.50 L',
    farms: 9,
    liquidity: '₹2.90 L',
    organicShare: '80%',
    category: 'standard',
  },
  {
    id: 'org-5',
    district: 'Nalgonda',
    mandal: 'Choutuppal Orchards',
    efficiency: '76%',
    revenue: '₹11.20 L',
    farms: 8,
    liquidity: '₹2.50 L',
    organicShare: '68%',
    category: 'standard',
  },
  {
    id: 'org-6',
    district: 'Siddipet',
    mandal: 'Gajwel Agrozone',
    efficiency: '84%',
    revenue: '₹10.90 L',
    farms: 7,
    liquidity: '₹2.30 L',
    organicShare: '78%',
    category: 'standard',
  },
  // Premium Timber category
  {
    id: 'org-t1',
    district: 'Khammam',
    mandal: 'Kothagudem Forest Belt',
    efficiency: '91%',
    revenue: '₹28.50 L',
    farms: 8,
    liquidity: '₹6.20 L',
    organicShare: '90%',
    category: 'timber',
  },
  {
    id: 'org-t2',
    district: 'Adilabad',
    mandal: 'Asifabad Teak Reserve',
    efficiency: '89%',
    revenue: '₹24.10 L',
    farms: 6,
    liquidity: '₹5.10 L',
    organicShare: '86%',
    category: 'timber',
  },
  {
    id: 'org-t3',
    district: 'Warangal',
    mandal: 'Mulugu Sandalwood Zone',
    efficiency: '94%',
    revenue: '₹32.00 L',
    farms: 5,
    liquidity: '₹7.40 L',
    organicShare: '92%',
    category: 'timber',
  },
];

export interface PaymentStage {
  id: string;
  stageName: string;
  date: string;
  amount: string;
  status: 'Completed' | 'Pending';
}

export interface ConstructionProject {
  id: string;
  orderNumber: string;
  landId: string;
  customerName: string;
  customerTier?: string;
  area: string;
  cost: string;
  amountPaid: string;
  pending: string;
  status: 'Completed' | 'Ongoing';
  payments?: PaymentStage[];
}

export const defaultConstructionProjects: ConstructionProject[] = [
  {
    id: 'proj-1',
    orderNumber: '01',
    landId: 'GLC SOS 01',
    customerName: 'Ravi Kumar',
    customerTier: 'Premium Member',
    area: '5 Acres',
    cost: '₹8,00,000',
    amountPaid: '₹8,00,000',
    pending: '₹0',
    status: 'Completed',
    payments: [
      {
        id: 'pay-1',
        stageName: 'Advance Payment',
        date: '05 Jan 2024',
        amount: '₹2,00,000',
        status: 'Completed',
      },
      {
        id: 'pay-2',
        stageName: 'Foundation Stage',
        date: '20 Feb 2024',
        amount: '₹2,00,000',
        status: 'Completed',
      },
      {
        id: 'pay-3',
        stageName: 'Final Payment',
        date: '10 Jun 2024',
        amount: '₹2,00,000',
        status: 'Completed',
      },
    ],
  },
  {
    id: 'proj-2',
    orderNumber: '02',
    landId: 'GLC SOS 02',
    customerName: 'Suresh Reddy',
    customerTier: 'Gold Member',
    area: '4 Acres',
    cost: '₹6,50,000',
    amountPaid: '₹4,50,000',
    pending: '₹2,00,000',
    status: 'Ongoing',
    payments: [
      {
        id: 'pay-21',
        stageName: 'Advance Payment',
        date: '15 Mar 2024',
        amount: '₹2,00,000',
        status: 'Completed',
      },
      {
        id: 'pay-22',
        stageName: 'Foundation Stage',
        date: '10 May 2024',
        amount: '₹2,50,000',
        status: 'Completed',
      },
      {
        id: 'pay-23',
        stageName: 'Final Payment',
        date: 'Pending Inspection',
        amount: '₹2,00,000',
        status: 'Pending',
      },
    ],
  },
  {
    id: 'proj-3',
    orderNumber: '03',
    landId: 'GLC SOS 03',
    customerName: 'Priya Sharma',
    customerTier: 'Premium Member',
    area: '6 Acres',
    cost: '₹9,00,000',
    amountPaid: '₹9,00,000',
    pending: '₹0',
    status: 'Completed',
    payments: [
      {
        id: 'pay-31',
        stageName: 'Advance Payment',
        date: '12 Jan 2024',
        amount: '₹3,00,000',
        status: 'Completed',
      },
      {
        id: 'pay-32',
        stageName: 'Roof & Structure Stage',
        date: '18 Apr 2024',
        amount: '₹3,00,000',
        status: 'Completed',
      },
      {
        id: 'pay-33',
        stageName: 'Final Payment',
        date: '28 Jul 2024',
        amount: '₹3,00,000',
        status: 'Completed',
      },
    ],
  },
  {
    id: 'proj-4',
    orderNumber: '04',
    landId: 'GLC SOS 04',
    customerName: 'Anil Kumar',
    customerTier: 'Enterprise Member',
    area: '3 Acres',
    cost: '₹5,50,000',
    amountPaid: '₹3,50,000',
    pending: '₹2,00,000',
    status: 'Ongoing',
    payments: [
      {
        id: 'pay-41',
        stageName: 'Advance Payment',
        date: '02 Feb 2024',
        amount: '₹1,50,000',
        status: 'Completed',
      },
      {
        id: 'pay-42',
        stageName: 'Foundation Stage',
        date: '14 May 2024',
        amount: '₹2,00,000',
        status: 'Completed',
      },
      {
        id: 'pay-43',
        stageName: 'Final Payment',
        date: 'Pending Inspection',
        amount: '₹2,00,000',
        status: 'Pending',
      },
    ],
  },
  {
    id: 'proj-5',
    orderNumber: '05',
    landId: 'GLC SOS 05',
    customerName: 'Neha Reddy',
    customerTier: 'Gold Member',
    area: '5 Acres',
    cost: '₹7,50,000',
    amountPaid: '₹7,50,000',
    pending: '₹0',
    status: 'Completed',
    payments: [
      {
        id: 'pay-51',
        stageName: 'Advance Payment',
        date: '10 Jan 2024',
        amount: '₹2,50,000',
        status: 'Completed',
      },
      {
        id: 'pay-52',
        stageName: 'Foundation & Walls',
        date: '25 Mar 2024',
        amount: '₹2,50,000',
        status: 'Completed',
      },
      {
        id: 'pay-53',
        stageName: 'Final Payment',
        date: '19 May 2024',
        amount: '₹2,50,000',
        status: 'Completed',
      },
    ],
  },
  {
    id: 'proj-6',
    orderNumber: '06',
    landId: 'GLC SOS 06',
    customerName: 'Vikram Varma',
    customerTier: 'Premium Member',
    area: '4.5 Acres',
    cost: '₹6,80,000',
    amountPaid: '₹6,80,000',
    pending: '₹0',
    status: 'Completed',
    payments: [
      {
        id: 'pay-61',
        stageName: 'Advance Payment',
        date: '18 Jan 2024',
        amount: '₹2,00,000',
        status: 'Completed',
      },
      {
        id: 'pay-62',
        stageName: 'Structure Stage',
        date: '08 Apr 2024',
        amount: '₹2,50,000',
        status: 'Completed',
      },
      {
        id: 'pay-63',
        stageName: 'Final Payment',
        date: '15 Jul 2024',
        amount: '₹2,30,000',
        status: 'Completed',
      },
    ],
  },
];

export function getConstructionProjectsForZone(zoneId: string, serviceId: string = 'farmhouse-construction'): ConstructionProject[] {
  if (serviceId === 'organic-farming') {
    return [
      {
        id: 'org-p1',
        orderNumber: '01',
        landId: 'GLC ORG 01',
        customerName: 'Ravi Kumar',
        customerTier: 'Premium Member',
        area: '5 Acres',
        cost: '₹4,50,000',
        amountPaid: '₹4,50,000',
        pending: '₹0',
        status: 'Completed',
        payments: [
          {
            id: 'op-1',
            stageName: 'Soil Prep & Bio-Fertilization',
            date: '10 Jan 2024',
            amount: '₹1,50,000',
            status: 'Completed',
          },
          {
            id: 'op-2',
            stageName: 'Drip Network & Seed Plantation',
            date: '28 Feb 2024',
            amount: '₹1,50,000',
            status: 'Completed',
          },
          {
            id: 'op-3',
            stageName: 'First Harvest & Organic Certification',
            date: '15 May 2024',
            amount: '₹1,50,000',
            status: 'Completed',
          },
        ],
      },
      {
        id: 'org-p2',
        orderNumber: '02',
        landId: 'GLC ORG 02',
        customerName: 'Suresh Reddy',
        customerTier: 'Gold Member',
        area: '4 Acres',
        cost: '₹3,80,000',
        amountPaid: '₹2,50,000',
        pending: '₹1,30,000',
        status: 'Ongoing',
        payments: [
          {
            id: 'op-21',
            stageName: 'Soil Prep & Bio-Fertilization',
            date: '15 Feb 2024',
            amount: '₹1,50,000',
            status: 'Completed',
          },
          {
            id: 'op-22',
            stageName: 'Drip Network Installation',
            date: '02 Apr 2024',
            amount: '₹1,00,000',
            status: 'Completed',
          },
          {
            id: 'op-23',
            stageName: 'Yield Harvest & Quality Audit',
            date: 'Pending Inspection',
            amount: '₹1,30,000',
            status: 'Pending',
          },
        ],
      },
      {
        id: 'org-p3',
        orderNumber: '03',
        landId: 'GLC ORG 03',
        customerName: 'Priya Sharma',
        customerTier: 'Premium Member',
        area: '6 Acres',
        cost: '₹5,20,000',
        amountPaid: '₹5,20,000',
        pending: '₹0',
        status: 'Completed',
        payments: [
          {
            id: 'op-31',
            stageName: 'Soil Prep & Bio-Fertilization',
            date: '05 Jan 2024',
            amount: '₹1,80,000',
            status: 'Completed',
          },
          {
            id: 'op-32',
            stageName: 'Drip Network & Seed Plantation',
            date: '20 Feb 2024',
            amount: '₹1,70,000',
            status: 'Completed',
          },
          {
            id: 'op-33',
            stageName: 'Harvest & Packaging Logistics',
            date: '30 Apr 2024',
            amount: '₹1,70,000',
            status: 'Completed',
          },
        ],
      },
      {
        id: 'org-p4',
        orderNumber: '04',
        landId: 'GLC ORG 04',
        customerName: 'Anil Kumar',
        customerTier: 'Enterprise Member',
        area: '3 Acres',
        cost: '₹2,90,000',
        amountPaid: '₹1,80,000',
        pending: '₹1,10,000',
        status: 'Ongoing',
        payments: [
          {
            id: 'op-41',
            stageName: 'Soil Preparation',
            date: '01 Mar 2024',
            amount: '₹1,00,000',
            status: 'Completed',
          },
          {
            id: 'op-42',
            stageName: 'Automated Drip Deployment',
            date: '18 Apr 2024',
            amount: '₹80,000',
            status: 'Completed',
          },
          {
            id: 'op-43',
            stageName: 'Crop Certification Audit',
            date: 'Pending Inspection',
            amount: '₹1,10,000',
            status: 'Pending',
          },
        ],
      },
      {
        id: 'org-p5',
        orderNumber: '05',
        landId: 'GLC ORG 05',
        customerName: 'Neha Reddy',
        customerTier: 'Gold Member',
        area: '5 Acres',
        cost: '₹4,40,000',
        amountPaid: '₹4,40,000',
        pending: '₹0',
        status: 'Completed',
        payments: [
          {
            id: 'op-51',
            stageName: 'Land Tillage & Bio-Input',
            date: '12 Jan 2024',
            amount: '₹1,40,000',
            status: 'Completed',
          },
          {
            id: 'op-52',
            stageName: 'Horticulture Plantation',
            date: '10 Mar 2024',
            amount: '₹1,50,000',
            status: 'Completed',
          },
          {
            id: 'op-53',
            stageName: 'Yield Distribution Clearance',
            date: '05 Jun 2024',
            amount: '₹1,50,000',
            status: 'Completed',
          },
        ],
      },
      {
        id: 'org-p6',
        orderNumber: '06',
        landId: 'GLC ORG 06',
        customerName: 'Vikram Varma',
        customerTier: 'Premium Member',
        area: '4.5 Acres',
        cost: '₹3,90,000',
        amountPaid: '₹3,90,000',
        pending: '₹0',
        status: 'Completed',
        payments: [
          {
            id: 'op-61',
            stageName: 'Subsurface Drainage Prep',
            date: '14 Jan 2024',
            amount: '₹1,30,000',
            status: 'Completed',
          },
          {
            id: 'op-62',
            stageName: 'Micro-Sprinkler Setup',
            date: '25 Feb 2024',
            amount: '₹1,30,000',
            status: 'Completed',
          },
          {
            id: 'op-63',
            stageName: 'Organic NPOP Accreditation',
            date: '20 May 2024',
            amount: '₹1,30,000',
            status: 'Completed',
          },
        ],
      },
    ];
  }

  if (serviceId === 'fencing-security') {
    return [
      {
        id: 'fen-p1',
        orderNumber: '01',
        landId: 'GLC SEC 01',
        customerName: 'Ravi Kumar',
        customerTier: 'Premium Member',
        area: '5 Acres',
        cost: '₹3,20,000',
        amountPaid: '₹3,20,000',
        pending: '₹0',
        status: 'Completed',
        payments: [
          {
            id: 'fp-1',
            stageName: 'Boundary Demarcation & Material Delivery',
            date: '08 Jan 2024',
            amount: '₹1,00,000',
            status: 'Completed',
          },
          {
            id: 'fp-2',
            stageName: 'Chain-link & Post Installation',
            date: '22 Feb 2024',
            amount: '₹1,20,000',
            status: 'Completed',
          },
          {
            id: 'fp-3',
            stageName: 'Solar Energizer & Remote Camera Setup',
            date: '15 Apr 2024',
            amount: '₹1,00,000',
            status: 'Completed',
          },
        ],
      },
      {
        id: 'fen-p2',
        orderNumber: '02',
        landId: 'GLC SEC 02',
        customerName: 'Suresh Reddy',
        customerTier: 'Gold Member',
        area: '4 Acres',
        cost: '₹2,60,000',
        amountPaid: '₹1,80,000',
        pending: '₹80,000',
        status: 'Ongoing',
        payments: [
          {
            id: 'fp-21',
            stageName: 'Boundary Demarcation',
            date: '12 Feb 2024',
            amount: '₹90,000',
            status: 'Completed',
          },
          {
            id: 'fp-22',
            stageName: 'Concrete Pillar Erection',
            date: '25 Mar 2024',
            amount: '₹90,000',
            status: 'Completed',
          },
          {
            id: 'fp-23',
            stageName: 'Solar Security Energization',
            date: 'Pending Inspection',
            amount: '₹80,000',
            status: 'Pending',
          },
        ],
      },
      {
        id: 'fen-p3',
        orderNumber: '03',
        landId: 'GLC SEC 03',
        customerName: 'Priya Sharma',
        customerTier: 'Premium Member',
        area: '6 Acres',
        cost: '₹3,80,000',
        amountPaid: '₹3,80,000',
        pending: '₹0',
        status: 'Completed',
        payments: [
          {
            id: 'fp-31',
            stageName: 'Perimeter Survey & Materials',
            date: '04 Jan 2024',
            amount: '₹1,20,000',
            status: 'Completed',
          },
          {
            id: 'fp-32',
            stageName: 'High-Tensile Wire Weaving',
            date: '19 Feb 2024',
            amount: '₹1,30,000',
            status: 'Completed',
          },
          {
            id: 'fp-33',
            stageName: 'IoT Intrusion Alarm Testing',
            date: '10 May 2024',
            amount: '₹1,30,000',
            status: 'Completed',
          },
        ],
      },
      {
        id: 'fen-p4',
        orderNumber: '04',
        landId: 'GLC SEC 04',
        customerName: 'Anil Kumar',
        customerTier: 'Enterprise Member',
        area: '3 Acres',
        cost: '₹2,10,000',
        amountPaid: '₹1,30,000',
        pending: '₹80,000',
        status: 'Ongoing',
        payments: [
          {
            id: 'fp-41',
            stageName: 'Material Mobilization',
            date: '14 Feb 2024',
            amount: '₹70,000',
            status: 'Completed',
          },
          {
            id: 'fp-42',
            stageName: 'Barbed Wire Alignment',
            date: '20 Apr 2024',
            amount: '₹60,000',
            status: 'Completed',
          },
          {
            id: 'fp-43',
            stageName: 'Final Commissioning & Gate Setup',
            date: 'Pending Inspection',
            amount: '₹80,000',
            status: 'Pending',
          },
        ],
      },
      {
        id: 'fen-p5',
        orderNumber: '05',
        landId: 'GLC SEC 05',
        customerName: 'Neha Reddy',
        customerTier: 'Gold Member',
        area: '5 Acres',
        cost: '₹3,10,000',
        amountPaid: '₹3,10,000',
        pending: '₹0',
        status: 'Completed',
        payments: [
          {
            id: 'fp-51',
            stageName: 'Boundary Digging & Anchoring',
            date: '11 Jan 2024',
            amount: '₹1,00,000',
            status: 'Completed',
          },
          {
            id: 'fp-52',
            stageName: 'Chain-link Mesh Fixing',
            date: '15 Mar 2024',
            amount: '₹1,10,000',
            status: 'Completed',
          },
          {
            id: 'fp-53',
            stageName: 'Solar Surveillance Handover',
            date: '24 May 2024',
            amount: '₹1,00,000',
            status: 'Completed',
          },
        ],
      },
      {
        id: 'fen-p6',
        orderNumber: '06',
        landId: 'GLC SEC 06',
        customerName: 'Vikram Varma',
        customerTier: 'Premium Member',
        area: '4.5 Acres',
        cost: '₹2,90,000',
        amountPaid: '₹2,90,000',
        pending: '₹0',
        status: 'Completed',
        payments: [
          {
            id: 'fp-61',
            stageName: 'Boundary Clearance',
            date: '16 Jan 2024',
            amount: '₹90,000',
            status: 'Completed',
          },
          {
            id: 'fp-62',
            stageName: 'Pillar Concreting & Wiring',
            date: '28 Feb 2024',
            amount: '₹1,00,000',
            status: 'Completed',
          },
          {
            id: 'fp-63',
            stageName: 'Gate Installation & Inspection',
            date: '18 May 2024',
            amount: '₹1,00,000',
            status: 'Completed',
          },
        ],
      },
    ];
  }

  if (serviceId === 'borewell-drilling') {
    return [
      {
        id: 'bor-p1',
        orderNumber: '01',
        landId: 'GLC BOR 01',
        customerName: 'Ravi Kumar',
        customerTier: 'Premium Member',
        area: '5 Acres',
        cost: '₹2,40,000',
        amountPaid: '₹2,40,000',
        pending: '₹0',
        status: 'Completed',
        payments: [
          {
            id: 'bp-1',
            stageName: 'Hydrogeological Survey & Rig Mobilization',
            date: '06 Jan 2024',
            amount: '₹80,000',
            status: 'Completed',
          },
          {
            id: 'bp-2',
            stageName: 'Deep Rotary Drilling (650 ft) & Casing',
            date: '18 Feb 2024',
            amount: '₹90,000',
            status: 'Completed',
          },
          {
            id: 'bp-3',
            stageName: 'Submersible Pump Installation & Testing',
            date: '25 Apr 2024',
            amount: '₹70,000',
            status: 'Completed',
          },
        ],
      },
      {
        id: 'bor-p2',
        orderNumber: '02',
        landId: 'GLC BOR 02',
        customerName: 'Suresh Reddy',
        customerTier: 'Gold Member',
        area: '4 Acres',
        cost: '₹2,10,000',
        amountPaid: '₹1,40,000',
        pending: '₹70,000',
        status: 'Ongoing',
        payments: [
          {
            id: 'bp-21',
            stageName: 'Hydrogeological Survey & Rig Setup',
            date: '10 Feb 2024',
            amount: '₹70,000',
            status: 'Completed',
          },
          {
            id: 'bp-22',
            stageName: 'Rotary Drilling (550 ft)',
            date: '20 Mar 2024',
            amount: '₹70,000',
            status: 'Completed',
          },
          {
            id: 'bp-23',
            stageName: 'Submersible Pump & Solar Tie-in',
            date: 'Pending Inspection',
            amount: '₹70,000',
            status: 'Pending',
          },
        ],
      },
      {
        id: 'bor-p3',
        orderNumber: '03',
        landId: 'GLC BOR 03',
        customerName: 'Priya Sharma',
        customerTier: 'Premium Member',
        area: '6 Acres',
        cost: '₹2,80,000',
        amountPaid: '₹2,80,000',
        pending: '₹0',
        status: 'Completed',
        payments: [
          {
            id: 'bp-31',
            stageName: 'Water Vein Mapping & Clearance',
            date: '09 Jan 2024',
            amount: '₹90,000',
            status: 'Completed',
          },
          {
            id: 'bp-32',
            stageName: 'Deep Bore Drilling (700 ft) & Slotted Casing',
            date: '14 Feb 2024',
            amount: '₹1,00,000',
            status: 'Completed',
          },
          {
            id: 'bp-33',
            stageName: 'Yield Discharge Yield Test (2.5 Inch Flow)',
            date: '02 May 2024',
            amount: '₹90,000',
            status: 'Completed',
          },
        ],
      },
      {
        id: 'bor-p4',
        orderNumber: '04',
        landId: 'GLC BOR 04',
        customerName: 'Anil Kumar',
        customerTier: 'Enterprise Member',
        area: '3 Acres',
        cost: '₹1,90,000',
        amountPaid: '₹1,20,000',
        pending: '₹70,000',
        status: 'Ongoing',
        payments: [
          {
            id: 'bp-41',
            stageName: 'Geophysical Resistivity Survey',
            date: '15 Feb 2024',
            amount: '₹60,000',
            status: 'Completed',
          },
          {
            id: 'bp-42',
            stageName: 'Rotary Rig Drilling (480 ft)',
            date: '12 Apr 2024',
            amount: '₹60,000',
            status: 'Completed',
          },
          {
            id: 'bp-43',
            stageName: 'Submersible Pump Energization',
            date: 'Pending Inspection',
            amount: '₹70,000',
            status: 'Pending',
          },
        ],
      },
      {
        id: 'bor-p5',
        orderNumber: '05',
        landId: 'GLC BOR 05',
        customerName: 'Neha Reddy',
        customerTier: 'Gold Member',
        area: '5 Acres',
        cost: '₹2,50,000',
        amountPaid: '₹2,50,000',
        pending: '₹0',
        status: 'Completed',
        payments: [
          {
            id: 'bp-51',
            stageName: 'Groundwater Clearence & Rig Advance',
            date: '15 Jan 2024',
            amount: '₹80,000',
            status: 'Completed',
          },
          {
            id: 'bp-52',
            stageName: 'Drilling to 620 ft & MS Casing Pipe',
            date: '18 Mar 2024',
            amount: '₹90,000',
            status: 'Completed',
          },
          {
            id: 'bp-53',
            stageName: 'Flow Test & Electrical Panel Setup',
            date: '28 May 2024',
            amount: '₹80,000',
            status: 'Completed',
          },
        ],
      },
      {
        id: 'bor-p6',
        orderNumber: '06',
        landId: 'GLC BOR 06',
        customerName: 'Vikram Varma',
        customerTier: 'Premium Member',
        area: '4.5 Acres',
        cost: '₹2,30,000',
        amountPaid: '₹2,30,000',
        pending: '₹0',
        status: 'Completed',
        payments: [
          {
            id: 'bp-61',
            stageName: 'Survey & Hydrogeology Logging',
            date: '12 Jan 2024',
            amount: '₹75,000',
            status: 'Completed',
          },
          {
            id: 'bp-62',
            stageName: 'Drilling & Gravel Packing (580 ft)',
            date: '22 Feb 2024',
            amount: '₹80,000',
            status: 'Completed',
          },
          {
            id: 'bp-63',
            stageName: 'Final Flow Yield Clearance',
            date: '14 May 2024',
            amount: '₹75,000',
            status: 'Completed',
          },
        ],
      },
    ];
  }

  return defaultConstructionProjects;
}

