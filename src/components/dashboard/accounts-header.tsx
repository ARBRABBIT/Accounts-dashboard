'use client';
import { useState } from 'react';
import { Search, Bell } from 'lucide-react';

interface AccountsHeaderProps {
  title?: string;
  subtitle?: string;
  onSearch?: (query: string) => void;
}

export function AccountsHeader({
  title = 'Accounts Dashboard',
  subtitle = 'Overview of Financial performance and key metrics',
  onSearch,
}: AccountsHeaderProps) {
  const [query, setQuery] = useState('');
  const [hasUnread, setHasUnread] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
      <div>
        <h1 className="text-[22px] sm:text-[24px] lg:text-[26px] xl:text-[28px] font-semibold leading-[1.1] text-black">
          {title}
        </h1>
        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm lg:text-[15px] xl:text-base font-medium text-[#524F4F]">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search bar */}
        <div className="relative flex h-[44px] sm:h-[48px] xl:h-[52px] w-full items-center rounded-full bg-white px-4 sm:px-5 shadow-xs transition-shadow focus-within:ring-2 focus-within:ring-brand/40 sm:w-[260px] lg:w-[295px]">
          <Search size={20} className="shrink-0 text-[#5C5C5C]" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Search leads..."
            aria-label="Search leads"
            className="w-full bg-transparent pl-2.5 sm:pl-3 text-sm lg:text-base text-ink placeholder-[#5C5C5C] focus:outline-none"
          />
        </div>

        {/* Notifications button */}
        <div className="relative shrink-0">
          <button
            type="button"
            aria-label="View notifications (1 unread)"
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setHasUnread(false);
            }}
            className="relative flex h-[44px] w-[44px] sm:h-[48px] sm:w-[48px] xl:h-[52px] xl:w-[52px] items-center justify-center rounded-full bg-white shadow-xs transition-transform hover:scale-105 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-brand"
          >
            <Bell size={20} className="text-[#2C2C2C]" strokeWidth={1.8} />
            {hasUnread && (
              <span className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 h-[7px] w-[7px] rounded-full bg-[#EF4646] ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 z-30 mt-2 w-72 rounded-2xl border border-line bg-white p-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-line pb-2">
                <span className="text-sm font-bold text-ink">Notifications</span>
                <span className="text-xs text-muted">Just now</span>
              </div>
              <div className="mt-3 space-y-2 text-xs text-muted">
                <div className="rounded-xl bg-subtle p-2.5">
                  <p className="font-semibold text-ink">New token payment cleared</p>
                  <p className="mt-0.5">₹1.5M credited for Farmland plot #108</p>
                </div>
                <div className="rounded-xl bg-subtle p-2.5">
                  <p className="font-semibold text-ink">Weekly settlement ready</p>
                  <p className="mt-0.5">Agent commissions ready for review</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
