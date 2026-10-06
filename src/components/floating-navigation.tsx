'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  PanelsTopLeft,
  LayoutDashboard,
  TrendingUp,
  TableProperties,
  Palette,
  X,
  ArrowRight,
  Search,
  CheckCircle2,
  Layers,
  Sprout,
  Coins,
  Handshake,
  CreditCard,
  MessageSquare,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useComments } from '@/components/comments/comment-context';

interface PageItem {
  href: string;
  title: string;
  badge: string;
  description: string;
  icon: typeof LayoutDashboard;
}

export function FloatingNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    pageComments,
    isCommentMode,
    toggleCommentMode,
    showPins,
    setShowPins,
  } = useComments();

  const pages: PageItem[] = [
    {
      href: '/',
      title: 'Accounts Dashboard',
      badge: 'Figma 8119:2555',
      description:
        'Executive financial overview with Farmland Revenue slider, Agent Commission stacked chart, Payments wave curve, and Credits gauge.',
      icon: LayoutDashboard,
    },
    {
      href: '/revenue-management',
      title: 'Revenue Management',
      badge: 'Figma Linked',
      description:
        'Primary vertical Land Sales breakdown, 2x2 bento metrics (Pool Buying, Subscriptions, Services), and Recent Activity ledger.',
      icon: TrendingUp,
    },
    {
      href: '/farmland-services',
      title: 'Farmland Services',
      badge: 'Operations & Execution',
      description:
        'Farmhouse construction, organic farming, fencing & security, borewell drilling, and district zone execution cards.',
      icon: Sprout,
    },
    {
      href: '/subscription',
      title: 'Subscription Breakdown',
      badge: 'Enterprise Performance',
      description:
        'Enterprise Plan analytics, 98.4% renewal rate metric, and institutional subscription breakdown table.',
      icon: Layers,
    },
    {
      href: '/payment-management',
      title: 'Payment Management',
      badge: '3rd Sidebar Tab',
      description:
        'Symmetric 2x2 bento grid featuring Subscriptions, Services, Verification, and Revenue Insight banner.',
      icon: CreditCard,
    },
    {
      href: '/payment-management/subscriptions',
      title: 'Subscriptions Payments',
      badge: 'Payment Vertical',
      description:
        'Granular member subscription payment records, plan filters (Platinum, Growth, Starter), status badges, and transaction audit.',
      icon: CreditCard,
    },
    {
      href: '/commission-management',
      title: 'Commission Management',
      badge: 'Agent Network',
      description:
        'Track and authorize field agent commission payouts, filter by Pending/Paid status, and view agent deal agreements.',
      icon: Coins,
    },
    {
      href: '/credits-management',
      title: 'Credits Management',
      badge: '5th Sidebar Tab',
      description:
        'Field agent credit allocation, credits used vs remaining balance, authorized cash earnings, and ledger audit.',
      icon: Handshake,
    },
    {
      href: '/design-system',
      title: 'GLC Design System',
      badge: 'Foundations & Primitives',
      description:
        'Color palette tokens, Plus Jakarta Sans typography scale, accessible form controls, button states, and layout guidelines.',
      icon: Palette,
    },
  ];

  // Close popup when Esc is pressed
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredPages = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentPage = pages.find((p) => p.href === pathname) || pages[0];

  return (
    <>
      {/* Floating Bottom Navigation Bar */}
      <nav
        aria-label="Screen navigator"
        className="fixed bottom-2.5 sm:bottom-3 lg:bottom-3.5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 sm:gap-1.5 rounded-full border border-line bg-white/95 p-1 sm:p-1.5 shadow-xl backdrop-blur"
      >
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-brand px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-xs transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-brand"
        >
          <PanelsTopLeft size={16} />
          <span>Pages ({pages.length})</span>
        </button>

        <Link
          href="/design-system"
          className={`flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-colors ${
            pathname === '/design-system'
              ? 'bg-subtle text-brand font-bold'
              : 'text-muted hover:bg-subtle hover:text-ink'
          }`}
        >
          <Palette size={16} />
          <span className="hidden sm:inline">Design system</span>
        </Link>

        <div className="h-3.5 w-px bg-line mx-0.5" />

        {/* Figma Comment Mode Trigger */}
        <button
          type="button"
          onClick={toggleCommentMode}
          aria-pressed={isCommentMode}
          title="Toggle Figma comment mode (Hotkey: C)"
          className={`group flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all ${
            isCommentMode
              ? 'bg-brand text-white shadow-xs'
              : 'text-muted hover:bg-subtle hover:text-ink'
          }`}
        >
          <MessageSquare
            size={16}
            className={isCommentMode ? 'fill-white/20' : ''}
          />
          <span>Comment</span>
          {pageComments.length > 0 && (
            <span
              className={`flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[11px] font-bold ${
                isCommentMode
                  ? 'bg-white text-brand'
                  : 'bg-brand/10 text-brand'
              }`}
            >
              {pageComments.length}
            </span>
          )}
          <kbd
            className={`hidden rounded px-1 py-0.5 text-[9px] font-mono sm:inline-block ${
              isCommentMode
                ? 'bg-white/20 text-white'
                : 'bg-subtle text-muted'
            }`}
          >
            C
          </kbd>
        </button>

        {/* Pin Visibility Toggle (only rendered if page has comments) */}
        {pageComments.length > 0 && (
          <button
            type="button"
            onClick={() => setShowPins(!showPins)}
            title={showPins ? 'Hide comment pins on this screen' : 'Show comment pins on this screen'}
            aria-label={showPins ? 'Hide comment pins' : 'Show comment pins'}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-subtle hover:text-ink transition-colors"
          >
            {showPins ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        )}
      </nav>

      {/* Pages Popover Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pages-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-[28px] border border-line bg-white p-6 shadow-2xl sm:p-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h2
                  id="pages-modal-title"
                  className="text-2xl font-bold tracking-tight text-ink"
                >
                  All GLC Screens
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Navigate across all created dashboard views and documentation.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close pages navigator"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-subtle text-muted transition-colors hover:bg-line hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative mt-5">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search screens..."
                aria-label="Search screens"
                className="w-full rounded-2xl border border-line bg-subtle py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-muted focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {/* Screens Grid */}
            <div className="mt-5 grid grid-cols-1 gap-4 overflow-y-auto pr-1 sm:grid-cols-2">
              {filteredPages.map((page) => {
                const Icon = page.icon;
                const isCurrent = pathname === page.href;

                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    onClick={() => setIsOpen(false)}
                    className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                      isCurrent
                        ? 'border-brand bg-brand/5 shadow-xs ring-1 ring-brand'
                        : 'border-line bg-white hover:border-brand/40'
                    }`}
                  >
                    <div>
                      {/* Top Bar inside card */}
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                            isCurrent
                              ? 'bg-brand text-white'
                              : 'bg-subtle text-brand group-hover:bg-brand/10'
                          }`}
                        >
                          <Icon size={20} strokeWidth={1.8} />
                        </div>

                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${
                            isCurrent
                              ? 'bg-brand text-white'
                              : 'bg-subtle text-muted group-hover:bg-brand/10 group-hover:text-brand'
                          }`}
                        >
                          {isCurrent ? 'Current Screen' : page.badge}
                        </span>
                      </div>

                      {/* Screen Title */}
                      <h3 className="mt-3.5 text-base font-bold text-ink group-hover:text-brand">
                        {page.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-1.5 text-xs leading-relaxed text-muted line-clamp-2">
                        {page.description}
                      </p>
                    </div>

                    {/* Navigation prompt */}
                    <div className="mt-4 flex items-center justify-between border-t border-line/50 pt-3 text-xs font-semibold text-brand">
                      <span>{isCurrent ? 'Viewing now' : 'Open screen'}</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
