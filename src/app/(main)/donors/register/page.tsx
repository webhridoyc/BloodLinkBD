
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DonorRegistrationForm, type DonorFormInputs } from '@/components/DonorRegistrationForm';
import { db, messaging } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, doc, FieldValue } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Droplet, HeartHandshake, MapPin } from 'lucide-react';
import type { Donor, BloodGroup } from '@/types';
import { getToken } from "firebase/messaging";
import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Added Button import

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "YOUR_VAPID_KEY_HERE_IF_ANY"; // Ensure this is configured

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

  const [titleAnimation, setTitleAnimation] = useState('opacity-0 translate-y-5');
  const [textAnimation, setTextAnimation] = useState('opacity-0 translate-y-5');
  const [buttonAnimation, setButtonAnimation] = useState('opacity-0 scale-90');

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
    if (!authLoading && user) { // Ensure user object is available before checking
      checkExistingDonor();
    } else if (!authLoading && !user) { // If auth is done and no user, no need to check
        setCheckingDonorStatus(false);
    }
  }, [user, authLoading]);

  useEffect(() => {
    // Trigger animations after mount
    const timer1 = setTimeout(() => setTitleAnimation('opacity-100 translate-y-0'), 100);
    const timer2 = setTimeout(() => setTextAnimation('opacity-100 translate-y-0'), 300);
    const timer3 = setTimeout(() => setButtonAnimation('opacity-100 scale-100'), 500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleSubmit = async (data: DonorFormInputs) => {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to register as a donor.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    
    const fcmTokenValue = await requestNotificationPermissionAndGetToken();

    try {
      if (existingDonor && existingDonor.id) {
        // Update existing donor document
        const donorDocRef = doc(db, "donors", existingDonor.id);
        
        const donorUpdatePayload: Partial<Donor> = {
          fullName: data.fullName,
          bloodGroup: data.bloodGroup as BloodGroup,
          location: data.location,
          contactNumber: data.contactNumber,
        };

        if (fcmTokenValue && typeof fcmTokenValue === 'string' && fcmTokenValue.length > 0) {
          donorUpdatePayload.fcmToken = fcmTokenValue;
        } else if (fcmTokenValue === null && existingDonor.fcmToken) {
           // If permission was denied or token couldn't be retrieved, and we want to remove existing token
           // Using FieldValue.delete() requires more careful typing, for now, let's set to undefined
           // which means Firestore will remove the field if merge is false, or keep it if merge is true
           // For explicit removal, one might need to handle this with FieldValue.delete()
           // but ensuring the type is compatible with Partial<Donor>
           donorUpdatePayload.fcmToken = undefined; // Or handle with FieldValue.delete() more carefully
        }
        // If fcmTokenValue is null and there was no existing token, we do nothing to fcmToken in payload

        await updateDoc(donorDocRef, donorUpdatePayload);
        toast({ title: "Success!", description: "Your donor profile has been updated." });
      } else {
        // Add new donor document
        
        type NewDonorFirestoreData = Omit<Donor, 'id' | 'createdAt' | 'fcmToken'> & { 
          createdAt: FieldValue;
          fcmToken?: string; 
        };

        const donorDataForFirestore: NewDonorFirestoreData = {
          fullName: data.fullName,
          bloodGroup: data.bloodGroup as BloodGroup,
          location: data.location,
          contactNumber: data.contactNumber,
          userId: user.uid,
          available: true, 
          createdAt: serverTimestamp(),
        };

        if (fcmTokenValue && typeof fcmTokenValue === 'string' && fcmTokenValue.length > 0) {
          donorDataForFirestore.fcmToken = fcmTokenValue;
        }
        // If fcmTokenValue is null or empty, the fcmToken property will not be added to donorDataForFirestore

        await addDoc(collection(db, "donors"), donorDataForFirestore);
        toast({ title: "Success!", description: "You have been registered as a donor." });
      }
      router.push('/donors'); // Redirect to donors list
    } catch (error) {
      console.error("Error registering/updating donor:", error);
      toast({ title: "Error", description: "Failed to save donor profile. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || checkingDonorStatus) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if(!user && !authLoading) return null; // Protected route handles redirect

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Background Image */}
      <Image
        src="https://placehold.co/1200x800.png" 
        alt="Hopeful scene related to community or health"
        fill
        style={{ objectFit: 'cover' }}
        className="absolute inset-0 z-0 opacity-30"
        data-ai-hint="community health support"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Column: Promotional Text */}
        <div className="text-center md:text-left space-y-6 text-white">
          <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight transition-all duration-700 ease-out ${titleAnimation}`}>
            <Droplet className="inline-block h-10 w-10 md:h-14 md:h-14 mb-2 text-red-400" /> BECOME A
            <span className="block text-red-400">BLOOD DONOR</span>
          </h1>
          <p className={`text-lg md:text-xl text-gray-200 transition-all duration-700 ease-out delay-200 ${textAnimation}`}>
            Your decision to donate blood can save lives. Join our community of heroes today and make a tangible difference. Every drop counts.
          </p>
          <div className={`pt-4 transition-all duration-700 ease-out delay-300 ${buttonAnimation}`}>
             <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-destructive text-lg px-8 py-6"
                onClick={() => {
                    const formElement = document.getElementById('donor-registration-form');
                    formElement?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                <UserPlus className="mr-2 h-5 w-5" /> Register as a Donor
            </Button>
          </div>
          <div className={`flex items-center justify-center md:justify-start space-x-4 pt-6 transition-all duration-700 ease-out delay-500 ${textAnimation}`}>
            <div className="flex items-center">
              <HeartHandshake className="h-6 w-6 mr-2 text-red-400" />
              <span className="font-medium">Save Lives</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-red-400" />
              <span className="font-medium">Local Impact</span>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div id="donor-registration-form" className="w-full">
          <Card className="shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 dark:bg-primary/20 p-3 rounded-full w-fit mb-3">
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100">
                {existingDonor ? "Update Your Donor Profile" : "Donor Registration"}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                {existingDonor 
                  ? "Keep your information current to help those in need." 
                  : "Fill in your details to join our life-saving community."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DonorRegistrationForm
                onSubmit={handleSubmit}
                isLoading={isSubmitting}
                defaultValues={existingDonor ? {
                    fullName: existingDonor.fullName,
                    bloodGroup: existingDonor.bloodGroup,
                    location: existingDonor.location,
                    contactNumber: existingDonor.contactNumber,
                } : {}}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    