
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DonorRegistrationForm, type DonorFormInputs } from '@/components/DonorRegistrationForm';
import { db, messaging } from '@/lib/firebase'; // Assuming messaging is exported from firebase.ts
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';
import type { Donor } from '@/types';
import { getToken, onMessage } from "firebase/messaging";

// Ensure VAPID key is set up in your Firebase project for web push notifications
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "YOUR_VAPID_KEY_HERE_IF_ANY";


async function requestNotificationPermissionAndGetToken(): Promise<string | null> {
  if (typeof window !== 'undefined' && 'Notification' in window && messaging) {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
        if (currentToken) {
          console.log('FCM Token:', currentToken);
          return currentToken;
        } else {
          console.log('No registration token available. Request permission to generate one.');
          return null;
        }
      } else {
        console.log('Unable to get permission to notify.');
        return null;
      }
    } catch (error) {
      console.error('An error occurred while trying to get FCM token:', error);
      return null;
    }
  }
  return null;
}


export default function RegisterDonorPage() {
  const { user, loading: authLoading } = useProtectedRoute();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingDonor, setExistingDonor] = useState<Donor | null>(null);
  const [checkingDonorStatus, setCheckingDonorStatus] = useState(true);

  useEffect(() => {
    const checkExistingDonor = async () => {
      if (user) {
        setCheckingDonorStatus(true);
        const donorQuery = query(collection(db, "donors"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(donorQuery);
        if (!querySnapshot.empty) {
          const donorData = querySnapshot.docs[0].data() as Donor;
          setExistingDonor({ ...donorData, id: querySnapshot.docs[0].id });
        }
        setCheckingDonorStatus(false);
      }
    };
    if (!authLoading) {
      checkExistingDonor();
    }
  }, [user, authLoading]);

  const handleSubmit = async (data: DonorFormInputs) => {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to register as a donor.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    
    const fcmToken = await requestNotificationPermissionAndGetToken(); // fcmToken can be string | null

    try {
      if (existingDonor && existingDonor.id) {
        // Update existing donor document
        const donorDocRef = doc(db, "donors", existingDonor.id);
        await updateDoc(donorDocRef, {
          ...data,
          // Use new fcmToken if available, otherwise keep existing, otherwise undefined
          fcmToken: fcmToken || existingDonor.fcmToken || undefined, 
        });
        toast({ title: "Success!", description: "Your donor profile has been updated." });
      } else {
        // Add new donor document
        const newDonor: Omit<Donor, 'id' | 'createdAt'> & { createdAt: any } = {
          ...data,
          userId: user.uid, 
          fcmToken: fcmToken || undefined, // Ensures undefined if fcmToken is null
          available: true, // Default to available
          createdAt: serverTimestamp(),
        };
        await addDoc(collection(db, "donors"), newDonor);
        toast({ title: "Success!", description: "You have been registered as a donor." });
      }
      router.push('/donors'); // Redirect to donors list
    } catch (error) {
      console.error("Error registering donor:", error);
      toast({ title: "Error", description: "Failed to register. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || checkingDonorStatus) {
    return <div className="text-center py-10">Loading...</div>;
  }
  
  if(!user && !authLoading) return null; // Protected route handles redirect

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit mb-3">
            <UserPlus className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">{existingDonor ? "Update Donor Profile" : "Register as a Blood Donor"}</CardTitle>
          <CardDescription>
            {existingDonor 
              ? "Update your information to help us connect you with those in need."
              : "Join our community of heroes. Your contribution can save a life."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DonorRegistrationForm 
            onSubmit={handleSubmit} 
            isLoading={isSubmitting}
            defaultValues={existingDonor || {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}
