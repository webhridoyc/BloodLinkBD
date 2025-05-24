
"use client";

import { useState, useEffect, useMemo } from 'react';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc, DocumentData, QuerySnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import type { BloodRequest } from '@/types';
import { BloodRequestCard } from '@/components/BloodRequestCard';
import { Button } from '@/components/ui/button';
import { ListFilter, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from '@/components/ui/skeleton';

export default function MyRequestsPage() {
  const { user, loading: authLoading } = useProtectedRoute();
  const [myRequests, setMyRequests] = useState<BloodRequest[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setLoadingData(true);
      const q = query(
        collection(db, "requests"), 
        where("userId", "==", user.uid), 
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
        const fetchedRequests: BloodRequest[] = [];
        querySnapshot.forEach((doc) => {
          fetchedRequests.push({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt as Timestamp } as BloodRequest);
        });
        setMyRequests(fetchedRequests);
        setLoadingData(false);
      }, (error) => {
        console.error("Error fetching my requests:", error);
        toast({ title: "Error", description: "Could not fetch your requests.", variant: "destructive"});
        setLoadingData(false);
      });

      return () => unsubscribe();
    } else if (!authLoading) {
      // If not logged in and auth is done loading, clear requests and stop data loading.
      // Protected route should redirect, but this is a safeguard.
      setMyRequests([]);
      setLoadingData(false);
    }
  }, [user, authLoading, toast]);

  const handleDeleteRequest = async (requestId: string) => {
    try {
      await deleteDoc(doc(db, "requests", requestId));
      toast({ title: "Success", description: "Request deleted successfully." });
    } catch (error) {
      console.error("Error deleting request:", error);
      toast({ title: "Error", description: "Failed to delete request.", variant: "destructive" });
    }
  };

  if (authLoading || (loadingData && user)) {
     return (
      <div className="space-y-8">
        <div className="text-center">
          <ListFilter className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold">My Blood Requests</h1>
          <p className="text-muted-foreground mt-2">View and manage your posted blood requests.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="shadow-lg">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-1/3" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  if(!user && !authLoading) return null; // Should be redirected by useProtectedRoute

  return (
    <div className="space-y-8">
      <div className="text-center">
        <ListFilter className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold">My Blood Requests</h1>
        <p className="text-muted-foreground mt-2">View and manage your posted blood requests.</p>
      </div>

      {myRequests.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myRequests.map(request => (
            <div key={request.id} className="relative group">
              <BloodRequestCard request={request} />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Delete request"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your blood request.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteRequest(request.id!)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-card rounded-lg shadow">
          <p className="text-xl text-muted-foreground">You haven&apos;t posted any blood requests yet.</p>
          <Button asChild className="mt-4">
            <a href="/requests/new">Post a Request</a>
          </Button>
        </div>
      )}
    </div>
  );
}
