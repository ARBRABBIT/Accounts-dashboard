'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import {
  Search,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  X,
  CreditCard,
  User,
  Calendar,
  ShieldCheck,
  Download,
  Share2,
} from 'lucide-react';
import {
  subscriptionPaymentsData,
  SubscriptionPayment,
  SubscriptionPlanType,
} from '@/lib/subscription-payments-data';

interface SubscriptionPaymentsViewProps {
  onBack?: () => void;
}

export function SubscriptionPaymentsView({ onBack }: SubscriptionPaymentsViewProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [activePlan, setActivePlan] = useState<SubscriptionPlanType>('platinum');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<SubscriptionPayment | null>(null);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/payment-management');
    }
  };

  // Filter records based on active plan and search query
  const filteredRecords = useMemo(() => {
    let list = subscriptionPaymentsData.filter((item) => item.planType === activePlan);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.userName.toLowerCase().includes(q) ||
          item.landId.toLowerCase().includes(q) ||
          item.status.toLowerCase().includes(q) ||
          item.amountPaid.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activePlan, searchQuery]);

  // GSAP animation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sub-header-anim',
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
      );
      gsap.fromTo(
        '.sub-controls-anim',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.05, ease: 'power2.out', clearProps: 'all' }
      );
      gsap.fromTo(
        '.sub-table-anim',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, delay: 0.1, ease: 'power2.out', clearProps: 'all' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getStatusBadge = (status: SubscriptionPayment['status']) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[rgba(26,138,63,0.1)] px-3 py-1 text-[11px] font-bold tracking-[-0.55px] text-[#1A8A3F] uppercase">
            Active
          </span>
        );
      case 'EXPIRED':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[rgba(186,26,26,0.1)] px-3 py-1 text-[11px] font-bold tracking-[-0.55px] text-[#BA1A1A] uppercase">
            Expired
          </span>
        );
      case 'RENEWAL DUE':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[rgba(249,115,22,0.1)] px-3 py-1 text-[11px] font-bold tracking-[-0.55px] text-[#EA580C] uppercase">
            Renewal Due
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-bold tracking-[-0.55px] text-neutral-600 uppercase">
            {status}
          </span>
        );
    }
  };

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-6 md:gap-7">
      {/* Top Header: Breadcrumbs (Payment Management > Subscriptions Payments) */}
      <header className="sub-header-anim">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-1.5 text-base sm:text-lg font-semibold min-h-10 -mt-1"
        >
          <button
            type="button"
            onClick={handleBack}
            className="text-[#64748B] hover:text-black transition-colors cursor-pointer"
          >
            Payment Management
          </button>
          <ChevronRight size={16} className="text-[#94A3B8] shrink-0" />
          <span className="text-black font-bold">Subscriptions Payments</span>
        </nav>
      </header>

      {/* Controls Row: Plan Filter Pills (Left) and Search Input (Right) */}
      <div className="sub-controls-anim flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Segmented Plan Filter Capsule */}
        <div
          role="tablist"
          aria-label="Subscription plan filters"
          className="flex h-[54px] w-full sm:w-auto items-center rounded-full bg-white p-1.5 shadow-[0px_4px_24px_rgba(0,0,0,0.04)]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activePlan === 'platinum'}
            onClick={() => setActivePlan('platinum')}
            className={`h-10 rounded-full px-5 sm:px-6 text-sm font-semibold transition-all cursor-pointer ${
              activePlan === 'platinum'
                ? 'bg-[#2780C4] text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
                : 'text-[#6B7280] hover:text-[#191C1D]'
            }`}
          >
            Platinum Annual
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activePlan === 'growth'}
            onClick={() => setActivePlan('growth')}
            className={`h-10 rounded-full px-4 sm:px-5 text-sm font-semibold transition-all cursor-pointer ${
              activePlan === 'growth'
                ? 'bg-[#2780C4] text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
                : 'text-[#6B7280] hover:text-[#191C1D]'
            }`}
          >
            Growth Plan
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activePlan === 'starter'}
            onClick={() => setActivePlan('starter')}
            className={`h-10 rounded-full px-4 sm:px-5 text-sm font-semibold transition-all cursor-pointer ${
              activePlan === 'starter'
                ? 'bg-[#2780C4] text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
                : 'text-[#6B7280] hover:text-[#191C1D]'
            }`}
          >
            Starter Plan
          </button>
        </div>

        {/* Search Bar Capsule */}
        <div className="relative flex h-[52px] w-full sm:w-[295px] items-center gap-2 rounded-[60px] border border-black/5 bg-white px-5 shadow-xs transition focus-within:border-[#2780C4]/40 focus-within:ring-2 focus-within:ring-[#2780C4]/10">
          <Search size={20} className="shrink-0 text-[#5C5C5C]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Land Id"
            aria-label="Search subscription payments"
            className="w-full bg-transparent text-[16px] font-normal text-black placeholder:text-[#5C5C5C] focus:outline-none"
          />
        </div>
      </div>

      {/* Main Table Container Card */}
      <div className="sub-table-anim overflow-hidden rounded-[24px] border border-[#C1C6D7]/30 bg-white shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.05)]">
        {/* Horizontally scrolling table container */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead>
              <tr className="h-[56px] border-b border-[#C1C6D7] bg-[rgba(243,244,245,0.5)]">
                <th
                  scope="col"
                  className="px-6 py-4 text-[12px] font-bold tracking-[0.6px] uppercase text-[#575E70]"
                >
                  User Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right text-[12px] font-bold tracking-[0.6px] uppercase text-[#575E70]"
                >
                  Amount Paid
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right text-[12px] font-bold tracking-[0.6px] uppercase text-[#575E70]"
                >
                  Total Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-center text-[12px] font-bold tracking-[0.6px] uppercase text-[#575E70]"
                >
                  Times Taken
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-[12px] font-bold tracking-[0.6px] uppercase text-[#575E70]"
                >
                  Start Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-[12px] font-bold tracking-[0.6px] uppercase text-[#575E70]"
                >
                  End Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-center text-[12px] font-bold tracking-[0.6px] uppercase text-[#575E70]"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-center text-[12px] font-bold tracking-[0.6px] uppercase text-[#575E70]"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(193,198,215,0.3)]">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-sm text-[#5E5E63]">
                    No subscription payment records found matching your query.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => (
                  <tr
                    key={item.id}
                    className="group h-[72px] transition-colors hover:bg-slate-50/70"
                  >
                    {/* User Name */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[16px] font-medium leading-6 text-[#191C1D]">
                          {item.userName}
                        </span>
                        <span className="text-[11px] font-medium text-[#737887]">
                          {item.landId}
                        </span>
                      </div>
                    </td>

                    {/* Amount Paid */}
                    <td className="px-6 py-4 text-right">
                      <span className="text-[16px] font-bold leading-6 text-[#2780C4] tabular-nums">
                        {item.amountPaid}
                      </span>
                    </td>

                    {/* Total Amount */}
                    <td className="px-6 py-4 text-right">
                      <span className="text-[16px] font-normal leading-6 text-[#191C1D] tabular-nums">
                        {item.totalAmount}
                      </span>
                    </td>

                    {/* Times Taken */}
                    <td className="px-6 py-4 text-center">
                      <span className="text-[16px] font-normal leading-6 text-[#414755]">
                        {item.timesTaken}
                      </span>
                    </td>

                    {/* Start Date */}
                    <td className="px-6 py-4">
                      <span className="text-[16px] font-normal leading-6 text-[#414755]">
                        {item.startDate}
                      </span>
                    </td>

                    {/* End Date */}
                    <td className="px-6 py-4">
                      <span className="text-[16px] font-normal leading-6 text-[#414755]">
                        {item.endDate}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Action */}
                    <td className="relative px-6 py-4 text-center">
                      <button
                        type="button"
                        aria-label={`Action menu for ${item.userName}`}
                        onClick={() =>
                          setActionMenuId(actionMenuId === item.id ? null : item.id)
                        }
                        className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg text-[#414755] transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-[#2780C4] cursor-pointer"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Action Dropdown Menu */}
                      {actionMenuId === item.id && (
                        <div
                          role="menu"
                          className="absolute right-6 top-14 z-30 w-48 rounded-xl border border-black/10 bg-white p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150 text-left"
                        >
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setSelectedRecord(item);
                              setActionMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#191C1D] hover:bg-neutral-100 cursor-pointer"
                          >
                            <CreditCard size={14} className="text-[#2780C4]" />
                            View Payment Details
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              alert(`Receipt for ${item.userName} downloaded`);
                              setActionMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#191C1D] hover:bg-neutral-100 cursor-pointer"
                          >
                            <Download size={14} className="text-[#5E5E63]" />
                            Download Receipt
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination matching Figma CSS */}
        <div className="flex flex-col gap-4 border-t border-[#C1C6D7] bg-[rgba(243,244,245,0.3)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Information */}
          <p className="text-[12px] font-medium tracking-[0.24px] text-[#414755]">
            Showing 1–{filteredRecords.length} of 1,426 records
          </p>

          {/* Pagination Buttons */}
          <nav aria-label="Table pagination" className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C1C6D7] text-[#414755] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              aria-current={currentPage === 1 ? 'page' : undefined}
              onClick={() => setCurrentPage(1)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentPage === 1
                  ? 'bg-[#2780C4] text-white shadow-xs'
                  : 'border border-[#C1C6D7] text-[#414755] hover:bg-white'
              }`}
            >
              1
            </button>

            <button
              type="button"
              aria-current={currentPage === 2 ? 'page' : undefined}
              onClick={() => setCurrentPage(2)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentPage === 2
                  ? 'bg-[#2780C4] text-white shadow-xs'
                  : 'border border-[#C1C6D7] text-[#414755] hover:bg-white'
              }`}
            >
              2
            </button>

            <button
              type="button"
              aria-current={currentPage === 3 ? 'page' : undefined}
              onClick={() => setCurrentPage(3)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentPage === 3
                  ? 'bg-[#2780C4] text-white shadow-xs'
                  : 'border border-[#C1C6D7] text-[#414755] hover:bg-white'
              }`}
            >
              3
            </button>

            <span className="flex w-6 items-center justify-center text-xs text-[#414755]">
              ...
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage(143)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentPage === 143
                  ? 'bg-[#2780C4] text-white shadow-xs'
                  : 'border border-[#C1C6D7] text-[#414755] hover:bg-white'
              }`}
            >
              143
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage((p) => p + 1)}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C1C6D7] text-[#414755] transition-colors hover:bg-white cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </nav>
        </div>
      </div>

      {/* Detail Inspection Modal */}
      {selectedRecord && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-detail-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-lg flex-col rounded-[24px] border border-black/5 bg-white p-6 sm:p-7 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#F2F2F2] pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2780C4]">
                  Subscription Payment Record
                </span>
                <h2
                  id="payment-detail-title"
                  className="mt-1 text-2xl font-bold text-[#191C1D]"
                >
                  {selectedRecord.userName}
                </h2>
                <p className="text-xs text-[#5E5E63]">
                  Land ID: {selectedRecord.landId} • Plan:{' '}
                  {selectedRecord.planType.toUpperCase()}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                aria-label="Close modal"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#5E5E63] transition hover:bg-black/5 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-5 flex flex-col gap-5 text-sm">
              {/* Amounts Grid */}
              <div className="grid grid-cols-2 gap-3 rounded-2xl bg-[#F8F9FA] p-4">
                <div>
                  <span className="text-xs font-medium text-[#5E5E63]">
                    Amount Paid
                  </span>
                  <p className="mt-0.5 text-xl font-bold text-[#2780C4]">
                    {selectedRecord.amountPaid}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-[#5E5E63]">
                    Total Agreement
                  </span>
                  <p className="mt-0.5 text-xl font-bold text-[#191C1D]">
                    {selectedRecord.totalAmount}
                  </p>
                </div>
              </div>

              {/* Status and Tenure */}
              <div className="flex items-center justify-between border-b border-[#F2F2F2] pb-4">
                <span className="text-xs font-medium text-[#5E5E63]">
                  Subscription Status
                </span>
                <div>{getStatusBadge(selectedRecord.status)}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-[#F2F2F2] pb-4">
                <div>
                  <span className="text-xs font-medium text-[#5E5E63]">Start Date</span>
                  <p className="mt-0.5 font-semibold text-[#191C1D]">
                    {selectedRecord.startDate}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-[#5E5E63]">End Date</span>
                  <p className="mt-0.5 font-semibold text-[#191C1D]">
                    {selectedRecord.endDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-[#F2F2F2] pb-4">
                <span className="text-xs font-medium text-[#5E5E63]">Times Taken</span>
                <span className="font-semibold text-[#191C1D]">
                  {selectedRecord.timesTaken}
                </span>
              </div>

              {/* Member Details */}
              <div className="flex flex-col gap-2 rounded-xl border border-[#E5E5EA] p-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#5E5E63]">Email:</span>
                  <span className="font-medium text-[#191C1D]">
                    {selectedRecord.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5E5E63]">Contact:</span>
                  <span className="font-medium text-[#191C1D]">
                    {selectedRecord.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#F2F2F2] pt-4">
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="h-10 rounded-xl px-4 text-xs font-semibold text-[#5E5E63] hover:bg-neutral-100 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Invoice downloaded for ${selectedRecord.userName}`);
                  setSelectedRecord(null);
                }}
                className="flex h-10 items-center gap-2 rounded-xl bg-[#2780C4] px-4 text-xs font-semibold text-white shadow-xs hover:bg-[#206aa3] cursor-pointer"
              >
                <Download size={14} />
                Download Statement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

