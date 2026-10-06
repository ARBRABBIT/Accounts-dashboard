'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  total: number;
  page?: number;
  pageSize?: number;
  itemLabel?: string;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({
  total,
  page = 1,
  pageSize = 6,
  itemLabel = 'location entries',
  onPageChange,
  className = '',
}: PaginationProps) {
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div
      className={`flex flex-col gap-3 px-6 py-4 sm:px-8 sm:py-5 border-t border-[#F2F2F2] sm:flex-row sm:items-center sm:justify-between text-[13px] font-medium text-[#5E5E63] ${className}`}
    >
      <p>
        {total === 0
          ? `No ${itemLabel}`
          : `Displaying ${start} - ${end} of ${total} ${itemLabel}`}
      </p>
      <nav aria-label="Pagination" className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1 || !onPageChange}
          onClick={() => onPageChange?.(page - 1)}
          aria-label="Previous page"
          className="flex h-10 w-10 items-center justify-center rounded-[16px] border border-[#E5E5EA] text-[#5E5E63] transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>
        <span
          aria-current="page"
          aria-label={`Page ${page}`}
          className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-[#2780C4] text-[13px] font-bold text-white shadow-xs"
        >
          {page}
        </span>
        {lastPage > 1 && (
          <button
            type="button"
            onClick={() => onPageChange?.(page === 1 ? 2 : 1)}
            aria-label={`Page ${page === 1 ? 2 : 1}`}
            className="flex h-10 w-10 items-center justify-center rounded-[16px] border border-[#E5E5EA] text-[#5E5E63] text-[13px] font-medium transition-colors hover:bg-slate-50"
          >
            {page === 1 ? 2 : 1}
          </button>
        )}
        <button
          type="button"
          disabled={page >= lastPage || !onPageChange}
          onClick={() => onPageChange?.(page + 1)}
          aria-label="Next page"
          className="flex h-10 w-10 items-center justify-center rounded-[16px] border border-[#E5E5EA] text-[#5E5E63] transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    </div>
  );
}
