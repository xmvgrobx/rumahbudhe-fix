// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // Import useRouter untuk navigasi

// const EditStok = ({ id }: { id: string }) => {
//   const router = useRouter(); // Inisialisasi router

//   // State untuk menyimpan data employee yang sedang diedit
//   const [state, setState] = useState({
//     nama: '',
//     jumlah: '',
//     harga: '',
//   });

//   // Fetch data employee berdasarkan ID untuk prefill form
//   useEffect(() => {
//     const fetchStok = async () => {
//       try {
//         const response = await fetch(`/api/stok/${id}`);
//         if (response.ok) {
//           const data = await response.json();
//           setState(data); // Prefill form dengan data employee
//         } else {
//           console.error("Failed to fetch stok data");
//           alert("Failed to fetch stok data");
//         }
//       } catch (error) {
//         console.error("An error occurred:", error);
//         alert("An error occurred while fetching stok data");
//       }
//     };

//     fetchStok();
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setState((prev) => ({
//       ...prev,
//       [name]: name === "harga" ? parseFloat(value) || "" : value, // Konversi ke Float untuk harga
//     }));
//   };

//   // Handle submit untuk update employee
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`/api/stok/${id}`, {
//         method: "PUT", // Metode PUT untuk update
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(state), // Kirim data state
//       });

//       if (response.ok) {
//         alert("Stok updated successfully!");
//         router.push("/stok"); // Navigasi kembali ke halaman employee
//       } else {
//         console.error("Failed to update stok");
//         alert("Failed to update stok");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       alert("An error occurred while updating stok");
//     }
//   };

//   return (
//     <div className="mx-auto mt-5 max-w-md">
//       <h1 className="text-xl font-bold mb-4">Edit Stok</h1>
//       <form onSubmit={handleSubmit}>
//         {/* Input untuk name */}
//         <div className="mb-5">
//         <label
//               htmlFor="nama"
//               className="block text-sm font-medium text-gray-800"
//             >
//               Nama Stok
//             </label>
//             <input
//               type="text"
//               name="nama"
//               id="nama"
//               className="input input-bordered w-full max-w-xs"
//               placeholder="Nama stok dik..."
//             value={state.nama}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Input untuk email */}
//         <div className="mb-5">
//           <label
//               htmlFor="jumlah"
//               className="block text-sm font-medium text-gray-900"
//             >
//               Jumlah
//             </label>
//             <input
//               type="text"
//               name="jumlah"
//               id="jumlah"
//               className="input input-bordered w-full max-w-xs"
//               placeholder="Jumlah..."
//               value={state.jumlah}
//               onChange={handleChange}
//           />
//         </div>


//         <div className="mb-5">
//             <label
//               htmlFor="harga"
//               className="block text-sm font-medium text-gray-900"
//             >
//               Harga
//             </label>
//             <input
//               type="number"
//               name="harga"
//               id="harga"
//               className="input input-bordered w-full max-w-xs"
//               placeholder="Harganye..."
//               value={state.harga}
//               onChange={handleChange}
//             />
//           </div>


//         {/* Submit button */}
//         <button
//           type="submit"
//           className="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-5 py-3 text-center"
//         >
//           Update Stok
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditStok;


// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// interface FormErrors {
//   nama?: string;
//   jumlah?: string;
//   harga?: string;
//   general?: string;
// }

// const EditStok = ({ id }: { id: string }) => {
//   const router = useRouter(); // Inisialisasi router untuk navigasi
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [message, setMessage] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // State untuk menyimpan data stok yang sedang diedit
//   const [state, setState] = useState({
//     nama: '',
//     jumlah: '',
//     harga: '',
//   });

//   // Mengambil data stok berdasarkan ID untuk prefill form
//   useEffect(() => {
//     const fetchStok = async () => {
//       try {
//         const response = await fetch(`/api/stok/${id}`);
//         if (response.ok) {
//           const data = await response.json();
//           setState(data); // Prefill form dengan data stok yang ada
//         } else {
//           console.error('Failed to fetch stok data');
//           alert('Failed to fetch stok data');
//         }
//       } catch (error) {
//         console.error('An error occurred:', error);
//         alert('An error occurred while fetching stok data');
//       }
//     };

//     fetchStok();
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setState((prev) => ({
//       ...prev,
//       [name]: name === 'harga' ? parseFloat(value) || '' : value, // Konversi harga ke float
//     }));
//   };

//   // Validasi form sebelum submit
//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};
  
//     // Pastikan state.nama adalah string
//     if (!state.nama.trim()) {
//       newErrors.nama = 'Nama stok diperlukan';
//     }
  
//     // Pastikan state.jumlah adalah angka yang valid
//     if (!state.jumlah.trim()) {
//       newErrors.jumlah = 'Jumlah stok diperlukan';
//     } else if (isNaN(Number(state.jumlah)) || Number(state.jumlah) <= 0) {
//       newErrors.jumlah = 'Jumlah harus berupa angka lebih besar dari 0';
//     }
  
//     // Pastikan state.harga adalah string dan trim() bisa diterapkan
//     if (!String(state.harga).trim()) {
//       newErrors.harga = 'Harga diperlukan';
//     } else if (isNaN(Number(state.harga)) || Number(state.harga) <= 0) {
//       newErrors.harga = 'Harga harus berupa angka lebih besar dari 0';
//     }
  
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
  

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrors({});
//     setMessage(null);

//     // Validasi sebelum mengirimkan data
//     if (!validateForm()) {
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await fetch(`/api/stok/${id}`, {
//         method: 'PUT', // Menggunakan PUT untuk update data
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(state), // Kirimkan data form
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setErrors({
//           general: data.error || 'Terjadi kesalahan saat memperbarui stok',
//         });
//         return;
//       }

//       setMessage(data.message || 'Stok berhasil diperbarui!');
//       router.push('/stok'); // Redirect ke halaman stok setelah berhasil
//     } catch (error) {
//       setErrors({
//         general: 'Terjadi kesalahan saat menghubungi server',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center">Edit Stok</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Pesan Error Umum */}
//         {errors.general && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//             {errors.general}
//           </div>
//         )}

//         {/* Nama Stok */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Nama Stok</label>
//           <input
//             type="text"
//             name="nama"
//             value={state.nama}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded-lg ${errors.nama ? 'border-red-500' : 'border-gray-300'}`}
//             placeholder="Masukkan nama stok"
//           />
//           {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
//         </div>

//         {/* Jumlah Stok */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Jumlah Stok</label>
//           <input
//             type="text"
//             name="jumlah"
//             value={state.jumlah}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded-lg ${errors.jumlah ? 'border-red-500' : 'border-gray-300'}`}
//             placeholder="Masukkan jumlah stok"
//           />
//           {errors.jumlah && <p className="text-red-500 text-xs mt-1">{errors.jumlah}</p>}
//         </div>

//         {/* Harga Stok */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Harga</label>
//           <input
//             type="number"
//             name="harga"
//             value={state.harga}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded-lg ${errors.harga ? 'border-red-500' : 'border-gray-300'}`}
//             placeholder="Masukkan harga stok"
//             step="0.01"
//           />
//           {errors.harga && <p className="text-red-500 text-xs mt-1">{errors.harga}</p>}
//         </div>

//         {/* Pesan sukses */}
//         {message && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
//             {message}
//           </div>
//         )}

//         {/* Submit Button */}
//         <div>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
//           >
//             {isSubmitting ? 'Memperbarui stok...' : 'Perbarui Stok'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditStok;

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface FormErrors {
  nama?: string;
  jumlah?: string;
  harga?: string;
  general?: string;
}

const EditStok = ({ id }: { id: string }) => {
  const router = useRouter(); // Inisialisasi router untuk navigasi
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State untuk menyimpan data stok yang sedang diedit
  const [state, setState] = useState({
    nama: '',
    jumlah: '',
    harga: '',
  });

  // Mengambil data stok berdasarkan ID untuk prefill form
  useEffect(() => {
    const fetchStok = async () => {
      try {
        const response = await fetch(`/api/stok/${id}`);
        if (response.ok) {
          const data = await response.json();
          setState(data); // Prefill form dengan data stok yang ada
        } else {
          console.error('Failed to fetch stok data');
          alert('Failed to fetch stok data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while fetching stok data');
      }
    };

    fetchStok();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: name === 'harga' ? parseFloat(value) || '' : value, // Konversi harga ke float
    }));
  };

  // Validasi form sebelum submit
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
  
    // Pastikan state.nama adalah string
    if (!state.nama.trim()) {
      newErrors.nama = 'Nama stok diperlukan';
    }
  
    // Pastikan state.jumlah adalah angka yang valid
    if (!state.jumlah.trim()) {
      newErrors.jumlah = 'Jumlah stok diperlukan';
    } 
  
    // Pastikan state.harga adalah string dan trim() bisa diterapkan
    if (!String(state.harga).trim()) {
      newErrors.harga = 'Harga diperlukan';
    } else if (isNaN(Number(state.harga)) || Number(state.harga) <= 0) {
      newErrors.harga = 'Harga harus berupa angka lebih besar dari 0';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setMessage(null);

    // Validasi sebelum mengirimkan data
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/stok/${id}`, {
        method: 'PUT', // Menggunakan PUT untuk update data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state), // Kirimkan data form
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          general: data.error || 'Terjadi kesalahan saat memperbarui stok',
        });
        return;
      }

      setMessage(data.message || 'Stok berhasil diperbarui!');
      router.push('/stok'); // Redirect ke halaman stok setelah berhasil
    } catch (error) {
      setErrors({
        general: 'Terjadi kesalahan saat menghubungi server',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Stok</h2>
      <form onSubmit={handleSubmit}>
        {/* Pesan Error Umum */}
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {errors.general}
          </div>
        )}

        {/* Nama Stok */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nama Stok</label>
          <input
            type="text"
            name="nama"
            value={state.nama}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.nama ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan nama stok"
          />
          {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
        </div>

        {/* Jumlah Stok */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Jumlah Stok</label>
          <input
            type="text"
            name="jumlah"
            value={state.jumlah}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.jumlah ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan jumlah stok"
          />
          {errors.jumlah && <p className="text-red-500 text-xs mt-1">{errors.jumlah}</p>}
        </div>

        {/* Harga Stok */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Harga</label>
          <input
            type="number"
            name="harga"
            value={state.harga}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.harga ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan harga stok"
            step="0.01"
          />
          {errors.harga && <p className="text-red-500 text-xs mt-1">{errors.harga}</p>}
        </div>

        {/* Pesan sukses */}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {message}
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            {isSubmitting ? 'Memperbarui stok...' : 'Perbarui Stok'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStok;
