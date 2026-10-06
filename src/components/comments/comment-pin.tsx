'use client';
import React, { useState } from 'react';
import { FigmaComment } from '@/lib/comments-store';
import { MessageSquare } from 'lucide-react';

interface CommentPinProps {
  comment?: FigmaComment;
  index?: number;
  isActive?: boolean;
  isDraft?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function CommentPin({
  comment,
  index = 1,
  isActive = false,
  isDraft = false,
  onClick,
  style,
}: CommentPinProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={style}
      className="absolute z-40 select-none pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        aria-label={
          isDraft
            ? 'New comment draft pin'
            : `Comment ${index} by ${comment?.author.name}: ${comment?.text.slice(0, 30)}...`
        }
        className={`group relative flex h-8 w-8 items-center justify-center border-2 border-white text-white font-bold text-xs transition-all duration-200 cursor-pointer shadow-[0_4px_14px_rgba(0,0,0,0.18)] ${
          isDraft
            ? 'bg-brand animate-pulse ring-4 ring-brand/40 scale-105'
            : isActive
            ? 'bg-[#1a5f96] ring-4 ring-brand/35 scale-110 shadow-[0_6px_20px_rgba(39,128,196,0.4)]'
            : 'bg-brand hover:scale-110 hover:bg-[#1f6da8]'
        }`}
        style={{
          borderRadius: '50% 50% 50% 3px',
          transform: 'translate(-2px, -30px)',
        }}
      >
        {isDraft ? (
          <MessageSquare size={13} className="text-white fill-white" />
        ) : (
          <span className="text-[11px] font-bold tracking-tight">{index}</span>
        )}

        {/* Pointer shadow drop */}
        <span
          className="absolute -bottom-1 -left-0.5 h-1.5 w-1.5 bg-[#154B73] opacity-40 rounded-full blur-[0.5px] -z-10"
          aria-hidden="true"
        />
      </button>

      {/* Hover preview tooltip when pin is not active and not draft */}
      {!isActive && !isDraft && isHovered && comment && (
        <div
          role="tooltip"
          className="pointer-events-none absolute left-7 top-[-36px] z-50 flex max-w-[220px] flex-col gap-0.5 rounded-xl border border-line bg-white/95 px-3 py-2 shadow-xl backdrop-blur-sm animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-ink truncate">
              {comment.author.name}
            </span>
            <span className="text-[10px] text-muted">#{index}</span>
          </div>
          <p className="text-xs text-muted leading-tight line-clamp-2">
            {comment.text}
          </p>
        </div>
      )}
    </div>
  );
}

