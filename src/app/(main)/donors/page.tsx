
"use client";

import { useState, useEffect, useMemo } from 'react';
import { collection, query, where, orderBy, onSnapshot, DocumentData, QuerySnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Donor, BloodGroup } from '@/types';
import { bloodGroups } from '@/types';
import { DonorCard } from '@/components/DonorCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Users, Search, RotateCcw, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from 'next/image';

export default function ViewDonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bloodGroupFilter, setBloodGroupFilter] = useState<BloodGroup | "all">("all");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    const q = query(collection(db, "donors"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const fetchedDonors: Donor[] = [];
      querySnapshot.forEach((doc) => {
        fetchedDonors.push({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt as Timestamp } as Donor);
      });
      setDonors(fetchedDonors);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching donors:", err);
      setError("Failed to load donor information. Please try again later.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredDonors = useMemo(() => {
    return donors
      .filter(donor => bloodGroupFilter === "all" || donor.bloodGroup === bloodGroupFilter)
      .filter(donor => locationFilter === "" || donor.location.toLowerCase().includes(locationFilter.toLowerCase()));
  }, [donors, bloodGroupFilter, locationFilter]);

  const resetFilters = () => {
    setBloodGroupFilter("all");
    setLocationFilter("");
  }

  return (
    <div className="space-y-8">
      {/* Hero Section with Background Image */}
      <div className="relative text-center space-y-4 py-20 px-4 overflow-hidden rounded-lg shadow-lg" style={{ backgroundImage: "url('https://i.ibb.co/k6VHwdts/fotor-ai-2025052723474.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        {/* Content */}
        <div className="relative z-10 text-white">
        <Users className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold">Registered Blood Donors</h1>
        <p className="">Find available donors. Contact them directly if you need blood.</p>
        </div>
      </div>
      {/* End Hero Section */}

      {/* Removed the separate Image div as it's now part of the hero section background */}
      {/* <div className="my-8">
      </div> */}

      
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-card shadow">
</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-card shadow">
        <div>
          <label htmlFor="bloodGroupFilter" className="block text-sm font-medium mb-1">Blood Group</label>
          <Select value={bloodGroupFilter} onValueChange={(value) => setBloodGroupFilter(value as BloodGroup | "all")}>
            <SelectTrigger id="bloodGroupFilter">
              <SelectValue placeholder="Filter by blood group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Blood Groups</SelectItem>
              {bloodGroups.map(group => (
                <SelectItem key={group} value={group}>{group}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="locationFilter" className="block text-sm font-medium mb-1">Location</label>
           <div className="relative">
            <Input
              id="locationFilter"
              type="text"
              placeholder="Filter by city or area"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
         <div className="md:self-end">
            <Button onClick={resetFilters} variant="outline" className="w-full">
                <RotateCcw className="h-4 w-4 mr-2"/> Reset Filters
            </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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
      ) : error ? (
        <Alert variant="destructive" className="mt-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Loading Donors</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : filteredDonors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map(donor => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      ) : (
         <div className="text-center py-10 bg-card rounded-lg shadow">
          <p className="text-xl text-muted-foreground">No donors match your current filters.</p>
          <p className="mt-2">Try adjusting your search or check back later.</p>
        </div>
      )}
    </div>
  );
}
