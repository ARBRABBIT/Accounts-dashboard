'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  ShieldCheck,
  CreditCard,
  Coins,
  Handshake,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function AccountsSidebar({ activeTab, onTabChange }: SidebarProps) {
  const pathname = usePathname();

  // Determine active tab automatically by route unless explicitly specified
  const effectiveActive =
    activeTab ||
    (pathname === '/revenue-management'
      ? 'compliance'
      : pathname === '/payment-management' || pathname === '/payments'
      ? 'payments'
      : pathname === '/commission-management'
      ? 'commissions'
      : pathname === '/credits-management'
      ? 'credits'
      : 'dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '/' },
    {
      id: 'compliance',
      label: 'Revenue Management',
      icon: ShieldCheck,
      href: '/revenue-management',
    },
    {
      id: 'payments',
      label: 'Payment Management',
      icon: CreditCard,
      href: '/payment-management',
    },
    {
      id: 'commissions',
      label: 'Commission Management',
      icon: Coins,
      href: '/commission-management',
    },
    {
      id: 'credits',
      label: 'Credits Management',
      icon: Handshake,
      href: '/credits-management',
    },
  ];

  return (
    <aside
      aria-label="Accounts Navigation"
      className="flex h-auto w-full flex-row items-center justify-between rounded-2xl bg-white p-3 shadow-[0px_0px_4px_rgba(0,0,0,0.25)] md:h-[944px] md:w-[92px] md:flex-col md:rounded-[24px] md:py-5 md:px-3.5"
    >
      {/* Top: Logo */}
      <div className="flex flex-col items-center">
        <Link
          href="/"
          className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-brand"
          aria-label="GLC Accounts Home"
        >
          <img
            src="/assets/glc-logo.svg"
            width={41}
            height={41}
            alt="Green Land Capital Logo"
            className="h-[41px] w-[41px] object-contain"
          />
        </Link>
      </div>

      {/* Center: Nav Items */}
      <nav
        aria-label="Main navigation"
        className="flex flex-row items-center gap-2 overflow-x-auto md:flex-col md:gap-3"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = effectiveActive === item.id;
          const isRealRoute = item.href && item.href !== '#';

          if (isRealRoute) {
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand md:h-16 md:w-16 ${
                  isActive
                    ? 'bg-brand text-white shadow-sm'
                    : 'text-[#1A1C1D] hover:bg-subtle hover:text-brand'
                }`}
              >
                <Icon size={24} strokeWidth={1.8} />
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              onClick={() => onTabChange?.(item.id)}
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-[#1A1C1D] transition-all duration-200 hover:bg-subtle hover:text-brand focus-visible:outline-2 focus-visible:outline-brand md:h-16 md:w-16"
            >
              <Icon size={24} strokeWidth={1.8} />
            </button>
          );
        })}
      </nav>

      {/* Bottom: Logout and Avatar */}
      <div className="flex flex-row items-center gap-3 md:flex-col md:gap-6">
        <button
          type="button"
          aria-label="Logout"
          className="flex h-12 w-12 items-center justify-center rounded-2xl text-[#1A1C1D] transition-colors hover:bg-subtle hover:text-danger focus-visible:outline-2 focus-visible:outline-brand md:h-14 md:w-14"
          onClick={() => alert('Logout action (preview)')}
        >
          <LogOut size={22} strokeWidth={1.8} />
        </button>

        <div className="relative">
          <img
            src="/assets/avatar.png"
            width={52}
            height={52}
            alt="Bhargav profile"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-transparent transition-transform hover:scale-105 hover:ring-brand md:h-[56px] md:w-[56px]"
          />
        </div>
      </div>
    </aside>
  );
}
