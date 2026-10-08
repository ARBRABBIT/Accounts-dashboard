'use client';
import { Lightbulb, ChevronRight } from 'lucide-react';
import { revenueInsightData } from '@/lib/payment-management-data';

interface PaymentInsightCardProps {
  onViewProjections: () => void;
  onDismiss?: () => void;
}

export function PaymentInsightCard({
  onViewProjections,
  onDismiss,
}: PaymentInsightCardProps) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between rounded-[24px] bg-[#006194] p-5 sm:p-6 lg:p-7 shadow-xs text-left min-h-0 text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white">
          <Lightbulb size={22} />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-white/70">
          {revenueInsightData.tag}
        </span>
      </div>

      {/* Main Content */}
      <div className="my-auto py-2">
        <h2 className="text-xl font-bold tracking-tight text-white">
          Forecast & Pipeline
        </h2>
        <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-white/85">
          {revenueInsightData.headline}{' '}
          <span className="font-bold text-white">
            {revenueInsightData.projectedAmount}
          </span>{' '}
          {revenueInsightData.description}
        </p>

        {/* Clean minimal projection metrics in columns (NO nested boxed cards) */}
        <div className="mt-3.5 sm:mt-4 grid grid-cols-3 divide-x divide-white/15 border-t border-b border-white/15 py-2.5 text-center">
          {revenueInsightData.projections.map((proj) => (
            <div key={proj.period} className="px-2 first:pl-0 last:pr-0">
              <div className="text-[11px] text-white/70 truncate">{proj.period}</div>
              <div className="text-base sm:text-lg font-bold text-white mt-0.5">{proj.target}</div>
              <div className="text-[10px] text-[#86EFAC] font-medium">{proj.confidence} conf.</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action: Clean single button + optional dismiss link */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onViewProjections}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-white px-5 text-xs sm:text-sm font-bold text-[#006194] shadow-xs transition hover:bg-white/95 active:scale-95 cursor-pointer"
        >
          View Projections <ChevronRight size={15} />
        </button>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-xs font-medium text-white/60 hover:text-white transition cursor-pointer"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}

