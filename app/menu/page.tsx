// import Image from "next/image";
// import Link from "next/link";
// import { DeleteButton, EditButton } from "@/components/button";
// import { getImages } from "@/lib/data";
 
// export default async function Home() {
//   const getimages = await getImages();
 
//   return (
//     <div className="max-w-screen-lg mx-auto py-14">
//       <h1 className="text-4xl font-bold">Nextjs 14 CRUD Create,Read,Update and Delete with upload and delete image Server-Side | Postgresql Prisma</h1>
//       <div className="flex items-end justify-between m-12">
//         <h1 className="text-4xl font-bold">Images</h1>
//         <Link
//           href="/create"
//           className="py-3 px-6 bg-green-700 hover:bg-green-800 text-white"
//         >
//           Upload New Image
//         </Link>
//       </div>
//       <div className="grid md:grid-cols-3 gap-5 mt-10">
//         {getimages.map((item) => (
//           <div key={item.id} className="max-w-sm border border-gray-200 rounded-md shadow">
//             <div className="relative aspect-video">
//               <Image
//                 src={`http://localhost:3000/assets/${item.image}`}
//                 alt={item.title}
//                 fill
//                 priority
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 className="rounded-t-md object-cover"
//               />
//             </div>
//             <div className="p-5">
//               <h1 className="text-2xl font-bold text-gray-900 truncate">
//                 {item.title}
//               </h1>
//             </div>
//             <div className="flex items-center justify-between">
//               <EditButton id={item.id} />
//               <DeleteButton id={item.id}/>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }