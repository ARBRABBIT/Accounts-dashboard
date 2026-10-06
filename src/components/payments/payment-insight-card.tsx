'use client';
import { Lightbulb } from 'lucide-react';
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
    <div className="relative flex h-full min-h-[200px] lg:min-h-0 w-full flex-col justify-between rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-[#006194] p-5 sm:p-6 lg:p-6 xl:p-7 shadow-[0px_25px_50px_-12px_rgba(0,97,148,0.1)] text-left">
      {/* Top Section: Icon, Tag, and Insight Text */}
      <div className="flex flex-col items-start gap-2.5">
        {/* Lightbulb Icon in frosted container */}
        <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-[14px] sm:rounded-[16px] bg-white/10">
          <Lightbulb size={22} className="text-white" />
        </div>

        {/* Tag */}
        <span className="mt-1 text-[11px] font-black uppercase tracking-[1.3px] text-white/60">
          {revenueInsightData.tag}
        </span>

        {/* Insight Description */}
        <p className="text-xs sm:text-sm lg:text-[14px] font-medium leading-relaxed text-white/90 line-clamp-3">
          {revenueInsightData.headline}{' '}
          <span className="font-bold text-white">
            {revenueInsightData.projectedAmount}
          </span>{' '}
          {revenueInsightData.description}
        </p>
      </div>

      {/* Bottom Section: Action Buttons */}
      <div className="mt-3 sm:mt-4 flex flex-col gap-2 w-full">
        <button
          type="button"
          onClick={onViewProjections}
          className="flex h-[38px] sm:h-[40px] w-full items-center justify-center rounded-xl bg-white text-xs sm:text-[13px] font-bold tracking-[0.13px] text-[#006194] shadow-[0px_4px_24px_-2px_rgba(0,0,0,0.06),0px_2px_8px_-1px_rgba(0,0,0,0.04)] transition hover:bg-white/95 active:scale-95 focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
        >
          View Projections
        </button>

        <button
          type="button"
          onClick={onDismiss}
          className="flex h-[28px] sm:h-[30px] w-full items-center justify-center text-xs sm:text-[13px] font-bold tracking-[0.13px] text-white/60 transition hover:text-white cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

