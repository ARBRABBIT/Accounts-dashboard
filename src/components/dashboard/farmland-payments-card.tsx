'use client';
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { PillDropdown } from '@/components/ui/pill-dropdown';
import { farmlandPaymentsData, DailyPayment } from '@/lib/accounts-dashboard-data';

export function FarmlandPaymentsCard() {
  const [period, setPeriod] = useState('Weekly');
  const [activeDay, setActiveDay] = useState<string>('Tue');
  const [showFilterDialog, setShowFilterDialog] = useState(false);

  // Chart coordinate geometry (SVG viewBox: 0 0 600 240)
  // 7 days distributed horizontally: x = [50, 133, 216, 300, 383, 466, 550]
  // Invert y: 0 is top (max payment), 200 is bottom (min payment)
  const points = [
    { x: 50, y: 140, day: 'Mon', amount: '₹7.8M' },
    { x: 133, y: 55, day: 'Tue', amount: '₹12.4M' },
    { x: 216, y: 155, day: 'Wed', amount: '₹6.2M' },
    { x: 300, y: 125, day: 'Thu', amount: '₹8.9M' },
    { x: 383, y: 185, day: 'Fri', amount: '₹4.5M' },
    { x: 466, y: 90, day: 'Sat', amount: '₹11.1M' },
    { x: 550, y: 80, day: 'Sun', amount: '₹10.2M' },
  ];

  // Catmull-Rom or cubic bezier curve path through points
  const pathD = `M ${points[0].x} ${points[0].y}
    C 90 140, 100 55, ${points[1].x} ${points[1].y}
    C 165 55, 175 160, ${points[2].x} ${points[2].y}
    C 255 150, 260 120, ${points[3].x} ${points[3].y}
    C 335 130, 345 200, ${points[4].x} ${points[4].y}
    C 415 170, 425 90, ${points[5].x} ${points[5].y}
    C 500 90, 520 80, ${points[6].x} ${points[6].y}`;

  const currentPoint = points.find((p) => p.day === activeDay) || points[1];

  return (
    <article
      aria-label="Farmland Payments activity"
      className="relative flex min-h-[401px] w-full flex-col justify-between rounded-[32px] bg-white p-6 shadow-panel sm:p-7"
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[22.6px] font-medium tracking-tight text-ink">
          Farmland Payments
        </h2>

        <div className="flex items-center gap-2">
          {/* Filter button */}
          <button
            type="button"
            onClick={() => setShowFilterDialog((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-full border border-[#828282]/40 bg-white px-3.5 py-1.5 text-[14px] text-[#2C2C2C] transition-colors hover:bg-subtle focus-visible:outline-2 focus-visible:outline-brand"
          >
            <span>Filter</span>
            <Filter size={13} className="text-[#2C2C2C]" />
          </button>

          {/* Weekly dropdown */}
          <PillDropdown
            value={period}
            onChange={setPeriod}
            variant="bordered"
            ariaLabel="Filter payments by period"
          />
        </div>
      </div>

      {/* Interactive Filter Preview Dialog */}
      {showFilterDialog && (
        <div className="absolute right-6 top-16 z-30 w-64 rounded-2xl border border-line bg-white p-4 shadow-xl">
          <p className="text-xs font-semibold text-muted uppercase tracking-wider">
            Filter Payments
          </p>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2 text-ink">
              <input type="checkbox" defaultChecked className="rounded accent-brand" />
              Direct Settlements
            </label>
            <label className="flex items-center gap-2 text-ink">
              <input type="checkbox" defaultChecked className="rounded accent-brand" />
              Token Recoveries
            </label>
            <label className="flex items-center gap-2 text-ink">
              <input type="checkbox" defaultChecked className="rounded accent-brand" />
              Registry Levies
            </label>
          </div>
          <button
            type="button"
            onClick={() => setShowFilterDialog(false)}
            className="mt-3 w-full rounded-xl bg-brand py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand/90"
          >
            Apply
          </button>
        </div>
      )}

      {/* SVG Wave Chart Container */}
      <div className="relative mt-2 flex h-[260px] w-full flex-col justify-end">
        <svg
          viewBox="0 0 600 240"
          preserveAspectRatio="none"
          className="h-[210px] w-full overflow-visible"
        >
          <defs>
            <filter id="waveShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow
                dx="0"
                dy="3.3"
                stdDeviation="2"
                floodColor="#605BFF"
                floodOpacity="0.17"
              />
            </filter>
          </defs>

          {/* Vertical Guides with Top Double Ring Nodes */}
          {points.map((pt) => {
            const isSelected = pt.day === activeDay;
            return (
              <g key={pt.day} className="cursor-pointer" onClick={() => setActiveDay(pt.day)}>
                {/* Thin vertical guide line */}
                <line
                  x1={pt.x}
                  y1={20}
                  x2={pt.x}
                  y2={220}
                  stroke="rgba(0, 0, 0, 0.12)"
                  strokeWidth="1"
                />

                {/* Outer cyan ring node */}
                <circle cx={pt.x} cy={20} r="6.8" fill="#61CAEB" />
                {/* Inner blue dot */}
                <circle cx={pt.x} cy={20} r="3.1" fill="#2780C4" />

                {/* Interactive hit area */}
                <rect
                  x={pt.x - 20}
                  y={0}
                  width="40"
                  height="230"
                  fill="transparent"
                  className="hover:opacity-10"
                />
              </g>
            );
          })}

          {/* Smooth Blue Wavy Spline Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#2780C4"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#waveShadow)"
          />

          {/* Active Node Highlight on the line */}
          <circle
            cx={currentPoint.x}
            cy={currentPoint.y}
            r="4"
            fill="#2780C4"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        </svg>

        {/* Floating Tooltip Card over Active Day (default Tue: ₹12.4M) */}
        <div
          className="pointer-events-none absolute transition-all duration-300"
          style={{
            left: `${(currentPoint.x / 600) * 100}%`,
            top: `${(currentPoint.y / 240) * 210 - 54}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="flex items-center rounded-[12px] bg-white px-3.5 py-1.5 shadow-[0px_7px_3px_rgba(0,0,0,0.01),0px_4px_2.3px_rgba(0,0,0,0.05),0px_1.5px_1.5px_rgba(0,0,0,0.09)] ring-1 ring-black/5">
            <span className="text-[19px] font-bold text-[#393B3F]">
              {currentPoint.amount}
            </span>
          </div>
        </div>

        {/* X-Axis Days of Week */}
        <div className="mt-2 flex w-full justify-between px-2 sm:px-6">
          {farmlandPaymentsData.map((d) => (
            <button
              key={d.day}
              type="button"
              onClick={() => setActiveDay(d.day)}
              className={`text-center text-[11px] font-normal transition-colors focus-visible:outline-brand ${
                d.day === activeDay ? 'font-bold text-brand' : 'text-black hover:text-brand'
              }`}
            >
              {d.day}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
