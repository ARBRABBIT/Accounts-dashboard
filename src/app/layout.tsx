import type { Metadata } from 'next';
import './globals.css';
import { FloatingNavigation } from '@/components/floating-navigation';
import { CommentProvider } from '@/components/comments/comment-context';
import { CommentOverlay } from '@/components/comments/comment-overlay';

export const metadata: Metadata = {
  title: 'GLC · Accounts Dashboard',
  description: 'Accounts dashboard and shared GLC design system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased relative min-h-screen">
        <CommentProvider>
          {children}
          <CommentOverlay />
          <FloatingNavigation />
        </CommentProvider>
      </body>
    </html>
  );
}
