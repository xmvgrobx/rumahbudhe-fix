'use client';

import Link from 'next/link';
import { IoAddSharp, IoPencil, IoTrashOutline, IoEye } from 'react-icons/io5';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { deleteEmployee, deleteImage, deleteTransaksi } from '@/lib/actions';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Modal from './employee/detail-employee';

export const CreateTransaksi = () => {
  return (
    <div className="mb-2 w-full text-right">
      <Link
        href="/transaksi/create"
        className="btn btn-ghost bg-yellow-300 hover:bg-yellow-400"
      >
        <IoAddSharp size={20} />
        Create
      </Link>
    </div>
  );
};

export const CreateEmployee = () => {
  return (
    <div className="mb-2 w-full text-right">
      <Link
        href="/employee/create"
        className="btn btn-ghost bg-yellow-200 hover:bg-yellow-300"
      >
        <IoAddSharp size={20} />
        Create
      </Link>
    </div>
  );
};


export const EditEmployee = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/employee/edit/${id}`}
      className="hover-bg-gray-100 rounded-sm"
    >
      <IoPencil size={20} />
    </Link>
  );
};

export const DeleteEmployee = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm('Yakin ingin menghapus pegawai ini?');
    if (!confirmed) return;

    setIsDeleting(true); // Mulai proses penghapusan

    try {
      const res = await fetch('/api/employee/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert('Pegawai berhasil dihapus');
        window.location.reload(); // Reload halaman untuk memperbarui data
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus pegawai');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menghapus pegawai');
    } finally {
      setIsDeleting(false); // Selesai proses penghapusan
    }
  };
  return (
    <form onSubmit={handleDelete}>
      <button 
        type="submit" 
        className="hover-bg-gray-100 rounded-sm"
        >
        <IoTrashOutline className="text-red-500" />
      </button>
    </form>
  // return (
  //   <button
  //     onClick={handleDelete}
  //     className={`py-3 text-sm rounded-bl-md w-full text-center ${
  //       isDeleting
  //         ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
  //         : 'bg-gray-50 hover:bg-gray-100'
  //     }`}
  //     disabled={isDeleting} // Nonaktifkan tombol saat proses berjalan
  //   >
  //     {isDeleting ? 'Deleting...' : 'Delete'}
  //   </button>
  );
};

export const CreateStok = () => {
  return (
    <div className="mb-2 w-full text-right">
      <Link
        href="/stok/create"
        className="btn btn-ghost bg-yellow-200 hover:bg-yellow-300"
      >
        <IoAddSharp size={20} />
        Create
      </Link>
    </div>
  );
};


export const EditStok = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/stok/edit/${id}`}
      className="hover-bg-gray-100 rounded-sm"
    >
      <IoPencil size={20} />
    </Link>
  );
};

export const DeleteStok = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm('Yakin ingin menghapus stok ini?');
    if (!confirmed) return;

    setIsDeleting(true); // Mulai proses penghapusan

    try {
      const res = await fetch('/api/stok/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert('Stok berhasil dihapus');
        window.location.reload(); // Reload halaman untuk memperbarui data
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus stok');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menghapus stok');
    } finally {
      setIsDeleting(false); // Selesai proses penghapusan
    }
  };
  return (
    <form onSubmit={handleDelete}>
      <button 
        type="submit" 
        className="hover-bg-gray-100 rounded-sm"
        >
        <IoTrashOutline className="w-5 text-red-500" />
      </button>
    </form>
  );
};

export const StokAddButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  const router = useRouter(); // Hook untuk navigasi
  const className = clsx(
    'text-white bg-yellow-200 hover:bg-yellow-300 font-medium rounded-lg text-sm w-80 px-5 py-3 text-center',
    {
      'opacity-50 cursor-progress': pending,
    },
  );

  const handleSubmit = () => {
    // Setelah submit selesai dan tidak ada error
    if (!pending) {
      router.push('/stok');
    }
  };

  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      onClick={handleSubmit} // Panggil handleSubmit setelah form submit
    >
      {label === 'save' ? (
        <span>{pending ? 'Saving...' : 'Save'}</span>
      ) : (
        <span>{pending ? 'Saving...' : 'Save'}</span>
      )}
    </button>
  );
};


export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  const className = clsx(
    'text-white bg-yellow-200 hover:bg-yellow-300 font-medium rounded-lg text-sm w-80 px-5 py-3 text-center',
    {
      'opacity-50 cursor-progress': pending,
    },
  );

  return (
    <button type="submit" className={className} disabled={pending}>
      {label === 'save' ? (
        <span>{pending ? 'Saving...' : 'Save'}</span>
      ) : (
        <span>{pending ? 'Updating...' : 'Update'}</span>
      )}
    </button>
  );
};

export const EmployeeAddButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  const router = useRouter(); // Hook untuk navigasi
  const className = clsx(
    'text-white bg-yellow-200 hover:bg-yellow-300 font-medium rounded-lg text-sm w-80 px-5 py-3 text-center',
    {
      'opacity-50 cursor-progress': pending,
    },
  );

  const handleSubmit = () => {
    // Setelah submit selesai dan tidak ada error
    if (!pending) {
      // Redirect ke halaman /employee setelah form berhasil disubmit
      router.push('/employee');
    }
  };

  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      onClick={handleSubmit} // Panggil handleSubmit setelah form submit
    >
      {label === 'save' ? (
        <span>{pending ? 'Saving...' : 'Save'}</span>
      ) : (
        <span>{pending ? 'Saving...' : 'Save'}</span>
      )}
    </button>
  );
};

export function EditTransaksi({ id }: { id: string }) {
  return (
    <Link
      href={`/transaksi/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <IoPencil className="w-5 text-yellow-500" />
    </Link>
  );
}

export function DeleteTransaksi({ id }: { id: string }) {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) return;

    try {
      const res = await fetch(`/api/transaction/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert('Transaksi berhasil dihapus');
        window.location.reload(); // Refresh halaman
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus transaksi');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Terjadi kesalahan saat menghapus transaksi');
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button 
        type="submit" 
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <IoTrashOutline className="w-5 text-red-500" />
      </button>
    </form>
  );
}

// export const SubmitButtonMenu = ({ label }: { label: string }) => {
//   const { pending } = useFormStatus();
//   return (
//     <button
//       className={clsx(
//         'w-full rounded-sm bg-yellow-200 px-6 py-2.5 text-base font-medium text-white hover:bg-yellow-300',
//         {
//           'cursor-progress opacity-50': pending,
//         },
//       )}
//       type="submit"
//       disabled={pending}
//     >
//       {label === 'upload' ? (
//         <>{pending ? 'Uploading...' : 'Upload'}</>
//       ) : (
//         <>{pending ? 'Updating...' : 'Update'}</>
//       )}
//     </button>
//   );
// };

export const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
      <button
          type="submit"
          disabled={pending}
          className="w-full text-white bg-yellow-400 font-medium rounded-lg shadow-md px-5
          py-2.5 text-center hover:bg-yellow-500"
      >
          {pending ? "Registering" : "Register"}

      </button>
  )
}

export const SubmitButtonMenu = ({ 
  label, 
  disabled 
}: { 
  label: string;
  disabled?: boolean;
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full bg-gray-800 text-white py-2 px-4 rounded-sm hover:bg-gray-900 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {label}
    </button>
  );
};

export const EditMenu = ({ id }: { id: string }) => {
  return (
    <Link
      href={`menu/edit/${id}`}
      className="py-3 text-sm bg-gray-50 rounded-bl-md w-full hover:bg-gray-100 text-center"
    >
      Edit
    </Link>
  );
};

// "use client";

// import React, { useTransition } from "react";

export const DeleteMenu = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm('Yakin ingin menghapus menu ini?');
    if (!confirmed) return;

    setIsDeleting(true); // Mulai proses penghapusan

    try {
      const res = await fetch('/api/delete/menu', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert('Menu berhasil dihapus');
        window.location.reload(); // Reload halaman untuk memperbarui data
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus menu');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menghapus menu');
    } finally {
      setIsDeleting(false); // Selesai proses penghapusan
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`py-3 text-sm rounded-bl-md w-full text-center ${
        isDeleting
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
      disabled={isDeleting} // Nonaktifkan tombol saat proses berjalan
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
};


// export const DeleteMenu = ({ id }: { id: string }) => {
//   const deleteImageWithId = deleteImage.bind(null, id);
//   return (
//     <form
//       action={deleteImageWithId}
//       className="py-3 text-sm bg-gray-50 rounded-bl-md w-full hover:bg-gray-100 text-center"
//     >
//       <DeleteBtn />
//     </form>
//   );
// };

// const DeleteBtn = () => {
//   const { pending } = useFormStatus();
//   return (
//     <button type="submit" disabled={pending}>
//       {pending ? 'Deleting...' : 'Delete'}
//     </button>
//   );
// };
