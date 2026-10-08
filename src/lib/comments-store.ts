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

// Initial sample comments
export const INITIAL_COMMENTS: FigmaComment[] = [
  {
    id: 'comment-initial-1',
    route: '/',
    relX: 350,
    relY: 180,
    containerWidth: 1440,
    text: 'Platform Revenue Run-Rate is trending up nicely this quarter. Check agent payout ratios.',
    author: CURRENT_USER,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45m ago
  },
];

export function getDeletedCommentIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(DELETED_IDS_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

export function loadCommentsFromStorage(): FigmaComment[] {
  if (typeof window === 'undefined') return [];
  try {
    const deletedIds = getDeletedCommentIds();
    const hasInitialized = localStorage.getItem(HAS_INITIALIZED_KEY);
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!hasInitialized) {
      // First run ever: seed only items that haven't been deleted
      localStorage.setItem(HAS_INITIALIZED_KEY, 'true');
      const filteredInitial = INITIAL_COMMENTS.filter((c) => !deletedIds.has(c.id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredInitial));
      return filteredInitial;
    }

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Strictly exclude any comment that has ever been moved to trash
      return parsed.filter((c: FigmaComment) => c && c.id && !deletedIds.has(c.id));
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
    const sanitized = comments.filter((c) => c && c.id && !deletedIds.has(c.id));
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

  // 1. Blacklist ID so it is never shown again on the web
  try {
    const deletedIds = getDeletedCommentIds();
    deletedIds.add(comment.id);
    localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(Array.from(deletedIds)));
  } catch (err) {
    console.error('Failed to update deleted IDs set', err);
  }

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
