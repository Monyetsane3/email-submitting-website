// /app/actions.ts

// CRUCIAL: This directive tells Next.js these functions should only run on the server.
"use server"; 

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Define a simple email validation helper
const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

// Initialize Firebase Admin SDK using your secret environment variables
if (!getApps().length) {
  // We use process.env to read the secrets from your .env.local file
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // We replace the escaped newlines (\n) so the private key is read correctly
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}
const adminDb = getFirestore(); // This is the secure, server-side database instance

// Define the Server Action function that the client component will call
export async function submitEmailAction(email: string) {
    // 1. Re-validate on the server for security (never trust client input)
    if (!validateEmail(email)) {
        return { success: false, error: "Invalid email format." };
    }

    try {
        // 2. Use the secure Admin SDK to write to Firestore
        await adminDb.collection("emails").add({
            email,
            timestamp: new Date(),
        });
        return { success: true, error: null };
    } catch (e) {
        console.error("Firestore error: - actions.ts:41", e);
        return { success: false, error: "Error submitting email. Please try again." };
    }
}