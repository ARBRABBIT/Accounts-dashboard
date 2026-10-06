'use client';
import {
  X,
  TrendingUp,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import {
  PaymentVerticalCard,
  revenueInsightData,
} from '@/lib/payment-management-data';

interface PaymentDetailModalProps {
  vertical: PaymentVerticalCard | null;
  showProjections: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentDetailModal({
  vertical,
  showProjections,
  isOpen,
  onClose,
}: PaymentDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-xl flex-col rounded-[28px] border border-black/5 bg-white p-6 shadow-2xl sm:p-8 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#F2F2F2] pb-5">
          <div>
            <h2
              id="payment-modal-title"
              className="text-2xl font-bold text-[#006194]"
            >
              {showProjections
                ? 'Revenue Projections Audit'
                : vertical?.title || 'Vertical Details'}
            </h2>
            <p className="mt-1 text-sm text-[#5E5E63]">
              {showProjections
                ? 'Forecasted pipeline closures and escrow settlements'
                : vertical?.description}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B] transition hover:bg-[#E2E8F0] hover:text-[#191C1E] focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-6 flex flex-col gap-6">
          {showProjections ? (
            /* Projections Content */
            <>
              <div className="flex items-center justify-between rounded-2xl bg-gradient-to-br from-[#F0F7FC] to-[#E3F0F9] p-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2780C4]">
                    PROJECTED MILESTONE
                  </span>
                  <div className="mt-1 text-3xl font-extrabold text-[#006194]">
                    {revenueInsightData.projectedAmount}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#16A34A] shadow-xs">
                  <TrendingUp size={14} />
                  <span>+18.5% WoW</span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#F2F2F2] overflow-hidden">
                <div className="bg-[#FAFBFD] px-5 py-3 border-b border-[#F2F2F2]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                    Settlement Window Forecast
                  </h3>
                </div>
                <div className="divide-y divide-[#F2F2F2]">
                  {revenueInsightData.projections.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Calendar size={15} className="text-[#2780C4]" />
                        <span className="font-semibold text-[#191C1E]">
                          {item.period}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-extrabold text-[#006194] tabular-nums">
                          {item.target}
                        </span>
                        <span className="rounded-full bg-[#DCFCE7] px-2 py-0.5 text-xs font-bold text-[#16A34A]">
                          {item.confidence}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Vertical Breakdown Content */
            vertical && (
              <>
                <div className="flex items-center justify-between rounded-2xl bg-gradient-to-br from-[#F0F7FC] to-[#E3F0F9] p-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2780C4]">
                      {vertical.metricLabel}
                    </span>
                    <div className="mt-1 text-3xl font-extrabold text-[#006194]">
                      {vertical.amount}
                    </div>
                  </div>
                  {vertical.monthlyGrowth && (
                    <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#16A34A] shadow-xs">
                      <TrendingUp size={14} />
                      <span>{vertical.monthlyGrowth} MoM</span>
                    </div>
                  )}
                </div>

                {vertical.breakdown && (
                  <div className="rounded-2xl border border-[#F2F2F2] overflow-hidden">
                    <div className="bg-[#FAFBFD] px-5 py-3 border-b border-[#F2F2F2]">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                        Segment Contributions
                      </h3>
                    </div>
                    <div className="divide-y divide-[#F2F2F2]">
                      {vertical.breakdown.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 text-sm"
                        >
                          <div>
                            <span className="font-medium text-[#191C1E]">
                              {item.label}
                            </span>
                            <div className="mt-1 h-1.5 w-36 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full bg-[#2780C4] rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-[#006194] tabular-nums">
                              {item.value}
                            </span>
                            <span className="block text-xs font-medium text-[#64748B]">
                              {item.percentage}% share
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )
          )}

          {/* Action Footer */}
          <div className="mt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#E5E5EA] px-5 py-2 text-xs font-semibold text-[#64748B] transition hover:bg-slate-50 cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                alert('Detailed financial report export initiated.');
                onClose();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#2780C4] px-6 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#1f6da9] cursor-pointer"
            >
              <CheckCircle2 size={14} />
              Export Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

