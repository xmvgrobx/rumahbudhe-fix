// import React, { useState, FormEvent } from 'react';

// interface MenuItem {
//   id: string;
//   nama: string;
//   harga: number;
// }

// interface TransactionFormProps {
//   menuList: MenuItem[];
//   onSubmit: (data: {
//     menuId: string;
//     quantity: number;
//     totalHarga: number;
//     catatan: string;
//     metodeBayar: string;
//   }) => void;
// }

// const TransactionForm: React.FC<TransactionFormProps> = ({ menuList, onSubmit }) => {
//   const [menuId, setMenuId] = useState<string>('');
//   const [quantity, setQuantity] = useState<number>(1);
//   const [catatan, setCatatan] = useState<string>('');
//   const [metodeBayar, setMetodeBayar] = useState<string>('');

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
  
//     if (!menuId) {
//       alert('Silakan pilih menu.');
//       return;
//     }
  
//     if (quantity <= 0) {
//       alert('Jumlah harus lebih dari 0.');
//       return;
//     }
  
//     if (!metodeBayar) {
//       alert('Silakan pilih metode pembayaran.');
//       return;
//     }
  
//     const selectedMenu = menuList.find((menu) => menu.id === menuId);
//     if (!selectedMenu) {
//       alert('Menu tidak valid!');
//       return;
//     }
  
//     const totalHarga = selectedMenu.harga * quantity;
  
//     onSubmit({
//       menuId,
//       quantity,
//       totalHarga,
//       catatan,
//       metodeBayar,
//     });
//   };
  

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
//       <div className="mb-4">
//         <label htmlFor="menuId" className="block text-sm font-medium text-gray-700">
//           Pilih Menu
//         </label>
//         <select
//           id="menuId"
//           name="menuId"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//           value={menuId}
//           onChange={(e) => setMenuId(e.target.value)}
//         >
//           <option value="">Pilih menu...</option>
//           {menuList.map((menu) => (
//             <option key={menu.id} value={menu.id}>
//               {menu.nama} - IDR {menu.harga}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
//           Jumlah
//         </label>
//         <input
//           type="number"
//           id="quantity"
//           name="quantity"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//           value={quantity}
//           onChange={(e) => setQuantity(Number(e.target.value))}
//           min={1}
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="catatan" className="block text-sm font-medium text-gray-700">
//           Catatan
//         </label>
//         <textarea
//           id="catatan"
//           name="catatan"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//           placeholder="Masukkan catatan untuk transaksi..."
//           value={catatan}
//           onChange={(e) => setCatatan(e.target.value)}
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="metodeBayar" className="block text-sm font-medium text-gray-700">
//           Metode Pembayaran
//         </label>
//         <select
//           id="metodeBayar"
//           name="metodeBayar"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//           value={metodeBayar}
//           onChange={(e) => setMetodeBayar(e.target.value)}
//         >
//           <option value="">Pilih metode pembayaran...</option>
//           <option value="cash">Cash</option>
//           <option value="e_wallet">E-Wallet</option>
//         </select>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//       >
//         Selesaikan Transaksi
//       </button>
//     </form>
//   );
// };

// export default TransactionForm;

import React, { useState, FormEvent } from 'react';

interface MenuItem {
  id: string;
  nama: string;
  harga: number;
}

interface TransactionFormProps {
  menuList: MenuItem[];
  onSubmit: (data: {
    menuId: string;
    quantity: number;
    totalHarga: number;
    catatan: string;
    metodeBayar: string;
  }) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ menuList, onSubmit }) => {
  const [menuId, setMenuId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [catatan, setCatatan] = useState<string>('');
  const [metodeBayar, setMetodeBayar] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!menuId || !metodeBayar || quantity <= 0) {
      alert('Silakan lengkapi semua data dengan benar!');
      return;
    }

    const selectedMenu = menuList.find((menu) => menu.id === menuId);
    if (!selectedMenu) {
      alert('Menu tidak valid!');
      return;
    }

    const totalHarga = selectedMenu.harga * quantity;

    onSubmit({
      menuId,
      quantity,
      totalHarga,
      catatan,
      metodeBayar,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
      <div className="mb-4">
        <label htmlFor="menuId" className="block text-sm font-medium text-gray-700">
          Pilih Menu
        </label>
        <select
          id="menuId"
          name="menuId"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={menuId}
          onChange={(e) => setMenuId(e.target.value)}
        >
          <option value="">Pilih menu...</option>
          {menuList.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.nama} - IDR {menu.harga}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Jumlah
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="catatan" className="block text-sm font-medium text-gray-700">
          Catatan
        </label>
        <textarea
          id="catatan"
          name="catatan"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Masukkan catatan untuk transaksi..."
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="metodeBayar" className="block text-sm font-medium text-gray-700">
          Metode Pembayaran
        </label>
        <select
          id="metodeBayar"
          name="metodeBayar"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={metodeBayar}
          onChange={(e) => setMetodeBayar(e.target.value)}
        >
          <option value="">Pilih metode pembayaran...</option>
          <option value="cash">Cash</option>
          <option value="e_wallet">E-Wallet</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-700"
      >
        Selesaikan Transaksi
      </button>
    </form>
  );
};

export default TransactionForm;
