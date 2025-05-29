
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getMessaging, type Messaging } from "firebase/messaging";
import { getAnalytics, type Analytics } from "firebase/analytics";import { getDatabase, type Database } from "firebase/database";

// Your web app's Firebase configuration
// IMPORTANT: Ensure these values match your active Firebase project.
// The projectId below MUST match the one in your .firebaserc file.
const firebaseConfig = {
  apiKey: "AIzaSyBqrryEoQvKBSOOdp2rdkX7UJsRcMfWf0M",
  authDomain: "bloodlink-bd.firebaseapp.com",
  projectId: "bloodlink-bd", // This MUST match the project ID in .firebaserc
  storageBucket: "bloodlink-bd.firebasestorage.app", // Corrected from firebasestorage.app
  messagingSenderId: "290377663920",
  appId: "1:290377663920:web:e84b28e4a922ada8c04275",
  // measurementId is optional
};

let app: FirebaseApp;
let auth: Auth;
let rtdb: Database; // Realtime Database instance
let db: Firestore;
let messaging: Messaging | undefined;
let analytics: Analytics | undefined;

// Initialize Firebase on the client side
if (typeof window !== "undefined") {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  auth = getAuth(app);
  rtdb = getDatabase(app); // Initialize Realtime Database
  db = getFirestore(app);

  try {
    messaging = getMessaging(app);
  } catch (error: any) {
    console.warn("Firebase Messaging is not supported in this environment.", error.message);
    messaging = undefined;
  }

  try {
    analytics = getAnalytics(app);
  } catch (error: any) {
    console.warn("Firebase Analytics is not supported in this environment.", error.message);
    analytics = undefined;
  }
}

// @ts-ignore - These might be uninitialized on the server, which is expected for client SDKs.
export { app, auth, rtdb, db, messaging, analytics };

