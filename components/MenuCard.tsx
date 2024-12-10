import type { Menu } from '@/lib/utils'
import Image from 'next/image'

interface MenuCardProps extends Omit<Menu, 'createdAt' | 'updatedAt' | 'id'> {}

export default function MenuCard({ name, price, fotoUrl, description }: MenuCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
      <div className="relative">
        <div className="relative w-full h-48">
          <Image 
            src={fotoUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 rounded-full">
          Rp {price.toFixed(0)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        {description && (
          <p className="text-gray-600 text-sm">{description}</p>
        )}
      </div>
    </div>
  )
}