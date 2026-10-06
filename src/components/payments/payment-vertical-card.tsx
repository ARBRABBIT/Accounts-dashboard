'use client';
import {
  Mountain,
  UserCheck,
  Users,
  Wrench,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { PaymentVerticalCard as PaymentCardType } from '@/lib/payment-management-data';

interface PaymentVerticalCardProps {
  vertical: PaymentCardType;
  onClick?: () => void;
}

export function PaymentVerticalCard({
  vertical,
  onClick,
}: PaymentVerticalCardProps) {
  const getIcon = () => {
    switch (vertical.iconName) {
      case 'farmland':
        return <Mountain size={26} className="text-[#2780C4]" />;
      case 'subscriptions':
        return <UserCheck size={26} className="text-[#2780C4]" />;
      case 'pool':
        return <Users size={26} className="text-[#2780C4]" />;
      case 'services':
        return <Wrench size={24} className="text-[#2780C4]" />;
      case 'verification':
        return <ShieldCheck size={24} className="text-[#2780C4]" />;
      default:
        return <Mountain size={26} className="text-[#2780C4]" />;
    }
  };

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
      className="group relative flex min-h-[360px] flex-col justify-between rounded-[32px] bg-white p-8 sm:p-10 shadow-[0px_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-brand cursor-pointer text-left"
    >
      {/* Top Section: Icon and Titles */}
      <div className="flex flex-col items-start gap-4">
        {/* Header row with Icon and Quick Detail indicator */}
        <div className="flex w-full items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#F1F4F9] transition-transform group-hover:scale-105">
            {getIcon()}
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-[#2780C4] opacity-0 transition-all duration-200 group-hover:bg-[#F1F4F9] group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </div>

        {/* Heading 3 */}
        <div className="mt-2 flex flex-col gap-2">
          <h2 className="text-2xl sm:text-[28px] font-extrabold leading-[35px] tracking-[-0.7px] text-[#006194]">
            {vertical.title}
          </h2>
          <p className="text-sm sm:text-[15px] font-medium leading-[24px] text-[#404850]">
            {vertical.description}
          </p>
        </div>
      </div>

      {/* Bottom Section: Amount */}
      <div className="mt-6 flex flex-col items-start">
        <span className="text-3xl sm:text-[44px] md:text-[48px] font-black leading-none tracking-[-2.4px] text-[#006194] tabular-nums">
          {vertical.amount}
        </span>
      </div>
    </div>
  );
}

