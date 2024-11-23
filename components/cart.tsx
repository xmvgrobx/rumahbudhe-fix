import React, { useState } from 'react';
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
  const [payment, setPayment] = useState(0);
  const [change, setChange] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [isValidCode, setIsValidCode] = useState(false);
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'qris'

  // Hitung total harga sebelum diskon
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.harga || 0) * (item.quantity || 0),
    0
  );

  // Hitung diskon jika kode referral valid (10%)
  const discount = isValidCode ? subtotal * 0.1 : 0;

  // Total harga setelah diskon
  const totalHarga = subtotal - discount;

  // Fungsi untuk validasi kode referral
  const validateReferralCode = (code: string) => {
    const validCodes = ['DISKON10', 'PROMO10', 'HEMAT10', 'CL16', 'GR63'];
    return validCodes.includes(code.toUpperCase());
  };

  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setReferralCode(code);
    setIsValidCode(validateReferralCode(code));
    if (paymentMethod === 'cash') {
      setChange(payment - (subtotal - (validateReferralCode(code) ? subtotal * 0.1 : 0)));
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPayment(value);
    if (paymentMethod === 'cash') {
      setChange(value - totalHarga);
    }
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
    if (e.target.value === 'qris') {
      setPayment(totalHarga);
      setChange(0);
    } else {
      setPayment(0);
      setChange(0);
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 250) {
      setNotes(value);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            menuId: item.id,
            quantity: item.quantity,
            subtotal: item.harga * item.quantity,
          })),
          subtotal,
          discount,
          totalHarga,
          metodeBayar: paymentMethod,
          pembayaran: payment,
          kembalian: change,
          referralCode: isValidCode ? referralCode : null,
          catatan: notes,
          detailPesanan: cartItems.reduce((acc, item) => {
            return `${acc}${item.nama}: ${formatCurrency(item.harga)} x ${item.quantity} = ${formatCurrency(item.harga * item.quantity)}\n`;
          }, '') + 
          (isValidCode ? `\nDiskon (10%): -${formatCurrency(discount)}` : '') +
          `\nTotal: ${formatCurrency(totalHarga)}`,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
  
      clearCart();
      setReferralCode('');
      setIsValidCode(false);
      setPayment(0);
      setChange(0);
      setNotes('');
      setPaymentMethod('cash');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

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
            <div className="mt-4">
              <div className="font-semibold">Subtotal: {formatCurrency(subtotal)}</div>
              {isValidCode && (
                <div className="text-green-600">
                  Diskon (10%): -{formatCurrency(discount)}
                </div>
              )}
              <div className="font-bold text-lg">
                Total: {formatCurrency(totalHarga)}
              </div>
            </div>
            
            <div className="mt-2">
              <label htmlFor="referral" className="block font-medium mb-1">
                Kode Referral:
              </label>
              <input
                type="text"
                id="referral"
                value={referralCode}
                onChange={handleReferralChange}
                className="border rounded px-3 py-2 w-full"
                placeholder="Masukkan kode referral"
              />
              {referralCode && (
                <p className={`text-sm mt-1 ${isValidCode ? 'text-green-600' : 'text-red-600'}`}>
                  {isValidCode ? 'Kode valid! Diskon 10% berhasil diterapkan' : 'Kode tidak valid'}
                </p>
              )}
            </div>

            <div className="mt-2">
              <label htmlFor="notes" className="block font-medium mb-1">
                Catatan: ({250 - notes.length} karakter tersisa)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={handleNotesChange}
                className="border rounded px-3 py-2 w-full h-20 resize-none"
                placeholder="Tambahkan catatan pesanan..."
                maxLength={250}
              />
            </div>

            <div className="mt-2">
              <label htmlFor="paymentMethod" className="block font-medium mb-1">
                Metode Pembayaran:
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="cash">Cash</option>
                <option value="qris">QRIS</option>
              </select>
            </div>

            {paymentMethod === 'cash' && (
              <>
                <div className="mt-2">
                  <label htmlFor="payment" className="block font-medium mb-1">
                    Pembayaran:
                  </label>
                  <input
                    type="number"
                    id="payment"
                    value={payment}
                    onChange={handlePaymentChange}
                    className="border rounded px-3 py-2 w-full"
                  />
                </div>
                <div className="mt-2 font-medium">
                  Kembalian: {formatCurrency(change)}
                </div>
              </>
            )}

            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleCheckout}
              disabled={
                (paymentMethod === 'cash' && payment < totalHarga) ||
                cartItems.length === 0
              }
            >
              {paymentMethod === 'qris' ? 'Bayar dengan QRIS' : 'Bayar dengan Cash'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;