'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Search, Bell } from 'lucide-react';
import { AccountsSidebar } from '@/components/dashboard/accounts-sidebar';
import { AgentCommissionTable } from '@/components/commission/agent-commission-table';
import { CommissionDetailsView } from '@/components/commission/commission-details-view';
import { CommissionDetailModal } from '@/components/commission/commission-detail-modal';
import {
  agentCommissions as initialCommissions,
  AgentCommission,
} from '@/lib/commission-management-data';

export default function CommissionManagementPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [commissions, setCommissions] = useState<AgentCommission[]>(initialCommissions);
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Pending' | 'Paid'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgentForDetails, setSelectedAgentForDetails] = useState<AgentCommission | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AgentCommission | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, searchQuery]);

  // Filter agents based on status pill and search input
  const filteredAgents = useMemo(() => {
    return commissions.filter((agent) => {
      const matchesStatus =
        selectedStatus === 'All' ? true : agent.status === selectedStatus;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        agent.name.toLowerCase().includes(q) ||
        agent.agentId.toLowerCase().includes(q) ||
        agent.region.toLowerCase().includes(q) ||
        agent.areaOrDistrict.toLowerCase().includes(q) ||
        agent.landId.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [commissions, selectedStatus, searchQuery]);

  // Handle Authorizing Payout
  const handleAuthorizePayout = (agentId: string) => {
    setCommissions((prev) =>
      prev.map((agent) => {
        if (agent.id === agentId) {
          const updated: AgentCommission = {
            ...agent,
            status: 'Paid',
            payoutDate: 'Just now (Authorized)',
            transactionRef: `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          };
          setSelectedAgent(updated);
          return updated;
        }
        return agent;
      })
    );
  };

  // GSAP entrance animation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.commission-header-anim',
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
      );
      gsap.fromTo(
        '.commission-content-anim',
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
  }, [selectedStatus]);

  if (selectedAgentForDetails) {
    return (
      <div
        ref={containerRef}
        className="min-h-screen w-full bg-[#F2F2F2] p-4 sm:p-6 md:p-8 lg:p-12"
      >
        <div className="mx-auto max-w-[1332px]">
          <CommissionDetailsView
            agent={selectedAgentForDetails}
            onBack={() => setSelectedAgentForDetails(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-[#F2F2F2] p-4 sm:p-6 md:p-8 lg:p-9"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 md:flex-row md:items-start md:gap-7 lg:gap-8">
        {/* Left Persistent Sidebar with 4th item active */}
        <div className="shrink-0 md:sticky md:top-8">
          <AccountsSidebar activeTab="commissions" />
        </div>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-7">
          {/* Top Frame: Title, Subtitle, Search, Notifications */}
          <div className="commission-header-anim flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            {/* Title & Description */}
            <div className="flex flex-col gap-2">
              <h1 className="text-[28px] font-semibold leading-[110%] tracking-tight text-black">
                Commission Management
              </h1>
              <p className="text-[15px] font-normal leading-[22px] text-[#46464A]">
                Track and authorize earnings for your field agent network.
              </p>
            </div>

            {/* Search Section & Notifications Container */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {/* Search Container */}
              <div className="flex h-[52px] w-full items-center gap-2 rounded-[60px] border border-black/5 bg-white px-5 shadow-xs transition focus-within:border-brand/40 focus-within:ring-2 focus-within:ring-brand/10 sm:w-[295px]">
                <Search size={20} className="shrink-0 text-[#5C5C5C]" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Agent..."
                  aria-label="Search agents by name, ID, region, or land ID"
                  className="w-full bg-transparent text-[16px] font-normal text-black placeholder:text-[#5C5C5C] focus:outline-none"
                />
              </div>

              {/* Notifications Bell */}
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[40px] border border-black/5 bg-white shadow-xs transition hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-brand"
                onClick={() => alert('No new notifications')}
              >
                <Bell size={22} className="text-[#2C2C2C]" />
                <span
                  className="absolute right-[17px] top-[15px] h-[7px] w-[7px] rounded-full bg-[#EF4646] ring-2 ring-white"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* Filter Pills Capsule */}
          <div className="commission-header-anim flex items-center">
            {/* Status Filter Pills */}
            <div
              role="tablist"
              aria-label="Filter commissions by status"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white p-1.5 shadow-[0px_4px_24px_rgba(0,0,0,0.04)]"
            >
              {(['All', 'Pending', 'Paid'] as const).map((status) => {
                const isActive = selectedStatus === status;
                const count =
                  status === 'All'
                    ? commissions.length
                    : commissions.filter((c) => c.status === status).length;

                return (
                  <button
                    key={status}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => setSelectedStatus(status)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand ${
                      isActive
                        ? 'bg-[#2780C4] text-white shadow-xs'
                        : 'text-[#6B7280] hover:bg-subtle hover:text-[#1A1C1D]'
                    }`}
                  >
                    <span>{status}</span>
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
          <div className="commission-content-anim">
            {filteredAgents.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-line bg-white/70 py-16 text-center">
                <p className="text-base font-semibold text-ink">
                  No commission records found
                </p>
                <p className="mt-1 text-sm text-muted">
                  Try adjusting your search query or status filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedStatus('All');
                  }}
                  className="mt-4 rounded-full bg-brand px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-brand/90"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <AgentCommissionTable
                agents={filteredAgents}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onView={(item) => {
                  setSelectedAgentForDetails(item);
                }}
              />
            )}
          </div>
        </main>
      </div>

      {/* Detail Slide-over / Modal */}
      <CommissionDetailModal
        agent={selectedAgent}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAuthorizePayout={handleAuthorizePayout}
      />
    </div>
  );
}
