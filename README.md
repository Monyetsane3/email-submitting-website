Email Submitting Website (Dog Treat Giver)

This is a simple Next.js web application built just for fun. It collects user emails and, in exchange, gives a cute animated dog a well-deserved treat. All submissions are handled securely on the server side using Firebase Firestore.

Tech Stack & Project Overview

This is a modern full-stack application built for security and performance:

Frontend Framework: Next.js (React)

Backend Logic: Next.js Server Actions (our secure API layer)

Styling: Tailwind CSS (for speed) and custom CSS for the cute dog animations.

Database: Firebase Firestore (NoSQL, for simple, scalable data storage)

Security Layer: Firebase Admin SDK (used exclusively server-side to prevent client-side key exposure)

Language: TypeScript

Deployment: Vercel (for Next.js hosting) and Firebase (for data management).

Getting Started Locally

Ready to spin this up on your machine? Follow these simple steps.

1. Grab the Code

Clone the repo from GitHub and jump into the directory:

git clone [https://github.com/Monyetsane3/email-submitting-website.git](https://github.com/Monyetsane3/email-submitting-website.git)
cd email-submitting-website


2. Install Dependencies

You'll need all the project packages, including the Firebase Admin SDK for our server-side security:

npm install


3. Firebase & Security Setup (Crucial!)

We use Next.js Server Actions and the Firebase Admin SDK to ensure our database writes are 100% server-side and secure. No sensitive credentials touch the client.

Create a Project in the Firebase Console.

Generate Service Account Key: Head to Project settings -> Service accounts. Click "Generate new private key" and download the JSON file. This is your powerful server key.

Secure Environment Variable: Create a file named .env.local in the project root. We need the entire contents of that downloaded JSON file saved as a single environment variable, which the Server Action will read.

# IMPORTANT: This must be the full, unedited JSON content from your downloaded key file.
FIREBASE_SERVICE_ACCOUNT_KEY='{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----...\\n...-----END PRIVATE KEY-----\\n",
  "client_email": "...",
  "client_id": "...",
  "auth_uri": "...",
  "token_uri": "...",
  "auth_provider_x509_cert_url": "...",
  "client_x509_cert_url": "..."
}'

# The Next.js Server Action in /app/actions.ts uses this to securely initialize the Admin SDK.


4. Run the Dev Server

Start the application up in development mode:

npm run dev


5. Access the App

You can now hit your local site at: http://localhost:3000. Go ahead, give that digital dog a treat!

Deep Dive: Security Architecture

This setup uses a modern, battle-tested approach to protect your database credentials:

Server Actions: The client form in /app/page.tsx calls a dedicated server function (/app/actions.ts).

Admin SDK: This server function initializes the ultra-powerful Firebase Admin SDK using the key stored in .env.local.

Client Exposure: The FIREBASE_SERVICE_ACCOUNT_KEY never leaves the Vercel/Next.js environment or your local server. This is critical for keeping your data safe.
