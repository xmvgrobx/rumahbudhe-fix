// "use client";

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
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-4">
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
//       </div>
//     </div>
//   );
// };

// export default ClientComponent;"use client";



"use client";

import React, { useState } from "react";
import type { Lemenu } from "@prisma/client";
import CheckoutModal from "@/components/co-modal"; // Pastikan ini adalah modal checkout
import { IoCart } from "react-icons/io5";

const ClientComponent = ({ menus }: { menus: Lemenu[] }) => {
  const [cartItems, setCartItems] = useState<{
    id: string;
    quantity: number;
    nama: string;
    harga: number;
  }[]>([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Fungsi untuk menambah item langsung ke pembayaran
  const addToCheckout = (item: Lemenu) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1; // Menambah quantity jika item sudah ada
        return updatedItems;
      }
      return [
        ...prevItems,
        {
          ...item,
          quantity: 1,  // Asumsi satu barang ditambahkan per klik
        },
      ];
    });
    setShowCheckoutModal(true);  // Langsung buka modal pembayaran
  };

  const handleCloseCheckoutModal = () => {
    setShowCheckoutModal(false);
  };

  // Fungsi untuk menghapus semua item di keranjang setelah checkout
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div>
      {/* Grid untuk menampilkan menu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-4">
        {menus?.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow-lg">
            <h3 className="font-semibold text-lg">{item.nama}</h3>
            <p className="text-gray-600">Rp {item.harga}</p>
            <button
              onClick={() => addToCheckout(item)} // Menambah item dan langsung ke checkout
              className="bg-yellow-400 p-2 rounded mt-2 hover:bg-yellow-500"
            >
              Add to Checkout
            </button>
          </div>
        ))}
      </div>

      {/* Modal Checkout */}
      {showCheckoutModal && (
        <CheckoutModal
          cartItems={cartItems}
          onClose={handleCloseCheckoutModal}
          clearCart={clearCart} // Implementasi clearCart
        />
      )}
    </div>
  );
};

export default ClientComponent;
