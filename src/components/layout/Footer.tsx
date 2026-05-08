
"use client";

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) {
    return (
      <footer className="bg-[#0b0b0b] border-t border-white/10 py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>&copy; {new Date().getFullYear()} Hridoy Chondro. All rights reserved.</p>
          <p>
            Designed with <span className="text-[#f5c400]">♥</span> by Hridoy
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-muted/50 border-t border-border py-8 mt-12">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} BloodLink BD. All rights reserved.</p>
        <p className="text-sm mt-1">Connecting donors, saving lives.</p>
      </div>
    </footer>
  );
}
