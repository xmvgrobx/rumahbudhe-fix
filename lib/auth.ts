import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import type { NextAuthOptions, DefaultSession, DefaultUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: "OWNER" | "PEGAWAI"; // Tambahkan role di sini
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: "OWNER" | "PEGAWAI"; // Tambahkan role di sesi
    };
  }

  interface JWT {
    id: string;
    role: "OWNER" | "PEGAWAI"; // Tambahkan role di JWT
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: true, // Pastikan role disertakan
          },
        });
        
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // Tambahkan role di sini
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role, // Tambahkan role ke token
        };
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role, // Tambahkan role ke sesi
        },
      };
    },
  },
};

// 'use client'

// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/lib/prisma";
// import Credentials from "next-auth/providers/credentials";
// import { SignInSchema } from "@/lib/zod";
// import { compareSync } from "bcrypt-ts";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" },
//   pages: {
//     signIn: "/login",
//   },
//   providers: [
//     Credentials({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         const validateFields = SignInSchema.safeParse(credentials);
//         if (!validateFields.success) {
//           return null;
//         }
//         const { email, password } = validateFields.data;

//         const user = await prisma.user.findUnique({
//           where: { email },
//         });
//         if (!user || !user.password) {
//           throw new Error("No user found");
//         }
//         const passwordMatch = compareSync(password, user.password);

//         if (!passwordMatch) return null;

//         return user;
//       },
//     }),
//   ],

// // callbacks gpt
// callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const protectedRoutes = ["/dashboard", "/user", "/menu"];
      
//       // Redirect unauthenticated users trying to access protected routes
//       if (!isLoggedIn && protectedRoutes.includes(nextUrl.pathname)) {
//         return Response.redirect(new URL("/login", nextUrl));
//       }
  
//       // Redirect authenticated users trying to access the login page
//       if (isLoggedIn && nextUrl.pathname === "/login") {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }
  
//       // Allow access to other routes
//       return true;
//     },

//     jwt({token, user}){
//       if(user) token.role = user.role;
//       return token;
//     },


//     session({session, token}){
//       session.user.id = token.sub;
//       session.user.role = token.role;
//       return session;
//     }
//   },
  
// });
