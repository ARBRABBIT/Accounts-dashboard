'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AccountsSidebar } from '@/components/dashboard/accounts-sidebar';
import { AccountsHeader } from '@/components/dashboard/accounts-header';
import { SecondaryRevenueCard } from '@/components/revenue/secondary-card';
import { RecentActivityTable } from '@/components/revenue/recent-activity-table';
import { secondaryRevenueVerticals } from '@/lib/revenue-management-data';

export default function RevenueManagementPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.revenue-card-item',
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
        '.revenue-header-elem',
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
      className="min-h-screen w-full bg-[#f8f9fa] p-3 sm:p-4 md:p-5 lg:p-6"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 md:flex-row md:items-start md:gap-6 lg:gap-7">
        {/* Left Sidebar */}
        <div className="shrink-0 flex flex-col md:w-[92px] md:sticky md:top-5 lg:md:top-6 md:h-[calc(100vh-3rem)]">
          <AccountsSidebar activeTab="compliance" />
        </div>

        {/* Main Content Area */}
        <main className="flex flex-1 flex-col gap-6 lg:gap-7">
          {/* Top Header */}
          <div className="revenue-header-elem">
            <AccountsHeader
              title="Revenue Management"
              subtitle="Overview of Financial performance and key metrics"
              onSearch={setSearchQuery}
            />
          </div>

          {/* Top Revenue Verticals Section */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryRevenueVerticals.map((vert) => (
              <div key={vert.id} className="revenue-card-item flex">
                <SecondaryRevenueCard vertical={vert} />
              </div>
            ))}
          </div>

          {/* Recent Activity Table Section */}
          <div className="revenue-card-item w-full">
            <RecentActivityTable searchQuery={searchQuery} />
          </div>
        </main>
      </div>
    </div>
  );
}
