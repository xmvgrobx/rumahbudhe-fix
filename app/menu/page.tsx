import Link from "next/link";
import { getImages } from "@/lib/data";
import MenuCard from "@/components/menu-card";
import Sidebar from "@/components/sidebar";

export default async function Home() {
  const images = await getImages();

  return (
    <div className="max-w-screen-lg mx-auto py-14">
      <Sidebar/>
      <div className="flex items-end justify-between">
        <h1 className="text-4xl font-bold">Menu</h1>
        <Link
          href="/menu/create"
          className="py-3 px-6 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg"
        >
          Tambah Menu
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {images.map((item) => (
          <MenuCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}