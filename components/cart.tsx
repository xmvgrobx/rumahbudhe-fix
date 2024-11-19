// 'use client';

import React from 'react';
import { formatCurrency } from '@/lib/utils';

const Cart = ({
  cartItems,
  removeFromCart,
  clearCart,
}: {
  cartItems: any[];
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}) => {
  const totalHarga = cartItems.reduce(
    (sum, item) => sum + (item.harga || 0) * (item.quantity || 0),
    0
  );
  
  return (
    <div className="fixed top-0 right-0 h-screen p-4">
      <div className="p-4 border rounded-lg shadow-lg bg-white w-80 overflow-y-auto h-full">
        <h2 className="text-xl font-bold mb-4">Pesanan</h2>
        {cartItems.length === 0 ? (
          <p>Keranjang kosong</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center mb-2 border-b pb-2"
              >
                <div>
                  <span className="font-semibold">{item.nama}</span>
                  <div className="text-sm text-gray-500">
                  {formatCurrency(item.harga || 0)} x {item.quantity || 0}
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromCart(item.id)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <div>
            <div className="mt-4 font-semibold">  Total: {formatCurrency(totalHarga)}
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
              onClick={clearCart}
            >
              Kosongkan Keranjang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}  

export default Cart;
