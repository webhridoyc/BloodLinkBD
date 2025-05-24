
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Donor } from "@/types";
import { UserCircle, Droplet, MapPin, Phone, CalendarDays } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface DonorCardProps {
  donor: Donor;
}

export function DonorCard({ donor }: DonorCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl flex items-center gap-2">
            <UserCircle className="h-6 w-6 text-primary" /> {donor.fullName}
          </CardTitle>
          {donor.available !== undefined && (
            <Badge variant={donor.available ? "default" : "outline"} 
                   className={donor.available ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}>
              {donor.available ? "Available" : "Unavailable"}
            </Badge>
          )}
        </div>
        <CardDescription className="flex items-center gap-1 text-primary">
          <Droplet className="h-4 w-4"/> Blood Group: {donor.bloodGroup}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{donor.location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-4 w-4 text-primary" />
          <span>{donor.contactNumber}</span>
        </div>
        {donor.lastDonated && (
            <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span>Last Donated: {formatDistanceToNow(donor.lastDonated.toDate(), { addSuffix: true })}</span>
            </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <CalendarDays className="h-3 w-3" />
            Registered {formatDistanceToNow(donor.createdAt.toDate(), { addSuffix: true })}
        </div>
      </CardFooter>
    </Card>
  );
}
