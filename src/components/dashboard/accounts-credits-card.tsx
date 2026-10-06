'use client';
import { useState } from 'react';
import { PillDropdown } from '@/components/ui/pill-dropdown';
import { accountsCreditsData } from '@/lib/accounts-dashboard-data';

export function AccountsCreditsCard() {
  const [period, setPeriod] = useState(accountsCreditsData.period);

  const total = accountsCreditsData.total;
  const available = accountsCreditsData.available;
  const used = accountsCreditsData.used;

  // Total 28 ticks across 180° semi-circle
  const numTicks = 28;
  const activeTicksCount = Math.round((available / total) * numTicks); // ~19 ticks

  const cx = 165;
  const cy = 145;
  const rInner = 92;
  const rOuter = 114;

  const ticks = Array.from({ length: numTicks }, (_, i) => {
    // 0 is 180° (left), numTicks-1 is 0° (right)
    const angleDeg = 180 - (i / (numTicks - 1)) * 180;
    const rad = (angleDeg * Math.PI) / 180;

    const x1 = cx + rInner * Math.cos(rad);
    const y1 = cy - rInner * Math.sin(rad);
    const x2 = cx + rOuter * Math.cos(rad);
    const y2 = cy - rOuter * Math.sin(rad);

    const isActive = i < activeTicksCount;
    // Gradient interpolator for active ticks
    const t = i / (activeTicksCount - 1 || 1);

    return {
      index: i,
      x1,
      y1,
      x2,
      y2,
      isActive,
      t,
    };
  });

  // Calculate pointer arrow angle at boundary of active segment
  const activeBoundaryAngle = 180 - ((activeTicksCount - 0.5) / (numTicks - 1)) * 180;
  const pointerRad = (activeBoundaryAngle * Math.PI) / 180;
  const pointerR = rInner - 8;
  const pointerX = cx + pointerR * Math.cos(pointerRad);
  const pointerY = cy - pointerR * Math.sin(pointerRad);

  return (
    <article
      aria-label="Accounts Credits usage"
      className="relative flex min-h-[401px] w-full flex-col justify-between rounded-[22px] bg-white p-6 shadow-panel sm:p-7"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-[21.9px] font-medium tracking-tight text-ink">
          Accounts Credits
        </h2>
        <PillDropdown
          value={period}
          onChange={setPeriod}
          variant="bordered"
          ariaLabel="Filter credits by period"
        />
      </div>

      {/* Speedometer Radial Gauge */}
      <div className="relative my-auto flex flex-col items-center justify-center">
        <div className="relative h-[165px] w-[330px]">
          <svg viewBox="0 0 330 165" className="h-full w-full overflow-visible">
            <defs>
              <linearGradient id="activeTickGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3D93D1" />
                <stop offset="100%" stopColor="#85BFE5" />
              </linearGradient>
            </defs>

            {/* Radial Ticks */}
            {ticks.map((tick) => (
              <line
                key={tick.index}
                x1={tick.x1}
                y1={tick.y1}
                x2={tick.x2}
                y2={tick.y2}
                stroke={tick.isActive ? 'url(#activeTickGrad)' : 'rgba(11, 12, 20, 0.1)'}
                strokeWidth="3.6"
                strokeLinecap="round"
              />
            ))}

            {/* Subtle Inner Arc Line */}
            <path
              d={`M ${cx - (rInner - 12)} ${cy} A ${rInner - 12} ${rInner - 12} 0 0 1 ${
                cx + (rInner - 12)
              } ${cy}`}
              fill="none"
              stroke="#3D93D1"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />

            {/* Small Directional Indicator Arrow at boundary */}
            <polygon
              points={`${pointerX},${pointerY - 6} ${pointerX + 5},${pointerY + 4} ${
                pointerX - 5
              },${pointerY + 4}`}
              fill="#3D93D1"
              transform={`rotate(${90 - activeBoundaryAngle}, ${pointerX}, ${pointerY})`}
            />
          </svg>

          {/* Center Metric */}
          <div className="absolute inset-x-0 bottom-1 flex flex-col items-center justify-center">
            <span className="text-[40px] font-semibold tracking-[-0.02em] text-[#5A5C5E]">
              {total}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Metrics Details */}
      <div className="flex items-center justify-around border-t border-line/60 pt-4">
        {/* Available Credits */}
        <div className="flex flex-col items-center text-center">
          <span className="text-[26px] font-medium tracking-[-0.02em] text-[#2B82C5]">
            {available}
          </span>
          <span className="mt-0.5 text-[12px] font-medium tracking-[-0.02em] text-[#5A5C5E]">
            Available Credits
          </span>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-black/15" />

        {/* Used Credits */}
        <div className="flex flex-col items-center text-center">
          <span className="text-[26px] font-medium tracking-[-0.02em] text-[#2B82C5]">
            {used}
          </span>
          <span className="mt-0.5 text-[12px] font-medium tracking-[-0.02em] text-[#5A5C5E]">
            Used Credits
          </span>
        </div>
      </div>
    </article>
  );
}
