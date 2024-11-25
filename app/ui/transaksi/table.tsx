// import { getTransaksi } from "@/lib/data";
// import { formatDate, formatCurrency } from "@/lib/utils";
// import { IoAddSharp, IoPencil, IoTrashOutline } from 'react-icons/io5';
// import Link from "next/link";
// const TransaksiTable = async ({
//   query,
// }: {
//   query: string;
// }) => {
//   const trx = await getTransaksi(query);



//   return (
//     <table className="w-full text-sm text-left bg-white text-gray-500">
//       <thead className="text-sm text-gray-700 uppercase bg-white-50">
//         <tr>
//           <th className="py-3 px-6">#</th>
//           <th className="py-3 px-6 text-center">Tanggal Transaksi</th>
//           <th className="py-3 px-6 text-center">Jumlah Pesanan</th>

//           <th className="py-3 px-6">Total Harga</th>
//           <th className="py-3 px-6">Actions</th>

//         </tr>
//       </thead>
//       <tbody>
//         {trx.map((e, index) => (
//           <tr key={e.id} className="bg-white border-b">
//             <td className="py-3 px-6">{index + 1}</td>
//             {/* <td className="py-3 px-6">{e.id}</td> */}
//             <td className="py-3 px-6">
//               {formatDate(e.tanggal.toString())}
//             </td>
//             <td className="py-3 px-6 text-center">{e.jumlah}</td>
//             <td className="py-3 px-6 text-center">  {formatCurrency(e.totalHarga)}
//             </td>
//             <td className="flex justify-center gap-1 py-3">
//               {/* <EditEmployee id={e.id}/>
//               <DeleteEmployee id={e.id}/> */}
//             </td>
//           </tr>

//         )
//         )}


//       </tbody>
//     </table>
//   );
// };

// export default TransaksiTable;


// export function EditTransaksi({ id }: { id: string }) {
//   return (
//     <Link
//       href={`/dashboard/transaksi/${id}/edit`}
//       className="rounded-md border p-2 hover:bg-gray-100"
//     >
//       <PencilIcon className="w-5 text-yellow-500" />
//     </Link>
//   );
// }

// export function DeleteTransaksi({ id }: { id: string }) {
//   const deleteTransaksiWithId = deleteTransaksi.bind(null, id);

//   return (
//     <form action={deleteTransaksiWithId}>
//       <button 
//         type="submit" 
//         className="rounded-md border p-2 hover:bg-gray-100"
//         onClick={(e) => {
//           if (!confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
//             e.preventDefault();
//           }
//         }}
//       >
//         <TrashIcon className="w-5 text-red-500" />
//       </button>
//     </form>
//   );
// }


// "use server"

import { getTransaksi } from "@/lib/data";
import { formatDate, formatCurrency } from "@/lib/utils";
import { IoAddSharp, IoPencil, IoTrashOutline } from 'react-icons/io5';
import Link from "next/link";
import { EditTransaksi, DeleteTransaksi } from "@/components/buttons";


const TransaksiTable = async ({
  query,
}: {
  query: string;
}) => {
  const trx = await getTransaksi(query);

  return (
    <table className="w-full text-sm text-left bg-white text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-white-50">
        <tr>
          <th className="py-3 px-6">#</th>
          <th className="py-3 px-6 text-center">Tanggal Transaksi</th>
          <th className="py-3 px-6 text-center">Jumlah Pesanan</th>
          <th className="py-3 px-6">Total Harga</th>
          <th className="py-3 px-6">Actions</th>
        </tr>
      </thead>
      <tbody>
        {trx.map((e, index) => (
          <tr key={e.id} className="bg-white border-b">
            <td className="py-3 px-6">{index + 1}</td>
            <td className="py-3 px-6">
              {formatDate(e.tanggal.toString())}
            </td>
            <td className="py-3 px-6 text-center">{e.jumlah}</td>
            <td className="py-3 px-6 text-center">
              {formatCurrency(e.totalHarga)}
            </td>
            <td className="flex justify-center gap-1 py-3">
              <EditTransaksi id={e.id} />
              <DeleteTransaksi id={e.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransaksiTable;