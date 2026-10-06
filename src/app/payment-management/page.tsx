'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { Search, Bell } from 'lucide-react';
import { AccountsSidebar } from '@/components/dashboard/accounts-sidebar';
import { PaymentVerticalCard } from '@/components/payments/payment-vertical-card';
import { PaymentInsightCard } from '@/components/payments/payment-insight-card';
import { PaymentDetailModal } from '@/components/payments/payment-detail-modal';
import {
  paymentVerticals,
  PaymentVerticalCard as PaymentCardType,
} from '@/lib/payment-management-data';

export default function PaymentManagementPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVertical, setSelectedVertical] =
    useState<PaymentCardType | null>(null);
  const [showProjectionsModal, setShowProjectionsModal] = useState(false);
  const [isInsightDismissed, setIsInsightDismissed] = useState(false);

  // Filter verticals based on search input
  const filteredVerticals = useMemo(() => {
    if (!searchQuery.trim()) return paymentVerticals;
    const q = searchQuery.toLowerCase().trim();
    return paymentVerticals.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // GSAP entrance animation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.payment-header-anim',
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
      );
      gsap.fromTo(
        '.payment-card-anim',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'all',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen md:h-screen md:max-h-screen w-full bg-[#F2F2F2] p-3 sm:p-4 md:p-5 lg:p-6 md:overflow-hidden flex flex-col justify-center font-sans"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-3 md:flex-row md:items-stretch md:gap-6 lg:gap-7 min-h-0">
        {/* Left Persistent Sidebar with 3rd tab (Payments) active */}
        <div className="shrink-0 flex flex-col md:w-[92px] md:h-full">
          <AccountsSidebar activeTab="payments" />
        </div>

        {/* Main Content Area */}
        <main className="flex min-w-0 flex-1 flex-col justify-between gap-3 md:gap-3.5 lg:gap-4 min-h-0">
          {/* Top Frame: Title, Subtitle, Search, Notifications */}
          <header className="payment-header-anim shrink-0 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            {/* Title & Description */}
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <h1 className="text-[22px] sm:text-[24px] lg:text-[26px] xl:text-[28px] font-semibold leading-[110%] tracking-tight text-black">
                Payment Management
              </h1>
              <p className="text-xs sm:text-sm lg:text-[15px] font-medium leading-[20px] text-[#524F4F]">
                Overview of Financial performance and key metrics
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
                  placeholder="Search leads..."
                  aria-label="Search payment verticals"
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
          </header>

          {/* Symmetric 2x2 Bento Grid */}
          <div className="grid flex-1 grid-cols-1 gap-3 md:gap-3.5 lg:gap-4 md:grid-cols-2 min-h-0">
            {/* Payment Verticals */}
            {filteredVerticals.map((vert) => (
              <div key={vert.id} className="payment-card-anim flex min-h-0">
                <PaymentVerticalCard
                  vertical={vert}
                  onClick={() => {
                    if (vert.targetRoute) {
                      router.push(vert.targetRoute);
                    } else {
                      setSelectedVertical(vert);
                    }
                  }}
                />
              </div>
            ))}

            {/* Revenue Insight Banner Card */}
            {!isInsightDismissed && (
              <div className="payment-card-anim flex min-h-0">
                <PaymentInsightCard
                  onViewProjections={() => setShowProjectionsModal(true)}
                  onDismiss={() => setIsInsightDismissed(true)}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Payment Detail / Projections Modal */}
      <PaymentDetailModal
        vertical={selectedVertical}
        showProjections={showProjectionsModal}
        isOpen={!!selectedVertical || showProjectionsModal}
        onClose={() => {
          setSelectedVertical(null);
          setShowProjectionsModal(false);
        }}
      />
    </div>
  );
}

