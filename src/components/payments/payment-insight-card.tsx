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
    <div className="relative flex min-h-[360px] flex-col justify-between rounded-[32px] bg-[#006194] p-8 sm:p-10 shadow-[0px_25px_50px_-12px_rgba(0,97,148,0.1)] text-left">
      {/* Top Section: Icon, Tag, and Insight Text */}
      <div className="flex flex-col items-start gap-3">
        {/* Lightbulb Icon in frosted container */}
        <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-white/10">
          <Lightbulb size={24} className="text-white" />
        </div>

        {/* Tag */}
        <span className="mt-2 text-xs font-black uppercase tracking-[1.3px] text-white/60">
          {revenueInsightData.tag}
        </span>

        {/* Insight Description */}
        <p className="text-base sm:text-[17px] font-medium leading-[28px] text-white/90">
          {revenueInsightData.headline}{' '}
          <span className="font-bold text-white">
            {revenueInsightData.projectedAmount}
          </span>{' '}
          {revenueInsightData.description}
        </p>
      </div>

      {/* Bottom Section: Action Buttons */}
      <div className="mt-6 flex flex-col gap-3 w-full">
        <button
          type="button"
          onClick={onViewProjections}
          className="flex h-[42px] w-full items-center justify-center rounded-xl bg-white text-[13px] font-bold tracking-[0.13px] text-[#006194] shadow-[0px_4px_24px_-2px_rgba(0,0,0,0.06),0px_2px_8px_-1px_rgba(0,0,0,0.04)] transition hover:bg-white/95 active:scale-95 focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
        >
          View Projections
        </button>

        <button
          type="button"
          onClick={onDismiss}
          className="flex h-[34px] w-full items-center justify-center text-[13px] font-bold tracking-[0.13px] text-white/60 transition hover:text-white cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

