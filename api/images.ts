// /pages/api/images.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // Sesuaikan dengan konfigurasi Prisma Anda

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const images = await prisma.menu.findMany(); // Ambil data dari database
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
