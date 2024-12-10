"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const [formValues, setFormValues] = useState({});
  const router = useRouter(); // Use Next.js router for redirection

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues((old) => ({ ...old, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) {
        const error = await res.json();
        return alert(`Register failed: ${error.message || "Unknown error"}`);
      }

      alert("Registration successful! Redirecting to login...");
      setFormValues({});
      router.push("/login"); // Redirect to /login directly
    } catch (error) {
      console.error("Registration error:", error);
      alert("An unexpected error occurred.");
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Registration Form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-8">
        <h3 className="text-3xl font-semibold text-gray-800 text-center">Register</h3>
        <p className="text-gray-600 text-center mt-2">
          Create your account and start your journey!
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6 w-3/4 max-w-md">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-gray-700 font-medium">Name</label>
            <input
              className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-black-400 focus:outline-none"
              type="text"
              name="name"
              id="name"
              placeholder="John"
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-black-400 focus:outline-none"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-black-400 focus:outline-none"
              name="password"
              id="password"
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirm" className="text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-black-400 focus:outline-none"
              name="confirm"
              id="confirm"
              onChange={handleInput}
            />
          </div>
          <div className="text-center">
            <button className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
              Register
            </button>
          </div>
        </form>
      </div>

      {/* Right Side: Image */}
      <div className="flex-1 flex items-center justify-center bg-yellow-200">
        <Image src="/lucuw.png" alt="Illustration" width={400} height={400} className="rounded-md" />
      </div>
    </div>
  );
}



// "use client";

// import { signIn } from "next-auth/react";
// import { ChangeEvent, FormEvent, useState } from "react";
// import Image from "next/image";

// export default function RegisterPage() {
//   const [formValues, setFormValues] = useState({});

//   function handleInput(e: ChangeEvent<HTMLInputElement>) {
//     const { name, value } = e.target;
//     setFormValues((old) => ({ ...old, [name]: value }));
//   }

//   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     try {
//       const res = await fetch("/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formValues),
//       });

//       if (!res.ok) return alert("register failed");

//       setFormValues({});
//       return signIn(undefined, { callbackUrl: "/login" });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="flex min-h-screen">
//       {/* Left Side: Registration Form */}
//       <div className="flex-1 flex flex-col items-center justify-center bg-white p-8">
//         <h3 className="text-3xl font-semibold text-gray-800 text-center">Register</h3>
//         <p className="text-gray-600 text-center mt-2">
//           Create your account and start your journey!
//         </p>
//         <form onSubmit={handleSubmit} className="mt-6 space-y-6 w-3/4 max-w-md">
//           <div className="flex flex-col gap-2">
//             <label htmlFor="name" className="text-gray-700 font-medium">Name</label>
//             <input
//               className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-black-400 focus:outline-none"
//               type="text"
//               name="name"
//               id="name"
//               placeholder="John"
//               onChange={handleInput}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
//             <input
//               type="email"
//               className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-black-400 focus:outline-none"
//               name="email"
//               id="email"
//               placeholder="example@gmail.com"
//               onChange={handleInput}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
//             <input
//               type="password"
//               className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-black-400 focus:outline-none"
//               name="password"
//               id="password"
//               onChange={handleInput}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="confirm" className="text-gray-700 font-medium">Confirm Password</label>
//             <input
//               type="password"
//               className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-black-400 focus:outline-none"
//               name="confirm"
//               id="confirm"
//               onChange={handleInput}
//             />
//           </div>
//           <div className="text-center">
//             <button className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
//               Register
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Right Side: Image */}
//       <div className="flex-1 flex items-center justify-center bg-yellow-200">
//         <Image src="/lucuw.png" alt="Illustration" width={400} height={400} className="rounded-md" />
//       </div>
//     </div>
//   );
// }
