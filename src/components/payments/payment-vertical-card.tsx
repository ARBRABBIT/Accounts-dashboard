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
      className="group relative flex h-full min-h-[200px] lg:min-h-0 w-full flex-col justify-between rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-white p-5 sm:p-6 lg:p-6 xl:p-7 shadow-[0px_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-brand cursor-pointer text-left"
    >
      {/* Top Section: Icon and Titles */}
      <div className="flex flex-col items-start gap-2.5 sm:gap-3">
        {/* Header row with Icon and Quick Detail indicator */}
        <div className="flex w-full items-center justify-between">
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 lg:h-13 lg:w-13 items-center justify-center rounded-[14px] sm:rounded-[16px] bg-[#F1F4F9] transition-transform group-hover:scale-105">
            {getIcon()}
          </div>
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-transparent text-[#2780C4] opacity-0 transition-all duration-200 group-hover:bg-[#F1F4F9] group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </div>

        {/* Heading 3 */}
        <div className="mt-1 flex flex-col gap-1 sm:gap-1.5">
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold leading-tight tracking-[-0.7px] text-[#006194]">
            {vertical.title}
          </h2>
          <p className="text-xs sm:text-sm lg:text-[14px] font-medium leading-snug text-[#404850] line-clamp-2">
            {vertical.description}
          </p>
        </div>
      </div>

      {/* Bottom Section: Amount */}
      <div className="mt-3 sm:mt-4 flex flex-col items-start">
        <span className="text-2xl sm:text-3xl lg:text-[36px] xl:text-[42px] font-black leading-none tracking-[-1.5px] text-[#006194] tabular-nums">
          {vertical.amount}
        </span>
      </div>
    </div>
  );
}

