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


// pages/stok.tsx
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";
import StokTable from "../ui/stok/table";

// Define the type for your stock data
interface Stok {
  id: string;
  nama: string;
  jumlah: number;
  harga: number;
}

// Get the stock data at build time with ISR
export const getStaticProps = async () => {
  try {
    const stok = await prisma.stok.findMany(); // Fetch all stocks from the database

    return {
      props: {
        stok,
      },
      revalidate: 60, // Regenerate the page at most every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching stok:", error);
    return {
      props: {
        stok: [],
      },
    };
  }
};

const Home = ({ stok }: { stok: Stok[] }) => {
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
};

export default Home;
