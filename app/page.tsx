// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
// import Lists from "@/components/Lists";

// export default async function Home() {
//   const session = await getServerSession(authOptions);

//   return (
//     <div className="grid justify-center items-center h-[80vh]">
//       <div>
//         <Lists />
//         <pre>{JSON.stringify(session)}</pre>
//       </div>
//     </div>
//   );
// }



import img from 'next/image'
import { getMenuItems } from '@/lib/data'
import MenuCard from '@/components/MenuCard'
import Link from 'next/link'

// const Image = img.default || img

export default async function HomePage() {
   const menuItems = await getMenuItems()

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Header */}
         <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-4 py-4">
               <div className="flex items-center justify-between">
                  <a href="/" className="text-2xl font-bold">Rumah Budhe Coffee</a>
                  <div className="space-x-4">
                     <a href="#menu" className="text-gray-600 hover:text-gray-900">Menu</a>
                     <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
                  </div>
               </div>
            </nav>
         </header>

         {/* Hero Section */}
         <section className="relative h-96 bg-yellow-800">
            <div className="relative w-full h-full">
               {/* <Image 
            src="/hero-image.jpg"
            alt="Coffee shop interior"
            width={1920}
            height={1080}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              opacity: 0.5
            }}
            priority
          /> */}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-center text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome To our Coffee House</h1>
                  <p className="text-xl mb-8">Discover the perfect blend</p>
                  {/* <Link href="/menu"> */}
                     <button
                        type="button"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-md"
                     >
                        View Menu
                     </button>
                  {/* </Link> */}
               </div>
            </div>
         </section>

         {/* Menu Section */}
         <section id="menu" className="py-16 container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {menuItems.map((item) => (
                  <MenuCard
                     key={item.id}
                     name={item.name}
                     price={item.price}
                     fotoUrl={item.fotoUrl}
                     description={item.description}
                  />
               ))}
            </div>
         </section>

         {/* Contact Section */}
         <section id="contact" className="bg-amber-900 text-white py-16">
            <div className="container mx-auto px-4">
               <h2 className="text-3xl font-bold text-center mb-8">Contact / Reservation</h2>
               <div className="max-w-xl mx-auto">
                  <p className="text-center mb-8">
                     For reservations or inquiries, please contact us or visit our store.
                  </p>
                  <div className="flex justify-center">
                     <button
                        type="button"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-md"
                     >
                        Book Now
                     </button>
                  </div>
               </div>
            </div>
         </section>

         {/* Footer */}
         <footer className="bg-amber-500 text-white py-8">
            <div className="container mx-auto px-4 text-center">
               <p>&copy; {new Date().getFullYear()} Rumah Budhe Coffee. All rights reserved.</p>
            </div>
         </footer>
      </div>
   )
}