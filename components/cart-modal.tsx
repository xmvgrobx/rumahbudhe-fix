import React from 'react';
import { formatCurrency } from '@/lib/utils';

const CartModal = ({
  cartItems,
  removeFromCart,
  clearCart,
  onClose,
  onCheckout,
}: {
  cartItems: any[];
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  onClose: () => void;
  onCheckout: () => void;
}) => {
  // Hitung total harga sebelum diskon
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.harga || 0) * (item.quantity || 0),
    0
  );

  return (
    <div className="fixed top-0 right-0 h-screen w-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 border rounded-lg shadow-lg w-80 overflow-y-auto h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Pesanan</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            x
          </button>
        </div>
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
          <div className="mt-4">
            <div className="font-semibold">Subtotal: {formatCurrency(subtotal)}</div>
            <div className="flex justify-between mt-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={clearCart}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                onClick={onCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;