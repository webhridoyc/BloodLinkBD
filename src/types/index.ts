
import type { Timestamp } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email?: string;
  displayName?: string;
  role?: 'user' | 'admin';
}

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
export type BloodGroup = typeof bloodGroups[number];

export const urgencyLevels = ["Urgent", "Moderate", "Low"] as const;
export type UrgencyLevel = typeof urgencyLevels[number];

export interface BloodRequest {
  id?: string; // Firestore document ID
  userId: string; // UID of the user who posted the request
  requesterName?: string;
  patientName?: string;
  bloodGroup: BloodGroup;
  location: string; // Hospital/Location
  contactInformation: string;
  additionalNotes?: string;
  urgency: UrgencyLevel;
  createdAt: Timestamp;
  status: 'active' | 'fulfilled' | 'pending';
}

export interface Donor {
  id?: string; // Firestore document ID
  userId: string; // UID of the registered donor
  fullName: string;
  bloodGroup: BloodGroup;
  location: string; // City/Area
  contactNumber: string;
  fcmToken?: string;
  available?: boolean; // To mark availability status
  lastDonated?: Timestamp;
  createdAt: Timestamp;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  contact?: string;
  imageUrl: string;
  dataAiHint?: string;
}

export interface MatchedPair {
  donorId: string;
  requestId: string;
  reason: string;
  donor?: Donor;
  request?: BloodRequest;
}
