
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BloodRequest } from "@/types";
import { Droplet, MapPin, AlertTriangle, UserCircle, CalendarDays, Phone } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface BloodRequestCardProps {
  request: BloodRequest;
  onDelete?: (id: string) => void;
  showDeleteButton?: boolean;
}

export function BloodRequestCard({ request, onDelete, showDeleteButton = false }: BloodRequestCardProps) {
  const getUrgencyVariant = (urgency: BloodRequest['urgency']) => {
    switch (urgency) {
      case 'Urgent': return 'destructive';
      case 'Moderate': return 'default'; // Yellowish - might need custom variant or use secondary
      case 'Low': return 'outline'; // Greenish - might need custom variant
      default: return 'secondary';
    }
  };
   const getUrgencyClasses = (urgency: BloodRequest['urgency']) => {
    switch (urgency) {
      case 'Urgent': return 'border-red-500 bg-red-100 text-red-700';
      case 'Moderate': return 'border-yellow-500 bg-yellow-100 text-yellow-700';
      case 'Low': return 'border-green-500 bg-green-100 text-green-700';
      default: return 'border-gray-300 bg-gray-100 text-gray-700';
    }
  };


  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Droplet className="h-6 w-6 text-primary" /> Need {request.bloodGroup}
          </CardTitle>
          <Badge variant="outline" className={getUrgencyClasses(request.urgency) + " whitespace-nowrap"}>
            <AlertTriangle className="h-3 w-3 mr-1"/> {request.urgency}
          </Badge>
        </div>
        {request.patientName && <CardDescription>For: {request.patientName}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{request.location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-4 w-4 text-primary" />
          <span>{request.contactInformation}</span>
        </div>
        {request.requesterName && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <UserCircle className="h-4 w-4 text-primary" />
            <span>Requested by: {request.requesterName}</span>
          </div>
        )}
        {request.additionalNotes && (
          <p className="text-muted-foreground pt-2 border-t border-border mt-2">
            <strong>Notes:</strong> {request.additionalNotes}
          </p>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground justify-between items-center">
        <div className="flex items-center gap-1">
          <CalendarDays className="h-3 w-3" />
          Posted {formatDistanceToNow(request.createdAt.toDate(), { addSuffix: true })}
        </div>
        {showDeleteButton && onDelete && request.id && (
          <button 
            onClick={() => onDelete(request.id!)} 
            className="text-red-500 hover:text-red-700 font-semibold"
            aria-label="Delete request"
          >
            Delete
          </button>
        )}
      </CardFooter>
    </Card>
  );
}
