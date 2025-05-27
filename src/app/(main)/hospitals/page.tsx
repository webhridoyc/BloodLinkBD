
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import type { Hospital } from "@/types";
import { HospitalIcon, MapPin, Phone } from "lucide-react";

const hospitalsData: Hospital[] = [
  { id: "1", name: "Dhaka Medical College Hospital", address: "Dhaka", contact: "02-55165001-6", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "hospital building" },
  { id: "2", name: "Bangabandhu Sheikh Mujib Medical University (BSMMU)", address: "Shahbag, Dhaka", contact: "+880-2-9661051-56", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "modern hospital" },
  { id: "3", name: "Square Hospitals Ltd.", address: "Panthapath, Dhaka", contact: "10616", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "hospital exterior" },
  { id: "4", name: "United Hospital Limited", address: "Gulshan, Dhaka", contact: "10666", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "clinic building" },
  { id: "5", name: "Apollo Hospitals Dhaka (Evercare)", address: "Bashundhara R/A, Dhaka", contact: "10678", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "health center" },
  { id: "6", name: "Chittagong Medical College Hospital", address: "Chittagong", contact: "031-630952", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "medical facility" },
  { id: "7", name: "Rajshahi Medical College Hospital", address: "Rajshahi", contact: "0721-772150", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "regional hospital" },
  { id: "8", name: "Sylhet MAG Osmani Medical College Hospital", address: "Sylhet", contact: "0821-716855", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "city hospital" },
];

export default function HospitalsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <HospitalIcon className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold">Major Hospitals in Bangladesh</h1>
        <p className="text-muted-foreground mt-2">
          A list of some major hospitals. Please verify details before visiting.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitalsData.map((hospital) => (
          <Card key={hospital.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="relative h-56 w-full">
              <Image
                src={hospital.imageUrl}
                alt={hospital.name}
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint={hospital.dataAiHint || "hospital exterior"}
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{hospital.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{hospital.address}</span>
              </div>
              {hospital.contact && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>Contact: {hospital.contact}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
