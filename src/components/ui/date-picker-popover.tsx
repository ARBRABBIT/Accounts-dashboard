'use client';
import { useState, useRef, useEffect, useMemo } from 'react';
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

interface DatePickerPopoverProps {
  value: string; // "YYYY-MM-DD" or ""
  onChange: (dateStr: string) => void;
  className?: string;
  defaultViewDate?: string; // Optional starting view, e.g. "2023-10-12"
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const YEAR_OPTIONS = Array.from({ length: 18 }, (_, i) => 2018 + i);

export function DatePickerPopover({
  value,
  onChange,
  className = '',
  defaultViewDate = '2023-10-12',
}: DatePickerPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize viewing month and year based on value or defaultViewDate
  const initialDate = useMemo(() => {
    if (value) {
      const [y, m, d] = value.split('-').map(Number);
      return new Date(y, m - 1, d);
    }
    const [y, m, d] = defaultViewDate.split('-').map(Number);
    return new Date(y, m - 1, d);
  }, [value, defaultViewDate]);

  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth()); // 0-11

  // Keep view in sync when value changes from outside
  useEffect(() => {
    if (value) {
      const [y, m] = value.split('-').map(Number);
      setViewYear(y);
      setViewMonth(m - 1);
    }
  }, [value]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Navigate months
  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  // Generate calendar days for the current viewMonth & viewYear
  const calendarDays = useMemo(() => {
    const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sun
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const days: Array<{
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isSelected: boolean;
      isToday: boolean;
    }> = [];

    const todayStr = (() => {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
        now.getDate()
      ).padStart(2, '0')}`;
    })();

    // Previous month padding days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevM = viewMonth === 0 ? 12 : viewMonth;
      const prevY = viewMonth === 0 ? viewYear - 1 : viewYear;
      const dateStr = `${prevY}-${String(prevM).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dateStr,
        dayNumber: d,
        isCurrentMonth: false,
        isSelected: value === dateStr,
        isToday: dateStr === todayStr,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(
        2,
        '0'
      )}`;
      days.push({
        dateStr,
        dayNumber: d,
        isCurrentMonth: true,
        isSelected: value === dateStr,
        isToday: dateStr === todayStr,
      });
    }

    // Next month padding days to complete 35 or 42 grid
    const totalSlots = days.length <= 35 ? 35 : 42;
    const remaining = totalSlots - days.length;
    for (let d = 1; d <= remaining; d++) {
      const nextM = viewMonth === 11 ? 1 : viewMonth + 2;
      const nextY = viewMonth === 11 ? viewYear + 1 : viewYear;
      const dateStr = `${nextY}-${String(nextM).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dateStr,
        dayNumber: d,
        isCurrentMonth: false,
        isSelected: value === dateStr,
        isToday: dateStr === todayStr,
      });
    }

    return days;
  }, [viewYear, viewMonth, value]);

  function handleSelectDate(dateStr: string) {
    onChange(dateStr);
    setIsOpen(false);
  }

  function handleClear() {
    onChange('');
    setIsOpen(false);
  }

  function handleToday() {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')}`;
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    onChange(todayStr);
    setIsOpen(false);
  }

  const formattedSelected = useMemo(() => {
    if (!value) return '';
    try {
      const [y, m, d] = value.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return value;
    }
  }, [value]);

  return (
    <div ref={containerRef} className={`relative flex items-center gap-2 ${className}`}>
      {/* Trigger Button: Only Calendar Icon */}
      <button
        type="button"
        aria-label="Filter by date"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border shadow-xs transition-all duration-150 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer shrink-0 ${
          isOpen || value
            ? 'border-[#2780C4] bg-[#EAF4FB]/50 text-[#2780C4] shadow-sm'
            : 'border-[#E5E5EA] bg-white text-[#86868B] hover:bg-slate-50 hover:text-[#1D1D1F]'
        }`}
        title={value ? `Filtered by ${formattedSelected}` : 'Select date'}
      >
        <CalendarDays size={18} strokeWidth={1.75} />
        {value && (
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#2780C4] ring-2 ring-white" />
        )}
      </button>

      {/* Selected Date Chip with Clear Button */}
      {value && (
        <div className="flex items-center gap-1.5 rounded-full bg-[#EAF4FB] py-1 pl-3 pr-1.5 text-xs font-semibold text-[#2780C4] border border-[#2780C4]/20 animate-fade-in shadow-2xs">
          <span>{formattedSelected}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            title="Clear date filter"
            aria-label="Clear date filter"
            className="flex h-5 w-5 items-center justify-center rounded-full text-[#2780C4] hover:bg-[#2780C4]/15 transition-colors cursor-pointer"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Custom GLC Design System Date Picker Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Date Picker"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[296px] rounded-[22px] border border-[#E5E5EA] bg-white p-4 shadow-[0px_16px_40px_rgba(0,0,0,0.12)] animate-fade-in select-none"
        >
          {/* Header: Month Year + Prev/Next Buttons */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F2F2F2]">
            <div className="flex items-center gap-1.5">
              {/* Month Selector Dropdown */}
              <div className="relative inline-flex items-center">
                <select
                  aria-label="Select month"
                  value={viewMonth}
                  onChange={(e) => setViewMonth(Number(e.target.value))}
                  className="appearance-none rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] pl-2 pr-5 py-1 text-xs font-bold text-[#191C1E] cursor-pointer focus:border-[#2780C4] focus:outline-none transition-colors"
                >
                  {MONTH_NAMES.map((name, idx) => (
                    <option key={name} value={idx}>
                      {name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={11} className="pointer-events-none absolute right-1.5 text-[#5E5E63]" />
              </div>

              {/* Year Selector Dropdown */}
              <div className="relative inline-flex items-center">
                <select
                  aria-label="Select year"
                  value={viewYear}
                  onChange={(e) => setViewYear(Number(e.target.value))}
                  className="appearance-none rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] pl-2 pr-5 py-1 text-xs font-bold text-[#191C1E] cursor-pointer focus:border-[#2780C4] focus:outline-none transition-colors"
                >
                  {YEAR_OPTIONS.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
                <ChevronDown size={11} className="pointer-events-none absolute right-1.5 text-[#5E5E63]" />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Previous month"
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#5E5E63] hover:bg-slate-100 hover:text-[#191C1E] transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#5E5E63] hover:bg-slate-100 hover:text-[#191C1E] transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday Header */}
          <div className="grid grid-cols-7 gap-1 pt-3 pb-1 text-center">
            {WEEKDAY_NAMES.map((d) => (
              <span
                key={d}
                className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Calendar Days 7-col Grid */}
          <div className="grid grid-cols-7 gap-1 pt-1">
            {calendarDays.map((item) => {
              const isSelected = item.isSelected;
              const isCurrentMonth = item.isCurrentMonth;
              const isToday = item.isToday;

              return (
                <button
                  key={item.dateStr}
                  type="button"
                  onClick={() => handleSelectDate(item.dateStr)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all cursor-pointer mx-auto ${
                    isSelected
                      ? 'bg-[#2780C4] text-white shadow-xs'
                      : isCurrentMonth
                      ? 'text-[#191C1E] hover:bg-[#EAF4FB] hover:text-[#2780C4]'
                      : 'text-[#C3C6D5] hover:bg-slate-50'
                  } ${isToday && !isSelected ? 'ring-1 ring-[#2780C4] font-bold text-[#2780C4]' : ''}`}
                >
                  {item.dayNumber}
                </button>
              );
            })}
          </div>

          {/* Popover Footer: Clear & Today */}
          <div className="mt-3 flex items-center justify-between border-t border-[#F2F2F2] pt-3 text-xs font-semibold">
            <button
              type="button"
              onClick={handleClear}
              className="text-[#64748B] hover:text-[#191C1E] transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-slate-50"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleToday}
              className="text-[#2780C4] hover:text-[#1f6da8] transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-[#EAF4FB]"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

