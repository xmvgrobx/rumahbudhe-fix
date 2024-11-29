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
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between p-4 w-full max-w-sm mx-auto">
      {/* Image Container */}
      <div className="w-full h-48 relative mb-4">
        <Image
          src={data.image}
          alt={data.nama}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col items-center text-center">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {data.nama}
        </h3>

        {/* Price */}
        <p className="text-gray-600 text-sm mb-4">
          {formatCurrency(data.harga).replace('Rp ', '')}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(data)}
        className="absolute bottom-4 right-4 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold hover:bg-yellow-500 transition-colors"
        aria-label={`Tambah ${data.nama} ke keranjang`}
      >
        +
      </button>
    </div>
  );
};

export default MenuCard;
