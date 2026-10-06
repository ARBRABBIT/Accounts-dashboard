'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PillDropdown } from '@/components/ui/pill-dropdown';
import {
  farmlandRevenueSlides,
  FarmlandRevenueSlide,
} from '@/lib/accounts-dashboard-data';

export function FarmlandRevenueCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [period, setPeriod] = useState('Weekly');

  const currentSlide: FarmlandRevenueSlide =
    farmlandRevenueSlides[currentIndex] || farmlandRevenueSlides[0];

  function handlePrev() {
    setCurrentIndex((prev) =>
      prev === 0 ? farmlandRevenueSlides.length - 1 : prev - 1
    );
  }

  function handleNext() {
    setCurrentIndex((prev) =>
      prev === farmlandRevenueSlides.length - 1 ? 0 : prev + 1
    );
  }

  return (
    <article
      aria-label="Farmland Revenue summary"
      className="relative flex min-h-[424px] w-full flex-col justify-between rounded-[23px] bg-brand p-6 text-white shadow-sm sm:p-7"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-[20px] font-semibold tracking-tight text-white">
          Farmland Revenue
        </h2>
        <PillDropdown
          value={period}
          onChange={setPeriod}
          variant="light"
          ariaLabel="Filter Farmland Revenue by period"
        />
      </div>

      {/* Hero Metric */}
      <div className="my-auto py-2">
        <div className="text-[54px] font-semibold leading-none tracking-tight text-white sm:text-[72px] lg:text-[76px]">
          {currentSlide.revenue}
        </div>

        <div className="mt-5 space-y-2 max-w-[360px]">
          <p className="text-[17px] font-normal leading-[22px] text-white">
            {currentSlide.headline}
          </p>
          <p className="text-[13px] font-normal leading-[17px] text-white/85">
            {currentSlide.description}
          </p>
        </div>
      </div>

      {/* Bottom Carousel Navigation */}
      <div className="mt-4 flex items-center justify-between pt-2">
        <button
          type="button"
          aria-label="Previous revenue slide"
          onClick={handlePrev}
          className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {farmlandRevenueSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white ${
                  isActive
                    ? 'w-10 rounded-full bg-white sm:w-14'
                    : 'w-10 rounded-full bg-white/25 hover:bg-white/40 sm:w-14'
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Next revenue slide"
          onClick={handleNext}
          className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}
