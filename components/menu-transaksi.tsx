// import React from "react";
// import { formatCurrency } from '@/lib/utils'

// interface MenuCardProps {
//   data: {
//     id: string;
//     nama: string;
//     image: string;
//     harga: number;
//   };
//   cartItems: {
//     id: string;
//     quantity: number;
//     nama: string;
//     image: string;
//     harga: number;
//   }[];
//   setCartItems: React.Dispatch<
//     React.SetStateAction<
//       {
//         id: string;
//         quantity: number;
//         nama: string;
//         image: string;
//         harga: number;
//       }[]
//     >
//   >;
// }

// const MenuCard: React.FC<MenuCardProps> = ({ data, cartItems, setCartItems }) => {
//   const addToCart = () => {
//     setCartItems((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === data.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === data.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [
//         ...prevCart,
//         { id: data.id, nama: data.nama, image: data.image, harga: data.harga, quantity: 1 },
//       ];
//     });
//   };

//   return (
// <div className="p-4 border rounded-lg shadow-md flex flex-col justify-between items-center">
// {/* <div className="w-64 border border-gray-200 rounded-lg shadow-lg"> */}

//       <img src={data.image} alt={data.nama} className="w-full h-40 object-cover" />
//       <div className="px-4 py-2">
//     <h1 className="text-xl font-semibold text-gray-900 truncate text-center">
//       {data.nama}
//     </h1>
//   </div>
//   <div className="px-4 py-2">
//     <h2 className="text-center text-lg font-medium text-gray-700">
//       {formatCurrency(data.harga)}
//     </h2>
//   </div>
//       <button
//         // className="mt-4 bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-700"
//         className="px-4 justify-center items-center py-2 flex space-x-4 bg-amber-500 text-white rounded hover:bg-amber-700"
//         onClick={addToCart}
//       >
//         +
//       </button>
//     </div>
//   );
// };

// export default MenuCard;


// import React from 'react';
// import Image from 'next/image';
// import type { Menu } from "@prisma/client"
// import { formatCurrency } from '@/lib/utils'

// interface MenuCardProps {
//   data: {
//     image: string;
//     nama: string;
//     harga: number;
//   };
//   addToCart: (item: any) => void;
// }

// const MenuCard: React.FC<MenuCardProps> = ({ data, addToCart }) => {
//   return (
//     <div className="border rounded-lg shadow-md p-4 flex flex-col items-center">
//       <Image
//         src={data.image}
//         alt={data.nama}
//         width={150}
//         height={150}
//         className="mb-4 rounded-md"
//       />
//       <h3 className="font-semibold text-lg text-center">{data.nama}</h3>
//       <p className="text-gray-600">Rp {data.harga.toLocaleString()}</p>
//       <button
//         className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//         onClick={() => addToCart(data)}
//       >
//         Tambahkan ke Keranjang
//       </button>
//     </div>
//   );
// };

// export default MenuCard;


import React from 'react';
import Image from 'next/image';
import type { Menu } from "@prisma/client";
import { formatCurrency } from '@/lib/utils';

interface MenuCardProps {
  data: Menu; // Menggunakan tipe Menu dari Prisma
  addToCart: (item: Menu) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ data, addToCart }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl col-span-2 ml-3">
      {/* Bagian Gambar Produk */}
      <div className="relative w-full h-48">
      <Image
          src={data.image}
          alt={data.nama}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-t-lg object-cover"
        />
      </div>

      {/* Nama Produk */}
      <div className="px-4 py-2">
        <h1 className="text-xl font-semibold text-gray-900 truncate text-center">
          {data.nama}
        </h1>
      </div>

      {/* Harga Produk */}
      <div className="px-4 py-2">
        <h2 className="text-center text-lg font-medium text-gray-700">
          {formatCurrency(data.harga)}
        </h2>
      </div>

      {/* Tombol Tambah ke Keranjang */}
      <div className="px-4 py-2 flex justify-center">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={() => addToCart(data)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default MenuCard;

