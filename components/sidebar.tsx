// 'use client'

// import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
// import { useContext, createContext, useState, ReactNode } from "react";

// interface SidebarContextType {
//   expanded: boolean;
// }

// const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// interface SidebarProps {
//   children: ReactNode;
// }

// export default function Sidebar({ children }: SidebarProps) {
//   const [expanded, setExpanded] = useState<boolean>(true);
  

//   return (
//     <aside className="h-screen">
//       <nav className="h-full flex flex-col bg-white border-r shadow-sm">
//         <div className="p-4 pb-2 flex justify-between items-center">
//           <img
//             src="https://img.logoipsum.com/243.svg"
//             className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
//             alt=""
//           />
//           <button
//             onClick={() => setExpanded((curr) => !curr)}
//             className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
//           >
//             {expanded ? <ChevronFirst /> : <ChevronLast />}
//           </button>
//         </div>

//         <SidebarContext.Provider value={{ expanded }}>
//           <ul className="flex-1 px-3">{children}</ul>
//         </SidebarContext.Provider>

//         <div className="border-t flex p-3">
//           <img
//             src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
//             alt=""
//             className="w-10 h-10 rounded-md"
//           />
//           <div
//             className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
//           >
//             <div className="leading-4">
//               <h4 className="font-semibold">John Doe</h4>
//               <span className="text-xs text-gray-600">johndoe@gmail.com</span>
//             </div>
//             <MoreVertical size={20} />
//           </div>
//         </div>
//       </nav>
//     </aside>
//   );
// }

// interface SidebarItemProps {
//   icon: ReactNode;
//   text: string;
//   active?: boolean;
//   alert?: boolean;
// }

// export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
//   const context = useContext(SidebarContext);

//   if (!context) {
//     throw new Error("SidebarContext is undefined. Make sure to use Sidebar within SidebarContext.Provider.");
//   }

//   const { expanded } = context;

//   return (
//     <li
//       className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
//         active
//           ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
//           : "hover:bg-indigo-50 text-gray-600"
//       }`}
//     >
//       {icon}
//       <span
//         className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
//       >
//         {text}
//       </span>
//       {alert && (
//         <div
//           className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}
//         />
//       )}

//       {!expanded && (
//         <div
//           className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
//         >
//           {text}
//         </div>
//       )}
//     </li>
//   );
// }

'use client'

import {User, ChevronLast, SquareMenu, Utensils, ScanLine, Box, ClipboardMinus, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, ReactNode } from "react";
import { useSession } from "next-auth/react"; // Menggunakan NextAuth untuk autentikasi
import Link from 'next/link'; // Import Link dari Next.js

interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

interface SidebarProps {
  children?: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const { data: session } = useSession(); // Ambil data pengguna dari sesi
  const userRole = session?.user?.role; // Akses role dari sesi

  // Menu lengkap
  const menuItems = [
    { icon: <User />, text: "Pegawai", role: "OWNER", href: "/pegawai" },
    { icon: <SquareMenu />, text: "Transaksi", role: "ALL", href: "/transaction" },
    { icon: <Utensils />, text: "Menu", role: "ALL", href: "/menu" },
    { icon: <Box />, text: "Stok", role: "ALL", href: "/stok" },
    { icon: <ScanLine />, text: "Referral", role: "ALL", href: "/referral" },
    { icon: <ClipboardMinus />, text: "Laporan", role: "OWNER", href: "/laporan" },
  ];

  // Filter menu berdasarkan role
  const filteredMenuItems = menuItems.filter(
    (item) => item.role === "ALL" || userRole === "OWNER"
  );

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/logo.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-20" : "w-0"
            }`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {filteredMenuItems.map((item, idx) => (
              <SidebarItem key={idx} icon={item.icon} text={item.text} href={item.href} />
            ))}
          </ul>
          {children}
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          {/* <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User avatar"
            className="w-10 h-10 rounded-md"
          /> */}
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{session?.user?.name || "John Doe"}</h4>
              <span className="text-xs text-gray-600">
                {session?.user?.email || "johndoe@gmail.com"}
              </span>
            </div>
            {/* <MoreVertical size={20} /> */}
          </div>
        </div>
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  href: string; // Menambahkan properti href
}

export function SidebarItem({ icon, text, href }: SidebarItemProps) {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarItem must be used within a Sidebar");
  }

  const { expanded } = context;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600`}
    >
      {icon}
      <Link href={href}>
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
      </Link>
    </li>
  );
}

// "use client"

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { auth, signOut } from "@/auth";
// import { User, Clipboard, ReceiptText, Blocks, NotebookText, TicketPercent, LogOut } from "lucide-react";

// const Sidebar = async () => {
//     const session = await auth();

//     return (
//         <aside className="sidebar w-20 md:w-64 bg-white border-r border-gray-200 shadow-md fixed left-0 top-0 h-full">
//             <div className="sidebar-header flex items-center p-6 gap-4 justify-start">
//                 {/* Logo */}
//                 <Link href="/" className="flex items-center gap-4">
//                     <Image src="/logo.png" alt="Logo" width={50} height={50} />
//                     <link
//                         href="https://fonts.googleapis.com/css2?family=Playwrite&display=swap"
//                         rel="stylesheet"
//                     ></link>
//                     <span
//                         className="text-black text-sm"
//                         style={{ fontFamily: "Playwrite US Trad, sans-serif" }}
//                     >
//                         rumahbudhe
//                     </span>
//                 </Link>
//             </div>

//             {/* Navigation Links */}
//             <nav className="nav-links mt-6">
//                 <ul className="flex flex-col px-6 text-gray-800 space-y-2 font-medium">
//                     {session && (
//                         <>
//                             {session.user.role == "user" ? (
//                                 <>
//                                     <li className="flex w-full items-center gap-3">
//                                         <User />
//                                         <Link href="/pegawai">Pegawai</Link>
//                                     </li>
//                                     <li className="flex w-full items-center gap-3">
//                                         <Clipboard />
//                                         <Link href="/laporan">Laporan</Link>
//                                     </li>
//                                 </>
//                             ) : null}

//                             <li className="flex w-full items-center gap-3">
//                                 <ReceiptText />
//                                 <Link href="/transaksi">Transaksi</Link>
//                             </li>
//                             <li className="flex w-full items-center gap-3">
//                                 <Blocks />
//                                 <Link href="/stok">Stok</Link>
//                             </li>
//                             <li className="flex w-full items-center gap-3">
//                                 <NotebookText />
//                                 <Link href="/menu">Menu</Link>
//                             </li>
//                             <li className="flex w-full items-center gap-3">
//                                 <TicketPercent />
//                                 <Link href="/kode">Kode Referral</Link>
//                             </li>
//                         </>
//                     )}
//                 </ul>
//             </nav>

//             {/* Logout Button */}
//             <div className="logout-section mt-auto px-6 mb-4 w-full">
//                 {session ? (
//                     <form
//                         action={async () => {
//                             "use server";
//                             await signOut({ redirectTo: "/login" });
//                         }}
//                     >
//                         <button
//                             type="submit"
//                             className="flex items-center gap-2 px-6 py-2 text-gray-800 w-full hover:bg-red-500 transition-colors font-medium"
//                         >
//                             <LogOut />
//                             Log Out
//                         </button>
//                     </form>
//                 ) : (
//                     <Link
//                         href="/login"
//                         className="flex items-center gap-2 w-full text-gray-800 hover:bg-blue-500 bg-blue-400 p-2 rounded-md mt-6 transition-colors"
//                     >
//                         Sign In
//                     </Link>
//                 )}
//             </div>
//         </aside>
//     );
// };

// export default Sidebar;