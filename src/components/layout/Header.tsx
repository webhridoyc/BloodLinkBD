
"use client";

import Link from 'next/link';
import { HeartHandshake, LogIn, LogOut, User, UserPlus, Search, HospitalIcon, Phone, ListChecks, Users, PlusCircle, Settings, Menu as MenuIcon } from 'lucide-react';
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
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    // Call handler right away so state is correct on initial render
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getInitials = (name?: string | null, email?: string | null): string => {
    if (name) return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
    if (email) return email[0].toUpperCase();
    return 'U';
  };

  return (
    <header className={cn(
      "bg-card border-border sticky top-0 z-50 transition-all duration-300 ease-in-out",
      scrolled ? "shadow-md border-b" : "shadow-sm"
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <HeartHandshake className="h-8 w-8" />
          <span className="text-xl font-bold">BloodLink BD</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            if (link.protected && !user && !loading) {
              return null;
            }
            if (link.protected && !user && loading) {
              return <div key={link.href} className="h-8 w-24 bg-muted/50 rounded animate-pulse mx-1"></div>;
            }
            return (
            <Button
              key={link.href}
              variant={pathname === link.href ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link href={link.href} className="flex items-center gap-1 px-2 lg:px-3">
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            </Button>
          );
        })}
        </nav>

        <div className="flex items-center gap-2">
          {loading ? (
             <div className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border border-primary/30">
                    <AvatarImage src={user.photoURL || undefined} alt={userProfile?.displayName || user.email || 'User'} />
                    <AvatarFallback>{getInitials(userProfile?.displayName, user.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userProfile?.displayName || "Member"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
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
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4" /> Membership Login
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup" className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" /> Membership Signup
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
              <SheetContent side="right" className="w-full max-w-xs p-6 bg-card">
                <SheetHeader className="mb-6 pb-4 border-b">
                  <SheetTitle>
                     <Link href="/" className="flex items-center gap-2 text-primary" onClick={() => setMobileMenuOpen(false)}>
                        <HeartHandshake className="h-7 w-7" />
                        <span className="text-lg font-bold">BloodLink BD</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => {
                     if (link.protected && !user && !loading) { // Simplified condition
                        return null; 
                      }
                      if (link.protected && !user && loading) { // Skeleton for protected links while auth is loading
                        return <div key={`mobile-skeleton-${link.href}`} className="h-10 w-full bg-muted/50 rounded animate-pulse"></div>;
                      }
                    return (
                    <Button
                      key={`mobile-${link.href}`}
                      variant={pathname === link.href ? "secondary" : "ghost"}
                      className="w-full justify-start text-base py-3"
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href={link.href} className="flex items-center gap-3">
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    </Button>
                  );
                  })}
                  <hr className="my-3 border-border"/>
                  {loading ? (
                    <>
                      <div className="h-10 w-full bg-muted/50 rounded animate-pulse"></div>
                      <div className="h-10 w-full bg-muted/50 rounded animate-pulse mt-2"></div>
                    </>
                  ) : user ? (<>
                     <Button 
                        variant={pathname === '/profile' ? "secondary" : "ghost"}
                        className="w-full justify-start text-base py-3" 
                        asChild 
                        onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/profile" className="flex items-center gap-3">
                           <User className="h-5 w-5" />My Profile
                        </Link>
                      </Button>
                    {isAdmin && (
                       <Button 
                        variant={pathname.startsWith('/admin') ? "secondary" : "ghost"}
                        className="w-full justify-start text-base py-3" 
                        asChild 
                        onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/admin/dashboard" className="flex items-center gap-3">
                          <Settings className="h-5 w-5" />Admin Panel
                        </Link>
                      </Button>
                    )}
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start text-base py-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => { logout(); setMobileMenuOpen(false); }}>
                         <LogOut className="mr-2 h-5 w-5" />
                         Log Out
                    </Button>
                  </>) : (
                    <>
                      <Button 
                        variant={pathname === '/login' ? "secondary" : "ghost"}
                        className="w-full justify-start text-base py-3" 
                        asChild 
                        onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/login" className="flex items-center gap-3">
                           <LogIn className="h-5 w-5" />Membership Login
                        </Link>
                      </Button>
                      <Button 
                        variant={pathname === '/signup' ? "secondary" : "default"}
                        className="w-full justify-start text-base py-3" 
                        asChild 
                        onClick={() => setMobileMenuOpen(false)}>
                         <Link href="/signup" className="flex items-center gap-3">
                          <UserPlus className="h-5 w-5" />Membership Signup
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
