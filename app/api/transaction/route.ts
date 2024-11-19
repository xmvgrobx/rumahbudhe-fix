import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { menuId, quantity, totalHarga, catatan, metodeBayar } = body;

    if (!menuId || !quantity || !totalHarga || !metodeBayar) {
      return NextResponse.json({ error: 'Data tidak lengkap!' }, { status: 400 });
    }

    // Periksa apakah menuId ada di tabel Menu
    const menu = await prisma.menu.findUnique({
      where: { id: menuId },
    });

    if (!menu) {
      return NextResponse.json({ error: 'Menu tidak ditemukan!' }, { status: 404 });
    }

    // Buat transaksi baru
    const transaksi = await prisma.transaksi.create({
      data: {
        totalHarga,
        jumlah: quantity,
        catatan,
        metodeBayar,
        transaksiDetail: {
          create: {
            menuId,
            quantity,
            subtotal: totalHarga,
          },
        },
      },
    });

    return NextResponse.json({ message: 'Transaksi berhasil dibuat.', transaksi }, { status: 201 });
  } catch (error) {
    console.error('Error saat menyimpan transaksi:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat menyimpan transaksi.' }, { status: 500 });
  }
}
