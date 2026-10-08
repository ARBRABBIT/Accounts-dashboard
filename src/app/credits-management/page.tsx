'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Search, Bell } from 'lucide-react';
import { AccountsSidebar } from '@/components/dashboard/accounts-sidebar';
import { AgentCreditsTable } from '@/components/credits/agent-credits-table';
import { CreditsDetailsView } from '@/components/credits/credits-details-view';
import {
  agentCredits as initialAgentCredits,
  userCredits as initialUserCredits,
  AgentCredit,
} from '@/lib/credits-management-data';

export default function CreditsManagementPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'Agents' | 'Users'>('Agents');
  const [agentList, setAgentList] = useState<AgentCredit[]>(initialAgentCredits);
  const [userList, setUserList] = useState<AgentCredit[]>(initialUserCredits);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDetailAccount, setSelectedDetailAccount] =
    useState<AgentCredit | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Active list based on Agents vs Users tab
  const activeList = activeTab === 'Agents' ? agentList : userList;

  // Reset page when tab or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  // Filter items based on search input
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return activeList;
    const q = searchQuery.toLowerCase().trim();
    return activeList.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.agentId.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
    );
  }, [activeList, searchQuery]);

  // GSAP entrance animation on tab change
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.credits-header-anim',
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
      );
      gsap.fromTo(
        '.credits-content-anim',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          clearProps: 'all',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  // When an account is clicked for details, render CreditsDetailsView
  if (selectedDetailAccount) {
    return (
      <div
        ref={containerRef}
        className="min-h-screen w-full bg-[#F2F2F2] p-4 sm:p-6 md:p-8 lg:p-12 font-sans"
      >
        <div className="mx-auto max-w-[1332px]">
          <CreditsDetailsView
            agent={selectedDetailAccount}
            onBack={() => setSelectedDetailAccount(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen md:h-screen md:max-h-screen w-full bg-[#F2F2F2] p-3 sm:p-4 md:p-5 lg:p-6 md:overflow-hidden flex flex-col justify-center font-sans"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-3 md:flex-row md:items-stretch md:gap-6 lg:gap-7 min-h-0">
        {/* Left Persistent Sidebar with 5th tab active */}
        <div className="shrink-0 flex flex-col md:w-[92px] md:h-full">
          <AccountsSidebar activeTab="credits" />
        </div>

        {/* Main Content Area */}
        <main className="flex min-w-0 flex-1 flex-col justify-between gap-3 md:gap-3.5 lg:gap-4 min-h-0">
          {/* Top Frame: Title, Subtitle, Search, Notifications */}
          <div className="credits-header-anim shrink-0 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            {/* Title & Description */}
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <h1 className="text-[22px] sm:text-[24px] lg:text-[26px] xl:text-[28px] font-semibold leading-[110%] tracking-tight text-black">
                Credits Management
              </h1>
              <p className="text-xs sm:text-sm lg:text-[15px] font-normal leading-[20px] text-[#46464A]">
                Track and authorize earnings for your field agent network.
              </p>
            </div>

            {/* Search Section & Notifications Container */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {/* Search Container */}
              <div className="flex h-[44px] sm:h-[48px] xl:h-[52px] w-full items-center gap-2 rounded-[60px] border border-black/5 bg-white px-4 sm:px-5 shadow-xs transition focus-within:border-brand/40 focus-within:ring-2 focus-within:ring-brand/10 sm:w-[260px] lg:w-[295px]">
                <Search size={18} className="shrink-0 text-[#5C5C5C]" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    activeTab === 'Agents' ? 'Search Agent...' : 'Search User...'
                  }
                  aria-label={
                    activeTab === 'Agents'
                      ? 'Search agents by name, ID, or location'
                      : 'Search users by name, ID, or location'
                  }
                  className="w-full bg-transparent text-sm lg:text-base font-normal text-black placeholder:text-[#5C5C5C] focus:outline-none"
                />
              </div>

              {/* Notifications Bell */}
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-[44px] w-[44px] sm:h-[48px] sm:w-[48px] xl:h-[52px] xl:w-[52px] shrink-0 items-center justify-center rounded-[40px] border border-black/5 bg-white shadow-xs transition hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
                onClick={() => alert('No new notifications')}
              >
                <Bell size={20} className="text-[#2C2C2C]" />
                <span
                  className="absolute right-[14px] top-[13px] sm:right-[16px] sm:top-[14px] h-[7px] w-[7px] rounded-full bg-[#EF4646] ring-2 ring-white"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* Filter Pills Capsule: Agents & Users */}
          <div className="credits-header-anim shrink-0 flex items-center">
            <div
              role="tablist"
              aria-label="Filter credits by account type"
              className="inline-flex items-center gap-1 rounded-full border border-black/5 bg-white p-1 shadow-[0px_4px_24px_rgba(0,0,0,0.04)]"
            >
              {(['Agents', 'Users'] as const).map((tab) => {
                const isActive = activeTab === tab;
                const count = tab === 'Agents' ? agentList.length : userList.length;

                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer ${
                      isActive
                        ? 'bg-[#2780C4] text-white shadow-xs'
                        : 'text-[#6B7280] hover:bg-subtle hover:text-[#1A1C1D]'
                    }`}
                  >
                    <span>{tab}</span>
                    <span
                      className={`ml-1.5 text-xs ${
                        isActive ? 'text-white/80' : 'text-muted'
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table Content */}
          <div className="credits-content-anim flex-1 min-h-0 flex flex-col">
            {filteredItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center rounded-[28px] border border-dashed border-line bg-white/70 py-12 text-center">
                <p className="text-base font-semibold text-ink">
                  No {activeTab.toLowerCase()} credit records found
                </p>
                <p className="mt-1 text-sm text-muted">
                  Try adjusting your search query.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-4 rounded-full bg-brand px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-brand/90"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <AgentCreditsTable
                agents={filteredItems}
                activeTab={activeTab}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onView={(item) => setSelectedDetailAccount(item)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
