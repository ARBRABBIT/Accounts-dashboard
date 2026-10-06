'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AccountsSidebar } from '@/components/dashboard/accounts-sidebar';
import { AccountsHeader } from '@/components/dashboard/accounts-header';
import { PlatformRevenueCard } from '@/components/dashboard/platform-revenue-card';
import { CommissionChartCard } from '@/components/dashboard/commission-chart-card';
import { PlatformCollectionsCard } from '@/components/dashboard/platform-collections-card';
import { AccountsCreditsCard } from '@/components/dashboard/accounts-credits-card';

export default function AccountsDashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dashboard-card',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all',
        }
      );
      gsap.fromTo(
        '.dashboard-header-elem',
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
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
      className="min-h-screen md:h-screen md:max-h-screen w-full bg-[#f8f9fa] p-3 sm:p-4 md:p-5 lg:p-6 md:overflow-hidden flex flex-col justify-center"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-3 md:flex-row md:items-stretch md:gap-6 lg:gap-7 min-h-0">
        {/* Left Sidebar */}
        <div className="shrink-0 flex flex-col md:w-[92px] md:h-full">
          <AccountsSidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex flex-1 flex-col justify-between gap-3 md:gap-3.5 lg:gap-4 min-h-0">
          {/* Top Header */}
          <div className="dashboard-header-elem shrink-0">
            <AccountsHeader />
          </div>

          {/* Cards Grid */}
          <div className="flex flex-1 flex-col gap-3 md:gap-3.5 lg:gap-4 min-h-0">
            {/* Row 1: Platform Revenue (col-span-4) & Agent Commission Management (col-span-8) */}
            <div className="grid grid-cols-1 gap-3 md:gap-3.5 lg:gap-4 lg:grid-cols-12 flex-1 min-h-0">
              <div className="dashboard-card lg:col-span-4 xl:col-span-4 flex min-h-0">
                <PlatformRevenueCard />
              </div>
              <div className="dashboard-card lg:col-span-8 xl:col-span-8 flex min-h-0">
                <CommissionChartCard />
              </div>
            </div>

            {/* Row 2: Platform Collections Activity (col-span-7) & Accounts Credits (col-span-5) */}
            <div className="grid grid-cols-1 gap-3 md:gap-3.5 lg:gap-4 lg:grid-cols-12 flex-1 min-h-0">
              <div className="dashboard-card lg:col-span-7 xl:col-span-7 flex min-h-0">
                <PlatformCollectionsCard />
              </div>
              <div className="dashboard-card lg:col-span-5 xl:col-span-5 flex min-h-0">
                <AccountsCreditsCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
