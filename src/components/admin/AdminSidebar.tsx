
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListChecks, Users, Send, Settings, HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const adminNavLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { href: '/admin/requests', label: 'Manage Requests', icon: ListChecks },
  { href: '/admin/donors', label: 'Manage Donors', icon: Users },
  { href: '/admin/notifications', label: 'Send Notifications', icon: Send },
  // Add more admin links if needed, e.g., Settings
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground p-4 space-y-6 border-r border-sidebar-border h-full fixed top-0 left-0 pt-16 md:pt-4">
      <div className="text-center mb-8 hidden md:block">
        <Link href="/admin/dashboard" className="flex items-center justify-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <HeartHandshake className="h-8 w-8" />
          <span className="text-xl font-bold">Admin Panel</span>
        </Link>
      </div>
      <nav className="space-y-2">
        {adminNavLinks.map((link) => (
          <Button
            key={link.href}
            variant={pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/admin/dashboard') ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            asChild
          >
            <Link href={link.href} className="flex items-center gap-3">
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          </Button>
        ))}
      </nav>
       <div className="pt-4 mt-auto border-t border-sidebar-border">
         <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/" className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
                Back to Main Site
            </Link>
         </Button>
       </div>
    </aside>
  );
}
