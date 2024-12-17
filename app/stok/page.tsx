// import Sidebar from "@/components/sidebar"
// import Link from "next/link";
// import React from "react";
// import StokTable from "../ui/stok/table";

// const Home = async () => {
//   return (
//     <div className="flex w-screen h-screen">
//       <Sidebar />
//       <div className="flex-1 p-10 bg-gray-100">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold">Stok</h1>
//           <Link href="/stok/create" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
//             Create
//           </Link>
//         </div>
//         <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
//           <StokTable />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// app/stok/page.tsx

import Sidebar from "@/components/sidebar";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import StokTable from "../ui/stok/table";
// Server-side function to fetch data
async function fetchStok() {
  const res = await fetch("http://localhost:3000/api/stok", {
    next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error("Failed to fetch stok data");
  }

  return res.json();
}

export default async function StokPage() {
  const stok = await fetchStok(); // Fetch the list of stocks

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Stok</h1>
          <Link
            href="/stok/create"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Create
          </Link>
        </div>
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <StokTable data={stok} /> {/* Pass the fetched data to the StokTable component */}
        </div>
      </div>
    </div>
  );
}
