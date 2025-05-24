
"use client";

import Link from 'next/link';
import { HeartHandshake, LogIn, LogOut, User, UserPlus, Search, HospitalIcon, Phone, ListChecks, Users, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { href: '/requests', label: 'View Requests', icon: ListChecks },
  { href: '/donors', label: 'Available Donors', icon: Users },
  { href: '/requests/new', label: 'Post Request', icon: PlusCircle, protected: true },
  { href: '/donors/register', label: 'Become a Donor', icon: UserPlus, protected: true },
  { href: '/ai-matcher', label: 'AI Matcher', icon: Search, protected: true },
  { href: '/hospitals', label: 'Hospitals', icon: HospitalIcon },
  { href: '/contact', label: 'Contact Us', icon: Phone },
];

export default function Header() {
  const { user, userProfile, logout, loading, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <HeartHandshake className="h-8 w-8" />
          <span className="text-xl font-bold">BloodLink BD</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navLinks.map((link) => {
            if (link.protected && !user && !loading) return null;
             // Hide protected routes if not logged in (once loading is done)
            if (link.protected && !user && loading) return null; // also hide while loading and no user

            return (
            <Button
              key={link.href}
              variant={pathname === link.href ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link href={link.href} className="flex items-center gap-1">
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            </Button>
          );
        })}
        </nav>

        <div className="flex items-center gap-2">
          {loading ? (
             <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.photoURL || undefined} alt={userProfile?.displayName || user.email || 'User'} />
                    <AvatarFallback>{getInitials(userProfile?.displayName || user.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userProfile?.displayName || user.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                 {isAdmin && (
                  <DropdownMenuItem onClick={() => router.push('/admin/dashboard')}>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Admin Panel</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4" /> Login
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup" className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" /> Sign Up
                </Link>
              </Button>
            </div>
          )}
          {/* Mobile Menu Trigger - can be implemented with Sheet */}
           <div className="md:hidden">
             <Button variant="ghost" size="icon">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
             </Button>
           </div>
        </div>
      </div>
    </header>
  );
}
