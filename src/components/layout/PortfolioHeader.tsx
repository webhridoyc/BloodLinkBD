"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu as MenuIcon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const portfolioLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function PortfolioHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#0b0b0b]/95 border-b border-white/10 sticky top-0 z-50 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between text-white">
        <Link href="#home" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5c400] text-base font-bold text-black">
            HC
          </span>
          <span className="text-base font-semibold tracking-wide">Hridoy Chondro</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm text-white/80">
          {portfolioLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-[#f5c400]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-[#f5c400] transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5" />
          </button>

          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-[#f5c400] hover:bg-white/10">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs p-6 bg-[#0b0b0b] text-white">
                <SheetHeader className="mb-6 pb-4 border-b border-white/10">
                  <SheetTitle>
                    <Link href="#home" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5c400] text-base font-bold text-black">
                        HC
                      </span>
                      <span className="text-base font-semibold tracking-wide">Hridoy Chondro</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-2">
                  {portfolioLinks.map((link) => (
                    <Button
                      key={link.href}
                      variant="ghost"
                      className="w-full justify-start text-base py-3 text-white/80 hover:text-[#f5c400] hover:bg-white/10"
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
