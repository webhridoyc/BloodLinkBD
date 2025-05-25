
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getMessaging, type Messaging } from "firebase/messaging";
import { getAnalytics, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// IMPORTANT: Make sure the projectId below matches the one in your .firebaserc file
const firebaseConfig = {
  apiKey: "AIzaSyBqrryEoQvKBSOOdp2rdkX7UJsRcMfWf0M", // Keep your actual API key
  authDomain: "bloodlink-bd.firebaseapp.com", // Adjust if your authDomain changed with project ID
  projectId: "YOUR_CORRECT_PROJECT_ID_HERE", // Replace with your actual project ID
  storageBucket: "bloodlink-bd.firebasestorage.app", // Adjust if your storageBucket changed
  messagingSenderId: "290377663920", // Keep your actual messagingSenderId
  appId: "1:290377663920:web:e84b28e4a922ada8c04275" // Keep your actual appId
  // measurementId is optional
};

let app: FirebaseApp;
let auth: Auth;
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
  db = getFirestore(app);

  try {
    messaging = getMessaging(app);
  } catch (error) {
    console.warn("Firebase Messaging is not supported in this environment.", error);
    messaging = undefined;
  }

  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn("Firebase Analytics is not supported in this environment.", error);
    analytics = undefined;
  }
}

// @ts-ignore - These might be uninitialized on the server, which is expected for client SDKs.
export { app, auth, db, messaging, analytics };
