'use client'

import { User, ChevronLast, SquareMenu, Utensils, ScanLine, Box, ClipboardMinus, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, ReactNode } from "react";
import { useSession } from "next-auth/react"; 
import { useRouter } from "next/navigation"; 
import Link from 'next/link'; 

interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

interface SidebarProps {
  children?: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const { data: session } = useSession(); 
  const userRole = session?.user?.role; 
  const router = useRouter(); 

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

  // Fungsi untuk menangani klik pada logo
  function handleLogoClick() {
    router.push("/dashboard");
  }

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/logo.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-20" : "w-0"
            } cursor-pointer`} 
            alt="Logo"
            onClick={handleLogoClick} 
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
          </div>
        </div>
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  href: string; 
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
