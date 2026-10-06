'use client';
import { AgentCredit } from '@/lib/credits-management-data';
import {
  X,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  Coins,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

interface CreditDetailModalProps {
  agent: AgentCredit | null;
  isOpen: boolean;
  onClose: () => void;
  onAuthorizePayout?: (agentId: string) => void;
}

export function CreditDetailModal({
  agent,
  isOpen,
  onClose,
  onAuthorizePayout,
}: CreditDetailModalProps) {
  if (!isOpen || !agent) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="credit-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col rounded-[28px] border border-black/5 bg-white p-6 shadow-2xl sm:p-8 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#F2F2F2] pb-5">
          <div className="flex items-center gap-4">
            <img
              src={agent.avatarUrl}
              alt={agent.name}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-black/5"
            />
            <div>
              <div className="flex items-center gap-3">
                <h2
                  id="credit-detail-title"
                  className="text-2xl font-bold text-[#191C1E]"
                >
                  {agent.name}
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                  <CheckCircle2 size={12} className="stroke-[2.5]" />
                  {agent.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-[#64748B]">
                {agent.role} • {agent.agentId}
              </p>
            </div>
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
          {/* Highlight Amount Banner */}
          <div className="flex flex-col items-start justify-between rounded-2xl bg-gradient-to-br from-[#F0F7FC] to-[#E3F0F9] p-5 sm:flex-row sm:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2780C4]">
                TOTAL CASH EARNED
              </span>
              <div className="mt-1 text-3xl font-extrabold text-[#00609A]">
                {agent.formattedCashEarned}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 sm:mt-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#00609A] shadow-xs">
                <Coins size={14} />
                {agent.totalCredits} Total Credits
              </span>
            </div>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#F2F2F2] bg-[#FAFBFD] p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Total Allocated
              </span>
              <div className="mt-1 text-xl font-bold text-[#191C1E]">
                {agent.totalCredits} pts
              </div>
              <span className="mt-0.5 block text-xs text-[#64748B]">
                Authorised limit
              </span>
            </div>

            <div className="rounded-2xl border border-[#F2F2F2] bg-[#FAFBFD] p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Credits Used
              </span>
              <div className="mt-1 text-xl font-bold text-[#2780C4]">
                {agent.creditsUsed} pts
              </div>
              <span className="mt-0.5 block text-xs text-[#64748B]">
                Converted to deals
              </span>
            </div>

            <div className="rounded-2xl border border-[#F2F2F2] bg-[#FAFBFD] p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Remaining Credits
              </span>
              <div className="mt-1 text-xl font-bold text-[#16A34A]">
                {agent.creditsRemaining} pts
              </div>
              <span className="mt-0.5 block text-xs text-[#64748B]">
                Available balance
              </span>
            </div>
          </div>

          {/* Agent Contact & Location Details */}
          <div className="rounded-2xl border border-[#F2F2F2] p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Agent Territory & Contact
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-sm text-[#191C1E]">
                <MapPin size={16} className="text-[#00629E] shrink-0" />
                <span className="font-semibold">{agent.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#191C1E]">
                <Clock size={16} className="text-[#64748B] shrink-0" />
                <span>Last Active: {agent.dateTime}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#191C1E]">
                <Phone size={16} className="text-[#64748B] shrink-0" />
                <span>{agent.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#191C1E]">
                <Mail size={16} className="text-[#64748B] shrink-0" />
                <span>{agent.email}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          {agent.recentTransactions && agent.recentTransactions.length > 0 && (
            <div className="rounded-2xl border border-[#F2F2F2] overflow-hidden">
              <div className="bg-[#FAFBFD] px-5 py-3 border-b border-[#F2F2F2]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Recent Credit Ledger
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#F2F2F2] text-[#64748B]">
                      <th className="px-5 py-2.5 font-semibold">Date</th>
                      <th className="px-5 py-2.5 font-semibold">Land ID</th>
                      <th className="px-5 py-2.5 font-semibold">Type</th>
                      <th className="px-5 py-2.5 font-semibold text-right">
                        Credits
                      </th>
                      <th className="px-5 py-2.5 font-semibold text-right">
                        Cash Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F2F2] text-[#191C1E]">
                    {agent.recentTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50">
                        <td className="px-5 py-2.5 font-medium">{tx.date}</td>
                        <td className="px-5 py-2.5">
                          <span className="rounded bg-[#F1F5F9] px-2 py-0.5 font-bold text-[#00609A]">
                            {tx.landId}
                          </span>
                        </td>
                        <td className="px-5 py-2.5 text-[#64748B]">
                          {tx.type}
                        </td>
                        <td className="px-5 py-2.5 font-bold text-right">
                          {tx.credits} pts
                        </td>
                        <td className="px-5 py-2.5 font-bold text-right text-[#00609A]">
                          {tx.cashEquivalent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="mt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#E5E5EA] px-5 py-2.5 text-xs font-semibold text-[#64748B] transition hover:bg-slate-50"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onAuthorizePayout?.(agent.id);
                alert(`Earnings authorization confirmed for ${agent.name}`);
                onClose();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#2780C4] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#1f6da9]"
            >
              <ShieldCheck size={14} />
              Authorize Earnings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

