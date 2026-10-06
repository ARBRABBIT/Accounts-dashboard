'use client';
import { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  MapPin,
  Building2,
  Map,
  Phone,
  CreditCard,
  ChevronRight,
} from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import {
  AgentCredit,
  CreditActivityCategory,
  sampleLandCreditActivities,
} from '@/lib/credits-management-data';

interface CreditsDetailsViewProps {
  agent: AgentCredit;
  onBack: () => void;
}

const CATEGORIES: CreditActivityCategory[] = [
  'Land Based Credits',
  'Referral Credits',
  'Buyer Lead Credits',
  'Credit Redemptions',
];

export function CreditsDetailsView({ agent, onBack }: CreditsDetailsViewProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CreditActivityCategory>('Land Based Credits');
  const [landSearch, setLandSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const activities = agent.activities || sampleLandCreditActivities;

  // Filter activities by selected category and land search query
  const filteredActivities = useMemo(() => {
    let list = activities.filter((act) => act.category === selectedCategory);
    if (landSearch.trim()) {
      const q = landSearch.toLowerCase().trim();
      list = list.filter(
        (act) =>
          act.landId.toLowerCase().includes(q) ||
          act.creditType.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activities, selectedCategory, landSearch]);

  const isUser = agent.entityType === 'User';

  return (
    <div className="flex flex-1 flex-col gap-8">
      {/* Top Header: Breadcrumbs Only (No subtext, search bar moved beside calendar, notifications removed) */}
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
            Credits Management
          </button>
          <ChevronRight size={16} className="text-[#94A3B8] shrink-0" />
          <span className="text-black font-bold">Credits Details</span>
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
        <div className="flex min-h-[279px] flex-col justify-center rounded-[32px] border border-black/[0.03] bg-white p-6 shadow-[0px_8px_30px_rgba(0,0,0,0.04)]">
          <h3 className="text-sm font-bold uppercase tracking-[0.7px] text-[#404750]">
            CONTACT INFORMATION
          </h3>

          <div className="mt-4 flex flex-col gap-3">
            {/* ID */}
            <div className="flex items-center gap-4 rounded-xl border border-[rgba(192,199,210,0.1)] bg-[#F4F4F4]/70 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(39,128,196,0.1)] text-[#2780C4]">
                <CreditCard size={18} />
              </div>
              <div>
                <span className="block text-[11px] font-normal uppercase tracking-[0.55px] text-[#404750]">
                  {isUser ? 'USER ID' : 'AGENT ID'}
                </span>
                <span className="block text-base font-semibold text-[#191C1E]">
                  {agent.agentId}
                </span>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center gap-4 rounded-xl border border-[rgba(192,199,210,0.1)] bg-[#F4F4F4]/70 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(39,128,196,0.1)] text-[#2780C4]">
                <Phone size={18} />
              </div>
              <div>
                <span className="block text-[11px] font-normal uppercase tracking-[0.55px] text-[#404750]">
                  PHONE NUMBER
                </span>
                <span className="block text-base font-semibold text-[#191C1E]">
                  {agent.phone || '+91 98765 43210'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Assigned Territory */}
        <div className="flex min-h-[279px] flex-col justify-center rounded-[32px] border border-black/[0.03] bg-white p-6 shadow-[0px_8px_30px_rgba(0,0,0,0.04)]">
          <h3 className="text-sm font-bold uppercase tracking-[0.7px] text-[#404750]">
            ASSIGNED TERRITORY
          </h3>

          <div className="mt-4 flex flex-col">
            {/* Region */}
            <div className="flex items-center justify-between border-b border-[rgba(192,199,210,0.15)] py-3">
              <div className="flex items-center gap-3">
                <Map size={18} className="text-[#404750]" />
                <span className="text-sm font-medium text-[#404750]">Region</span>
              </div>
              <span className="text-base font-semibold text-[#191C1E]">
                {agent.region || 'Nandigama'}
              </span>
            </div>

            {/* District */}
            <div className="flex items-center justify-between border-b border-[rgba(192,199,210,0.15)] py-3">
              <div className="flex items-center gap-3">
                <Building2 size={18} className="text-[#404750]" />
                <span className="text-sm font-medium text-[#404750]">
                  District
                </span>
              </div>
              <span className="text-base font-semibold text-[#191C1E]">
                {agent.district || 'Mahabubnagar'}
              </span>
            </div>

            {/* Mandal */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#404750]" />
                <span className="text-sm font-medium text-[#404750]">Mandal</span>
              </div>
              <span className="text-base font-semibold text-[#191C1E]">
                {agent.mandal || 'Jadcherla'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="flex flex-col gap-6">
        {/* Section Header with Search Bar beside Calendar */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1A1C1D]">
              {selectedCategory} Activity
            </h2>
            <p className="mt-1 text-xs sm:text-sm font-medium text-[#5E5E63]">
              Real time settlement data across administrative zones
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Land Id input beside Calendar */}
            <div className="flex h-[42px] w-full items-center gap-2 rounded-full border border-[#E5E5EA] bg-white px-4 shadow-[0px_2px_8px_rgba(0,0,0,0.04)] transition focus-within:border-brand/40 focus-within:ring-2 focus-within:ring-brand/10 sm:w-[260px]">
              <Search size={16} className="shrink-0 text-[#86868B]" />
              <input
                type="search"
                value={landSearch}
                onChange={(e) => {
                  setLandSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search Land Id..."
                aria-label="Search activities by land id"
                className="w-full bg-transparent text-sm font-normal text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none"
              />
            </div>

            {/* Calendar Button */}
            <button
              type="button"
              onClick={() => alert('Calendar filter (preview)')}
              className="inline-flex h-[42px] shrink-0 items-center gap-2 rounded-full border border-[#E5E5EA] bg-white px-5 text-sm font-normal text-[#1D1D1F] shadow-[0px_2px_8px_rgba(0,0,0,0.04)] transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
            >
              <Calendar size={16} className="text-[#86868B]" />
              <span>Calendar</span>
            </button>
          </div>
        </div>

        {/* Sub-category Pills */}
        <div className="flex items-center overflow-x-auto pb-1">
          <div
            role="tablist"
            aria-label="Filter activities by category"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white p-1.5 shadow-[0px_4px_24px_rgba(0,0,0,0.04)]"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2780C4] text-white shadow-xs'
                      : 'text-[#6B7280] hover:bg-subtle hover:text-[#1A1C1D]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Activity Table */}
        <div className="overflow-hidden rounded-[24px] border border-[#E5E5EA]/80 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table
              className="w-full min-w-[700px] border-collapse text-left"
              aria-label="Credits Activity Table"
            >
              <thead>
                <tr className="border-b border-[#F2F2F2] bg-[#FAFBFD]/80 text-xs font-bold tracking-[0.5px] text-[#5E5E63] uppercase select-none">
                  <th scope="col" className="px-6 sm:px-8 py-4 whitespace-nowrap">
                    LAND ID
                  </th>
                  <th scope="col" className="px-6 sm:px-8 py-4 whitespace-nowrap">
                    CREDITS TYPE
                  </th>
                  <th
                    scope="col"
                    className="px-6 sm:px-8 py-4 text-center whitespace-nowrap"
                  >
                    CREDITS
                  </th>
                  <th
                    scope="col"
                    className="px-6 sm:px-8 py-4 text-center whitespace-nowrap"
                  >
                    EARNED ON
                  </th>
                  <th
                    scope="col"
                    className="px-6 sm:px-8 py-4 text-right whitespace-nowrap"
                  >
                    CASH EARNED
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F2F2]">
                {filteredActivities.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-sm font-medium text-[#64748B]"
                    >
                      No activity records found for this category.
                    </td>
                  </tr>
                ) : (
                  filteredActivities
                    .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                    .map((act) => (
                      <tr
                        key={act.id}
                        className="group transition-colors hover:bg-[#F8FAFC]"
                      >
                        {/* Land ID */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 whitespace-nowrap">
                          <span className="font-bold text-[#191C1E] text-sm">
                            {act.landId}
                          </span>
                        </td>

                        {/* Credits Type */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 whitespace-nowrap">
                          <span className="font-medium text-[#46464A] text-sm">
                            {act.creditType}
                          </span>
                        </td>

                        {/* Credits */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 text-center font-bold text-[#191C1E] text-sm tabular-nums whitespace-nowrap">
                          {act.credits}
                        </td>

                        {/* Earned On */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 text-center text-sm font-medium text-[#5E5E63] tabular-nums whitespace-nowrap uppercase">
                          {act.earnedOn}
                        </td>

                        {/* Cash Earned */}
                        <td className="px-6 sm:px-8 py-4 sm:py-5 text-right font-bold tabular-nums text-sm sm:text-base text-[#191C1E] whitespace-nowrap">
                          {act.cashEarned}
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            total={filteredActivities.length}
            page={currentPage}
            pageSize={pageSize}
            itemLabel="activity entries"
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

