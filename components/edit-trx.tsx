import React, { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";

// Define the types for transaction and form props
interface Transaksi {
  id: string;
  pembayaran: number;
  kembalian: number;
  referralCode: string | null;
  catatan: string;
  metodeBayar: "cash" | "qris";
  transaksiDetail: {
    menuId: string;
    menu: { harga: number };
    quantity: number;
  }[];
}

interface EditTransactionFormProps {
  transaction: Transaksi;
  onClose: () => void; // Close form callback
}

const EditTransactionForm = ({ transaction, onClose }: EditTransactionFormProps) => {
  const [payment, setPayment] = useState<number | string>(transaction.pembayaran || "");
  const [change, setChange] = useState<number>(transaction.kembalian || 0);
  const [referralCode, setReferralCode] = useState<string>(transaction.referralCode || "");
  const [isValidCode, setIsValidCode] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>(transaction.catatan || "");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "qris">(transaction.metodeBayar || "cash");

  // Calculate subtotal based on transaction details
  const calculateSubtotal = () =>
    transaction.transaksiDetail.reduce((sum, item) => sum + item.menu.harga * item.quantity, 0);

  // Calculate discount based on referral code validity
  const calculateDiscount = (subtotal: number) => (isValidCode ? subtotal * 0.1 : 0);

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount(subtotal);
  const totalHarga = subtotal - discount;

  // Validate referral code
  const validateReferralCode = (code: string) => {
    const validCodes = ["DISKON10", "PROMO10", "HEMAT10", "CL16", "GR63"];
    return validCodes.includes(code.toUpperCase());
  };

  // Handle referral code change
  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setReferralCode(code);
    const isValid = validateReferralCode(code);
    setIsValidCode(isValid);

    // Update change if paying by cash
    if (paymentMethod === "cash") {
      const adjustedTotal = subtotal - (isValid ? discount : 0);
      setChange(Number(payment) - adjustedTotal);
    }
  };

  // Handle payment change
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setPayment(value);
    if (paymentMethod === "cash") {
      setChange(value - totalHarga);
    }
  };

  // Handle payment method change
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const method = e.target.value as "cash" | "qris";
    setPaymentMethod(method);

    if (method === "qris") {
      setPayment(totalHarga);
      setChange(0);
    } else {
      setPayment("");
      setChange(0);
    }
  };

  // Handle notes change
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 250) {
      setNotes(value);
    }
  };

  // Handle form submission (update transaction)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/transaction/${transaction.id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: transaction.transaksiDetail.map(item => ({
            menuId: item.menuId,
            quantity: item.quantity,
            subtotal: item.menu.harga * item.quantity,
          })),
          totalHarga,
          metodeBayar: paymentMethod,
          pembayaran: Number(payment),
          kembalian: change,
          referralCode: isValidCode ? referralCode : null,
          catatan: notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }

      // Close the form after successful update
      onClose();
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  return (
    <div className="fixed top-0 right-0 h-screen w-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 border rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Transaction</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Display Transaction Summary */}
        <div>
          <div>Subtotal: {formatCurrency(subtotal)}</div>
          {isValidCode && <div className="text-green-600">Diskon: -{formatCurrency(discount)}</div>}
          <div>Total: {formatCurrency(totalHarga)}</div>
        </div>

        {/* Referral Code Input */}
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
            <p className={`text-sm mt-1 ${isValidCode ? "text-green-600" : "text-red-600"}`}>
              {isValidCode ? "Kode valid! Diskon 10% berhasil diterapkan" : "Kode tidak valid"}
            </p>
          )}
        </div>

        {/* Notes Input */}
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

        {/* Payment Method Selection */}
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

        {/* Payment Input (Cash Only) */}
        {paymentMethod === "cash" && (
          <>
            <div className="mt-2">
              <label htmlFor="payment" className="block font-medium mb-1">
                Pembayaran:
              </label>
              <input
                type="number"
                id="payment"
                value={payment === "" ? "" : payment}
                onChange={handlePaymentChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mt-2 font-medium">
              Kembalian: {formatCurrency(change)}
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded w-full hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={
            (paymentMethod === "cash" && Number(payment) < totalHarga) ||
            transaction.transaksiDetail.length === 0
          }
        >
          Update Transaction
        </button>
      </div>
    </div>
  );
};

export default EditTransactionForm;
