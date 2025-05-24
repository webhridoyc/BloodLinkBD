
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getMessaging, Messaging } from "firebase/messaging";
import { getAnalytics, Analytics } from "firebase/analytics"; // Added Analytics

// User-provided Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCka25-yNdJUDCpdi7D-dDyFVDiBdaIY4Q",
  authDomain: "bloodshare-bd.firebaseapp.com",
  projectId: "bloodshare-bd",
  storageBucket: "bloodshare-bd.firebasestorage.app", // Corrected based on user input
  messagingSenderId: "947897978001",
  appId: "1:947897978001:web:c758936d1c709cb0ff0330",
  measurementId: "G-8L31M1VK1V"
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
