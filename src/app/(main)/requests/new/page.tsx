
"use client";

import { useState }
from 'react';
import { useRouter } from 'next/navigation';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BloodRequestForm, type BloodRequestFormInputs } from '@/components/BloodRequestForm';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle } from 'lucide-react';
import type { BloodRequest, BloodGroup, UrgencyLevel } from '@/types';

export default function NewRequestPage() {
  const { user, loading: authLoading } = useProtectedRoute();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: BloodRequestFormInputs) => {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to post a request.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const newRequestData: Omit<BloodRequest, 'id' | 'createdAt'> & { createdAt: any } = { 
        userId: user.uid,
        requesterName: data.requesterName,
        patientName: data.patientName,
        bloodGroup: data.bloodGroup, // Type is already BloodGroup from Zod schema
        urgency: data.urgency, // Type is already UrgencyLevel from Zod schema
        location: data.location,
        contactInformation: data.contactInformation,
        additionalNotes: data.additionalNotes,
        status: 'active',
        createdAt: serverTimestamp(),
      };
      
      await addDoc(collection(db, "requests"), newRequestData);
      
      toast({ title: "Success!", description: "Your blood request has been posted." });
      router.push('/requests'); // Redirect to requests list
    } catch (error) {
      console.error("Error posting request:", error);
      toast({ title: "Error", description: "Failed to post your request. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  
  if(!user && !authLoading) return null; // Protected route handles redirect

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit mb-3">
            <PlusCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Post a Blood Request</CardTitle>
          <CardDescription>Fill in the details below to find a blood donor.</CardDescription>
        </CardHeader>
        <CardContent>
          <BloodRequestForm onSubmit={handleSubmit} isLoading={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
}
