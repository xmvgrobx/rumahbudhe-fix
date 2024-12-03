// "use client";
// import React from "react";
// import { uploadMenu } from "@/lib/actions";
// import { useFormState } from "react-dom";
// import { SubmitButtonMenu } from "@/components/buttons";

// const CreateForm = () => {
//   const [state, formAction] = useFormState(uploadMenu, null);

//   return (
//     <form action={formAction}>
//       {/* Alert */}
//       {state?.message ? (
//         <div
//           className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
//           role="alert"
//         >
//           <div className="font-medium">{state?.message}</div>
//         </div>
//       ) : null}

//       <div className="mb-4 pt-2">
//         <input
//           type="text"
//           name="nama"
//           className="py-2 px-4 rounded-sm border border-gray-400 w-full"
//           placeholder="Nama..."
//         />
//         <div aria-live="polite" aria-atomic="true">
//           <p className="text-sm text-red-500 mt-2">{state?.error?.nama}</p>
//         </div>
//       </div>
//       <div className="mb-4 pt-2">
//         <input
//           type="file"
//           name="image"
//           className="file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full"
//         />
//         <div aria-live="polite" aria-atomic="true">
//           <p className="text-sm text-red-500 mt-2">{state?.error?.image}</p>
//         </div>
//       </div>

//       <div className="mb-4 pt-2">
//         <input
//           type="number"
//           name="harga"
//           className="py-2 px-4 rounded-sm border border-gray-400 w-full"
//           placeholder="Harga..."
//         />
//         <div aria-live="polite" aria-atomic="true">
//           <p className="text-sm text-red-500 mt-2">{state?.error?.harga}</p>
//         </div>
//       </div>

//       <div className="mb-4 pt-2">
//         <input
//           type="text"
//           name="keterangan"
//           className="py-2 px-4 rounded-sm border border-gray-400 w-full"
//           placeholder="Keterangan..."
//         />
//         <div aria-live="polite" aria-atomic="true">
//           <p className="text-sm text-red-500 mt-2">{state?.error?.keterangan}</p>
//         </div>
//       </div>

//       <div className="mb-4 pt-4">
//         <SubmitButtonMenu label="upload" />
//       </div>
//     </form>
//   );
// };

// export default CreateForm;

// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { SubmitButtonMenu } from '@/components/buttons';

// const CreateForm = () => {
//   const router = useRouter();
//   const [error, setError] = useState<any>(null);
//   const [message, setMessage] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setMessage(null);

//     try {
//       const formData = new FormData(e.currentTarget);
      
//       const response = await fetch('/api/menu/create', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.error);
//         return;
//       }

//       setMessage(data.message);
//       router.push('/menu');
//       router.refresh();
//     } catch (err) {
//       setError('An error occurred while creating the menu');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Alert */}
//       {message && (
//         <div
//           className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
//           role="alert"
//         >
//           <div className="font-medium">{message}</div>
//         </div>
//       )}

//       {error?.message && (
//         <div
//           className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
//           role="alert"
//         >
//           <div className="font-medium">{error.message}</div>
//         </div>
//       )}

//       <div className="mb-4 pt-2">
//         <input
//           type="text"
//           name="nama"
//           className="py-2 px-4 rounded-sm border border-gray-400 w-full"
//           placeholder="Nama..."
//         />
//         <div aria-live="polite" aria-atomic="true">
//           <p className="text-sm text-red-500 mt-2">{error?.nama}</p>
//         </div>
//       </div>

//       <div className="mb-4 pt-2">
//         <input
//           type="file"
//           name="image"
//           className="file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full"
//         />
//         <div aria-live="polite" aria-atomic="true">
//           <p className="text-sm text-red-500 mt-2">{error?.image}</p>
//         </div>
//       </div>

//       <div className="mb-4 pt-2">
//         <input
//           type="number"
//           name="harga"
//           className="py-2 px-4 rounded-sm border border-gray-400 w-full"
//           placeholder="Harga..."
//         />
//         <div aria-live="polite" aria-atomic="true">
//           <p className="text-sm text-red-500 mt-2">{error?.harga}</p>
//         </div>
//       </div>

//       <div className="mb-4 pt-2">
//         <input
//           type="text"
//           name="keterangan"
//           className="py-2 px-4 rounded-sm border border-gray-400 w-full"
//           placeholder="Keterangan..."
//         />
//         <div aria-live="polite" aria-atomic="true">
//           <p className="text-sm text-red-500 mt-2">{error?.keterangan}</p>
//         </div>
//       </div>

//       <div className="mb-4 pt-4">
//         <SubmitButtonMenu 
//           label={isSubmitting ? "Uploading..." : "Upload"} 
//           disabled={isSubmitting}
//         />
//       </div>
//     </form>
//   );
// };

// export default CreateForm;

"use client"

import React, { useState } from 'react';
import { MenuAddButton } from '@/components/buttons';

const CreateMenu = () => {
  const [state, setState] = useState({
    nama: '',
    harga: '',
    keterangan: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { nama, harga, keterangan } = state;

    const hargaFloat = parseFloat(harga);
    if (isNaN(hargaFloat)) {
      console.error('Invalid harga value');
      return;
    }

    try {
      const response = await fetch('/api/menu/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({ nama, harga: hargaFloat, keterangan }), // Send harga as a float
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Menu created successfully:', result);
      } else {
        console.error('Failed to create menu');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="mx-auto mt-5 max-w-md">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-gray-800"
            >
              Nama Menu
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              className="input input-bordered w-full max-w-xs"
              placeholder="Nama menu..."
              value={state.nama}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="harga"
              className="block text-sm font-medium text-gray-900"
            >
              Harga
            </label>
            <input
              type="number"
              name="harga"
              id="harga"
              className="input input-bordered w-full max-w-xs"
              placeholder="Harga..."
              value={state.harga}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="keterangan"
              className="block text-sm font-medium text-gray-900"
            >
              Keterangan
            </label>
            <input
              type="text"
              name="keterangan"
              id="keterangan"
              className="input input-bordered w-full max-w-xs"
              placeholder="Keterangan..."
              value={state.keterangan}
              onChange={handleChange}
            />
          </div>

          <MenuAddButton label="Save" />
        </form>
      </div>
    </div>
  );
};

export default CreateMenu;
