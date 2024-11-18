// 'use client';

// import React, { useState } from 'react';
// import { useFormState } from 'react-dom';
// import { saveTransaksi } from '@/lib/actions';
// import { SubmitButtonMenu } from '@/components/buttons';

// const CreateTransaksiForm = ({ cartItems }: { cartItems: any[] }) => {
//   const [state, formAction] = useFormState(saveTransaksi, null);
//   const [catatan, setCatatan] = useState('');
//   const [metodeBayar, setMetodeBayar] = useState('QRIS');

//   const totalHarga = cartItems.reduce(
//     (sum, item) => sum + item.harga * item.quantity,
//     0
//   );
//   const jumlah = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <form action={formAction}>
//       {/* Alert */}
//       {state?.message ? (
//         <div
//           className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
//           role="alert"
//         >
//           <div className="font-medium">{state?.message}</div>
//         </div>
//       ) : null}

//       <div className="mb-4">
//         <input
//           type="hidden"
//           name="totalHarga"
//           value={totalHarga}
//           readOnly
//         />
//         <input
//           type="hidden"
//           name="jumlah"
//           value={jumlah}
//           readOnly
//         />
//         <input
//           type="hidden"
//           name="cartItems"
//           value={JSON.stringify(cartItems)}
//           readOnly
//         />
//       </div>

//       <div className="mb-4">
//         <textarea
//           name="catatan"
//           value={catatan}
//           onChange={(e) => setCatatan(e.target.value)}
//           className="py-2 px-4 rounded-sm border border-gray-400 w-full"
//           placeholder="Catatan..."
//         />
//         <div aria-live="polite" aria-atomic="true">
//           <p className="text-sm text-red-500 mt-2">{state?.error?.catatan}</p>
//         </div>
//       </div>

//       <div className="mb-4">
//         <select
//           name="metodeBayar"
//           value={metodeBayar}
//           onChange={(e) => setMetodeBayar(e.target.value)}
//           className="py-2 px-4 rounded-sm border border-gray-400 w-full"
//         >
//           <option value="QRIS">QRIS</option>
//           <option value="Cash">Cash</option>
//         </select>
//         <div aria-live="polite" aria-atomic="true">
//           <p className="text-sm text-red-500 mt-2">{state?.error?.metodeBayar}</p>
//         </div>
//       </div>

//       <div className="mb-4 pt-4">
//         <SubmitButtonMenu label="upload" />
//       </div>
//     </form>
//   );
// };

// export default CreateTransaksiForm;

// 'use client';

import React, { useState } from 'react';

const CreateTransaksiForm = ({ cartItems }: { cartItems: any[] }) => {
  const [catatan, setCatatan] = useState('');
  const [metodeBayar, setMetodeBayar] = useState('QRIS');

  const totalHarga = cartItems.reduce((sum, item) => sum + item.harga * item.quantity, 0);

  return (
    <form className="mt-6">
      <div className="mb-4">
        <label>Catatan:</label>
        <textarea
          className="w-full p-2 border rounded"
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label>Metode Pembayaran:</label>
        <select
          className="w-full p-2 border rounded"
          value={metodeBayar}
          onChange={(e) => setMetodeBayar(e.target.value)}
        >
          <option value="QRIS">QRIS</option>
          <option value="Cash">Cash</option>
        </select>
      </div>
      <div className="mb-4">
        <p>Total Harga: Rp {totalHarga.toLocaleString()}</p>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
        Konfirmasi Transaksi
      </button>
    </form>
  );
};

export default CreateTransaksiForm;

