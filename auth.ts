// // 'use client'

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
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.role = token.role;
//       return session;
//     },
//   },
// });