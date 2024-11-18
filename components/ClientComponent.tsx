"use client";

// import React, { useState } from "react";
// import MenuCard from "@/components/menu-transaksi";
// import Cart from "@/components/cart";

// interface Menu {
//   id: string;
//   nama: string;
//   image: string;
//   harga: number;
//   keterangan: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const ClientComponent = ({ images }: { images: Menu[] }) => {
//   // State untuk menyimpan item di keranjang
//   const [cartItems, setCartItems] = useState<
//     { id: string; quantity: number; nama: string; image: string; harga: number }[]
//   >([]);

//   // Fungsi untuk menghapus item dari keranjang
//   const removeFromCart = (id: string) => {
//     setCartItems((prevCart) =>
//       prevCart.filter((item) => item.id !== id)
//     );
//   };

//   // Fungsi untuk mengosongkan keranjang
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <div>
//       {/* Grid untuk menampilkan menu */}
//       <div className="grid md:grid-cols-3 gap-5 mt-10">
//         {images.map((item) => (
//           <MenuCard
//             key={item.id}
//             data={item}
//             cartItems={cartItems}
//             setCartItems={setCartItems}
//           />
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

// export default ClientComponent;

import React, { useState } from "react";
import type { Menu } from "@prisma/client";
import MenuCard from "@/components/menu-transaksi";
import Cart from "@/components/cart";

const ClientComponent = ({ images }: { images: Menu[] }) => {
  const [cartItems, setCartItems] = useState<
    { id: string; quantity: number; nama: string; image: string; harga: number }[]
  >([]);

  const addToCart = (item: Menu) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div>
      {/* Grid untuk menampilkan menu */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
  {images.map((item) => (
    <MenuCard key={item.id} data={item} addToCart={addToCart} />
  ))}
</div>


      {/* Komponen Keranjang */}
      <div className="mt-10">
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      </div>
    </div>
  );
};

export default ClientComponent;
