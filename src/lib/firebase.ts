
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getMessaging, type Messaging } from "firebase/messaging";
import { getAnalytics, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// IMPORTANT: Replace with your actual Firebase project configuration values.
// The projectId below MUST match the one in your .firebaserc file.
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY", // Replace with your real API Key
  authDomain: "bloodlink-bd.firebaseapp.com", // Ensure 'bloodlink-bd' is your correct projectId
  projectId: "bloodlink-bd", // Ensure this is your correct projectId
  storageBucket: "bloodlink-bd.appspot.com", // Ensure 'bloodlink-bd' is your correct projectId
  messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID", // Replace with your real Messaging Sender ID
  appId: "YOUR_ACTUAL_APP_ID", // Replace with your real App ID
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
