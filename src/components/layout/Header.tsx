
"use client";

import Link from 'next/link';
import { HeartHandshake, LogIn, LogOut, User, UserPlus, Search, HospitalIcon, Phone, ListChecks, Users, PlusCircle, Settings, MenuIcon } from 'lucide-react';
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
    if (email) return email[0].toUpperCase();
    return 'U';
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
            if (link.protected && !user && !loading) { // Show nothing if protected, not logged in, and not loading
              return null;
            }
            if (link.protected && !user && loading) { // Optionally show a placeholder or nothing during auth loading
              return <div key={link.href} className="h-8 w-24 bg-muted/50 rounded animate-pulse"></div>; 
            }
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
             <div className="h-10 w-20 bg-muted rounded animate-pulse"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.photoURL || undefined} alt={userProfile?.displayName || user.email || 'User'} />
                    <AvatarFallback>{getInitials(userProfile?.displayName, user.email)}</AvatarFallback>
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
                     <Settings className="mr-2 h-4 w-4" />
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
            <div className="hidden md:flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4" /> Member Login
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup" className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" /> Join Us
                </Link>
              </Button>
            </div>
          )}
          
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs">
                <SheetHeader className="mb-6">
                  <SheetTitle>
                     <Link href="/" className="flex items-center gap-2 text-primary" onClick={() => setMobileMenuOpen(false)}>
                        <HeartHandshake className="h-7 w-7" />
                        <span className="text-lg font-bold">BloodLink BD</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link) => {
                     if (link.protected && !user) {
                        return null; // Don't show protected links if not logged in
                      }
                    return (
                    <Button
                      key={link.href}
                      variant={pathname === link.href ? "secondary" : "ghost"}
                      className="justify-start text-base"
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href={link.href} className="flex items-center gap-2">
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    </Button>
                  );
                  })}
                  <hr className="my-3"/>
                  {user ? (<>
                    {isAdmin && (
                       <Button 
                        variant={pathname.startsWith('/admin') ? "secondary" : "ghost"}
                        className="justify-start text-base" 
                        asChild 
                        onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/admin/dashboard" className="flex items-center gap-2">
                          <Settings className="h-5 w-5" />Admin Panel
                        </Link>
                      </Button>
                    )}
                     <Button 
                        variant={pathname === '/profile' ? "secondary" : "ghost"}
                        className="justify-start text-base" 
                        asChild 
                        onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/profile" className="flex items-center gap-2">
                           <User className="h-5 w-5" />Profile
                        </Link>
                      </Button>
                    <Button 
                        variant="ghost" 
                        className="justify-start text-base text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => { logout(); setMobileMenuOpen(false); }}>
                         <LogOut className="mr-2 h-5 w-5" />
                         Log out
                    </Button>
                  </>) : (
                    <>
                      <Button 
                        variant={pathname === '/login' ? "secondary" : "ghost"}
                        className="justify-start text-base" 
                        asChild 
                        onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/login" className="flex items-center gap-2">
                           <LogIn className="h-5 w-5" />Member Login
                        </Link>
                      </Button>
                      <Button 
                        variant={pathname === '/signup' ? "secondary" : "default"}
                        className="justify-start text-base" 
                        asChild 
                        onClick={() => setMobileMenuOpen(false)}>
                         <Link href="/signup" className="flex items-center gap-2">
                          <UserPlus className="h-5 w-5" />Join Us
                        </Link>
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
