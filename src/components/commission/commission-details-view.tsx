'use client';
import { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Building2,
  Map,
  Phone,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import { DatePickerPopover } from '@/components/ui/date-picker-popover';
import { AgentCommission, PropertyCommissionDeal } from '@/lib/commission-management-data';
import { FarmlandDetailView } from './farmland-detail-view';

interface CommissionDetailsViewProps {
  agent: AgentCommission;
  onBack: () => void;
}

export function CommissionDetailsView({
  agent,
  onBack,
}: CommissionDetailsViewProps) {
  const [statusTab, setStatusTab] = useState<'Settled' | 'Pending'>('Settled');
  const [landSearch, setLandSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDeal, setSelectedDeal] = useState<PropertyCommissionDeal | null>(null);
  const deals = agent.deals || [];

  const filteredDeals = useMemo(() => {
    let result = deals;

    // Filter by status tab (Settled / Pending)
    if (statusTab) {
      result = result.filter((d) => d.status === statusTab);
    }

    if (landSearch.trim()) {
      const q = landSearch.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.landId.toLowerCase().includes(q) ||
          d.customerName.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q)
      );
    }

    if (selectedDate) {
      // If a specific date filter is selected, match against settlementDate or keep active
      const formattedDate = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }).toUpperCase();
      result = result.filter((d) => !d.settlementDate || d.settlementDate.toUpperCase().includes(formattedDate.slice(0, 3)));
    }

    return result;
  }, [deals, statusTab, landSearch, selectedDate]);

  // If a farmland deal is clicked, render the dedicated View Detail Page
  if (selectedDeal) {
    return (
      <FarmlandDetailView
        deal={selectedDeal}
        agent={agent}
        onBack={() => setSelectedDeal(null)}
        onBackToManagement={onBack}
      />
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-8">
      {/* Top Header: Breadcrumbs Only */}
      <div>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-1.5 text-base sm:text-lg font-semibold min-h-10 -mt-1"
        >
          <button
            type="button"
            onClick={onBack}
            className="text-[#64748B] hover:text-black transition-colors cursor-pointer"
          >
            Commission Management
          </button>
          <ChevronRight size={16} className="text-[#94A3B8] shrink-0" />
          <span className="text-black font-bold">
            Commission Details
          </span>
        </nav>
      </div>

      {/* Top Bento Grid (3 Cards: Profile, Contact Info, Assigned Territory) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card 1: Profile Card */}
        <div className="flex min-h-[279px] flex-col items-center justify-center rounded-[32px] border border-black/[0.03] bg-white p-6 shadow-[0px_8px_30px_rgba(0,0,0,0.04)]">
          {/* Avatar with Online Green Dot */}
          <div className="relative">
            <img
              src={agent.avatarUrl}
              alt={agent.name}
              className="h-28 w-28 rounded-full object-cover shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] ring-4 ring-white"
            />
            <span
              className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-[#22C55E] shadow-xs"
              aria-label="Online"
            >
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
          </div>

          {/* Agent Name */}
          <h2 className="mt-3 text-2xl font-bold text-[#191C1E]">
            {agent.name}
          </h2>

          {/* Role */}
          <p className="mt-0.5 text-sm font-normal text-[#404750]">
            {agent.role || 'Senior Sales Agent'}
          </p>

          {/* Badges */}
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-full bg-[rgba(39,128,196,0.1)] px-3 py-1 text-xs font-bold uppercase tracking-[0.3px] text-[#2780C4]">
              TOP PERFORMER
            </span>
            <span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-bold uppercase tracking-[0.3px] text-[#15803D]">
              VERIFIED
            </span>
          </div>
        </div>

        {/* Card 2: Contact Information */}
        <div className="flex min-h-[279px] flex-col rounded-[32px] border border-black/[0.03] bg-white p-6 sm:p-8 shadow-[0px_8px_30px_rgba(0,0,0,0.04)]">
          <h3 className="text-sm font-bold tracking-[0.5px] text-[#191C1E] uppercase">
            CONTACT INFORMATION
          </h3>
          <div className="mt-5 flex flex-col gap-4">
            {/* Email Address */}
            <div className="flex items-center gap-4 rounded-2xl bg-[#F8FAFC] p-4 border border-[#F1F5F9]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FB] text-[#2780C4]">
                <Mail size={18} />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-medium text-[#86868B] uppercase tracking-wider">
                  Email Address
                </span>
                <span className="truncate text-sm font-bold text-[#191C1E]">
                  {agent.email || `${agent.name.toLowerCase().replace(/\s+/g, '.')}@glc-agents.in`}
                </span>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center gap-4 rounded-2xl bg-[#F8FAFC] p-4 border border-[#F1F5F9]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FB] text-[#2780C4]">
                <Phone size={18} />
              </div>
              <div>
                <span className="block text-xs font-medium text-[#86868B] uppercase tracking-wider">
                  Phone Number
                </span>
                <span className="text-sm font-bold text-[#191C1E]">
                  {agent.phone || '+91 98490 23145'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Assigned Territory */}
        <div className="flex min-h-[279px] flex-col rounded-[32px] border border-black/[0.03] bg-white p-6 sm:p-8 shadow-[0px_8px_30px_rgba(0,0,0,0.04)]">
          <h3 className="text-sm font-bold tracking-[0.5px] text-[#191C1E] uppercase">
            ASSIGNED TERRITORY
          </h3>
          <div className="mt-5 flex flex-col gap-5">
            {/* Region */}
            <div className="flex items-center justify-between border-b border-[#F2F2F2] pb-3">
              <div className="flex items-center gap-2.5 text-[#5E5E63]">
                <Map size={16} />
                <span className="text-sm font-medium">Region</span>
              </div>
              <span className="text-base font-semibold text-[#191C1E]">
                {agent.region}
              </span>
            </div>

            {/* District */}
            <div className="flex items-center justify-between border-b border-[#F2F2F2] pb-3">
              <div className="flex items-center gap-2.5 text-[#5E5E63]">
                <Building2 size={16} />
                <span className="text-sm font-medium">District</span>
              </div>
              <span className="text-base font-semibold text-[#191C1E]">
                {agent.district || agent.region}
              </span>
            </div>

            {/* Mandal */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-[#5E5E63]">
                <MapPin size={16} />
                <span className="text-sm font-medium">Mandal</span>
              </div>
              <span className="text-base font-semibold text-[#191C1E]">
                {agent.mandal || agent.areaOrDistrict}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown by Location Section */}
      <div className="flex flex-col gap-6">
        {/* Section Header with Search Bar beside Calendar */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1A1C1D]">
              Revenue Breakdown by Location
            </h2>
            <p className="mt-1 text-xs sm:text-sm font-medium text-[#5E5E63]">
              Real time settlement data across administrative zones
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Segmented Tabs: Settled / Pending */}
            <div
              role="tablist"
              aria-label="Filter deals by settlement status"
              className="inline-flex h-[42px] items-center rounded-full border border-[#E5E5EA] bg-white p-1 shadow-xs"
            >
              <button
                type="button"
                role="tab"
                aria-selected={statusTab === 'Settled'}
                onClick={() => setStatusTab('Settled')}
                className={`h-[34px] rounded-full px-4 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  statusTab === 'Settled'
                    ? 'bg-[#2780C4] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#191C1D]'
                }`}
              >
                Settled
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={statusTab === 'Pending'}
                onClick={() => setStatusTab('Pending')}
                className={`h-[34px] rounded-full px-4 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  statusTab === 'Pending'
                    ? 'bg-[#2780C4] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#191C1D]'
                }`}
              >
                Pending
              </button>
            </div>

            {/* Search Land Id input moved beside Calendar */}
            <div className="flex h-[42px] w-full items-center gap-2 rounded-full border border-[#E5E5EA] bg-white px-4 shadow-[0px_2px_8px_rgba(0,0,0,0.04)] transition focus-within:border-brand/40 focus-within:ring-2 focus-within:ring-brand/10 sm:w-[220px] md:w-[260px]">
              <Search size={16} className="shrink-0 text-[#86868B]" />
              <input
                type="search"
                value={landSearch}
                onChange={(e) => setLandSearch(e.target.value)}
                placeholder="Search Land Id..."
                aria-label="Search properties by land id or customer"
                className="w-full bg-transparent text-sm font-normal text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none"
              />
            </div>

            {/* Date Selector - Only Calendar Icon matching Subscriptions */}
            <DatePickerPopover
              value={selectedDate}
              onChange={setSelectedDate}
              defaultViewDate="2023-10-12"
            />
          </div>
        </div>

        {/* Table View: Revenue Breakdown by Location */}
        <div className="overflow-hidden rounded-[24px] border border-[#E5E5EA]/80 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table
              className="w-full min-w-[800px] border-collapse text-left"
              aria-label="Revenue Breakdown by Location Table"
            >
              <thead>
                <tr className="border-b border-[#F2F2F2] bg-[#FAFBFD]/80 text-xs font-bold tracking-[0.5px] text-[#5E5E63] uppercase select-none">
                  <th scope="col" className="px-6 sm:px-8 py-4">
                    Farmland ID
                  </th>
                  <th scope="col" className="px-6 sm:px-8 py-4">
                    Customer
                  </th>
                  <th scope="col" className="px-6 sm:px-8 py-4">
                    Location
                  </th>
                  <th scope="col" className="px-6 sm:px-8 py-4 text-right">
                    Sale Value
                  </th>
                  <th scope="col" className="px-6 sm:px-8 py-4 text-right">
                    Earned
                  </th>
                  <th scope="col" className="px-6 sm:px-8 py-4 text-center">
                    Status
                  </th>
                  <th scope="col" className="px-6 sm:px-8 py-4 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F2F2]">
                {filteredDeals.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-8 py-12 text-center text-sm text-[#64748B]">
                      {landSearch
                        ? `No ${statusTab.toLowerCase()} farmland records found matching “${landSearch}”.`
                        : `No ${statusTab.toLowerCase()} farmland records found.`}
                    </td>
                  </tr>
                ) : (
                  filteredDeals.map((deal) => {
                    const isSettled = deal.status === 'Settled';

                    return (
                      <tr
                        key={deal.id}
                        className="group transition-colors hover:bg-[#F8FAFC]"
                      >
                        {/* Farmland ID with thumbnail */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={deal.imageUrl}
                              alt={deal.landId}
                              className="h-9 w-9 shrink-0 rounded-lg object-cover ring-1 ring-black/5"
                            />
                            <span className="inline-flex items-center rounded-lg bg-[#F1F5F9] px-2.5 py-1 text-xs font-bold text-[#00609A]">
                              {deal.landId}
                            </span>
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5">
                          <div className="font-bold text-[#191C1E] text-sm">
                            {deal.customerName}
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5">
                          <span className="font-medium text-[#46464A] text-sm">
                            {deal.location}
                          </span>
                        </td>

                        {/* Sale Value */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 text-right font-semibold text-[#191C1E] text-sm tabular-nums">
                          {deal.saleValue}
                        </td>

                        {/* Earned */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 text-right font-bold text-[#2780C4] text-base tabular-nums">
                          {deal.earnedAmount}
                        </td>

                        {/* Status */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 text-center">
                          <span
                            className={`inline-block rounded-full px-3.5 py-1 text-xs font-semibold ${
                              isSettled
                                ? 'bg-[#2780C4] text-white'
                                : 'bg-[#EF4646] text-white'
                            }`}
                          >
                            {deal.status}
                          </span>
                        </td>

                        {/* Action View CTA Button */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedDeal(deal)}
                            className="inline-flex h-[37px] w-[85px] items-center justify-center rounded-[39px] bg-[#2780C4] text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#1f6da8] hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Integrated Pagination Footer */}
          <Pagination
            total={filteredDeals.length}
            page={1}
            pageSize={4}
            itemLabel={`${statusTab.toLowerCase()} location entries`}
            onPageChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
