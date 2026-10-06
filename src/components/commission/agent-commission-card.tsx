'use client';
import { useState } from 'react';
import { MoreVertical, Check, Share2, PhoneCall } from 'lucide-react';
import { AgentCommission } from '@/lib/commission-management-data';

interface AgentCommissionCardProps {
  agent: AgentCommission;
  onView: (agent: AgentCommission) => void;
}

export function AgentCommissionCard({ agent, onView }: AgentCommissionCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const isPaid = agent.status === 'Paid';

  return (
    <article
      className="relative flex flex-col justify-between rounded-[28px] border border-black/[0.04] bg-white p-[28px] shadow-[0px_1.15px_2.3px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
      aria-label={`Commission card for ${agent.name}`}
    >
      {/* Top Section: Avatar, Info, More Menu */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3.5">
          <img
            src={agent.avatarUrl}
            alt={agent.name}
            className="h-[55px] w-[55px] shrink-0 rounded-full object-cover ring-1 ring-black/5"
          />
          <div>
            <h3 className="text-[18px] font-semibold leading-snug text-black">
              {agent.name}
            </h3>
            <p className="text-[14px] font-normal leading-snug text-[#666666]">
              {agent.agentId}
            </p>
          </div>
        </div>

        {/* 3 dots action menu */}
        <div className="relative">
          <button
            type="button"
            aria-label={`Options for ${agent.name}`}
            aria-expanded={showMenu}
            onClick={() => setShowMenu(!showMenu)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#6B7280] transition hover:bg-subtle hover:text-black focus-visible:outline-2 focus-visible:outline-brand"
          >
            <MoreVertical size={20} />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-10 z-30 w-44 rounded-2xl border border-line bg-white p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    onView(agent);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-ink transition hover:bg-subtle"
                >
                  <span>View Details</span>
                </button>
                {agent.phone && (
                  <a
                    href={`tel:${agent.phone}`}
                    onClick={() => setShowMenu(false)}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-ink transition hover:bg-subtle"
                  >
                    <PhoneCall size={14} className="text-muted" />
                    <span>Call Agent</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    navigator.clipboard?.writeText(window.location.href);
                    alert(`Link copied for ${agent.name}`);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-ink transition hover:bg-subtle"
                >
                  <Share2 size={14} className="text-muted" />
                  <span>Share Record</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Details List */}
      <div className="my-6 flex flex-col gap-3.5">
        <div className="flex items-center justify-between text-[14px]">
          <span className="font-normal text-[#46464A]">Region</span>
          <span className="font-semibold text-black">{agent.region}</span>
        </div>

        <div className="flex items-center justify-between text-[14px]">
          <span className="font-normal text-[#46464A]">{agent.areaLabel}</span>
          <span className="font-semibold text-black">{agent.areaOrDistrict}</span>
        </div>

        <div className="flex items-center justify-between text-[14px]">
          <span className="font-normal text-[#46464A]">Land ID</span>
          <span className="font-semibold text-black">{agent.landId}</span>
        </div>

        <div className="flex items-center justify-between text-[14px]">
          <span className="font-normal text-[#46464A]">Date</span>
          <span className="font-semibold text-black">{agent.date}</span>
        </div>
      </div>

      {/* Amount and Status Row */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.5px] text-[#46464A]">
            AMOUNT
          </span>
          <span className="mt-0.5 block bg-gradient-to-r from-[#2780C4] to-[#154B73] bg-clip-text text-[26px] font-bold leading-none text-transparent">
            {agent.formattedAmount}
          </span>
        </div>

        <div>
          <span
            className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.5px] ${
              isPaid
                ? 'bg-[#DCFCE7] text-[#16A34A]'
                : 'bg-[#FFEDD5] text-[#EA580C]'
            }`}
          >
            {agent.status}
          </span>
        </div>
      </div>

      {/* Action Button: View */}
      <button
        type="button"
        onClick={() => onView(agent)}
        className="flex h-[54px] w-full items-center justify-center rounded-full bg-[#3D93D1] text-[17px] font-medium text-white shadow-xs transition-all duration-200 hover:bg-[#2780C4] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-brand"
      >
        View
      </button>
    </article>
  );
}

