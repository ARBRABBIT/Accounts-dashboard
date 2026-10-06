'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Filter, CheckCircle2, Info, X } from 'lucide-react';
import { PillDropdown } from '@/components/ui/pill-dropdown';

export function PlatformCollectionsCard() {
  const [period, setPeriod] = useState('Weekly');
  const [activeDay, setActiveDay] = useState<string>('Wed');
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    subscriptions: true,
    services: true,
    verification: true,
  });

  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Y-axis scale markers on the left
  const yAxisLabels = ['3 Cr', '2 Cr', '1 Cr', '0'];

  // Coordinates geometry for 7 days in viewBox 0 0 600 200
  // y = 0 is top (3 Cr), y = 200 is baseline (0)
  const points = [
    { x: 45, y: 103, day: 'Mon', amount: '₹1.45 Cr' },
    { x: 130, y: 10, day: 'Tue', amount: '₹2.85 Cr', highlight: true },
    { x: 215, y: 127, day: 'Wed', amount: '₹1.10 Cr' },
    { x: 300, y: 70, day: 'Thu', amount: '₹1.95 Cr' },
    { x: 385, y: 140, day: 'Fri', amount: '₹0.90 Cr' },
    { x: 470, y: 40, day: 'Sat', amount: '₹2.40 Cr' },
    { x: 555, y: 80, day: 'Sun', amount: '₹1.80 Cr' },
  ];

  // Smooth cubic bezier spline
  const pathD = `M ${points[0].x} ${points[0].y}
    C 85 103, 90 10, ${points[1].x} ${points[1].y}
    C 165 10, 175 127, ${points[2].x} ${points[2].y}
    C 255 127, 260 70, ${points[3].x} ${points[3].y}
    C 340 70, 345 140, ${points[4].x} ${points[4].y}
    C 425 140, 430 40, ${points[5].x} ${points[5].y}
    C 510 40, 520 80, ${points[6].x} ${points[6].y}`;

  // Area under curve fill
  const areaD = `${pathD} L 555 200 L 45 200 Z`;

  const currentPoint = points.find((p) => p.day === activeDay) || points[2];

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



  // Normal Chart View
  return (
    <article
      aria-label="Daily Inflow"
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd}
      className={`relative flex h-full min-h-[290px] lg:min-h-0 w-full flex-col justify-between overflow-hidden rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-white p-4 sm:p-5 lg:p-5 xl:p-6 shadow-panel select-none transition-all duration-200 cursor-pointer ${
        isPressing ? 'scale-[0.985] ring-4 ring-[#2780C4]/20' : 'hover:shadow-md'
      }`}
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-[18px] sm:text-[20px] lg:text-[22px] font-semibold tracking-tight text-ink">
              Daily Inflow
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-bold text-emerald-700">
              <CheckCircle2 size={11} />
              99.2% On Time
            </span>

            {/* Quick Info Button to trigger explanation directly on screen */}
            <button
              type="button"
              aria-label="Explain Daily Inflow in simple words"
              onClick={(e) => {
                e.stopPropagation();
                setShowExplanation(true);
              }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[#5E5E63] transition hover:bg-slate-200 hover:text-black cursor-pointer"
            >
              <Info size={13} />
            </button>
          </div>
          <p className="text-xs text-[#5E5E63]">
            <span className="font-semibold text-black">₹12.45 Cr</span> collected this week across Subscriptions, Services & Verification
          </p>
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {/* Filter button */}
          <button
            type="button"
            onClick={() => setShowFilterDialog((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-full border border-[#828282]/40 bg-white px-3.5 py-1.5 text-[14px] text-[#2C2C2C] transition-colors hover:bg-subtle focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
          >
            <span>Filter</span>
            <Filter size={13} className="text-[#2C2C2C]" />
          </button>

          {/* Period dropdown */}
          <PillDropdown
            value={period}
            onChange={setPeriod}
            variant="bordered"
            ariaLabel="Filter collections by period"
          />
        </div>
      </div>

      {/* Interactive Filter Dialog */}
      {showFilterDialog && (
        <div
          className="absolute right-6 top-20 z-30 w-64 rounded-2xl border border-line bg-white p-4 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-xs font-semibold text-muted uppercase tracking-wider">
            Filter Streams
          </p>
          <div className="mt-3 space-y-2.5 text-sm">
            <label className="flex items-center gap-2.5 text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.subscriptions}
                onChange={(e) =>
                  setActiveFilters((p) => ({ ...p, subscriptions: e.target.checked }))
                }
                className="h-4 w-4 rounded accent-brand"
              />
              <span>Subscriptions (₹1.2 Cr)</span>
            </label>
            <label className="flex items-center gap-2.5 text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.services}
                onChange={(e) =>
                  setActiveFilters((p) => ({ ...p, services: e.target.checked }))
                }
                className="h-4 w-4 rounded accent-brand"
              />
              <span>Services (₹6.7 Cr)</span>
            </label>
            <label className="flex items-center gap-2.5 text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.verification}
                onChange={(e) =>
                  setActiveFilters((p) => ({ ...p, verification: e.target.checked }))
                }
                className="h-4 w-4 rounded accent-brand"
              />
              <span>Verification (₹0.4 Cr)</span>
            </label>
          </div>
          <button
            type="button"
            onClick={() => setShowFilterDialog(false)}
            className="mt-3.5 w-full rounded-xl bg-brand py-2 text-xs font-semibold text-white transition-colors hover:bg-brand/90 cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* Chart Canvas with Left Y-Axis Numbers */}
      <div className="relative mt-2.5 sm:mt-4 flex w-full select-none items-end">
        {/* Left Y-Axis Scale Numbers */}
        <div className="mb-6 sm:mb-7 flex h-[140px] sm:h-[150px] xl:h-[185px] w-8 sm:w-10 shrink-0 flex-col justify-between pr-2 text-right sm:pr-3">
          {yAxisLabels.map((label) => (
            <span
              key={label}
              className="text-[10.5px] sm:text-[11.5px] font-medium leading-none text-ink/45 tabular-nums"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Plot Area */}
        <div className="relative flex flex-1 flex-col justify-end">
          {/* Subtle Dashed Horizontal Grid Lines */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[140px] sm:h-[150px] xl:h-[185px] flex flex-col justify-between">
            {yAxisLabels.map((label) => (
              <div
                key={label}
                className="w-full border-b border-dashed border-black/8"
              />
            ))}
          </div>

          {/* SVG Wave Chart */}
          <div className="relative h-[140px] sm:h-[150px] xl:h-[185px] w-full">
            <svg
              viewBox="0 0 600 200"
              className="h-full w-full overflow-visible"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="collectionsWaveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2780C4" stopOpacity="0.28" />
                  <stop offset="85%" stopColor="#2780C4" stopOpacity="0.02" />
                  <stop offset="100%" stopColor="#2780C4" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="collectionsStrokeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2780C4" />
                  <stop offset="25%" stopColor="#006194" />
                  <stop offset="70%" stopColor="#2780C4" />
                  <stop offset="100%" stopColor="#3d93d1" />
                </linearGradient>
              </defs>

              {/* Area Fill */}
              <path d={areaD} fill="url(#collectionsWaveGradient)" />

              {/* Spline Stroke */}
              <path
                d={pathD}
                fill="none"
                stroke="url(#collectionsStrokeGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data Points */}
              {points.map((pt) => {
                const isSelected = pt.day === activeDay;
                return (
                  <g
                    key={pt.day}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDay(pt.day);
                    }}
                    className="cursor-pointer"
                  >
                    {/* Vertical guide line on selected */}
                    {isSelected && (
                      <line
                        x1={pt.x}
                        y1={pt.y}
                        x2={pt.x}
                        y2={200}
                        stroke="#2780C4"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        opacity="0.6"
                      />
                    )}

                    {/* Outer Ring */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? 9 : 5}
                      fill={isSelected ? '#FFFFFF' : '#2780C4'}
                      stroke="#2780C4"
                      strokeWidth={isSelected ? 3 : 1.5}
                      className="transition-all duration-200"
                    />

                    {/* Inner Dot on selected */}
                    {isSelected && (
                      <circle cx={pt.x} cy={pt.y} r={4} fill="#006194" />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Selected Data Point Floating Tooltip (Shows ONLY the number) */}
            <div
              className="pointer-events-none absolute transition-all duration-300 ease-out"
              style={{
                left: `${(currentPoint.x / 600) * 100}%`,
                top: `${(currentPoint.y / 200) * 100 - 12}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div className="flex flex-col items-center">
                <div className="rounded-xl border border-line/70 bg-white/95 px-3 py-1 shadow-lg backdrop-blur-md">
                  <p className="text-[15px] font-extrabold text-ink tabular-nums">
                    {currentPoint.amount}
                  </p>
                </div>
                <div className="h-2 w-2 rotate-45 border-r border-b border-line/70 bg-white -mt-1" />
              </div>
            </div>
          </div>

          {/* Days of Week Bottom Axis */}
          <div className="mt-3 flex w-full justify-between px-2 sm:px-6">
            {points.map((pt) => {
              const isSelected = pt.day === activeDay;
              return (
                <button
                  key={pt.day}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDay(pt.day);
                  }}
                  className={`text-[13px] font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'font-bold text-[#006194]'
                      : 'text-[#64748B] hover:text-ink'
                  }`}
                >
                  {pt.day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* In-Card Overlay for Metric Explanation */}
      {showExplanation && (
        <div
          role="dialog"
          aria-label="Daily Inflow explanation overlay"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="absolute inset-0 z-30 flex flex-col justify-between bg-white/95 p-6 backdrop-blur-md shadow-2xl sm:p-7 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-[#F2F2F2] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#006194]">
                Metric Explanation
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowExplanation(false)}
              aria-label="Close explanation overlay"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[#5E5E63] transition hover:bg-slate-200 hover:text-black cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Explanation Content */}
          <div className="my-auto py-2 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-[#5E5E63]">
                  7-Day Inflow Velocity
                </span>
                <div className="text-[30px] sm:text-[34px] font-extrabold leading-tight text-ink tabular-nums">
                  ₹12.45 Cr
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                99.2% On Time
              </span>
            </div>

            <div className="rounded-xl bg-[#F8F9FA] p-3 border border-[#E5E5EA]/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#191C1D]">
                In Simple Words:
              </span>
              <p className="mt-1 text-[13px] sm:text-[14px] font-medium leading-[20px] text-[#404850]">
                This tracks the actual gross deposits into platform accounts day-by-day this week across Subscriptions, Farmland Services, and Verification.
              </p>
            </div>

            <div className="space-y-1.5 rounded-xl border border-[#E5E5EA] bg-[#FAFBFD] p-3 text-[11px] sm:text-[12px] text-[#5E5E63]">
              <span className="font-bold text-[#191C1D] text-[10px] uppercase tracking-wider">
                Key Highlights:
              </span>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-[#2780C4]" />
                <span>Tuesday was the peak day (₹2.85 Cr) driven by milestone settlements.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-[#2780C4]" />
                <span>99.2% of payments arrived on time without defaults or delays.</span>
              </div>
            </div>
          </div>

          {/* Bottom Dismiss Button */}
          <div className="border-t border-[#F2F2F2] pt-2.5">
            <button
              type="button"
              onClick={() => setShowExplanation(false)}
              className="flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-[#2780C4] text-xs font-bold text-white shadow-xs transition hover:bg-[#206aa3] active:scale-95 cursor-pointer"
            >
              Close Overlay
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

// Retain alias for legacy imports
export const FarmlandPaymentsCard = PlatformCollectionsCard;
