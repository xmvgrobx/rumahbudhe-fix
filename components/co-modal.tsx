// import React, { useState } from "react";
// import { formatCurrency } from "@/lib/utils";

// const CheckoutModal = ({
//   cartItems,
//   clearCart,
//   onClose,
// }: {
//   cartItems: any[];
//   clearCart: () => void;
//   onClose: () => void;
// }) => {
//   const [payment, setPayment] = useState<number | string>(""); // Set default as empty string
//   const [change, setChange] = useState<number>(0);
//   const [referralCode, setReferralCode] = useState<string>("");
//   const [isValidCode, setIsValidCode] = useState<boolean>(false);
//   const [notes, setNotes] = useState<string>("");
//   const [paymentMethod, setPaymentMethod] = useState<"cash" | "qris">("cash");

//   // Fungsi untuk menghitung subtotal
//   const calculateSubtotal = () =>
//     cartItems.reduce((sum, item) => sum + (item.harga || 0) * (item.quantity || 0), 0);

//   // Fungsi untuk menghitung diskon
//   const calculateDiscount = (subtotal: number) =>
//     isValidCode ? subtotal * 0.1 : 0;

//   // Perhitungan subtotal, diskon, dan total harga
//   const subtotal = calculateSubtotal();
//   const discount = calculateDiscount(subtotal);
//   const totalHarga = subtotal - discount;

//   // Fungsi validasi kode referral
//   const validateReferralCode = (code: string) => {
//     const validCodes = ["DISKON10", "PROMO10", "HEMAT10", "CL16", "GR63"];
//     return validCodes.includes(code.toUpperCase());
//   };

//   // Handler perubahan kode referral
//   const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const code = e.target.value;
//     setReferralCode(code);
//     const isValid = validateReferralCode(code);
//     setIsValidCode(isValid);

//     // Update kembalian jika menggunakan cash
//     if (paymentMethod === "cash") {
//       const adjustedTotal = subtotal - (isValid ? discount : 0);
//       setChange((Number(payment) || 0) - adjustedTotal);
//     }
//   };

//   // Handler perubahan pembayaran
//   const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseFloat(e.target.value) || 0;
//     setPayment(value);
//     if (paymentMethod === "cash") {
//       setChange(value - totalHarga);
//     }
//   };

//   // Handler perubahan metode pembayaran
//   const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const method = e.target.value as "cash" | "qris";
//     setPaymentMethod(method);

//     if (method === "qris") {
//       setPayment(totalHarga);
//       setChange(0);
//     } else {
//       setPayment("");
//       setChange(0);
//     }
//   };

//   // Handler perubahan catatan
//   const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const value = e.target.value;
//     if (value.length <= 250) {
//       setNotes(value);
//     }
//   };

//   // Handler checkout
//   const handleCheckout = async () => {
//     try {
//       const response = await fetch("/api/transaction", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           items: cartItems.map((item) => ({
//             menuId: item.id,
//             quantity: item.quantity,
//             subtotal: item.harga * item.quantity,
//           })),
//           subtotal,
//           discount,
//           totalHarga,
//           metodeBayar: paymentMethod,
//           pembayaran: payment,
//           kembalian: change,
//           referralCode: isValidCode ? referralCode : null,
//           catatan: notes,
//           detailPesanan: cartItems.reduce((acc, item) => {
//             return `${acc}${item.nama}: ${formatCurrency(item.harga)} x ${item.quantity} = ${formatCurrency(item.harga * item.quantity)}\n`;
//           }, "") + 
//           (isValidCode ? `\nDiskon (10%): -${formatCurrency(discount)}` : "") +
//           `\nTotal: ${formatCurrency(totalHarga)}`,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Transaksi gagal. Silakan coba lagi.");
//       }

//       clearCart();
//       resetForm();
//       onClose();
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };

//   // Reset form setelah transaksi berhasil
//   const resetForm = () => {
//     setReferralCode("");
//     setIsValidCode(false);
//     setPayment("");
//     setChange(0);
//     setNotes("");
//     setPaymentMethod("cash");
//   };

//   return (
//     <div className="fixed top-0 right-0 h-screen w-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 border rounded-lg shadow-lg w-80">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Checkout</h2>
//           <button
//             className="text-gray-500 hover:text-gray-700"
//             onClick={onClose}
//           >
//             ×
//           </button>
//         </div>
//         {/* Detail Pesanan */}
//         <div>
//           <div>Subtotal: {formatCurrency(subtotal)}</div>
//           {isValidCode && <div className="text-green-600">Diskon: -{formatCurrency(discount)}</div>}
//           <div>Total: {formatCurrency(totalHarga)}</div>
//         </div>

//         {/* Input Referral */}
//         <div className="mt-2">
//           <label htmlFor="referral" className="block font-medium mb-1">
//             Kode Referral:
//           </label>
//           <input
//             type="text"
//             id="referral"
//             value={referralCode}
//             onChange={handleReferralChange}
//             className="border rounded px-3 py-2 w-full"
//             placeholder="Masukkan kode referral"
//           />
//           {referralCode && (
//             <p className={`text-sm mt-1 ${isValidCode ? "text-green-600" : "text-red-600"}`}>
//               {isValidCode ? "Kode valid! Diskon 10% berhasil diterapkan" : "Kode tidak valid"}
//             </p>
//           )}
//         </div>

//         {/* Catatan */}
//         <div className="mt-2">
//           <label htmlFor="notes" className="block font-medium mb-1">
//             Catatan: ({250 - notes.length} karakter tersisa)
//           </label>
//           <textarea
//             id="notes"
//             value={notes}
//             onChange={handleNotesChange}
//             className="border rounded px-3 py-2 w-full h-20 resize-none"
//             placeholder="Tambahkan catatan pesanan..."
//             maxLength={250}
//           />
//         </div>

//         {/* Metode Pembayaran */}
//         <div className="mt-2">
//           <label htmlFor="paymentMethod" className="block font-medium mb-1">
//             Metode Pembayaran:
//           </label>
//           <select
//             id="paymentMethod"
//             value={paymentMethod}
//             onChange={handlePaymentMethodChange}
//             className="border rounded px-3 py-2 w-full"
//           >
//             <option value="cash">Cash</option>
//             <option value="qris">QRIS</option>
//           </select>
//         </div>

//         {paymentMethod === "cash" && (
//           <>
//             <div className="mt-2">
//               <label htmlFor="payment" className="block font-medium mb-1">
//                 Pembayaran:
//               </label>
//               <input
//                 type="number"
//                 id="payment"
//                 value={payment === "" ? "" : payment}
//                 onChange={handlePaymentChange}
//                 className="border rounded px-3 py-2 w-full"
//               />
//             </div>
//             <div className="mt-2 font-medium">
//               Kembalian: {formatCurrency(change)}
//             </div>
//           </>
//         )}

//         <button
//           className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded w-full hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
//           onClick={handleCheckout}
//           disabled={
//             (paymentMethod === "cash" && Number(payment) < totalHarga) ||
//             cartItems.length === 0
//           }
//         >
//           {paymentMethod === "qris" ? "Bayar dengan QRIS" : "Bayar dengan Cash"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutModal;
import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";

const CheckoutModal = ({
  cartItems,
  clearCart,
  onClose,
}: {
  cartItems: any[];
  clearCart: () => void;
  onClose: () => void;
}) => {
  const [payment, setPayment] = useState<number | string>(""); // Default sebagai string kosong
  const [change, setChange] = useState<number>(0);
  const [referralCode, setReferralCode] = useState<string>("");

  const [isValidCode, setIsValidCode] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "qris">("cash");

  // Fungsi untuk menghitung subtotal
  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + (item.harga || 0) * (item.quantity || 0), 0);

  // Fungsi untuk menghitung total quantity barang
  const calculateTotalQuantity = () =>
    cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // Fungsi untuk menghitung diskon
  const calculateDiscount = (subtotal: number) =>
    isValidCode ? subtotal * 0.1 : 0;

  // Perhitungan subtotal, diskon, dan total harga
  const subtotal = calculateSubtotal();
  const discount = calculateDiscount(subtotal);
  const totalHarga = subtotal - discount;

  // Fungsi validasi kode referral
  const validateReferralCode = (code: string) => {
    const validCodes = ["DISKON10", "PROMO10", "HEMAT10", "CL16", "GR63"];
    return validCodes.includes(code.toUpperCase());
  };

  // Handler perubahan kode referral
  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setReferralCode(code);
    const isValid = validateReferralCode(code);
    setIsValidCode(isValid);

    // Update kembalian jika menggunakan cash
    if (paymentMethod === "cash") {
      const adjustedTotal = subtotal - (isValid ? discount : 0);
      setChange((Number(payment) || 0) - adjustedTotal);
    }
  };

  // Handler perubahan pembayaran
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setPayment(value);
    if (paymentMethod === "cash") {
      setChange(value - totalHarga);
    }
  };

  // Handler perubahan metode pembayaran
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

  // Handler perubahan catatan
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 250) {
      setNotes(value);
    }
  };

  // Handler checkout
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/transaksi/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          }, "") +
          (isValidCode ? `\nDiskon (10%): -${formatCurrency(discount)}` : "") +
          `\nTotal: ${formatCurrency(totalHarga)}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Transaksi gagal. Silakan coba lagi.");
      }

      clearCart(); // Clear cart setelah checkout berhasil
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  // Reset form setelah transaksi berhasil
  const resetForm = () => {
    setReferralCode("");
    setIsValidCode(false);
    setPayment("");
    setChange(0);
    setNotes("");
    setPaymentMethod("cash");
  };

  return (
    <div className="fixed top-0 right-0 h-screen w-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 border rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Checkout</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        {/* Detail Pesanan */}
        <div>
          <div>Subtotal: {formatCurrency(subtotal)}</div>
          {isValidCode && <div className="text-green-600">Diskon: -{formatCurrency(discount)}</div>}
          <div>Total: {formatCurrency(totalHarga)}</div>
          <div>Total Barang: {calculateTotalQuantity()} items</div> {/* Total Barang */}
        </div>

        {/* Input Referral */}
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

        {/* Catatan */}
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

        {/* Metode Pembayaran */}
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

        <button
          className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded w-full hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleCheckout}
          disabled={
            (paymentMethod === "cash" && Number(payment) < totalHarga) ||
            cartItems.length === 0
          }
        >
          {paymentMethod === "qris" ? "Bayar dengan QRIS" : "Bayar dengan Cash"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
