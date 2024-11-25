import React, { useState, FormEvent, useEffect } from 'react';

interface MenuItem {
  id: string;
  nama: string;
  harga: number;
}

interface Transaksi {
  id: string;
  menuId: string;
  quantity: number;
  totalHarga: number;
  catatan: string;
  metodeBayar: string;
}

interface TransactionEditFormProps {
  menuList: MenuItem[];
  initialTransaksi?: Transaksi;
  onSubmit: (data: {
    id?: string;
    menuId: string;
    quantity: number;
    totalHarga: number;
    catatan: string;
    metodeBayar: string;
  }) => void;
}

const TransactionEditForm: React.FC<TransactionEditFormProps> = ({ 
  menuList, 
  initialTransaksi, 
  onSubmit 
}) => {
  const [menuId, setMenuId] = useState<string>(initialTransaksi?.menuId || '');
  const [quantity, setQuantity] = useState<number>(initialTransaksi?.quantity || 1);
  const [catatan, setCatatan] = useState<string>(initialTransaksi?.catatan || '');
  const [metodeBayar, setMetodeBayar] = useState<string>(initialTransaksi?.metodeBayar || '');

  useEffect(() => {
    if (initialTransaksi) {
      setMenuId(initialTransaksi.menuId);
      setQuantity(initialTransaksi.quantity);
      setCatatan(initialTransaksi.catatan);
      setMetodeBayar(initialTransaksi.metodeBayar);
    }
  }, [initialTransaksi]);

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
      id: initialTransaksi?.id, // Include ID for edit
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
        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        {initialTransaksi ? 'Update Transaksi' : 'Selesaikan Transaksi'}
      </button>
    </form>
  );
};

export default TransactionEditForm;