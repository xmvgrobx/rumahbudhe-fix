"use client";


// import React, { useState } from "react";
// import type { Menu } from "@prisma/client";
// import MenuCard from "@/components/menu-transaksi";
// import Cart from "@/components/cart";
// import { formatCurrency } from "@/lib/utils";

// interface CartItem {
//   menuId: string;
//   nama: string;
//   quantity: number;
//   subtotal: number;
// }

// const ClientComponent = ({ images }: { images: Menu[] }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   const addToCart = (item: Menu) => {
//     setCartItems((prev) => {
//       const existingItem = prev.find((cartItem) => cartItem.menuId === item.id);
//       if (existingItem) {
//         return prev.map((cartItem) =>
//           cartItem.menuId === item.id
//             ? {
//                 ...cartItem,
//                 quantity: cartItem.quantity + 1,
//                 subtotal: (cartItem.quantity + 1) * (item.harga || 0),
//               }
//             : cartItem
//         );
//       }
//       return [
//         ...prev,
//         { menuId: item.id, nama: item.nama, quantity: 1,  harga: item.harga || 0, // Pastikan harga memiliki nilai default
//           subtotal: item.harga || 0},
//       ];
//     });
//   };

//   const removeFromCart = (id: string) => {
//     setCartItems((prev) => prev.filter((item) => item.menuId !== id));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const totalHarga = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
//   const jumlah = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <div>
//       {/* Grid untuk menampilkan menu */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
//         {images.map((item) => (
//           <MenuCard key={item.id} data={item} addToCart={addToCart} />
//         ))}
//       </div>

//       {/* Komponen Keranjang */}
//       <div className="mt-10">
//         <Cart
//           cartItems={cartItems}
//           removeFromCart={removeFromCart}
//           clearCart={clearCart}
//         />
//         {cartItems.length > 0 && (
//           <div className="mt-10">
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClientComponent;


// FIX!!
// import React, { useState } from "react";
// import type { Menu } from "@prisma/client";
// import MenuCard from "@/components/menu-transaksi";
// import Cart from "@/components/cart";

// const ClientComponent = ({ images }: { images: Menu[] }) => {
//   const [cartItems, setCartItems] = useState<
//     { id: string; quantity: number; nama: string; image: string; harga: number }[]
//   >([]);

//   const addToCart = (item: Menu) => {
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

//   const removeFromCart = (id: string) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <div>
//       {/* Grid untuk menampilkan menu */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
//   {images.map((item) => (
//     <MenuCard key={item.id} data={item} addToCart={addToCart} />
//   ))}
// </div>


//       {/* Komponen Keranjang */}
//       <div className="mt-10">
//         <Cart
//           cartItems={cartItems}
//           removeFromCart={removeFromCart}
//           clearCart={clearCart}
//         />
//       </div>
//     </div>
//   );
// };

// export default ClientComponent;


// import React from 'react';
// import TransactionForm from '@/components/create-transaksi';

// const mockMenuList = [
//   { id: '1', nama: 'Iced Latte', harga: 22000 },
//   { id: '2', nama: 'French Fries', harga: 15000 },
//   { id: '3', nama: 'Iced Americano', harga: 10000 },
// ];

// const TransactionPage = () => {
//   const handleTransactionSubmit = async (data: {
//     menuId: string;
//     quantity: number;
//     totalHarga: number;
//     catatan: string;
//     metodeBayar: string;
//   }) => {
//     try {
//       const response = await fetch('/api/transaction', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         alert('Transaksi berhasil!');
//       } else {
//         alert('Gagal menyelesaikan transaksi.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Terjadi kesalahan.');
//     }
//   };

//   return (
//     <div className="container mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-5">Form Transaksi</h1>
//       <TransactionForm menuList={mockMenuList} onSubmit={handleTransactionSubmit} />
//     </div>
//   );
// };

// export default TransactionPage;

import React, { useEffect, useState } from 'react';
import TransactionForm from '@/components/create-transaksi';

interface MenuItem {
  id: string;
  nama: string;
  harga: number;
}

const TransactionPage = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data menu dari API
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) {
          throw new Error('Gagal mengambil data menu');
        }
        const data = await response.json();
        setMenuList(data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const handleTransactionSubmit = async (data: {
    menuId: string;
    quantity: number;
    totalHarga: number;
    catatan: string;
    metodeBayar: string;
  }) => {
    try {
      const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Transaksi berhasil!');
      } else {
        alert('Gagal menyelesaikan transaksi.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan.');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Form Transaksi</h1>
      {isLoading ? (
        <p>Loading menu...</p>
      ) : (
        <TransactionForm menuList={menuList} onSubmit={handleTransactionSubmit} />
      )}
    </div>
  );
};

export default TransactionPage;
