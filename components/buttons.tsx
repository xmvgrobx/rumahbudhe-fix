'use client';

import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { SquarePen, EyeClosed, Trash, Pencil} from 'lucide-react';

export const EditPegawai = ({ id }: { id: string }) => {
    return (
      <Link
        href={`/pegawai/edit/${id}`}
        className="hover-bg-gray-100 rounded-sm"
      >
        <SquarePen size={20} />
      </Link>
    );
};
  

export const DeletePegawai = ({ id }: { id: string }) => {
    const [isDeleting, setIsDeleting] = useState(false);
  
    const handleDelete = async () => {
      const confirmed = window.confirm('Yakin ingin menghapus pegawai ini?');
      if (!confirmed) return;
  
      setIsDeleting(true); // Mulai proses penghapusan
  
      try {
        const res = await fetch('/api/pegawai/delete', {
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
          <Trash size={20} className="text-red-500" />
        </button>
      </form>
    );
  };

export const PegawaiAddButton = ({ label }: { label: string }) => {
    const { pending } = useFormStatus();
    const router = useRouter(); 
    const className = clsx(
      'text-white bg-yellow-200 hover:bg-yellow-300 font-medium rounded-lg text-sm w-80 px-5 py-3 text-center',
      {
        'opacity-50 cursor-progress': pending,
      },
    );
  
    const handleSubmit = () => {
      if (!pending) {
        router.push('/pegawai');
      }
    };
  
    return (
      <button
        type="submit"
        className={className}
        disabled={pending}
        onClick={handleSubmit} 
      >
        {label === 'save' ? (
          <span>{pending ? 'Saving...' : 'Save'}</span>
        ) : (
          <span>{pending ? 'Saving...' : 'Save'}</span>
        )}
      </button>
    );
};

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

export const DeleteMenu = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm('Yakin ingin menghapus menu ini?');
    if (!confirmed) return;

    setIsDeleting(true); // Mulai proses penghapusan

    try {
      const res = await fetch('/api/menu/delete', {
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

export const EditStok = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/stok/edit/${id}`}
      className="hover-bg-gray-100 rounded-sm"
    >
      <SquarePen size={20} />
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
          <Trash size={20} className="text-red-500" />
          </button>
    </form>
  );
};

// export const StokAddButton = ({ label }: { label: string }) => {
//   const { pending } = useFormStatus();
//   const router = useRouter(); 
//   const className = clsx(
//     'text-white bg-yellow-200 hover:bg-yellow-300 font-medium rounded-lg text-sm w-80 px-5 py-3 text-center',
//     {
//       'opacity-50 cursor-progress': pending,
//     },
//   );

//   const handleSubmit = () => {
//     if (!pending) {
//       router.push('/stok');
//     }
//   };

//   return (
//     <button
//       type="submit"
//       className={className}
//       disabled={pending}
//       onClick={handleSubmit} 
//     >
//       {label === 'save' ? (
//         <span>{pending ? 'Saving...' : 'Save'}</span>
//       ) : (
//         <span>{pending ? 'Saving...' : 'Save'}</span>
//       )}
//     </button>
//   );
// };

interface StokAddButtonProps {
  label: string;
  disabled?: boolean; // Tambahkan properti disabled, yang bersifat opsional
}

export const StokAddButton = ({ label, disabled }: StokAddButtonProps) => {
  const { pending } = useFormStatus();
  const router = useRouter(); 

  const className = clsx(
    'text-white bg-yellow-200 hover:bg-yellow-300 font-medium rounded-lg text-sm w-80 px-5 py-3 text-center',
    {
      'opacity-50 cursor-progress': pending || disabled, // Jika pending atau disabled, beri kelas untuk tampilan tombol yang tidak aktif
    },
  );

  const handleSubmit = () => {
    if (!pending && !disabled) {
      router.push('/stok');
    }
  };

  return (
    <button
      type="submit"
      className={className}
      disabled={pending || disabled} // Menonaktifkan tombol jika pending atau disabled
      onClick={handleSubmit}
    >
      {label === 'save' ? (
        <span>{pending ? 'Saving...' : 'Save'}</span>
      ) : (
        <span>{pending ? 'Saving...' : 'Save'}</span>
      )}
    </button>
  );
};

export const KodeAddButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  const router = useRouter(); 
  const className = clsx(
    'text-white bg-yellow-200 hover:bg-yellow-300 font-medium rounded-lg text-sm w-80 px-5 py-3 text-center',
    {
      'opacity-50 cursor-progress': pending,
    },
  );

  const handleSubmit = () => {
    if (!pending) {
      router.push('/referral');
    }
  };

  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      onClick={handleSubmit} 
    >
      {label === 'save' ? (
        <span>{pending ? 'Saving...' : 'Save'}</span>
      ) : (
        <span>{pending ? 'Saving...' : 'Save'}</span>
      )}
    </button>
  );
};

export const EditTransaksi = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/transaction/edit/${id}`}
      className="hover-bg-gray-100 rounded-sm"
    >
      <SquarePen size={20} />
    </Link>
  );
};

export const DeleteTransaksi = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm('Yakin ingin menghapus transaksi ini?');
    if (!confirmed) return;

    setIsDeleting(true); // Mulai proses penghapusan

    try {
      const res = await fetch('/api/transaction/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert('Transaksi berhasil dihapus');
        window.location.reload(); // Reload halaman untuk memperbarui data
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus transaksi');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menghapus transaksi');
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
          <Trash size={20} className="text-red-500" />
          </button>
    </form>
  );
};

export const EditKode = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/referral/edit/${id}`}
      className="hover-bg-gray-100 rounded-sm"
    >
      <SquarePen size={20} />
    </Link>
  );
};

export const DeleteKode = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm('Yakin ingin menghapus transaksi ini?');
    if (!confirmed) return;

    setIsDeleting(true); // Mulai proses penghapusan

    try {
      const res = await fetch('/api/referral/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert('Transaksi berhasil dihapus');
        window.location.reload(); // Reload halaman untuk memperbarui data
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus transaksi');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menghapus transaksi');
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
          <Trash size={20} className="text-red-500" />
          </button>
    </form>
  );
};