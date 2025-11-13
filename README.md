# Email Submitting Website (Dog Treat Giver)

Hey there! This is a simple **Next.js** web application built just for fun. It collects user emails and, in exchange, gives a cute animated dog a well-deserved treat. All submissions are handled by **Firebase Firestore**.

---

## Tech Stack & Overview

* **Frontend Framework:** Next.js (React)
* **Styling:** Tailwind CSS (for speed) and localized CSS for custom keyframe animations.
* **Database:** Firebase Firestore (NoSQL)
* **Language:** TypeScript
* **Deployment:** Vercel (for Next.js hosting) and Firebase (for data management).

---

## Getting Started Locally

Ready to run this project on your machine? Follow these simple steps.

### 1. Clone the Repo

Grab the code from GitHub:

```bash
git clone [https://github.com/Monyetsane3/email-submitting-website.git](https://github.com/Monyetsane3/email-submitting-website.git)
cd email-submitting-website
2. Install Dependencies
Install all necessary packages:

Bash

npm install
3. Firebase Setup
You'll need your own Firebase project credentials to connect the database:

Create a Project in the [Firebase Console].

Register a Web App and grab the configuration details.

Create a file named .env.local in the project root. Paste your credentials here, remembering to use the NEXT_PUBLIC_ prefix for client-side access (e.g., NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_KEY).

The /lib/firebase.js file uses these environment variables to establish the database connection.

4. Run the Server
Start the application in development mode:

Bash

npm run dev
5. Access the App
Your local site should now be up and running at: http://localhost:3000

A Quick Note on Backend & Security
Backend Choice (Firestore)
I chose Firebase Firestore because it's fast, scalable, and easy to integrate directly with a client-side component. It was the simplest way to get a functional data collection endpoint without having to build a full custom API.

Handling Secrets (Future To-Do)
Currently, the database write operation is triggered directly from the client side. While Firebase uses public keys, it's always safer to hide the database logic. My plan is to move the addDoc function into a protected Next.js Server Action or API Route to secure the write operation and keep database access strictly server-side.

Reminder: To publish this README on GitHub, save it as README.md and run these Git commands:

Bash

git add README.md
git commit -m "Add README.md"
git push origin main
