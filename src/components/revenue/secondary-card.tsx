'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LandPlot, Film, Layers, ShieldCheck } from 'lucide-react';
import { RevenueVertical } from '@/lib/revenue-management-data';
import { Modal } from '@/components/ui/modal';

interface SecondaryRevenueCardProps {
  vertical: RevenueVertical;
}

export function SecondaryRevenueCard({ vertical }: SecondaryRevenueCardProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
    if (vertical.id === 'subscriptions') {
      router.push('/subscription');
      return;
    }
    if (vertical.id === 'farmland-services') {
      router.push('/farmland-services');
      return;
    }
    setShowModal(true);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }

  function renderIcon() {
    switch (vertical.iconName) {
      case 'land-plot':
        return <LandPlot size={22} className="text-brand" strokeWidth={1.8} />;
      case 'subscriptions':
        return <Film size={22} className="text-brand" strokeWidth={1.8} />;
      case 'layers':
        return <Layers size={22} className="text-brand" strokeWidth={1.8} />;
      case 'shield':
        return <ShieldCheck size={22} className="text-brand" strokeWidth={1.8} />;
      default:
        return <LandPlot size={22} className="text-brand" strokeWidth={1.8} />;
    }
  }

  return (
    <>
      <article
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${vertical.name}: ${vertical.amount}`}
        className="group relative flex h-[268px] sm:h-[275px] w-full cursor-pointer flex-col justify-between rounded-[24px] border border-[#E5E5EA] bg-white p-7 sm:p-8 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-brand"
      >
        {/* Top Icon Box */}
        <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#F4F8FC] transition-transform duration-200 group-hover:scale-105">
          {renderIcon()}
        </div>

        {/* Bottom Details */}
        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-bold tracking-[0.13px] text-[#46464A]">
            {vertical.name}
          </span>
          <span className="text-[28px] sm:text-[32px] font-extrabold leading-none text-[#393B3F]">
            {vertical.amount}
          </span>
        </div>
      </article>

      {showModal && (
        <Modal
          title={`${vertical.name} Overview`}
          onClose={() => setShowModal(false)}
        >
          <div className="space-y-4">
            <div className="rounded-xl bg-subtle p-4">
              <span className="text-xs font-bold text-muted uppercase">
                Total Recovered Amount
              </span>
              <p className="mt-1 text-2xl font-bold text-brand">{vertical.amount}</p>
            </div>
            <p className="text-sm leading-6 text-muted">
              Live settlement details and transaction logs for {vertical.name} are
              tracked under verified institutional escrow accounts.
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
