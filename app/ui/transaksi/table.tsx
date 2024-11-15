import { getTransaksi } from "@/lib/data";
import { formatDate } from "@/lib/utils";
// import { EditEmployee, DeleteEmployee } from "@/components/buttons";

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
          <th className="py-3 px-6">Total Harga</th>
          <th className="py-3 px-6">Jumlah Pesanan</th>
          <th className="py-3 px-6">Catatan</th>
          <th className="py-3 px-6">Metode Bayar</th>

          <th className="py-3 px-6 text-center">Tanggal Transaksi</th>
        </tr>
      </thead>
      <tbody>
        {trx.map((e, index) => (
          <tr key={e.id} className="bg-white border-b">
            <td className="py-3 px-6">{e.id}</td>
            <td className="py-3 px-6">{e.totalHarga}</td>
            <td className="py-3 px-6">{e.jumlah}</td>
            <td className="py-3 px-6">{e.catatan}</td>
            <td className="py-3 px-6">{e.metodeBayar}</td>
            <td className="py-3 px-6">
              {formatDate(e.tanggal.toString())}
            </td>

            <td className="flex justify-center gap-1 py-3">
              {/* <EditEmployee id={e.id}/>
              <DeleteEmployee id={e.id}/> */}
            </td>
          </tr>

        )
        )}


      </tbody>
    </table>
  );
};

export default TransaksiTable;