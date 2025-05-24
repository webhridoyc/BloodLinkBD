
"use client";

import type { ReactNode } from 'react';
import { useAdminRoute } from '@/hooks/useProtectedRoute';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { isAdmin, loading } = useAdminRoute('/login'); // Redirect to login if not admin or not logged in

  if (loading) {
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

  if (!isAdmin) {
    // This case should ideally be handled by the redirect in useAdminRoute
    // For static export, this content might flash briefly if redirect is client-side only.
    return <div className="flex justify-center items-center h-screen">Access Denied. Redirecting...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* AdminSidebar is fixed, so main content needs margin */}
      <AdminSidebar /> 
      <main className="flex-1 p-8 ml-0 md:ml-64"> 
        {/* Add a top margin for mobile view if header is part of admin page. 
            Or, make admin sidebar part of the page flow for mobile.
            For now, assuming AdminSidebar handles its own mobile view or is hidden.
        */}
        {children}
      </main>
    </div>
  );
}
