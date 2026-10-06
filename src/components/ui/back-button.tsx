'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

/**
 * Standardized BackButton adhering to the GLC Design System & Figma specs:
 * - 40px x 40px circular action pill (rounded-full)
 * - 24px Lucide ArrowLeft icon with 2px stroke (#1D1D1F)
 * - -mt-1 alignment with 28px page titles for optical baseline & vertical alignment
 */
export function BackButton({
  onClick,
  className = '',
  label = 'Go back',
  ...props
}: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group flex h-10 w-10 shrink-0 -mt-1 items-center justify-center rounded-full text-[#1D1D1F] transition-all hover:bg-black/5 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#2780C4] ${className}`}
      {...props}
    >
      <ArrowLeft
        size={24}
        strokeWidth={2}
        className="transition-transform group-hover:-translate-x-0.5 text-[#1D1D1F]"
      />
    </button>
  );
}

export default BackButton;
