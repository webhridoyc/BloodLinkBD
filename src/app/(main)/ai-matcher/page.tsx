
"use client";

import { useState, useEffect } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import type { Donor, BloodRequest, MatchedPair } from '@/types';
// Import the functions library and getFunctions
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useToast } from '@/hooks/use-toast';
import { Search, Zap, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Define the input type locally for the AI matcher payload
interface AiMatcherServiceInput {
  donors: Array<{
    id: string;
    bloodGroup: Donor['bloodGroup'];
    location: string;
    contactNumber: string;
    fcmToken?: string;
  }>;
  requests: Array<{
    id: string;
    bloodGroup: BloodRequest['bloodGroup'];
    location: string;
    contactInformation: string;
    additionalNotes?: string;
  }>;
}


export default function AiMatcherPage() {
  useProtectedRoute(); // Ensures user is logged in
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [matches, setMatches] = useState<MatchedPair[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch active donors
        const donorsQuery = query(collection(db, "donors"), where("available", "==", true));
        const donorsSnapshot = await getDocs(donorsQuery);
        const fetchedDonors = donorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donor));
        setDonors(fetchedDonors);

        // Fetch active requests
        const requestsQuery = query(collection(db, "requests"), where("status", "==", "active"));
        const requestsSnapshot = await getDocs(requestsQuery);
        const fetchedRequests = requestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BloodRequest));
        setRequests(fetchedRequests);
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data for AI matcher:", error);
        toast({ title: "Error", description: "Could not fetch donor/request data.", variant: "destructive" });
      }
      setIsLoading(false);
    };
    fetchData();
  }, [toast]);

  const handleRunMatcher = async () => {
    const functions = getFunctions();
    // Ensure 'matchDonorsAndRequesters' matches your deployed Cloud Function name
    const matchDonorsAndRequestersCallable = httpsCallable(functions, 'matchDonorsAndRequesters');
    
    if (donors.length === 0 || requests.length === 0) {
      toast({ title: "Not enough data", description: "Need active donors and requests to run the matcher.", variant: "default" });
      return;
    }
    setIsLoading(true);
    setMatches([]);
    try {
      const aiInput: AiMatcherServiceInput = {
        donors: donors.map(d => ({
          id: d.id!,
          bloodGroup: d.bloodGroup,
          location: d.location,
          contactNumber: d.contactNumber,
          fcmToken: d.fcmToken || undefined
        })),
        requests: requests.map(r => ({
          id: r.id!,
          bloodGroup: r.bloodGroup,
          location: r.location,
          contactInformation: r.contactInformation,
          additionalNotes: r.additionalNotes || undefined,
        })),
      };
      
      const result = await matchDonorsAndRequestersCallable(aiInput) as { data: MatchedPair[] };
      
      const enrichedMatches = result.data.map(match => {
        const donor = donors.find(d => d.id === match.donorId);
        const request = requests.find(r => r.id === match.requestId);
        return { ...match, donor, request };
      });

      setMatches(enrichedMatches);

      if (result.data.length > 0) {
        toast({ title: "Matching Complete!", description: `${enrichedMatches.length} potential match(es) found.` });
      } else {
        toast({ title: "No Matches Found", description: "The AI could not find any suitable matches with the current data." });
      }

    } catch (error) {
      console.error("Error running AI matcher:", error);
      toast({ title: "AI Matcher Error", description: "An error occurred while trying to find matches.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit mb-3">
            <Search className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">AI Donor Matching Tool</CardTitle>
          <CardDescription>
            Use our intelligent AI to find potential matches between blood donors and active requests.
            <br />
            Currently, there are <strong>{donors.length}</strong> active donors and <strong>{requests.length}</strong> active requests.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={handleRunMatcher} disabled={isLoading || !dataFetched} size="lg">
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
            ) : (
              <Zap className="mr-2 h-5 w-5" />
            )}
            {isLoading ? "Finding Matches..." : "Run AI Matcher"}
          </Button>
          {!dataFetched && isLoading && (
             <p className="text-sm text-muted-foreground mt-4">Fetching latest donor and request data...</p>
          )}
        </CardContent>
      </Card>

      {matches.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Potential Matches</h2>
          {matches.map((match, index) => (
            <Card key={index} className="shadow-lg bg-card">
              <CardHeader>
                <CardTitle className="text-xl">Match Suggestion #{index + 1}</CardTitle>
                <CardDescription><strong className="text-primary">Reason:</strong> {match.reason}</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Donor Details:</h3>
                  {match.donor ? (
                    <ul className="space-y-1 text-sm">
                      <li><strong>Name:</strong> {match.donor.fullName}</li>
                      <li><strong>Blood Group:</strong> <span className="font-bold text-primary">{match.donor.bloodGroup}</span></li>
                      <li><strong>Location:</strong> {match.donor.location}</li>
                      <li><strong>Contact:</strong> {match.donor.contactNumber}</li>
                    </ul>
                  ) : <p className="text-muted-foreground">Donor details not found.</p>}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Request Details:</h3>
                  {match.request ? (
                     <ul className="space-y-1 text-sm">
                      <li><strong>Requester:</strong> {match.request.requesterName || 'N/A'}</li>
                      <li><strong>Patient:</strong> {match.request.patientName || 'N/A'}</li>
                      <li><strong>Blood Group:</strong> <span className="font-bold text-primary">{match.request.bloodGroup}</span></li>
                      <li><strong>Location:</strong> {match.request.location}</li>
                      <li><strong>Contact:</strong> {match.request.contactInformation}</li>
                    </ul>
                  ) : <p className="text-muted-foreground">Request details not found.</p>}
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                <AlertTriangle className="h-4 w-4 mr-1 text-amber-500"/> Please verify details and contact directly. This is an AI suggestion.
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {isLoading && matches.length === 0 && (
         <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Finding Matches...</h2>
           {[...Array(2)].map((_, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-5 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                </div>
                 <div>
                  <Skeleton className="h-5 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                </div>
              </CardContent>
            </Card>
           ))}
         </div>
      )}
    </div>
  );
}
