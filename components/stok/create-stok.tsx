// "use client"

// import React, { useState } from 'react';
// import { StokAddButton } from '@/components/buttons';

// const CreateStok = () => {
//   const [state, setState] = useState({
//     nama: '',
//     jumlah: '',
//     harga: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setState((prev) => ({
//       ...prev,
//       [name]: name === "harga" ? parseFloat(value) || "" : value, // Konversi ke Float untuk harga
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { nama, jumlah, harga} = state;

//     try {
//       const response = await fetch('/api/stok/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ nama, jumlah, harga }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log('Stok created successfully:', result);
//         // Handle successful response, like resetting the form or showing success message
//       } else {
//         console.error('Failed to create stok');
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//     }
//   };

//   return (
//     <div className="mx-auto mt-5 max-w-md">
//       <div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-5">
//             <label
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
//               placeholder="Nama stok..."
//               value={state.nama}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-5">
//             <label
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
//             />
//           </div>

//           <div className="mb-5">
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
//               placeholder="Harga..."
//               value={state.harga}
//               onChange={handleChange}
//             />
//           </div>

//           <StokAddButton label="Save" />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateStok;

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormErrors {
  nama?: string;
  jumlah?: string;
  harga?: string;
  general?: string;
}

const CreateStok = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nama: '',
    jumlah: '',
    harga: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama stok diperlukan';
    }

    if (!formData.jumlah.trim()) {
      newErrors.jumlah = 'Jumlah stok diperlukan';
    } else if (isNaN(Number(formData.jumlah)) || Number(formData.jumlah) <= 0) {
      newErrors.jumlah = 'Jumlah harus berupa angka lebih besar dari 0';
    }

    if (!formData.harga.trim()) {
      newErrors.harga = 'Harga diperlukan';
    } else if (isNaN(Number(formData.harga)) || Number(formData.harga) <= 0) {
      newErrors.harga = 'Harga harus berupa angka lebih besar dari 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setMessage(null);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/stok/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          general: data.error || 'Terjadi kesalahan saat membuat stok',
        });
        return;
      }

      setMessage(data.message || 'Stok berhasil dibuat!');
      router.push('/stok');
    } catch (err) {
      setErrors({
        general: 'Terjadi kesalahan saat menghubungi server',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* <h2 className="text-2xl font-bold mb-6 text-center">Buat Stok</h2> */}
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
            value={formData.nama}
            onChange={handleInputChange}
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
            value={formData.jumlah}
            onChange={handleInputChange}
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
            value={formData.harga}
            onChange={handleInputChange}
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
            {isSubmitting ? 'Membuat stok...' : 'Buat Stok'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStok;
