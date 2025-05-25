
"use client";

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import { useAdminRoute } from '@/hooks/useProtectedRoute';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { isAdmin, loading: authLoading } = useAdminRoute('/login'); // Redirect to login if not admin or not logged in
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after initial mount
    setIsClient(true);
  }, []);

  if (authLoading || !isClient) { // Wait for auth state to load AND client to be ready
    return (
      <div className="flex h-screen">
        <div className="w-64 bg-muted p-4 border-r">
          <Skeleton className="h-8 w-3/4 mb-8" />
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-full mb-2" />
        </div>
        <main className="flex-1 p-8">
          <Skeleton className="h-12 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full" />
        </main>
      </div>
    );
  }

  // At this point, authLoading is false and isClient is true.
  // The useAdminRoute hook's useEffect will handle redirection if !isAdmin or !user.
  if (!isAdmin) {
    // This content might flash briefly if a redirect is occurring.
    // Or if the user somehow bypasses the redirect but is still not an admin.
    // useAdminRoute should have already initiated a redirect if necessary.
    return <div className="flex justify-center items-center h-screen">Access Denied. Redirecting...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar /> 
      <main className="flex-1 p-8 ml-0 md:ml-64"> 
        {children}
      </main>
    </div>
  );
}
