'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  FigmaComment,
  CURRENT_USER,
  formatRelativeTime,
} from '@/lib/comments-store';
import {
  X,
  Pencil,
  Trash2,
  Send,
  CornerDownLeft,
  Check,
} from 'lucide-react';

interface CommentCardProps {
  comment?: FigmaComment;
  index?: number;
  isDraft?: boolean;
  style?: React.CSSProperties;
  onClose: () => void;
  onSubmitDraft?: (text: string) => void;
  onEdit?: (id: string, text: string) => void;
  onDelete?: (id: string) => void;
}

export function CommentCard({
  comment,
  index = 1,
  isDraft = false,
  style,
  onClose,
  onSubmitDraft,
  onEdit,
  onDelete,
}: CommentCardProps) {
  const [draftText, setDraftText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment?.text || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-focus textarea in draft or edit mode
  useEffect(() => {
    if (isDraft || isEditing) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  }, [isDraft, isEditing]);

  // Sync edit text if comment changes
  useEffect(() => {
    if (comment) {
      setEditText(comment.text);
    }
  }, [comment]);

  const handlePostDraft = () => {
    if (!draftText.trim()) return;
    onSubmitDraft?.(draftText);
    setDraftText('');
  };

  const handleSaveEdit = () => {
    if (!editText.trim() || !comment) return;
    onEdit?.(comment.id, editText);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      if (isEditing) {
        setIsEditing(false);
        setEditText(comment?.text || '');
      } else {
        onClose();
      }
      return;
    }

    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (isDraft) {
        handlePostDraft();
      } else if (isEditing) {
        handleSaveEdit();
      }
    }
  };

  const author = isDraft ? CURRENT_USER : comment?.author || CURRENT_USER;

  return (
    <div
      ref={cardRef}
      style={style}
      role="dialog"
      aria-label={isDraft ? 'New comment dialog' : `Comment ${index}`}
      onClick={(e) => e.stopPropagation()}
      className="absolute z-50 w-[330px] sm:w-[360px] rounded-[22px] border border-line bg-white/98 p-4 shadow-[0_12px_36px_rgba(0,0,0,0.12)] backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 pointer-events-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-line/60 pb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-line bg-subtle">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-brand text-xs font-bold text-white">
                {author.initials}
              </div>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-ink truncate">
                {author.name}
              </span>
              <span className="rounded-full bg-subtle px-1.5 py-0.2 text-[10px] font-semibold text-brand">
                #{index}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-muted">
              {isDraft ? (
                <span className="text-brand font-medium">New comment</span>
              ) : (
                <>
                  <span>{formatRelativeTime(comment?.createdAt || '')}</span>
                  {comment?.updatedAt && (
                    <span className="text-[10px] italic text-muted">
                      · edited
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {!isDraft && !isEditing && (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                }}
                aria-label="Edit comment"
                title="Edit comment"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-subtle hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
              >
                <Pencil size={13} />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (comment) {
                    onDelete?.(comment.id);
                    onClose();
                  }
                }}
                aria-label="Delete comment"
                title="Delete comment (moves to trash)"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-red-50 hover:text-danger focus-visible:outline-2 focus-visible:outline-brand"
              >
                <Trash2 size={13} />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close comment card"
            title="Close (Esc)"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-3">
        {isDraft ? (
          /* Draft mode */
          <div className="flex flex-col gap-2.5">
            <textarea
              ref={textareaRef}
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Leave a comment on this screen... (⌘+Enter to post)"
              rows={3}
              className="w-full resize-none rounded-xl border border-line bg-subtle/60 p-3 text-xs leading-relaxed text-ink placeholder:text-muted focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-muted flex items-center gap-1">
                <CornerDownLeft size={11} className="opacity-70" />
                <span>⌘ + Enter to send</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold text-muted hover:bg-subtle transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!draftText.trim()}
                  onClick={handlePostDraft}
                  className="flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-transform hover:scale-[1.02] disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Send size={12} />
                  <span>Post</span>
                </button>
              </div>
            </div>
          </div>
        ) : isEditing ? (
          /* Edit mode */
          <div className="flex flex-col gap-2.5">
            <textarea
              ref={textareaRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              placeholder="Edit comment..."
              className="w-full resize-none rounded-xl border border-line bg-white p-3 text-xs leading-relaxed text-ink placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-muted flex items-center gap-1">
                <CornerDownLeft size={11} className="opacity-70" />
                <span>⌘ + Enter to save</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditText(comment?.text || '');
                  }}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold text-muted hover:bg-subtle transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!editText.trim() || editText === comment?.text}
                  onClick={handleSaveEdit}
                  className="flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-transform hover:scale-[1.02] disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Check size={12} />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* View mode */
          <div className="py-1">
            <p className="whitespace-pre-wrap text-xs leading-relaxed text-ink font-normal">
              {comment?.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

