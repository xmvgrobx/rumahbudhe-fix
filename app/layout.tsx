import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Poppins } from 'next/font/google';
import { describe } from 'node:test';

export const metadata = {
  title: 'Rumah Budhe Coffee',
  description: 'Great coffee everyday!'
}
const poppins = Poppins({subsets: ['latin'], weight:['100', '200', '300', '400', '500',
  '600', '700','800', '900'],
  variable: '--font-poppins'
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

// 'use client'

// import { Inter } from 'next/font/google'
// import { SessionProvider } from "next-auth/react"
// import { ReactNode } from "react"
// import '@/app/ui/global.css'

// const inter = Inter({ subsets: ['latin'] })

// interface RootLayoutProps {
//   children: ReactNode;
// }
// // export const metadata = {
// //   title: 'Rumah Budhe Coffee',
// //   description: 'Great coffee everyday!'
// // }
// export default function RootLayout({ children }: RootLayoutProps) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <SessionProvider>
//           {children}
//         </SessionProvider>
//       </body>
//     </html>
//   )
// }