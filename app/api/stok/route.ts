import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { Stok } from '@prisma/client'; // Tipe otomatis dari Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Ambil data stok dari database dengan tipe eksplisit
    const stok: Stok[] = await prisma.stok.findMany();

    res.status(200).json(stok);
  } catch (error) {
    console.error('Error fetching stok:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data stok.' });
  }
}
