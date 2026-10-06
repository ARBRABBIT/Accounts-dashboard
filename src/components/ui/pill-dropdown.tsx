'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

interface PillDropdownProps {
  value: string;
  options?: string[];
  onChange?: (val: string) => void;
  variant?: 'light' | 'bordered';
  className?: string;
  ariaLabel?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export function PillDropdown({
  value,
  options = ['Weekly', 'Monthly', 'Annual'],
  onChange,
  variant = 'bordered',
  className = '',
  ariaLabel = 'Select period',
  searchable = false,
  searchPlaceholder = 'Search...',
}: PillDropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      setSearchQuery('');
      if (searchable) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    }
  }, [open, searchable]);

  const filteredOptions = searchable && searchQuery.trim()
    ? options.filter((opt) => opt.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  const variantStyles =
    variant === 'light'
      ? 'bg-white text-[#2C2C2C] hover:bg-white/90 border-transparent shadow-xs'
      : 'bg-white text-[#2C2C2C] border border-[#828282]/40 hover:bg-subtle';

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between gap-2 rounded-full px-3.5 py-1.5 text-[13.5px] font-medium transition-all focus-visible:outline-2 focus-visible:outline-brand ${variantStyles}`}
      >
        <span>{value}</span>
        <ChevronDown
          size={16}
          strokeWidth={1.75}
          className={`text-[#2C2C2C] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 z-40 mt-1.5 min-w-full sm:min-w-[210px] rounded-2xl border border-[#E5E5EA] bg-white shadow-xl flex flex-col overflow-hidden"
        >
          {searchable && (
            <div className="border-b border-[#F2F2F2] px-3 py-2 bg-white">
              <div className="flex items-center gap-2 rounded-lg bg-[#F8FAFC] px-2.5 py-1.5 text-xs text-[#1D1D1F]">
                <Search size={14} className="text-[#86868B] shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                  className="w-full bg-transparent text-xs text-[#191C1E] placeholder:text-[#9CA3AF] border-none p-0 outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 shadow-none focus:shadow-none"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setOpen(false);
                    }
                  }}
                />
              </div>
            </div>
          )}

          <ul className="overflow-y-auto max-h-[190px] py-1.5">
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-xs text-[#86868B] text-center">
                No results found
              </li>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt === value;
                return (
                  <li
                    key={opt}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange?.(opt);
                      setOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onChange?.(opt);
                        setOpen(false);
                      }
                    }}
                    tabIndex={0}
                    className={`mx-1.5 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-[13px] transition-colors focus-visible:bg-[#F2F4F7] focus-visible:outline-none ${
                      isSelected
                        ? 'bg-[#00609A]/10 font-semibold text-[#00609A]'
                        : 'text-[#191C1E] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check size={14} className="text-[#00609A] shrink-0" />}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
