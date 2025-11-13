// "use client";

// import React, { useState, useEffect } from "react";
// import { db } from "@/lib/firebase";
// import { collection, addDoc } from "firebase/firestore";

// export default function EmailForm() {
//   const [email, setEmail] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [animationStage, setAnimationStage] = useState<
//     "idle" | "treat" | "wagTail"
//   >("idle");
//   const [error, setError] = useState("");

//   // Animation durations (ms)
//   const TREAT_DURATION = 1000;
//   const WAG_DURATION = 1500;

//   //Validate email with simple regex
//   const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

//   //Handle email submission
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "emails"), { email });
//       setSubmitted(true);
//       setAnimationStage("treat");
//     } catch {
//       setError("Error submitting email. Please try again.");
//     }
//   };

//   //Reset form for "Submit Another Email"
//   const handleReset = () => {
//     setEmail("");
//     setSubmitted(false);
//     setAnimationStage("idle");
//   };

//   //Control animation sequence timings
//   useEffect(() => {
//     let timeout1: NodeJS.Timeout;
//     let timeout2: NodeJS.Timeout;

//     if (animationStage === "treat") {
//       // Move to wagTail after TREAT_DURATION
//       timeout1 = setTimeout(() => setAnimationStage("wagTail"), TREAT_DURATION);
//       // Return to idle after TREAT_DURATION + WAG_DURATION
//       timeout2 = setTimeout(() => setAnimationStage("idle"), TREAT_DURATION + WAG_DURATION);
//     }

//     return () => {
//       clearTimeout(timeout1);
//       clearTimeout(timeout2);
//     };
//   }, [animationStage]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
//       <h1 className="text-xl md:text-2xl font-semibold mb-8 text-center">
//         Enter your email to give my dog a treat
//       </h1>

//       {/*Dog Animation Always Visible */}
//       <div className="w-48 h-48 relative mb-6">
//         {animationStage === "idle" && (
//           <img
//             src="/Sitting_with_tongue_out.svg"
//             alt="Dog sitting with tongue out"
//             className="absolute inset-0 w-full h-full object-contain"
//           />
//         )}
//         {animationStage === "treat" && (
//           <img
//             src="/Standing_with_tongue_out.svg"
//             alt="Dog standing with tongue out"
//             className="absolute inset-0 w-full h-full object-contain"
//           />
//         )}
//         {animationStage === "wagTail" && (
//           <img
//             src="/Standing.svg"
//             alt="Dog standing wagging tail"
//             className="absolute inset-0 w-full h-full object-contain animate-wagTail"
//           />
//         )}
//       </div>

//       {/* 📩 Email form or success message */}
//       {!submitted ? (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded shadow-md w-full max-w-sm"
//         >
//           {error && <p className="mb-3 text-red-600 font-semibold">{error}</p>}
//           <label htmlFor="email" className="block mb-2 font-semibold">
//             Enter your email:
//           </label>
//           <input
//             type="email"
//             id="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mb-4 border border-gray-300 rounded p-2 w-full"
//             placeholder="you@email.com"
//             autoComplete="email"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//           >
//             Submit
//           </button>
//         </form>
//       ) : (
//         <div className="flex flex-col items-center space-y-4">
//           <p className="text-green-700 font-semibold text-lg text-center">
//             Thank you for submitting your email!
//           </p>
//           <button
//             onClick={handleReset}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Submit Another Email
//           </button>
//         </div>
//       )}

//       {/*Tail wag animation style */}
//       <style jsx>{`
//         @keyframes wagTail {
//           0%,
//           100% {
//             transform: rotate(0deg);
//           }
//           50% {
//             transform: rotate(15deg);
//           }
//         }
//         .animate-wagTail {
//           animation: wagTail 0.5s ease-in-out infinite;
//           transform-origin: 80% 90%;
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import { submitEmailAction } from "@/app/actions"; 



export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [animationStage, setAnimationStage] = useState<
    "idle" | "treat" | "wagTail"
  >("idle");
  const [error, setError] = useState("");

  // Animation durations (ms)
  const TREAT_DURATION = 1000;
  const WAG_DURATION = 1500;

  //Validate email with simple regex
  const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  //Handle email submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Client-side validation for quick UI feedback
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // 2. Updated: Call the secure Server Action
      const result = await submitEmailAction(email);
      
      if (result.success) {
        setSubmitted(true);
        setAnimationStage("treat");
      } else {
        // Display the error message returned from the server
        setError(result.error || "An unknown submission error occurred.");
      }
    } catch {
      // This catches network errors or issues with the Server Action call
      setError("Error submitting email. Please check network connection.");
    }
  };

  //Reset form for "Submit Another Email"
  const handleReset = () => {
    setEmail("");
    setSubmitted(false);
    setAnimationStage("idle");
  };

  //Control animation sequence timings
  useEffect(() => {
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;

    if (animationStage === "treat") {
      // Move to wagTail after TREAT_DURATION
      timeout1 = setTimeout(() => setAnimationStage("wagTail"), TREAT_DURATION);
      // Return to idle after TREAT_DURATION + WAG_DURATION
      timeout2 = setTimeout(() => setAnimationStage("idle"), TREAT_DURATION + WAG_DURATION);
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [animationStage]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-xl md:text-2xl font-semibold mb-8 text-center">
        Enter your email to give my dog a treat
      </h1>

      {/*Dog Animation Always Visible */}
      <div className="w-48 h-48 relative mb-6">
        {animationStage === "idle" && (
          <img
            src="/Sitting_with_tongue_out.svg"
            alt="Dog sitting with tongue out"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}
        {animationStage === "treat" && (
          <img
            src="/Standing_with_tongue_out.svg"
            alt="Dog standing with tongue out"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}
        {animationStage === "wagTail" && (
          <img
            src="/Standing.svg"
            alt="Dog standing wagging tail"
            className="absolute inset-0 w-full h-full object-contain animate-wagTail"
          />
        )}
      </div>

      {/* 📩 Email form or success message */}
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          {error && <p className="mb-3 text-red-600 font-semibold">{error}</p>}
          <label htmlFor="email" className="block mb-2 font-semibold">
            Enter your email:
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 border border-gray-300 rounded p-2 w-full"
            placeholder="you@email.com"
            autoComplete="email"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-green-700 font-semibold text-lg text-center">
            Thank you for submitting your email!
          </p>
          <button
            onClick={handleReset}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Another Email
          </button>
        </div>
      )}

      {/*Tail wag animation style */}
      <style jsx>{`
        @keyframes wagTail {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(15deg);
          }
        }
        .animate-wagTail {
          animation: wagTail 0.5s ease-in-out infinite;
          transform-origin: 80% 90%;
        }
      `}</style>
    </div>
  );
}