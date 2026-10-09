'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { usePathname } from 'next/navigation';
import {
  FigmaComment,
  CURRENT_USER,
  loadCommentsFromStorage,
  saveCommentsToStorage,
  moveToTrash,
  addDeletedCommentId,
  syncDeletedIds,
} from '@/lib/comments-store';

export interface DraftPinCoords {
  relX: number;
  relY: number;
  containerWidth: number;
}

interface CommentContextType {
  comments: FigmaComment[];
  pageComments: FigmaComment[];
  isCommentMode: boolean;
  setCommentMode: (active: boolean) => void;
  toggleCommentMode: () => void;
  showPins: boolean;
  setShowPins: (show: boolean) => void;
  activeCommentId: string | null;
  setActiveCommentId: (id: string | null) => void;
  draftPin: DraftPinCoords | null;
  setDraftPin: (pin: DraftPinCoords | null) => void;
  addComment: (text: string) => void;
  editComment: (id: string, text: string) => void;
  deleteComment: (id: string) => void;
  clearPageComments: () => void;
}

const CommentContext = createContext<CommentContextType | null>(null);

export function CommentProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [comments, setComments] = useState<FigmaComment[]>([]);
  const [isCommentMode, setIsCommentMode] = useState<boolean>(false);
  const [showPins, setShowPins] = useState<boolean>(true);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [draftPin, setDraftPin] = useState<DraftPinCoords | null>(null);

  // Load comments on mount & synchronize with server trash file
  useEffect(() => {
    const loaded = loadCommentsFromStorage();
    setComments(loaded);

    // Sync server-side trash from src/data/trash/comments.json
    fetch('/api/comments/trash')
      .then((res) => (res.ok ? res.json() : []))
      .then((trashed: Array<{ id: string }>) => {
        if (Array.isArray(trashed) && trashed.length > 0) {
          const trashedIds = new Set(trashed.map((t) => t.id));
          trashedIds.add('comment-initial-1');
          syncDeletedIds(trashedIds);

          setComments((prev) => {
            const sanitized = prev.filter((c) => !trashedIds.has(c.id));
            if (sanitized.length !== prev.length) {
              saveCommentsToStorage(sanitized);
            }
            return sanitized;
          });
        }
      })
      .catch((err) => {
        console.error('Failed to sync trash from server', err);
      });

    // Sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'glc_figma_comments_v1' || e.key === 'glc_figma_deleted_ids_v1') {
        setComments(loadCommentsFromStorage());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filter comments for active page only
  const pageComments = useMemo(() => {
    return comments.filter((c) => c.route === pathname);
  }, [comments, pathname]);

  // When pathname changes, close active dialogs & draft
  useEffect(() => {
    setActiveCommentId(null);
    setDraftPin(null);
  }, [pathname]);

  const toggleCommentMode = useCallback(() => {
    setIsCommentMode((prev) => {
      const next = !prev;
      if (!next) {
        setDraftPin(null);
      }
      return next;
    });
  }, []);

  const addComment = useCallback(
    (text: string) => {
      if (!draftPin || !text.trim()) return;

      const newComment: FigmaComment = {
        id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        route: pathname,
        relX: draftPin.relX,
        relY: draftPin.relY,
        containerWidth: draftPin.containerWidth,
        text: text.trim(),
        author: CURRENT_USER,
        createdAt: new Date().toISOString(),
      };

      setComments((prev) => {
        const next = [...prev, newComment];
        saveCommentsToStorage(next);
        return next;
      });

      setDraftPin(null);
      setActiveCommentId(newComment.id);
    },
    [draftPin, pathname]
  );

  const editComment = useCallback((id: string, text: string) => {
    if (!text.trim()) return;

    setComments((prev) => {
      const next = prev.map((c) =>
        c.id === id
          ? {
              ...c,
              text: text.trim(),
              updatedAt: new Date().toISOString(),
            }
          : c
      );
      saveCommentsToStorage(next);
      return next;
    });
  }, []);

  const deleteComment = useCallback(
    (id: string) => {
      // 1. Immediately close active popover
      setActiveCommentId((prev) => (prev === id ? null : prev));

      // 2. Synchronously blacklist ID
      addDeletedCommentId(id);

      // 3. Find target comment object (or build fallback)
      const targetComment =
        comments.find((c) => c.id === id) ||
        ({
          id,
          route: pathname,
          relX: 0,
          relY: 0,
          containerWidth: 1440,
          text: '',
          author: CURRENT_USER,
          createdAt: new Date().toISOString(),
        } as FigmaComment);

      // 4. Update memory state and localStorage
      setComments((prev) => {
        const next = prev.filter((c) => c.id !== id);
        saveCommentsToStorage(next);
        return next;
      });

      // 5. Permanently persist to trash file on disk
      moveToTrash(targetComment);
    },
    [comments, pathname]
  );

  const clearPageComments = useCallback(() => {
    const toDelete = comments.filter((c) => c.route === pathname);

    setActiveCommentId(null);
    setDraftPin(null);

    toDelete.forEach((comment) => {
      addDeletedCommentId(comment.id);
      moveToTrash(comment);
    });

    setComments((prev) => {
      const next = prev.filter((c) => c.route !== pathname);
      saveCommentsToStorage(next);
      return next;
    });
  }, [comments, pathname]);

  return (
    <CommentContext.Provider
      value={{
        comments,
        pageComments,
        isCommentMode,
        setCommentMode: setIsCommentMode,
        toggleCommentMode,
        showPins,
        setShowPins,
        activeCommentId,
        setActiveCommentId,
        draftPin,
        setDraftPin,
        addComment,
        editComment,
        deleteComment,
        clearPageComments,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export function useComments() {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
}

