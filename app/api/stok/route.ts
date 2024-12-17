import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Metode GET: Ambil data stok dari database
export async function GET(req: NextRequest) {
  try {
    const stok = await prisma.stok.findMany();
    return NextResponse.json(stok);
  } catch (error) {
    console.error('Error fetching stok:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data stok.' },
      { status: 500 }
    );
  }
}