// import '@/app/ui/global.css';
// import { inter } from '@/app/ui/fonts';
// import { Poppins } from 'next/font/google';


// export const metadata = {
//   title: 'Rumah Budhe Coffee',
//   description: 'Great coffee everyday!'
// }
// const poppins = Poppins({subsets: ['latin'], weight:['100', '200', '300', '400', '500',
//   '600', '700','800', '900'],
//   variable: '--font-poppins'
// })
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} antialiased`}>{children}</body>
//     </html>
//   );
// }



'use client'
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Poppins } from 'next/font/google';
import { SessionProvider } from "next-auth/react";
// app/layout.tsx
// "use client";  // Pastikan ini adalah Client Component

import { ReactNode } from "react";
// import { SessionProvider } from "next-auth/react";  // Impor SessionProvider

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <SessionProvider>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>My Next.js App</title>
        </head>
         <body className={`${inter.className} antialiased`}>{children}</body>

      </html>
    </SessionProvider>
  );
}
