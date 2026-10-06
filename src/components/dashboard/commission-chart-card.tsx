'use client';
import { useState } from 'react';
import { PillDropdown } from '@/components/ui/pill-dropdown';
import {
  commissionData,
  commissionYAxis,
  CommissionMonth,
} from '@/lib/accounts-dashboard-data';

export function CommissionChartCard() {
  const [period, setPeriod] = useState('Monthly');
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  // Maximum scale value is 3.5 Cr
  const maxScale = 3.5;

  return (
    <article
      aria-label="Agent Commission Management"
      className="relative flex h-full min-h-[300px] lg:min-h-0 w-full flex-col justify-between overflow-hidden rounded-[23px] border border-white bg-white p-4 sm:p-5 lg:p-5 xl:p-6 shadow-panel"
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div>
          <h2 className="text-[18px] sm:text-[20px] lg:text-[21.7px] font-semibold tracking-tight text-ink">
            Agent Commission Management
          </h2>
          {/* Legend */}
          <div className="mt-1 sm:mt-1.5 flex items-center gap-4 text-xs sm:text-sm text-ink">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#398DCC]" />
              <span>Paid</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  background:
                    'repeating-linear-gradient(135deg, #757575 0, #757575 2px, #D0D4DF 2px, #D0D4DF 5px)',
                }}
              />
              <span>Pending</span>
            </div>
          </div>
        </div>

        <PillDropdown
          value={period}
          onChange={setPeriod}
          variant="bordered"
          ariaLabel="Filter commissions by period"
        />
      </div>

      {/* Chart Canvas */}
      <div className="relative mt-2.5 sm:mt-4 lg:mt-5 flex w-full select-none items-end">
        {/* Left Y-Axis Column (Fixed within card padding, never overflows) */}
        <div className="mb-6 sm:mb-7 flex h-[145px] sm:h-[155px] xl:h-[185px] w-10 sm:w-12 shrink-0 flex-col justify-between pr-2 text-right sm:pr-3">
          {commissionYAxis.map((label) => (
            <span
              key={label}
              className="text-[10.5px] sm:text-[11.3px] leading-none text-ink/50"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Plot Area */}
        <div className="relative flex flex-1 flex-col justify-end">
          {/* Dashed Horizontal Grid Lines matching Y-axis exactly */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[145px] sm:h-[155px] xl:h-[185px] flex flex-col justify-between">
            {commissionYAxis.map((label) => (
              <div
                key={label}
                className="w-full border-b border-dashed border-black/10"
              />
            ))}
          </div>

          {/* Bars Container */}
          <div className="relative z-10 flex w-full items-end justify-between gap-2 px-1 sm:gap-4 sm:px-3 md:gap-6">
            {commissionData.map((item: CommissionMonth) => {
              const isJun = item.month === 'Jun';
              const isHovered = hoveredMonth === item.month;
              const totalHeightPercent = Math.min(
                100,
                ((item.paid + item.pending) / maxScale) * 100
              );

              return (
                <div
                  key={item.month}
                  onMouseEnter={() => setHoveredMonth(item.month)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  tabIndex={0}
                  role="region"
                  aria-label={`${item.month}: Paid ${item.paid} Cr, Pending ${item.pending} Cr`}
                  className="group relative flex flex-1 flex-col items-center focus-visible:outline-none"
                >
                  {/* Bar Column Area (200px max height) */}
                  <div className="relative flex h-[200px] w-full max-w-[68px] items-end justify-center">
                    {/* Floating Tooltip Indicator */}
                    {(isJun || isHovered) && (
                      <div
                        className={`absolute z-20 flex flex-col items-center transition-all duration-200 ${
                          isJun && !isHovered ? 'opacity-100' : 'opacity-100 scale-105'
                        }`}
                        style={{
                          bottom: `calc(${totalHeightPercent}% + 8px)`,
                        }}
                      >
                        <div className="flex h-7 items-center justify-center rounded-lg border border-black/25 bg-white px-2 shadow-sm sm:h-8 sm:px-2.5">
                          <span className="text-[11px] font-semibold text-ink sm:text-[12px]">
                            {isHovered ? `${(item.paid + item.pending).toFixed(1)}Cr` : '1.5Cr'}
                          </span>
                        </div>
                        <span className="mt-0.5 h-2 w-2 rounded-full bg-[#7AB8E2]" />
                      </div>
                    )}

                    {/* Stacked Bar Pillar */}
                    <div
                      className="relative flex w-full flex-col overflow-hidden rounded-[16px] transition-transform duration-200 group-hover:scale-[1.03]"
                      style={{
                        height: `${totalHeightPercent}%`,
                      }}
                    >
                      {/* Top Pending Bar with diagonal stripes */}
                      <div
                        className="w-full shrink-0"
                        style={{
                          height: `${(item.pending / (item.paid + item.pending)) * 100}%`,
                          background:
                            'repeating-linear-gradient(135deg, #757575 0, #757575 3px, #D0D4DF 3px, #D0D4DF 8.5px)',
                        }}
                      />

                      {/* Bottom Paid Bar with gradient */}
                      <div
                        className="w-full flex-1"
                        style={{
                          background: 'linear-gradient(180deg, #5DA8DB 0%, #2780C4 100%)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Month Pill Badge at Bottom */}
                  <div className="mt-2.5 flex h-6 items-center justify-center">
                    <span className="rounded-full bg-[#393B3F] px-2.5 py-0.5 text-center text-[10px] font-normal text-white">
                      {item.month}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
