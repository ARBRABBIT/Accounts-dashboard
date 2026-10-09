export interface CommentAuthor {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  initials: string;
  color?: string;
}

export interface FigmaComment {
  id: string;
  route: string; // The URL pathname (e.g. "/" or "/payment-management")
  relX: number; // Pixel X offset relative to container left
  relY: number; // Pixel Y offset relative to container top
  containerWidth: number; // Reference container width at placement
  text: string;
  author: CommentAuthor;
  createdAt: string; // ISO string
  updatedAt?: string; // ISO string if edited
}

export interface TrashedComment extends FigmaComment {
  deletedAt: string; // ISO string when comment was moved to trash
}

export const CURRENT_USER: CommentAuthor = {
  id: 'user-1',
  name: 'Bhargav Adepu',
  role: 'Product Lead',
  avatar: '/assets/avatar.png',
  initials: 'BA',
  color: '#2780C4',
};

export const STORAGE_KEY = 'glc_figma_comments_v1';
export const TRASH_STORAGE_KEY = 'glc_figma_comments_trash_v1';
export const DELETED_IDS_KEY = 'glc_figma_deleted_ids_v1';
export const HAS_INITIALIZED_KEY = 'glc_figma_comments_initialized_v1';

// Initial sample comments - empty array so no phantom comments are seeded
export const INITIAL_COMMENTS: FigmaComment[] = [];

// Built-in trashed IDs that should never be shown on the web
export const PERMANENTLY_TRASHED_IDS = new Set<string>(['comment-initial-1']);

export function getDeletedCommentIds(): Set<string> {
  if (typeof window === 'undefined') return new Set(PERMANENTLY_TRASHED_IDS);
  try {
    const raw = localStorage.getItem(DELETED_IDS_KEY);
    const set = new Set<string>(PERMANENTLY_TRASHED_IDS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        parsed.forEach((id: string) => set.add(id));
      }
    }
    return set;
  } catch {
    return new Set(PERMANENTLY_TRASHED_IDS);
  }
}

export function addDeletedCommentId(id: string): void {
  if (typeof window === 'undefined' || !id) return;
  try {
    const set = getDeletedCommentIds();
    set.add(id);
    localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(Array.from(set)));
  } catch (error) {
    console.error('Failed to add deleted comment ID', error);
  }
}

export function syncDeletedIds(ids: Iterable<string>): void {
  if (typeof window === 'undefined') return;
  try {
    const set = getDeletedCommentIds();
    for (const id of ids) {
      if (id) set.add(id);
    }
    localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(Array.from(set)));
  } catch (error) {
    console.error('Failed to sync deleted comment IDs', error);
  }
}

export function loadCommentsFromStorage(): FigmaComment[] {
  if (typeof window === 'undefined') return [];
  try {
    const deletedIds = getDeletedCommentIds();
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Strictly exclude any comment that is deleted or matches initial placeholder
      const sanitized = parsed.filter(
        (c: FigmaComment) => c && c.id && !deletedIds.has(c.id) && c.id !== 'comment-initial-1'
      );
      // Clean up storage immediately if stale comments were present
      if (sanitized.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      }
      return sanitized;
    }
    return [];
  } catch (error) {
    console.error('Failed to load comments from localStorage', error);
    return [];
  }
}

export function saveCommentsToStorage(comments: FigmaComment[]): void {
  if (typeof window === 'undefined') return;
  try {
    const deletedIds = getDeletedCommentIds();
    // Guarantee no deleted comments get saved back
    const sanitized = comments.filter(
      (c) => c && c.id && !deletedIds.has(c.id) && c.id !== 'comment-initial-1'
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
  } catch (error) {
    console.error('Failed to save comments to localStorage', error);
  }
}

/**
 * Permanently removes a comment from the web and archives it into the trash:
 * 1. Blacklists its ID so it can never reappear on the web.
 * 2. Archives into local browser trash storage.
 * 3. Persists to the dedicated file: src/data/trash/comments.json via /api/comments/trash.
 */
export async function moveToTrash(comment: FigmaComment): Promise<void> {
  if (typeof window === 'undefined' || !comment || !comment.id) return;

  const trashedItem: TrashedComment = {
    ...comment,
    deletedAt: new Date().toISOString(),
  };

  // 1. Blacklist ID synchronously so it is never shown again on the web
  addDeletedCommentId(comment.id);

  // 2. Save into browser trash storage
  try {
    const raw = localStorage.getItem(TRASH_STORAGE_KEY);
    const existing: TrashedComment[] = raw ? JSON.parse(raw) : [];
    const updated = [
      trashedItem,
      ...existing.filter((item) => item.id !== comment.id),
    ];
    localStorage.setItem(TRASH_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save to localStorage trash', err);
  }

  // 3. Persist to dedicated file `src/data/trash/comments.json` on disk
  try {
    await fetch('/api/comments/trash', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: trashedItem }),
    });
  } catch (err) {
    console.error('Failed to persist trashed comment to file on disk', err);
  }
}

export function loadTrashFromStorage(): TrashedComment[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(TRASH_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function formatRelativeTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes === 1) return '1m ago';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours === 1) return '1h ago';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Recently';
  }
}
