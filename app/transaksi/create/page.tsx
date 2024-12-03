// import { getImages } from "@/lib/data"; 
// import ClientComponent from "@/components/ClientComponent"; 

// export default async function Home() {
//     const images = await getImages();

//     return (
//         <div>
//             <ClientComponent
//                 images={images} // Pastikan tipe data images sesuai dengan yang diterima ClientComponent
//             />
//         </div>
//     );
// }


import { getMenus } from "@/lib/data"; // Sesuaikan nama fungsi dengan yang kamu pakai
import ClientComponent from "@/components/ClientComponent";

export default async function Home() {
  // Mengambil data menu dari database
  const menus = await getMenus(); // Pastikan data yang dikembalikan sesuai dengan tipe Menu

  return (
    <div>
      <ClientComponent
        menus={menus} // Kirim data menu ke ClientComponent
      />
    </div>
  );
}
