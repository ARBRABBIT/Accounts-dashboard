import type { Metadata } from 'next';
import './globals.css';
import { FloatingNavigation } from '@/components/floating-navigation';

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
      <body className="font-sans antialiased">
        {children}
        <FloatingNavigation />
      </body>
    </html>
  );
}
