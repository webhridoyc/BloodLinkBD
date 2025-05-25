
"use client";

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, UserCircle, ShieldCheck, ListChecks, UserPlus } from 'lucide-react'; // Added ListChecks, UserPlus
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user: authUser, userProfile, loading, logout, isAdmin } = useAuth();
  const router = useRouter();

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
    if (email) return email[0].toUpperCase();
    return 'U';
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/'); 
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show a toast notification for logout failure
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-48 mx-auto mb-2" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-12 w-32 mx-auto mt-6" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!authUser) {
    return <p className="text-center py-10">Please log in to view your profile.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-muted/30 p-8 text-center">
          <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-primary/50">
            <AvatarImage src={authUser.photoURL || undefined} alt={userProfile?.displayName || authUser.email || 'User'} />
            <AvatarFallback className="text-3xl">{getInitials(userProfile?.displayName, authUser.email)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl flex items-center justify-center gap-2">
            <UserCircle className="h-8 w-8 text-primary" /> {userProfile?.displayName || 'User Profile'}
          </CardTitle>
          <CardDescription className="text-lg">{authUser.email}</CardDescription>
          {isAdmin && (
            <div className="mt-2 inline-flex items-center gap-1 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
              <ShieldCheck className="h-4 w-4" /> Admin
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">User ID</h3>
            <p className="text-lg">{authUser.uid}</p>
          </div>
          
          <div className="space-y-3 border-t pt-6">
            <h3 className="text-md font-semibold text-foreground mb-1">My Activity</h3>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => router.push('/my-requests')}>
              <ListChecks className="h-4 w-4" />
              My Blood Requests
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => router.push('/donors/register')}>
              <UserPlus className="h-4 w-4" />
              My Donor Profile 
            </Button>
          </div>

          <Button onClick={handleLogout} variant="destructive" className="w-full mt-4">
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
