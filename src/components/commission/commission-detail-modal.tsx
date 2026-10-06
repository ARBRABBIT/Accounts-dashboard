'use client';
import { AgentCommission } from '@/lib/commission-management-data';
import {
  X,
  CheckCircle2,
  Clock,
  Building,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Download,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

interface CommissionDetailModalProps {
  agent: AgentCommission | null;
  isOpen: boolean;
  onClose: () => void;
  onAuthorizePayout?: (agentId: string) => void;
}

export function CommissionDetailModal({
  agent,
  isOpen,
  onClose,
  onAuthorizePayout,
}: CommissionDetailModalProps) {
  if (!isOpen || !agent) return null;

  const isPaid = agent.status === 'Paid';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="commission-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col rounded-[28px] border border-black/5 bg-white p-6 shadow-2xl sm:p-8 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-line pb-5">
          <div className="flex items-center gap-4">
            <img
              src={agent.avatarUrl}
              alt={agent.name}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-black/5"
            />
            <div>
              <div className="flex items-center gap-3">
                <h2
                  id="commission-detail-title"
                  className="text-2xl font-bold text-ink"
                >
                  {agent.name}
                </h2>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    isPaid
                      ? 'bg-[#DCFCE7] text-[#16A34A]'
                      : 'bg-[#FFEDD5] text-[#EA580C]'
                  }`}
                >
                  {isPaid ? (
                    <CheckCircle2 size={12} className="stroke-[2.5]" />
                  ) : (
                    <Clock size={12} className="stroke-[2.5]" />
                  )}
                  {agent.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">
                Partner Agent • {agent.agentId}
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-subtle text-muted transition hover:bg-line hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
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
                Total Commission Payout
              </span>
              <div className="mt-1 text-3xl font-extrabold text-[#154B73]">
                {agent.formattedAmount}
              </div>
              <p className="mt-1 text-xs text-muted">
                Calculated at {agent.commissionRate || '2.5%'} for land transaction
              </p>
            </div>

            <div className="mt-4 sm:mt-0">
              {isPaid ? (
                <button
                  type="button"
                  onClick={() => alert(`Downloading payment voucher for ${agent.name}...`)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#2780C4] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#1E6EA7]"
                >
                  <Download size={16} />
                  <span>Download Voucher</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onAuthorizePayout?.(agent.id);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#EA580C] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#C2410C]"
                >
                  <ShieldCheck size={16} />
                  <span>Authorize Payout</span>
                </button>
              )}
            </div>
          </div>

          {/* Deal & Land Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
              Deal Information
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-4 rounded-2xl border border-line bg-subtle/40 p-4 sm:grid-cols-4">
              <div>
                <span className="text-xs text-muted">Region</span>
                <p className="mt-1 text-sm font-semibold text-ink">
                  {agent.region}
                </p>
              </div>
              <div>
                <span className="text-xs text-muted">{agent.areaLabel}</span>
                <p className="mt-1 text-sm font-semibold text-ink">
                  {agent.areaOrDistrict}
                </p>
              </div>
              <div>
                <span className="text-xs text-muted">Land Identity</span>
                <p className="mt-1 text-sm font-semibold text-brand">
                  {agent.landId}
                </p>
              </div>
              <div>
                <span className="text-xs text-muted">Plot Area</span>
                <p className="mt-1 text-sm font-semibold text-ink">
                  {agent.plotSize || '2.0 Acres'}
                </p>
              </div>
            </div>
          </div>

          {/* Bank & Settlement Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
              Settlement & Banking Information
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-line p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-subtle text-brand">
                  <CreditCard size={20} />
                </div>
                <div>
                  <span className="text-xs text-muted">Bank Account</span>
                  <p className="text-sm font-semibold text-ink">
                    {agent.bankAccount || 'HDFC •••• 4120'}
                  </p>
                  <span className="text-[11px] text-muted">
                    IFSC: {agent.ifscCode || 'HDFC0001824'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-line p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-subtle text-brand">
                  <Calendar size={20} />
                </div>
                <div>
                  <span className="text-xs text-muted">Settlement Date</span>
                  <p className="text-sm font-semibold text-ink">
                    {agent.date}
                  </p>
                  <span className="text-[11px] text-muted">
                    Ref: {agent.transactionRef || 'TXN-9824719284'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
              Agent Contact
            </h3>
            <div className="mt-3 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-xl bg-subtle px-3.5 py-2 text-xs font-medium text-ink">
                <Phone size={14} className="text-muted" />
                <span>{agent.phone || '+91 98490 23145'}</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-subtle px-3.5 py-2 text-xs font-medium text-ink">
                <Mail size={14} className="text-muted" />
                <span>{agent.email || `${agent.name.toLowerCase().replace(' ', '.')}@glc-agents.in`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 flex justify-end border-t border-line pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-line px-6 py-2.5 text-sm font-semibold text-ink transition hover:bg-subtle"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

