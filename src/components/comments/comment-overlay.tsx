'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useComments } from './comment-context';
import { CommentPin } from './comment-pin';
import { CommentCard } from './comment-card';
import { MessageSquare, X } from 'lucide-react';

export function CommentOverlay() {
  const {
    pageComments,
    isCommentMode,
    setCommentMode,
    toggleCommentMode,
    showPins,
    activeCommentId,
    setActiveCommentId,
    draftPin,
    setDraftPin,
    addComment,
    editComment,
    deleteComment,
  } = useComments();

  // Container offset tracking for rock-solid responsive coordinate alignment
  const [containerOffset, setContainerOffset] = useState({
    left: 0,
    top: 0,
    width: 1440,
  });

  const updateContainerOffset = useCallback(() => {
    if (typeof window === 'undefined') return;
    const container =
      document.querySelector<HTMLElement>('.max-w-\\[1440px\\]') ||
      document.querySelector<HTMLElement>('.dashboard-shell') ||
      document.body;

    if (container) {
      const rect = container.getBoundingClientRect();
      setContainerOffset({
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
      });
    }
  }, []);

  // Update on mount, resize, scroll, and DOM mutations
  useEffect(() => {
    updateContainerOffset();
    window.addEventListener('resize', updateContainerOffset);
    window.addEventListener('scroll', updateContainerOffset, { passive: true });

    const observer = new ResizeObserver(() => {
      updateContainerOffset();
    });

    const target =
      document.querySelector('.max-w-\\[1440px\\]') ||
      document.querySelector('.dashboard-shell') ||
      document.body;

    if (target) observer.observe(target);

    return () => {
      window.removeEventListener('resize', updateContainerOffset);
      window.removeEventListener('scroll', updateContainerOffset);
      observer.disconnect();
    };
  }, [updateContainerOffset]);

  // Global hotkeys: 'c' to toggle comment mode, 'Escape' to dismiss
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (e.key === 'c' || e.key === 'C') {
        if (!isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          toggleCommentMode();
        }
      }

      if (e.key === 'Escape') {
        if (draftPin) {
          e.preventDefault();
          setDraftPin(null);
        } else if (activeCommentId) {
          e.preventDefault();
          setActiveCommentId(null);
        } else if (isCommentMode) {
          e.preventDefault();
          setCommentMode(false);
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isCommentMode,
    activeCommentId,
    draftPin,
    toggleCommentMode,
    setCommentMode,
    setActiveCommentId,
    setDraftPin,
  ]);

  // Handle click on canvas in comment mode
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid creating draft if clicking on top banner or existing controls
    const pageX = e.pageX;
    const pageY = e.pageY;

    const relX = Math.round(pageX - containerOffset.left);
    const relY = Math.round(pageY - containerOffset.top);

    setActiveCommentId(null);
    setDraftPin({
      relX,
      relY,
      containerWidth: containerOffset.width,
    });
  };

  // Helper to calculate smart popup positioning
  const getCardStyle = (pinX: number, pinY: number): React.CSSProperties => {
    if (typeof window === 'undefined') return { left: pinX + 16, top: pinY - 10 };

    const cardWidth = 360;
    const cardHeight = 220;

    const absoluteX = containerOffset.left + pinX;
    const absoluteY = containerOffset.top + pinY;

    // Check if card overflows right of screen
    let left = pinX + 16;
    if (absoluteX + cardWidth + 24 > window.innerWidth + window.scrollX) {
      left = pinX - cardWidth - 12;
    }

    // Check if card overflows bottom of viewport
    let top = pinY - 14;
    const viewportBottom = window.scrollY + window.innerHeight;
    if (absoluteY + cardHeight > viewportBottom - 20) {
      top = Math.max(10, pinY - cardHeight + 20);
    }

    return {
      left: Math.max(8, left),
      top: Math.max(8, top),
    };
  };

  const activeCommentIndex = activeCommentId
    ? pageComments.findIndex((c) => c.id === activeCommentId) + 1
    : 1;

  const activeComment = pageComments.find((c) => c.id === activeCommentId);

  // Custom SVG cursor for comment mode (crosshair with Figma speech bubble)
  const commentCursorStyle = isCommentMode
    ? {
        cursor: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' fill='%232780C4' stroke='%23FFFFFF' stroke-width='1.5'/%3E%3C/svg%3E") 3 21, crosshair`,
      }
    : undefined;

  return (
    <>
      {/* Top Banner when Comment Mode is active */}
      {isCommentMode && (
        <div className="fixed top-5 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center gap-3 rounded-full border border-line bg-white/95 px-4 py-2 shadow-xl backdrop-blur-md">
            <span className="flex h-2.5 w-2.5 rounded-full bg-brand animate-ping" />
            <div className="flex items-center gap-2 text-xs font-semibold text-ink">
              <MessageSquare size={14} className="text-brand fill-brand/20" />
              <span>Comment mode is on</span>
              <span className="hidden text-muted sm:inline">
                · Click anywhere on this page to pin a comment
              </span>
            </div>
            <div className="flex items-center gap-2 pl-1 border-l border-line">
              <kbd className="hidden rounded bg-subtle px-1.5 py-0.5 text-[10px] font-mono text-muted sm:inline-block">
                Esc
              </kbd>
              <button
                type="button"
                onClick={() => setCommentMode(false)}
                className="flex items-center gap-1 rounded-full bg-subtle px-2.5 py-1 text-xs font-semibold text-ink hover:bg-line transition-colors"
              >
                <span>Done</span>
                <X size={12} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transparent Click Catcher across page when Comment Mode is on */}
      {isCommentMode && (
        <div
          role="region"
          aria-label="Comment canvas click listener"
          onClick={handleCanvasClick}
          style={commentCursorStyle}
          className="fixed inset-0 z-30 bg-black/[0.01]"
        />
      )}

      {/* Main Comment Canvas Layer (holds pins and active comment popovers) */}
      {showPins && (
        <div
          className="absolute pointer-events-none z-40"
          style={{
            left: containerOffset.left,
            top: containerOffset.top,
            width: containerOffset.width,
            minHeight: '100%',
          }}
        >
          {/* Render existing comments pins for this page */}
          {pageComments.map((comment, i) => {
            const index = i + 1;
            const isActive = activeCommentId === comment.id;

            return (
              <CommentPin
                key={comment.id}
                comment={comment}
                index={index}
                isActive={isActive}
                onClick={() => {
                  setDraftPin(null);
                  setActiveCommentId(isActive ? null : comment.id);
                }}
                style={{
                  left: comment.relX,
                  top: comment.relY,
                }}
              />
            );
          })}

          {/* Render Draft Pin if user clicked to create a comment */}
          {draftPin && (
            <CommentPin
              isDraft
              index={pageComments.length + 1}
              style={{
                left: draftPin.relX,
                top: draftPin.relY,
              }}
            />
          )}

          {/* Render Draft Comment Card */}
          {draftPin && (
            <CommentCard
              isDraft
              index={pageComments.length + 1}
              style={getCardStyle(draftPin.relX, draftPin.relY)}
              onClose={() => setDraftPin(null)}
              onSubmitDraft={addComment}
            />
          )}

          {/* Render Active Comment Card */}
          {activeComment && !draftPin && (
            <CommentCard
              comment={activeComment}
              index={activeCommentIndex}
              style={getCardStyle(activeComment.relX, activeComment.relY)}
              onClose={() => setActiveCommentId(null)}
              onEdit={editComment}
              onDelete={deleteComment}
            />
          )}
        </div>
      )}
    </>
  );
}

