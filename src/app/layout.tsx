import '@/styles/global.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HHI Dashboard',
  description: 'HHI Project Management Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}