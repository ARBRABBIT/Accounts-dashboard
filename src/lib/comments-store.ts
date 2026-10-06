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

export const CURRENT_USER: CommentAuthor = {
  id: 'user-1',
  name: 'Bhargav Adepu',
  role: 'Product Lead',
  avatar: '/assets/avatar.png',
  initials: 'BA',
  color: '#2780C4',
};

export const STORAGE_KEY = 'glc_figma_comments_v1';

// Initial sample comments so user sees working comments immediately
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

export function loadCommentsFromStorage(): FigmaComment[] {
  if (typeof window === 'undefined') return INITIAL_COMMENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Initialize with sample on first load
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMMENTS));
      return INITIAL_COMMENTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_COMMENTS;
  } catch (error) {
    console.error('Failed to load comments from localStorage', error);
    return INITIAL_COMMENTS;
  }
}

export function saveCommentsToStorage(comments: FigmaComment[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  } catch (error) {
    console.error('Failed to save comments to localStorage', error);
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

