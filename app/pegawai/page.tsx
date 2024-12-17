// import Sidebar from "@/components/sidebar"; 
// import Link from "next/link";
// import React from "react";
// import PegawaiTable from "../ui/pegawai/table"; 

// const Home = async () => {
//   return (
//     <div className="flex w-screen h-screen">
//       <Sidebar />
//       <div className="flex-1 p-10 bg-gray-100">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold">Pegawai</h1>
//           <Link href="/pegawai/create" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
//             Create
//           </Link>
//         </div>
//         <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
//           <PegawaiTable />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import React from "react";
import PegawaiTable from "../ui/pegawai/table";
import { prisma } from "@/lib/prisma";
import type { Pegawai } from "@prisma/client";

export async function getServerSideProps() {
  try {
    const pegawai = await prisma.pegawai.findMany(); // Ambil data dari database
    return {
      props: {
        pegawai,
      },
    };
  } catch (error: any) {
    console.error("Error fetching pegawai data:", error.message || error);
    return {
      props: {
        pegawai: [], // Jika terjadi error, kirim data kosong
      },
    };
  }
}

const Home = ({ pegawai }: { pegawai: Pegawai[] }) => {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Pegawai</h1>
          <Link
            href="/pegawai/create"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Create
          </Link>
        </div>
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <PegawaiTable data={pegawai} />
        </div>
      </div>
    </div>
  );
};

export default Home;
