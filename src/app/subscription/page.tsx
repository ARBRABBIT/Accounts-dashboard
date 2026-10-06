'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import {
  ArrowLeft,
  Briefcase,
  Calendar as CalendarIcon,
  Star,
  Award,
  Layers,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Search,
  Mail,
  Phone,
  Building2,
  FileText,
  Download,
  ShieldCheck,
  MapPin,
  Landmark,
  Sparkles,
  Coins,
} from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { Pagination } from '@/components/ui/pagination';
import { BackButton } from '@/components/ui/back-button';
import {
  enterpriseMetrics,
  subscriptionPlans,
  SubscriptionPlan,
  getSubscribersForPlan,
  getSubscriberDetails,
  SubscriberRecord,
} from '@/lib/subscription-data';

export default function SubscriptionPage() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  // Default to Platinum Annual Plan (subscriptionPlans[0]) to immediately display the requested screen
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(subscriptionPlans[0]);
  const [selectedSubscriber, setSelectedSubscriber] = useState<SubscriberRecord | null>(null);
  const [subscriberSearch, setSubscriberSearch] = useState('');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Calendar');
  const [actionToast, setActionToast] = useState<string | null>(null);

  function triggerToast(msg: string) {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3500);
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sub-anim-hero',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          clearProps: 'all',
        }
      );
      gsap.fromTo(
        '.sub-table-row',
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.05,
          delay: 0.05,
          ease: 'power2.out',
          clearProps: 'all',
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [selectedPlan, selectedSubscriber]);

  function handleBack() {
    if (selectedSubscriber) {
      setSelectedSubscriber(null);
      return;
    }
    if (selectedPlan) {
      setSelectedPlan(null);
      return;
    }
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/revenue-management');
    }
  }

  function renderPlanIcon(icon: string) {
    switch (icon) {
      case 'star':
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FB] text-[#2780C4]">
            <Star size={18} fill="#2780C4" strokeWidth={1.5} />
          </div>
        );
      case 'award':
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FB] text-[#2780C4]">
            <Award size={18} strokeWidth={2} />
          </div>
        );
      case 'layers':
      default:
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F2F2F4] text-[#5E5E63]">
            <Layers size={18} strokeWidth={2} />
          </div>
        );
    }
  }

  function renderSummaryCardIcon(icon?: string) {
    switch (icon) {
      case 'award':
        return <Award size={22} className="text-[#2780C4]" strokeWidth={2.2} />;
      case 'layers':
        return <Layers size={22} className="text-[#2780C4]" strokeWidth={2.2} />;
      case 'star':
      default:
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="#2780C4" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="3.5" fill="#2780C4" />
          </svg>
        );
    }
  }

  const planDisplayName = selectedPlan
    ? selectedPlan.name.toLowerCase().endsWith('plan')
      ? selectedPlan.name
      : `${selectedPlan.name} Plan`
    : '';

  const activeSubscribers = selectedPlan ? getSubscribersForPlan(selectedPlan.id) : [];

  const filteredSubscribers = activeSubscribers.filter((sub) =>
    sub.name.toLowerCase().includes(subscriberSearch.toLowerCase())
  );

  return (
    <div
      ref={rootRef}
      className="min-h-screen w-full bg-[#F2F2F2] px-4 pt-8 pb-20 sm:px-8 md:px-12 lg:px-14"
    >
      <div className="mx-auto max-w-[1312px]">
        {/* Header */}
        <header className="flex items-start gap-4">
          {!selectedPlan && !selectedSubscriber && (
            <BackButton
              onClick={handleBack}
              label="Go back to Revenue Management"
            />
          )}
          <div className="flex-1 min-w-0">
            {selectedSubscriber ? (
              <nav
                aria-label="Breadcrumb"
                className="flex items-center flex-wrap gap-1.5 text-base sm:text-lg font-semibold min-h-10 -mt-1"
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlan(null);
                    setSelectedSubscriber(null);
                    setSubscriberSearch('');
                  }}
                  className="text-[#64748B] hover:text-black transition-colors cursor-pointer"
                >
                  Subscription
                </button>
                <ChevronRight size={16} className="text-[#94A3B8] shrink-0" />
                <button
                  type="button"
                  onClick={() => setSelectedSubscriber(null)}
                  className="text-[#64748B] hover:text-black transition-colors cursor-pointer"
                >
                  {planDisplayName}
                </button>
                <ChevronRight size={16} className="text-[#94A3B8] shrink-0" />
                <span className="text-black font-bold">
                  {selectedSubscriber.name}
                </span>
              </nav>
            ) : selectedPlan ? (
              <nav
                aria-label="Breadcrumb"
                className="flex items-center flex-wrap gap-1.5 text-base sm:text-lg font-semibold min-h-10 -mt-1"
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlan(null);
                    setSubscriberSearch('');
                  }}
                  className="text-[#64748B] hover:text-black transition-colors cursor-pointer"
                >
                  Subscription
                </button>
                <ChevronRight size={16} className="text-[#94A3B8] shrink-0" />
                <span className="text-black font-bold">
                  {planDisplayName}
                </span>
              </nav>
            ) : (
              <>
                <h1 className="text-[28px] font-semibold leading-[1.1] text-black">
                  Subscription
                </h1>
                <p className="mt-1.5 text-base font-normal text-[#404750]">
                  Real-time performance metrics for GLC Enterprise accounts.
                </p>
              </>
            )}
          </div>
        </header>

        {selectedSubscriber ? (
          /* ========================================================= */
          /* VIEW 3: Dedicated Customer Detail Page (GLC Design System) */
          /* ========================================================= */
          (() => {
            const customer = getSubscriberDetails(selectedSubscriber);
            return (
              <div className="space-y-8 mt-8">
                {/* Customer Profile Banner Card */}
                <section
                  aria-label="Customer Profile Header"
                  className="sub-anim-hero rounded-[28px] border border-white/60 bg-white p-6 sm:p-8 shadow-xs"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      <img
                        src={customer.avatarUrl}
                        alt={customer.name}
                        className="h-20 w-20 rounded-full object-cover border-2 border-slate-100 shadow-sm shrink-0"
                      />
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191C1E]">
                            {customer.name}
                          </h1>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {customer.status}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#CFE5FF]/70 px-3 py-1 text-xs font-bold text-[#00609A] border border-[#2780C4]/30 shadow-2xs">
                            <Sparkles size={13} className="text-[#2780C4]" />
                            {customer.availableCredits} / {customer.totalCredits} Credits Available
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5 pt-0.5 text-xs text-[#5E5E63]">
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FAFBFD] px-2.5 py-1 border border-[#E5E5EA]">
                            <Mail size={13} className="text-[#86868B]" />
                            {customer.email}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FAFBFD] px-2.5 py-1 border border-[#E5E5EA]">
                            <Phone size={13} className="text-[#86868B]" />
                            {customer.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => triggerToast(`Institutional license verified for ${customer.name}`)}
                        className="inline-flex items-center gap-2 rounded-full bg-[#2780C4] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#1f6da8] active:scale-95 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
                      >
                        <ShieldCheck size={16} />
                        <span>License Verified</span>
                      </button>
                    </div>
                  </div>
                </section>

                {/* 5 Summary Metric Bento Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {/* Card 1: Subscription Tier */}
                  <div className="rounded-[22px] border border-white/60 bg-white p-5 shadow-xs">
                    <span className="text-[11px] font-bold tracking-[1px] uppercase text-[#64748B]">
                      SUBSCRIPTION PLAN
                    </span>
                    <div className="mt-2 text-xl font-bold tracking-tight text-[#00609A]">
                      {planDisplayName}
                    </div>
                    <p className="mt-1 text-xs text-[#5E5E63] truncate">
                      {customer.quota}
                    </p>
                  </div>

                  {/* Card 2: Available Credits */}
                  <div className="rounded-[22px] border border-[#2780C4]/30 bg-gradient-to-br from-[#CFE5FF]/30 via-white to-white p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-[1px] uppercase text-[#00609A]">
                        AVAILABLE CREDITS
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#2780C4] px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs">
                        Active Quota
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-2xl font-black tracking-tight text-[#00609A]">
                        {customer.availableCredits}
                      </span>
                      <span className="text-xs font-semibold text-[#5E5E63]">
                        / {customer.totalCredits} credits left
                      </span>
                    </div>
                    {/* Visual credit quota bars */}
                    <div className="mt-2.5 flex items-center gap-1">
                      {Array.from({ length: customer.totalCredits }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all ${
                            i < customer.availableCredits ? 'bg-[#2780C4]' : 'bg-[#E5E5EA]'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-[11px] font-medium text-[#404750]">
                      {customer.availableCredits} of {customer.totalCredits} farmland unlocks ready
                    </p>
                  </div>

                  {/* Card 3: Annual Fee */}
                  <div className="rounded-[22px] border border-white/60 bg-white p-5 shadow-xs">
                    <span className="text-[11px] font-bold tracking-[1px] uppercase text-[#64748B]">
                      ANNUAL FEE BILLED
                    </span>
                    <div className="mt-2 text-xl font-bold tracking-tight text-[#191C1E]">
                      {customer.amountPaid}
                    </div>
                    <p className="mt-1 text-xs font-semibold text-emerald-600">
                      {customer.cycle} Billing Schedule
                    </p>
                  </div>

                  {/* Card 4: Contract Window */}
                  <div className="rounded-[22px] border border-white/60 bg-white p-5 shadow-xs">
                    <span className="text-[11px] font-bold tracking-[1px] uppercase text-[#64748B]">
                      CONTRACT WINDOW
                    </span>
                    <div className="mt-2 text-base font-bold tracking-tight text-[#191C1E] sm:text-lg">
                      {customer.startDate} – {customer.endDate}
                    </div>
                    <p className="mt-1 text-xs text-[#5E5E63]">
                      Active Institutional Term
                    </p>
                  </div>

                  {/* Card 5: Farmland Assets */}
                  <div className="rounded-[22px] border border-white/60 bg-white p-5 shadow-xs">
                    <span className="text-[11px] font-bold tracking-[1px] uppercase text-[#64748B]">
                      FARMLAND UNDER COVERAGE
                    </span>
                    <div className="mt-2 text-xl font-bold tracking-tight text-[#191C1E]">
                      {customer.totalAreaCovered}
                    </div>
                    <p className="mt-1 text-xs text-[#5E5E63] truncate">
                      Passbook: {customer.passbookNumber}
                    </p>
                  </div>
                </div>

                {/* Two-Column Section: Tables on Left, Institutional Metadata on Right */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
                  {/* Main Column (8 cols): Farmland Holdings + Invoice History */}
                  <div className="lg:col-span-8 space-y-8">
                    {/* Farmland Holdings Table Card */}
                    <section
                      aria-label="Registered Farmland Holdings"
                      className="rounded-[24px] border border-white/60 bg-white shadow-[0px_20px_40px_rgba(0,0,0,0.04)] overflow-hidden"
                    >
                      <div className="p-6 sm:p-7 border-b border-[#F2F2F2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-bold text-[#191C1E]">
                            Registered Farmland Holdings
                          </h2>
                          <p className="text-xs sm:text-sm text-[#5E5E63] mt-1">
                            Verified land parcels protected under institutional Dharani RoR-1B telemetry.
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4FB] px-3.5 py-1 text-xs font-semibold text-[#00609A]">
                          <Landmark size={14} />
                          {customer.holdings.length} Land Parcels
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[620px] border-collapse text-left">
                          <thead>
                            <tr className="border-b border-[#F2F2F2] bg-[#FAFBFD]/60 text-xs font-semibold tracking-[0.5px] text-[#94A3B8] uppercase select-none">
                              <th scope="col" className="px-6 sm:px-7 py-3.5">
                                FARMLAND ID
                              </th>
                              <th scope="col" className="px-6 py-3.5">
                                MANDAL/ DISTRICT
                              </th>
                              <th scope="col" className="px-6 py-3.5">
                                ACRES
                              </th>
                              <th scope="col" className="px-6 py-3.5">
                                CREATED DATE
                              </th>
                              <th scope="col" className="px-6 sm:px-7 py-3.5 text-right">
                                STATUS
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#F2F2F2]">
                            {customer.holdings.map((holding, idx) => (
                              <tr
                                key={idx}
                                className="sub-table-row transition-colors hover:bg-[#F8FAFC]"
                              >
                                <td className="px-6 sm:px-7 py-4">
                                  <div className="flex items-center gap-2.5">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF4FB] text-[#2780C4]">
                                      <MapPin size={15} />
                                    </div>
                                    <span className="font-bold text-sm text-[#191C1E]">
                                      {holding.farmlandId}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#404750]">
                                  <span className="font-semibold text-[#191C1E]">{holding.mandal}</span>, {holding.district}
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-[#00609A]">
                                  {holding.acres}
                                </td>
                                <td className="px-6 py-4 text-xs font-semibold text-[#94A3B8] tracking-[-0.3px] uppercase">
                                  {holding.createdDate}
                                </td>
                                <td className="px-6 sm:px-7 py-4 text-right">
                                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200/50">
                                    <CheckCircle2 size={12} className="text-emerald-600" />
                                    {holding.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>

                    {/* Documents Unlocked Farmlands Card */}
                    <section
                      aria-label="Documents Unlocked Farmlands"
                      className="rounded-[24px] border border-white/60 bg-white shadow-[0px_20px_40px_rgba(0,0,0,0.04)] overflow-hidden"
                    >
                      <div className="p-6 sm:p-7 border-b border-[#F2F2F2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-bold text-[#191C1E]">
                            Documents Unlocked Farmlands
                          </h2>
                          <p className="text-xs sm:text-sm text-[#5E5E63] mt-1">
                            Official land title deeds, Dharani RoR-1B passbooks, 30-year ECs, and cadastral survey maps unlocked under subscription.
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/50">
                            <FileText size={14} className="text-emerald-600" />
                            {customer.documents.length} Documents Unlocked
                          </span>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] border-collapse text-left">
                          <thead>
                            <tr className="border-b border-[#F2F2F2] bg-[#FAFBFD]/60 text-xs font-semibold tracking-[0.5px] text-[#94A3B8] uppercase select-none">
                              <th scope="col" className="px-6 sm:px-7 py-3.5">
                                FARMLAND ID
                              </th>
                              <th scope="col" className="px-6 py-3.5">
                                LOCATION
                              </th>
                              <th scope="col" className="px-6 py-3.5">
                                ACRES
                              </th>
                              <th scope="col" className="px-6 py-3.5">
                                UNLOCKED DATE
                              </th>
                              <th scope="col" className="px-6 py-3.5 text-center">
                                STATUS
                              </th>
                              <th scope="col" className="px-6 sm:px-7 py-3.5 text-right">
                                ACTION
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#F2F2F2]">
                            {customer.documents.map((doc) => (
                              <tr
                                key={doc.id}
                                className="sub-table-row transition-colors hover:bg-[#F8FAFC]"
                              >
                                {/* Farmland ID */}
                                <td className="px-6 sm:px-7 py-4">
                                  <div className="flex items-center gap-2.5">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF4FB] text-[#2780C4]">
                                      <FileText size={15} />
                                    </div>
                                    <span className="font-bold text-sm text-[#191C1E]">
                                      {doc.farmlandId}
                                    </span>
                                  </div>
                                </td>

                                {/* Location */}
                                <td className="px-6 py-4 text-sm font-semibold text-[#191C1E]">
                                  {doc.location}
                                </td>

                                {/* Acres */}
                                <td className="px-6 py-4 text-sm font-semibold text-[#00609A]">
                                  {doc.acres}
                                </td>

                                {/* Unlocked date */}
                                <td className="px-6 py-4 text-xs font-semibold text-[#94A3B8] tracking-[-0.3px] uppercase">
                                  {doc.unlockedDate}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 text-center">
                                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200/50">
                                    <CheckCircle2 size={11} className="text-emerald-600" />
                                    {doc.status}
                                  </span>
                                </td>

                                {/* Action */}
                                <td className="px-6 sm:px-7 py-4 text-right">
                                  <button
                                    type="button"
                                    onClick={() => triggerToast(`Downloaded unlocked documents for ${doc.farmlandId}`)}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5EA] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1D1D1F] hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                                  >
                                    <Download size={13} className="text-[#5E5E63]" />
                                    <span>Download</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </div>

                  {/* Sidebar Column (4 cols): Entitlements + Account Desk + Audit */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Card: Document Credits Balance */}
                    <div className="rounded-[24px] border border-[#2780C4]/25 bg-gradient-to-br from-[#CFE5FF]/20 via-white to-white p-6 shadow-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-[#F2F2F2]">
                        <h3 className="text-base font-bold text-[#191C1E]">
                          Document Credits Quota
                        </h3>
                        <span className="rounded-full bg-[#2780C4] px-2.5 py-0.5 text-[11px] font-bold text-white shadow-2xs">
                          {customer.availableCredits} / {customer.totalCredits} Left
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl font-black text-[#00609A]">
                              {customer.availableCredits}
                            </span>
                            <span className="text-xs font-semibold text-[#5E5E63]">
                              / {customer.totalCredits} credits available
                            </span>
                          </div>
                          <p className="text-[11px] text-[#64748B] mt-0.5">
                            Monthly quota for farmland telemetry
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => triggerToast(`Use 1 credit to unlock next farmland document`)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#2780C4] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1f6da8] active:scale-95 transition-all cursor-pointer"
                        >
                          <Sparkles size={13} />
                          <span>Unlock Doc</span>
                        </button>
                      </div>
                    </div>

                    {/* Card C: License Entitlements */}
                    <div className="rounded-[24px] border border-white/60 bg-white p-6 shadow-xs">
                      <div className="flex items-center justify-between pb-4 border-b border-[#F2F2F2]">
                        <h3 className="text-base font-bold text-[#191C1E]">
                          License Entitlements
                        </h3>
                        <span className="rounded-full bg-[#EAF4FB] px-2.5 py-0.5 text-[11px] font-semibold text-[#00609A]">
                          Active Tier
                        </span>
                      </div>

                      <ul className="mt-4 space-y-3.5 text-xs sm:text-sm text-[#404750]">
                        {[
                          'Dharani RoR-1B Digital Synchronization',
                          'Encumbrance Certificate (EC) Live Monitoring',
                          'High-Resolution Satellite Telemetry',
                          'Priority Ground Surveyor Dispatch (< 24 hrs)',
                          '24/7 Dedicated Legal Underwriting Desk',
                          'Unlimited Multi-Seat Operator Architecture',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 size={16} className="text-[#2780C4] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card D: Assigned Account Manager */}
                    <div className="rounded-[24px] border border-white/60 bg-white p-6 shadow-xs">
                      <h3 className="text-base font-bold text-[#191C1E] pb-3 border-b border-[#F2F2F2]">
                        Assigned Account Lead
                      </h3>
                      <div className="mt-4 flex items-center gap-3.5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAF4FB] text-[#2780C4] font-bold text-base">
                          RK
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#191C1E]">{customer.accountManager}</h4>
                          <p className="text-xs text-[#64748B]">Senior Underwriting Desk</p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2 rounded-xl bg-[#FAFBFD] p-3 text-xs text-[#5E5E63] border border-[#E5E5EA]">
                        <div className="flex items-center justify-between">
                          <span>Direct Desk:</span>
                          <span className="font-medium text-[#191C1E]">desk.rajesh@glc.in</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Response SLA:</span>
                          <span className="font-semibold text-emerald-600">Under 2 Hours</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => triggerToast(`Contact request sent to ${customer.accountManager}`)}
                        className="mt-4 w-full rounded-full border border-[#E5E5EA] bg-white py-2.5 text-xs font-semibold text-[#1D1D1F] hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                      >
                        Contact Account Lead
                      </button>
                    </div>

                    {/* Card E: Security & SRO Compliance */}
                    <div className="rounded-[24px] border border-white/60 bg-white p-6 shadow-xs">
                      <h3 className="text-base font-bold text-[#191C1E] pb-3 border-b border-[#F2F2F2]">
                        Registry Compliance
                      </h3>
                      <div className="mt-4 space-y-3 text-xs text-[#5E5E63]">
                        <div className="flex items-center justify-between">
                          <span>Sub-Registry Office:</span>
                          <span className="font-semibold text-[#191C1E]">Rangareddy SRO</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Last Registry Sync:</span>
                          <span className="font-semibold text-[#191C1E]">Today, 09:30 AM</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Audit Signature:</span>
                          <span className="font-mono text-[11px] text-[#2780C4]">SHA-256 Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Toast Feedback */}
                {actionToast && (
                  <div className="fixed bottom-24 right-8 z-50 flex items-center gap-2 rounded-2xl bg-[#191C1E] px-5 py-3 text-sm text-white shadow-xl animate-fade-in">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>{actionToast}</span>
                  </div>
                )}
              </div>
            );
          })()
        ) : selectedPlan ? (
          /* ========================================================= */
          /* VIEW 2: Plan Detail View Page (Matching Figma CSS) */
          /* ========================================================= */
          <div className="space-y-10">
            {/* Section - Subscription Summary Card */}
            <section
              aria-label="Subscription Summary"
              className="sub-anim-hero mt-8 rounded-[28px] bg-white p-7 sm:p-9 shadow-xs"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                {/* Left Side: Plan Info & Description (VerticalBorder) */}
                <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-6 border-b border-[#C0C7D2] pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#CFE5FF]">
                      {renderSummaryCardIcon(selectedPlan.icon)}
                    </div>
                    <span className="text-base font-normal text-[#00609A]">
                      {planDisplayName}
                    </span>
                  </div>

                  <p className="mt-3.5 text-base font-normal leading-[26px] text-[#404750] max-w-xl">
                    {selectedPlan.description ||
                      'Comprehensive institutional coverage with 24/7 dedicated support and unlimited seat architecture.'}
                  </p>
                </div>

                {/* Right Side: 3 Metric Columns */}
                <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-between sm:justify-around lg:justify-between px-2 sm:px-6">
                  {/* Metric 1: Total Subscribers */}
                  <div className="flex flex-col items-center text-center">
                    <span className="text-[11.77px] font-bold tracking-[1.18px] uppercase text-[#404750]">
                      TOTAL SUBSCRIBERS
                    </span>
                    <span className="mt-1.5 text-[15.7px] font-normal text-[#191C1E]">
                      {selectedPlan.subscribers || '1,245'}
                    </span>
                  </div>

                  {/* Metric 2: Total Revenue */}
                  <div className="flex flex-col items-center text-center">
                    <span className="text-[11.77px] font-bold tracking-[1.18px] uppercase text-[#404750]">
                      TOTAL REVENUE
                    </span>
                    <span className="mt-1.5 text-[15.7px] font-normal text-[#191C1E]">
                      {selectedPlan.annualRevenue || '₹29.40 Cr'}
                    </span>
                  </div>

                  {/* Metric 3: Renewal Rate */}
                  <div className="flex flex-col items-center text-center">
                    <span className="text-[11.77px] font-bold tracking-[1.18px] uppercase text-[#404750]">
                      RENEWAL RATE
                    </span>
                    <span className="mt-1.5 text-[15.7px] font-normal text-[#00609A]">
                      {selectedPlan.renewalRate || '98.4%'}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section Header & Controls */}
            <section aria-label="Plan Customer Directory">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-[-0.6px] text-[#1A1C1D]">
                    {planDisplayName}
                  </h2>
                  <p className="mt-1 text-[13px] font-medium tracking-[0.13px] text-[#5E5E63]">
                    Real time settlement data across administrative zones
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Search field */}
                  <div className="relative flex items-center">
                    <Search size={18} className="pointer-events-none absolute left-4 text-[#5C5C5C]" />
                    <input
                      type="text"
                      placeholder="Search name.."
                      value={subscriberSearch}
                      onChange={(e) => setSubscriberSearch(e.target.value)}
                      className="h-[42px] w-[220px] sm:w-[278px] rounded-[60px] border border-[#E5E5EA] bg-white pl-11 pr-4 text-sm text-[#1A1C1D] placeholder-[#5C5C5C] shadow-xs transition-all focus:border-[#2780C4] focus:outline-none"
                    />
                  </div>

                  {/* Calendar button */}
                  <button
                    type="button"
                    onClick={() => setShowCalendarModal(true)}
                    className="inline-flex h-[42px] items-center gap-2 rounded-full border border-[#E5E5EA] bg-white px-5 text-sm font-normal text-[#1D1D1F] shadow-xs transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
                  >
                    <CalendarIcon size={16} className="text-[#86868B]" />
                    <span>{selectedPeriod}</span>
                  </button>
                </div>
              </div>

              {/* Directory Table (Frosted Glass Card) */}
              <div className="mt-6 overflow-hidden rounded-[24px] border border-white/40 bg-white shadow-[0px_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-[12px]">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[860px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-[#F2F2F2] bg-[#FAFBFD]/60 text-xs font-semibold tracking-[1px] text-[#94A3B8] uppercase select-none">
                        <th scope="col" className="px-8 py-4">
                          CUSTOMER NAME
                        </th>
                        <th scope="col" className="px-6 py-4">
                          AMOUNT PAID
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          CYCLE
                        </th>
                        <th scope="col" className="px-6 py-4">
                          START DATE
                        </th>
                        <th scope="col" className="px-6 py-4">
                          END DATE
                        </th>
                        <th scope="col" className="px-8 py-4 text-right">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F2F2]">
                      {filteredSubscribers.map((sub) => (
                        <tr
                          key={sub.id}
                          className="sub-table-row group transition-colors hover:bg-[#F8FAFC]"
                        >
                          {/* Customer Name */}
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <img
                                src={sub.avatarUrl}
                                alt={sub.name}
                                className="h-10 w-10 rounded-full object-cover border border-slate-100 shadow-xs shrink-0"
                              />
                              <span className="font-semibold text-base text-[#1E293B]">
                                {sub.name}
                              </span>
                            </div>
                          </td>

                          {/* Amount Paid */}
                          <td className="px-6 py-5 text-base font-normal text-[#191C1E]">
                            {sub.amountPaid}
                          </td>

                          {/* Billing Cycle */}
                          <td className="px-6 py-5 text-center">
                            <span className="text-[11px] font-bold text-[#586377] uppercase tracking-[-0.55px]">
                              {sub.cycle}
                            </span>
                          </td>

                          {/* Start Date */}
                          <td className="px-6 py-5 text-xs font-semibold text-[#94A3B8] tracking-[-0.6px] uppercase">
                            {sub.startDate}
                          </td>

                          {/* End Date */}
                          <td className="px-6 py-5 text-xs font-semibold text-[#94A3B8] tracking-[-0.6px] uppercase">
                            {sub.endDate}
                          </td>

                          {/* Actions */}
                          <td className="px-8 py-5 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedSubscriber(sub)}
                              className="inline-flex h-[37px] w-[85px] items-center justify-center rounded-[39px] bg-[#2780C4] text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#1f6da8] hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Footer matching Figma */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-[#F1F5F9] bg-white px-6 py-4">
                  <span className="text-xs font-medium text-[#5E5E63]">
                    Showing 1 to {filteredSubscribers.length} of {selectedPlan.subscribers || '1,284'} customers
                  </span>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-1 rounded-lg border border-[#C3C6D5]/30 bg-white px-3 py-1.5 text-xs font-semibold text-black opacity-40 cursor-not-allowed"
                    >
                      <ChevronLeft size={14} />
                      <span>Previous</span>
                    </button>

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2780C4] text-xs font-bold text-white shadow-xs"
                    >
                      1
                    </button>

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-[#475569] hover:bg-slate-100 transition-colors"
                    >
                      2
                    </button>

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-[#475569] hover:bg-slate-100 transition-colors"
                    >
                      3
                    </button>

                    <span className="px-1 text-xs text-[#94A3B8]">...</span>

                    <button
                      type="button"
                      className="flex h-8 px-2 items-center justify-center rounded-lg text-xs font-bold text-[#475569] hover:bg-slate-100 transition-colors"
                    >
                      1284
                    </button>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-lg border border-[#C3C6D5]/30 bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* ========================================================= */
          /* VIEW 1: Subscription Overview (Enterprise Plan Hero + List) */
          /* ========================================================= */
          <div className="space-y-10">
            {/* Hero Card: Enterprise Plan */}
            <section
              aria-labelledby="enterprise-plan-heading"
              className="sub-anim-hero mt-8 rounded-[24px] border border-[#E5E5EA]/70 bg-white p-6 shadow-xs sm:p-9 md:p-10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col items-start">
                  <span className="inline-flex items-center rounded-full bg-[#2780C4]/10 px-3 py-1 text-[11px] font-bold tracking-wider text-[#2780C4] uppercase">
                    {enterpriseMetrics.tag}
                  </span>
                  <h2
                    id="enterprise-plan-heading"
                    className="mt-3 text-lg font-semibold text-[#191C1E]"
                  >
                    {enterpriseMetrics.planName}
                  </h2>
                  <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-[#404750]">
                    {enterpriseMetrics.description}
                  </p>
                </div>

                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[#EAF2F9] text-[#2780C4]"
                  aria-hidden="true"
                >
                  <Briefcase size={22} strokeWidth={2} />
                </div>
              </div>

              {/* Metrics Row: 3 Columns */}
              <div className="mt-8 grid grid-cols-1 gap-6 pt-6 sm:grid-cols-3 sm:gap-8 border-t border-[#F2F2F2]">
                <div>
                  <span className="text-xs font-bold tracking-wider text-[#5E5E63] uppercase">
                    TOTAL REVENUE
                  </span>
                  <div className="mt-1.5 text-2xl font-bold tracking-tight text-[#191C1E] sm:text-3xl lg:text-[32px]">
                    {enterpriseMetrics.totalRevenue}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold tracking-wider text-[#5E5E63] uppercase">
                    SUBSCRIBERS
                  </span>
                  <div className="mt-1.5 text-2xl font-bold tracking-tight text-[#191C1E] sm:text-3xl lg:text-[32px]">
                    {enterpriseMetrics.subscribers}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold tracking-wider text-[#5E5E63] uppercase">
                    RENEWAL RATE
                  </span>
                  <div className="mt-1.5 text-2xl font-bold tracking-tight text-[#191C1E] sm:text-3xl lg:text-[32px]">
                    {enterpriseMetrics.renewalRate}
                  </div>
                </div>
              </div>
            </section>

            {/* Section Heading & Controls */}
            <section className="mt-10" aria-label="Subscription Breakdown Section">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-[22px] font-bold text-[#1A1C1D] sm:text-2xl">
                    Subscription Breakdown
                  </h2>
                  <p className="mt-0.5 text-sm font-medium text-[#5E5E63]">
                    Real time settlement data across administrative zones
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCalendarModal(true)}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E5E5EA] bg-white px-4 py-2 text-sm font-medium text-[#1A1C1D] shadow-xs transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
                >
                  <CalendarIcon size={16} className="text-[#5E5E63]" />
                  <span>Calendar</span>
                </button>
              </div>

              {/* Table Container */}
              <div className="mt-4 overflow-hidden rounded-[24px] border border-[#E5E5EA]/70 bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-[#F2F2F2] bg-[#FAFBFD]/80 text-xs font-bold tracking-[0.5px] text-[#5E5E63] uppercase select-none">
                        <th scope="col" className="px-6 sm:px-8 py-4">
                          PLAN NAME
                        </th>
                        <th scope="col" className="px-6 sm:px-8 py-4 text-center">
                          SUBSCRIBERS
                        </th>
                        <th scope="col" className="px-6 sm:px-8 py-4 text-right">
                          MONTHLY REVENUE
                        </th>
                        <th scope="col" className="px-6 sm:px-8 py-4 text-right">
                          ANNUAL REVENUE
                        </th>
                        <th scope="col" className="px-6 sm:px-8 py-4 text-right">
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F2F2]">
                      {subscriptionPlans.map((plan) => (
                        <tr
                          key={plan.id}
                          className="sub-table-row group transition-colors hover:bg-[#F8FAFC]"
                        >
                          {/* Plan Name with Icon */}
                          <td className="px-6 sm:px-8 py-4 sm:py-5">
                            <div className="flex items-center gap-3">
                              {renderPlanIcon(plan.icon)}
                              <span className="font-bold text-[#191C1E]">
                                {plan.name}
                              </span>
                            </div>
                          </td>

                          {/* Subscribers */}
                          <td className="px-6 sm:px-8 py-4 sm:py-5 text-center font-medium text-[#46464A]">
                            {plan.subscribers}
                          </td>

                          {/* Monthly Revenue */}
                          <td className="px-6 sm:px-8 py-4 sm:py-5 text-right font-medium text-[#191C1E]">
                            {plan.monthlyRevenue}
                          </td>

                          {/* Annual Revenue */}
                          <td className="px-6 sm:px-8 py-4 sm:py-5 text-right font-medium text-[#191C1E]">
                            {plan.annualRevenue}
                          </td>

                          {/* Action Button */}
                          <td className="px-6 sm:px-8 py-4 sm:py-5 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedPlan(plan);
                                setSubscriberSearch('');
                              }}
                              className="inline-flex items-center justify-center rounded-full bg-[#2780C4] px-5 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#1f6da8] active:scale-95 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination / Table Footer */}
                <Pagination
                  total={subscriptionPlans.length}
                  page={1}
                  pageSize={subscriptionPlans.length}
                  itemLabel="plan entries"
                />
              </div>
            </section>
          </div>
        )}

        {/* Modal: Calendar Period Filter */}
        {showCalendarModal && (
          <Modal
            title="Filter by Fiscal Period"
            onClose={() => setShowCalendarModal(false)}
          >
            <div className="space-y-4">
              <p className="text-sm text-muted">
                Select settlement accounting window to recalculate annualized run rates and renewal cohorts.
              </p>
              <div className="space-y-2">
                {[
                  'Fiscal Year 2025-26',
                  'Fiscal Year 2024-25',
                  'Last 90 Days (Q4)',
                  'Month-to-Date (MTD)',
                ].map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => {
                      setSelectedPeriod(period);
                      setShowCalendarModal(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-sm font-semibold transition-colors ${
                      selectedPeriod === period
                        ? 'border-[#2780C4] bg-[#2780C4]/5 text-[#2780C4]'
                        : 'border-[#E5E5EA] bg-white text-[#191C1E] hover:bg-slate-50'
                    }`}
                  >
                    <span>{period}</span>
                    {selectedPeriod === period && (
                      <CheckCircle2 size={18} className="text-[#2780C4]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
