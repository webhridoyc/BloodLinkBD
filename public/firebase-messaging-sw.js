
// This file needs to be in the public directory

// Scripts for Firebase products are imported from the CDN.
// Ensure these versions are compatible with the Firebase SDK version used in your app.
// Consider using dynamic imports or a bundler for the service worker if more complexity is needed.
try {
    importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
    importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

    // IMPORTANT: Replace this with your actual Firebase project configuration
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY", // Replace with environment variable or secure fetch
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
        measurementId: "YOUR_MEASUREMENT_ID" // Optional
    };

    if (firebase && typeof firebase.initializeApp === 'function') {
        firebase.initializeApp(firebaseConfig);

        if (firebase.messaging && typeof firebase.messaging.isSupported === 'function' && firebase.messaging.isSupported()) {
            const messaging = firebase.messaging();

            messaging.onBackgroundMessage((payload) => {
                console.log('[firebase-messaging-sw.js] Received background message ', payload);

                const notificationTitle = payload.notification?.title || "New Notification";
                const notificationOptions = {
                    body: payload.notification?.body || "You have a new message.",
                    icon: payload.notification?.icon || '/icon-192x192.png', // Ensure you have this icon
                    // data: payload.data // You can pass data from FCM to handle clicks
                };
                
                // @ts-ignore
                self.registration.showNotification(notificationTitle, notificationOptions);
            });
            console.log("Firebase Messaging Service Worker registered successfully.");
        } else {
            console.warn("Firebase Messaging is not supported in this service worker context or by the browser.");
        }
    } else {
        console.error("Firebase SDK not loaded correctly in Service Worker.");
    }

} catch (e) {
    console.error("Error in Firebase Messaging Service Worker", e);
}
