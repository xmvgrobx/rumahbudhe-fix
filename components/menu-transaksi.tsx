import React from 'react';
import Image from 'next/image';
import type { Menu } from "@prisma/client";
import { formatCurrency } from '@/lib/utils';

interface MenuCardProps {
  data: Menu;
  addToCart: (item: Menu) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ data, addToCart }) => {
  return (
    <div className="relative w-full max-w-[150px] max-h-[200px] bg-white rounded-md overflow-hidden shadow hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative w-full aspect-square">
        <Image
          src={data.image}
          alt={data.nama}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="p-2">
        {/* Product Name */}
        <h2
          className="text-center text-xs font-medium text-gray-800 truncate"
          title={data.nama}
        >
          {data.nama}
        </h2>

        {/* Price */}
        <p className="text-center text-xs text-gray-700">
          {formatCurrency(data.harga).replace('Rp ', '')}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(data)}
        className="absolute bottom-1 right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold hover:bg-yellow-500 transition-colors"
        aria-label={`Tambah ${data.nama} ke keranjang`}
      >
        +
      </button>
    </div>
  );
};

export default MenuCard;
