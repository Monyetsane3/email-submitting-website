// /app/actions.ts

// CRUCIAL: This directive tells Next.js these functions should only run on the server.
"use server"; 

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { App } from 'firebase-admin/app';

// --- Initialization Logic (Robust, Memoized, Single Key) ---

let adminApp: App | null = null;
let adminDb: Firestore | null = null;

// Function to initialize the Firebase Admin SDK only once
function getAdminDb(): Firestore {
    if (adminDb) {
        return adminDb;
    }

    // 1. Get the single, large JSON string from the environment variable
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountJson) {
        console.error("FATAL: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. - actions.ts:25");
        throw new Error("Missing Firebase Admin credentials.");
    }

    // 2. Parse the JSON string into the credentials object
    let serviceAccount;
    try {
        serviceAccount = JSON.parse(serviceAccountJson);
    } catch (e) {
        console.error("FATAL: Error parsing FIREBASE_SERVICE_ACCOUNT_KEY JSON: - actions.ts:34", e);
        throw new Error("Invalid Firebase Admin service account key format.");
    }
    
    // 3. Initialize the app if it hasn't been already
    if (!getApps().length) {
        adminApp = initializeApp({
            credential: cert(serviceAccount), // Use the single parsed JSON object
        }, 'adminApp');
    } else {
        // If an app already exists, find and use it (in case Vercel reloads the module)
        adminApp = getApps().find(app => app.name === 'adminApp') || getApps()[0];
    }
    
    // 4. Cache and return the Firestore instance
    adminDb = getFirestore(adminApp);
    return adminDb;
}

// --- Server Action ---

// Define a simple email validation helper
const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

// Define the Server Action function that the client component will call
export async function submitEmailAction(email: string) {
    // 1. Re-validate on the server for security (never trust client input)
    if (!validateEmail(email)) {
        return { success: false, error: "Invalid email format." };
    }

    try {
        const db = getAdminDb(); // Get the securely initialized DB instance
        
        // 2. Use the secure Admin SDK to write to Firestore
        await db.collection("emails").add({
            email,
            timestamp: new Date(),
        });
        return { success: true, error: null };
    } catch (e) {
        console.error("Firestore error in Server Action: - actions.ts:75", e);
        // We catch initialization errors here too
        return { success: false, error: "Error submitting email. Please check configuration." };
    }
}