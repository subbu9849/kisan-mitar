import React from 'react';

/**
 * AppLayout – wraps page content with the premium gradient background
 * and a centered glass‑morphism container.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-emerald-50 to-amber-50 p-6">
      <div className="w-full max-w-4xl rounded-2xl bg-white/15 backdrop-blur-sm p-8 shadow-lg">
        {children}
      </div>
    </div>
  );
}
