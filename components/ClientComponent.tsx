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

// export default ClientComponent;

"use client";

import React, { useState } from "react";
import type { Menu } from "@prisma/client";
import MenuCard from "@/components/menu-transaksi";
import CartModal from "@/components/cart-modal";
import CheckoutModal from "@/components/co-modal";
import { IoCart } from "react-icons/io5";


const ClientComponent = ({ images }: { images: Menu[] }) => {
  const [cartItems, setCartItems] = useState<
    { id: string; quantity: number; nama: string; image: string; harga: number }[]
  >([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

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

  const handleOpenCartModal = () => {
    setShowCartModal(true);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  const handleOpenCheckoutModal = () => {
    setShowCheckoutModal(true);
  };

  const handleCloseCheckoutModal = () => {
    setShowCheckoutModal(false);
  };

  return (
    <div>
      {/* Grid untuk menampilkan menu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-4">
        {images.map((item) => (
          <MenuCard key={item.id} data={item} addToCart={addToCart} />
        ))}
      </div>

      {/* Komponen Keranjang */}

      <div className="fixed top-4 right-4 z-50">
        <button
          className="bg-yellow-400 p-2 rounded-full hover:bg-yellow-500 relative shadow-lg"
          onClick={handleOpenCartModal}
          aria-label="Lihat Keranjang"
        >
          <IoCart className="text-2xl text-black" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>

        {showCartModal && (
          <CartModal
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            onClose={handleCloseCartModal}
            onCheckout={handleOpenCheckoutModal}
          />
        )}

        {showCheckoutModal && (
          <CheckoutModal
            cartItems={cartItems}
            clearCart={clearCart}
            onClose={handleCloseCheckoutModal}
          />
        )}
      </div>
    </div>
   

  );
};

export default ClientComponent;