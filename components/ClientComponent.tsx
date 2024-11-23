"use client";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-4">
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
