export const regions=[{name:'Rangareddy',acres:'76',revenue:'52.60'},{name:'Mahabubnagar',acres:'29',revenue:'24.01'},{name:'Karimnagar',acres:'45.2',revenue:'36.08'},{name:'Nalgonda',acres:'21.03',revenue:'12.60'},{name:'Sangareddy',acres:'32.6',revenue:'25.90'},{name:'Warangal',acres:'5.4',revenue:'2.60'}];
export type Region=typeof regions[number];

export interface MandalRecord {
  id: string;
  name: string;
  district: string;
  landSold: string;
  revenue: string;
  parcels: number;
  status: 'Active' | 'Settled';
  avgRatePerAcre: string;
}

export const defaultMandals: MandalRecord[] = [
  {
    id: 'm-01',
    name: 'Shadnagar',
    district: 'Rangareddy',
    landSold: '92.4 Acres',
    revenue: '₹32.60 Cr',
    parcels: 48,
    status: 'Active',
    avgRatePerAcre: '₹35.28 L',
  },
  {
    id: 'm-02',
    name: 'Ibrahimpatnam',
    district: 'Rangareddy',
    landSold: '92.4 Acres',
    revenue: '₹16.12 Cr',
    parcels: 34,
    status: 'Active',
    avgRatePerAcre: '₹17.44 L',
  },
  {
    id: 'm-03',
    name: 'Hayathnagar',
    district: 'Rangareddy',
    landSold: '92.4 Acres',
    revenue: '₹17.03 Cr',
    parcels: 29,
    status: 'Active',
    avgRatePerAcre: '₹18.43 L',
  },
  {
    id: 'm-04',
    name: 'Rajendranagar',
    district: 'Rangareddy',
    landSold: '92.4 Acres',
    revenue: '₹5.60 Cr',
    parcels: 16,
    status: 'Settled',
    avgRatePerAcre: '₹6.06 L',
  },
  {
    id: 'm-05',
    name: 'Amangal',
    district: 'Rangareddy',
    landSold: '92.4 Acres',
    revenue: '₹9.11 Cr',
    parcels: 22,
    status: 'Active',
    avgRatePerAcre: '₹9.86 L',
  },
  {
    id: 'm-06',
    name: 'Nandigama',
    district: 'Rangareddy',
    landSold: '92.4 Acres',
    revenue: '₹21.60 Cr',
    parcels: 38,
    status: 'Active',
    avgRatePerAcre: '₹23.37 L',
  },
];

export function getMandalsForRegion(regionName: string): MandalRecord[] {
  return defaultMandals.map((m) => ({
    ...m,
    district: regionName,
  }));
}
