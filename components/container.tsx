import { Menu } from "@prisma/client";
import MenuCard from './menu-transaksi';

interface MenuGridProps {
  menus: Menu[];
  addToCart: (item: Menu) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ menus, addToCart }) => {
  return (
    <div className="w-full pr-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 max-w-[900px]">
        {menus.map((menu) => (
          <MenuCard
            key={menu.id}
            data={menu}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;