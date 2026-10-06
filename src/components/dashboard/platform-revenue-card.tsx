'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Info,
  X,
  CheckCircle2,
} from 'lucide-react';
import { PillDropdown } from '@/components/ui/pill-dropdown';
import {
  platformRevenueSlides,
  PlatformRevenueSlide,
} from '@/lib/accounts-dashboard-data';

export function PlatformRevenueCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [period, setPeriod] = useState('Monthly');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide: PlatformRevenueSlide =
    platformRevenueSlides[currentIndex] || platformRevenueSlides[0];

  function handlePrev() {
    setCurrentIndex((prev) =>
      prev === 0 ? platformRevenueSlides.length - 1 : prev - 1
    );
  }

  function handleNext() {
    setCurrentIndex((prev) =>
      prev === platformRevenueSlides.length - 1 ? 0 : prev + 1
    );
  }

  // Long press detection (500ms)
  const handlePressStart = useCallback(() => {
    setIsPressing(true);
    longPressTimerRef.current = setTimeout(() => {
      setShowExplanation((prev) => !prev);
      setIsPressing(false);
    }, 500);
  }, []);

  const handlePressEnd = useCallback(() => {
    setIsPressing(false);
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  // Escape key closes overlay
  useEffect(() => {
    if (!showExplanation) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowExplanation(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showExplanation]);

  // Simple explanations tailored to each slide
  const getExplanationContent = () => {
    switch (currentSlide.id) {
      case 'rev-slide-2':
        return {
          title: 'Enterprise Renewal Rate',
          metric: '98.4%',
          summary:
            'Out of every 100 subscribers whose annual plan ended, more than 98 renewed and paid again.',
          bullets: [
            'Proves that platform members find high value and stay long-term.',
            'Guarantees predictable recurring cash flow without extra ad spend.',
            'Tracks across all 3,641 enterprise subscribers on the platform.',
          ],
        };
      case 'rev-slide-3':
        return {
          title: 'Agent Payouts Disbursed',
          metric: '₹3.20 Cr',
          summary:
            'The actual commission cash already authorized and paid out to our field agent network this quarter.',
          bullets: [
            'Confirms that field agents are closing deals and getting paid promptly.',
            '66% of total generated commissions (₹4.85 Cr) is already cleared.',
            'Higher payouts reflect surging land deal velocity in Siddipet and Warangal.',
          ],
        };
      case 'rev-slide-1':
      default:
        return {
          title: 'Monthly Operating Volume',
          metric: '₹8.30 Cr',
          summary:
            'The total cash earned by the platform in a month across all three business arms.',
          bullets: [
            'Farmland Services: ₹6.70 Cr (farmhouses, organic farming, borewells)',
            'Subscriptions: ₹1.20 Cr (Platinum, Growth & Starter membership tiers)',
            'Legal Verification: ₹0.40 Cr (title deeds and Dharani registry audits)',
          ],
        };
    }
  };

  const explanation = getExplanationContent();



  // Normal Card View
  return (
    <article
      aria-label="Platform Revenue Run-Rate overview"
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd}
      className={`relative flex h-full min-h-[300px] lg:min-h-0 w-full flex-col justify-between overflow-hidden rounded-[23px] bg-brand p-4 sm:p-5 lg:p-5 xl:p-6 text-white shadow-sm select-none transition-all duration-200 cursor-pointer ${
        isPressing ? 'scale-[0.985] ring-4 ring-white/30' : 'hover:shadow-md'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-[18px] sm:text-[20px] font-semibold tracking-tight text-white">
            Platform Revenue
          </h2>

          {/* Quick Info Button to toggle explanation directly */}
          <button
            type="button"
            aria-label="Explain metric in simple words"
            onClick={(e) => {
              e.stopPropagation();
              setShowExplanation(true);
            }}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white/90 transition hover:bg-white/30 hover:text-white cursor-pointer"
          >
            <Info size={13} />
          </button>
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <PillDropdown
            value={period}
            onChange={setPeriod}
            variant="light"
            ariaLabel="Filter Platform Revenue by period"
          />
        </div>
      </div>

      {/* Hero Metric Area */}
      <div className="my-auto py-1 sm:py-2">
        <span className="text-[10.5px] font-bold uppercase tracking-[1.2px] text-white/75">
          {currentSlide.label}
        </span>
        <div className="mt-0.5 text-[38px] sm:text-[46px] lg:text-[52px] xl:text-[64px] font-semibold leading-none tracking-tight text-white tabular-nums">
          {currentSlide.metric}
        </div>

        <div className="mt-2.5 sm:mt-3 space-y-1 max-w-[380px]">
          <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[20px] text-white">
            {currentSlide.headline}
          </p>
          <p className="text-[12px] sm:text-[12.5px] font-normal leading-[17px] text-white/85 line-clamp-2">
            {currentSlide.description}
          </p>
        </div>

        {/* Subtle hint to guide users */}
        <p className="mt-1.5 sm:mt-2 text-[10.5px] font-medium text-white/50 tracking-wide">
          💡 Press & hold card or tap (i) to explain on screen
        </p>
      </div>

      {/* Bottom Carousel Navigation & Quick Drilldown Link */}
      <div
        className="mt-4 flex items-center justify-between pt-2 border-t border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous revenue slide"
            onClick={handlePrev}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>

          <div className="flex items-center gap-2">
            {platformRevenueSlides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white cursor-pointer ${
                    isActive
                      ? 'w-10 rounded-full bg-white sm:w-12'
                      : 'w-6 rounded-full bg-white/30 hover:bg-white/50 sm:w-8'
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next revenue slide"
            onClick={handleNext}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>

        <Link
          href="/payment-management"
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-white/90 transition-colors hover:text-white"
        >
          <span>View Verticals</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* In-Card Overlay for Metric Explanation */}
      {showExplanation && (
        <div
          role="dialog"
          aria-label="Platform Revenue explanation overlay"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="absolute inset-0 z-30 flex flex-col justify-between bg-[#004f7c]/95 p-6 backdrop-blur-md text-white sm:p-7 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold uppercase tracking-wider text-white/90">
                Metric Explanation
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowExplanation(false)}
              aria-label="Close explanation overlay"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Explanation Content */}
          <div className="my-auto py-2 flex flex-col gap-2.5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-white/70">
                {explanation.title}
              </span>
              <div className="text-[32px] sm:text-[36px] font-extrabold leading-tight text-white tabular-nums">
                {explanation.metric}
              </div>
            </div>

            <div className="rounded-xl bg-white/10 p-3 backdrop-blur-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/75">
                In Simple Words:
              </span>
              <p className="mt-1 text-[13px] sm:text-[14px] font-medium leading-[20px] text-white">
                {explanation.summary}
              </p>
            </div>

            <div className="space-y-1.5 rounded-xl bg-black/20 p-3 text-[11px] sm:text-[12px] text-white/85">
              <span className="font-bold text-white text-[10px] uppercase tracking-wider">
                Where this comes from:
              </span>
              {explanation.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-white/80" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Dismiss Button */}
          <div className="border-t border-white/15 pt-2.5">
            <button
              type="button"
              onClick={() => setShowExplanation(false)}
              className="flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-white text-xs font-bold text-brand shadow-xs transition hover:bg-white/95 active:scale-95 cursor-pointer"
            >
              Close Overlay
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

// Retain alias for any legacy imports
export const FarmlandRevenueCard = PlatformRevenueCard;
