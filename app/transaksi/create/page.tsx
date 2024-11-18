import { getImages } from "@/lib/data";
import ClientComponent from "@/components/ClientComponent"; // Pastikan path benar
import CreateTransaksiForm from "@/components/create-transaksi";

export default async function Home() {
  const images = await getImages(); // Ambil data dari Prisma

  return (
    <div>
      {/* Kirim data ke Client Component */}
      <ClientComponent images={images} />
    </div>
  );
}

// 'use client';

// import React, { useState } from 'react';
// import { getImages } from '@/lib/data'; // Fungsi untuk mengambil data dari Prisma
// import MenuCard from '@/components/menu-transaksi';
// import Cart from '@/components/cart';

// const TransaksiPage = async () => {
//   const menus = await getImages(); // Mengambil data dari Prisma
//   const [cartItems, setCartItems] = useState<any[]>([]);

//   const addToCart = (item: any) => {
//     setCartItems((prev) => {
//       const existingItem = prev.find((cartItem) => cartItem.id === item.id);
//       if (existingItem) {
//         return prev.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       }
//       return [...prev, { ...item, quantity: 1 }];
//     });
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Bagian Menu */}
//       <div className="w-2/3 p-4 grid grid-cols-2 gap-4">
//         {menus.length > 0 ? (
//           menus.map((menu) => (
//             <MenuCard key={menu.id} data={menu} addToCart={addToCart} />
//           ))
//         ) : (
//           <p className="text-gray-500">Tidak ada menu tersedia.</p>
//         )}
//       </div>

//       {/* Sidebar */}
//       <div className="w-1/3 bg-white shadow-lg p-6 border-l">
//         <Cart
//           cartItems={cartItems}
//           removeFromCart={(id) =>
//             setCartItems((prev) => prev.filter((item) => item.id !== id))
//           }
//           clearCart={() => setCartItems([])}
//         />
//       </div>
//     </div>
//   );
// };

// export default TransaksiPage;

