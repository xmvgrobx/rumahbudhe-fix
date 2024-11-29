// 'use client'

// import React from "react";
// import { useSession } from "next-auth/react";
// import Sidebar from "@/components/sidebar";

// const Dashboard = () => {
//   const { data: session, status } = useSession({
//     required: true,
//     onUnauthenticated() {
//       // Redirect to login page if not authenticated
//       window.location.href = '/login'
//     }
//   });

//   // Show loading state while checking authentication
//   if (status === 'loading') {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="ml-20 md:ml-64 p-6 w-full">
//         <h1 className="text-2xl font-bold mb-4">
//         Welcome Back, {session?.user?.email}

//           {/* Welcome Back, {session?.user?.name || 'User'} */}
//         </h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

export default async function Dashboard() {
  return <>Page yeyeye</>
}