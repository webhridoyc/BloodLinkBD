
"use client";

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, UserCircle, ShieldCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { user: authUser, userProfile, loading, logout } = useProtectedRoute();

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-48 mx-auto mb-2" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-12 w-32 mx-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!authUser || !userProfile) {
    // This should ideally not be reached due to useProtectedRoute,
    // but as a fallback:
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-muted/30 p-8 text-center">
          <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-primary/50">
            <AvatarImage src={authUser.photoURL || undefined} alt={userProfile.displayName || 'User'} />
            <AvatarFallback className="text-3xl">{getInitials(userProfile.displayName || authUser.email)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl flex items-center justify-center gap-2">
            <UserCircle className="h-8 w-8 text-primary" /> {userProfile.displayName || 'User Profile'}
          </CardTitle>
          <CardDescription className="text-lg">{authUser.email}</CardDescription>
          {userProfile.role === 'admin' && (
            <div className="mt-2 inline-flex items-center gap-1 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">
              <ShieldCheck className="h-4 w-4" /> Admin
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">User ID</h3>
            <p className="text-lg">{authUser.uid}</p>
          </div>
          {/* Add more profile details here as needed */}
          {/* For example, link to "My Requests" or "Donor Profile" if applicable */}

          <Button onClick={logout} variant="destructive" className="w-full mt-6">
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
