
"use client";

import type { User as FirebaseUser } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { UserProfile } from '@/types';

interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const firestoreData = userDocSnap.data();
            const profileData: UserProfile = {
              uid: firestoreData.uid,
              email: firestoreData.email ?? undefined,
              displayName: firestoreData.displayName ?? undefined,
              role: firestoreData.role,
            };
            setUserProfile(profileData);
            setIsAdmin(profileData.role === 'admin');
          } else {
            // Create a basic profile if it doesn't exist
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email ?? undefined,
              displayName: firebaseUser.displayName ?? undefined,
              role: 'user', // Default role
            };
            await setDoc(userDocRef, newProfile);
            setUserProfile(newProfile);
            setIsAdmin(false);
          }
        } catch (error: any) {
          console.warn("AuthContext: Failed to fetch or create user profile, possibly offline.", error.message);
          setUserProfile(null);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setUserProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      // State will be cleared by onAuthStateChanged listener
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show a toast to the user if logout fails
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
