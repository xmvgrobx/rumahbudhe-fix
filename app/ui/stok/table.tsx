// import React from "react";
// import { prisma } from "@/lib/prisma";
// import type { Stok } from "@prisma/client";
// import { EditStok, DeleteStok } from "@/components/buttons";
// import DetailStok from "@/components/stok/detail-stok";

// async function getStok(): Promise<Stok[]> {
//   const st = await prisma.stok.findMany();
//   return st;
// }

// const StokTable = async () => {
//   const st = await getStok();

//   return (
//     <table className="w-full text-sm text-left bg-white text-gray-500">
//       <thead className="text-sm text-gray-700 uppercase bg-white-50">
//         <tr>
//           <th className="py-3 px-6">Nama</th>
//           <th className="py-3 px-6">Jumlah</th>
//           <th className="py-3 px-6">Harga</th>
//           <th className="py-3 px-6 text-center">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {st.map((s) => (
//           <tr key={s.id} className="bg-white border-b">
//             <td className="py-3 px-6">{s.nama}</td>
//             <td className="py-3 px-6">{s.jumlah}</td>
//             <td className="py-3 px-6">Rp {s.harga}</td>
           
//             <td className="flex justify-center gap-1 py-3">
//               <DetailStok id={s.id}/>
//               <EditStok id={s.id}/>
//               <DeleteStok id={s.id}/>
//             </td>
//           </tr>

//         )
//         )}


//       </tbody>
//     </table>
//   );
// };

// export default StokTable;

import React from 'react';

// Define a TypeScript type for a single 'Stok' item
interface Stok {
  id: number;
  nama: string;
  jumlah: number;
  harga: number;
}

// Define the props for the StokTable component
interface StokTableProps {
  data: Stok[]; // This is the type for the `data` prop passed into StokTable
}

const StokTable: React.FC<StokTableProps> = ({ data }) => {
  return (
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">Nama</th>
          <th className="py-2 px-4 border-b">Jumlah</th>
          <th className="py-2 px-4 border-b">Harga</th>
        </tr>
      </thead>
      <tbody>
        {data.map((stok) => (
          <tr key={stok.id}>
            <td className="py-2 px-4 border-b">{stok.id}</td>
            <td className="py-2 px-4 border-b">{stok.nama}</td>
            <td className="py-2 px-4 border-b">{stok.jumlah}</td>
            <td className="py-2 px-4 border-b">{stok.harga}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StokTable;
