'use client';
import {
  Mountain,
  UserCheck,
  Users,
  Wrench,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { PaymentVerticalCard as PaymentCardType } from '@/lib/payment-management-data';

interface PaymentVerticalCardProps {
  vertical: PaymentCardType;
  onClick?: () => void;
}

const barColors = ['bg-[#006194]', 'bg-[#2780C4]', 'bg-[#7BBCE8]'];

export function PaymentVerticalCard({
  vertical,
  onClick,
}: PaymentVerticalCardProps) {
  const getIcon = () => {
    switch (vertical.iconName) {
      case 'farmland':
        return <Mountain size={22} className="text-[#006194]" />;
      case 'subscriptions':
        return <UserCheck size={22} className="text-[#006194]" />;
      case 'pool':
        return <Users size={22} className="text-[#006194]" />;
      case 'services':
        return <Wrench size={22} className="text-[#006194]" />;
      case 'verification':
        return <ShieldCheck size={22} className="text-[#006194]" />;
      default:
        return <Mountain size={22} className="text-[#006194]" />;
    }
  };

  const topBreakdowns = vertical.breakdown?.slice(0, 3) || [];

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="group relative flex h-full w-full flex-col justify-between rounded-[24px] bg-white p-5 sm:p-6 lg:p-7 shadow-xs border border-[#E5E5EA]/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-brand cursor-pointer text-left min-h-0"
    >
      {/* Top Header: Icon + Growth & Action */}
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F8FC] text-[#006194] transition-transform group-hover:scale-105">
          {getIcon()}
        </div>

        <div className="flex items-center gap-2">
          {vertical.monthlyGrowth && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#16A34A]">
              <TrendingUp size={13} strokeWidth={2.5} />
              {vertical.monthlyGrowth}
            </span>
          )}
          <span className="flex h-7 w-7 items-center justify-center rounded-full text-[#8E8E93] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-[#006194]">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>

      {/* Main Content: Titles + Hero Amount */}
      <div className="my-auto py-2">
        <h2 className="text-xl font-bold tracking-tight text-[#1A1C1D]">
          {vertical.title}
        </h2>
        <p className="mt-0.5 text-xs sm:text-[13px] text-[#5E5E63] line-clamp-1">
          {vertical.description}
        </p>

        <div className="mt-3 sm:mt-4 flex items-baseline gap-2.5">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#006194] tabular-nums">
            {vertical.amount}
          </span>
          {vertical.volumeShare && (
            <span className="text-xs font-medium text-[#5E5E63]">
              • {vertical.volumeShare} volume share
            </span>
          )}
        </div>
      </div>

      {/* Clean Minimal Breakdown: Thin visual bar & plain text labels without heavy boxes */}
      {topBreakdowns.length > 0 && (
        <div className="pt-3 border-t border-[#F2F2F2]">
          {/* Thin progress bar */}
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-[#F1F4F9]">
            {topBreakdowns.map((item, idx) => (
              <div
                key={item.label}
                style={{ width: `${item.percentage}%` }}
                className={barColors[idx % barColors.length]}
              />
            ))}
          </div>

          {/* Clean minimal text row */}
          <div className="mt-2.5 flex items-center justify-between gap-2 text-xs text-[#5E5E63]">
            {topBreakdowns.map((item, idx) => (
              <div key={item.label} className="flex items-center gap-1.5 truncate">
                <span className={`h-1.5 w-1.5 rounded-full ${barColors[idx % barColors.length]} shrink-0`} />
                <span className="truncate">{item.label}</span>
                <span className="font-semibold text-[#1A1C1D] shrink-0">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

