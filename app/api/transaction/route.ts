import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CartItem } from '@/lib/types'; // Assuming you have a type definition for CartItem

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, totalHarga, metodeBayar, catatan } = body;

    if (!items || items.length === 0 || !totalHarga || !metodeBayar) {
      return NextResponse.json({ error: 'Data tidak lengkap!' }, { status: 400 });
    }

    // Calculate the total quantity
    const totalQuantity = items.reduce(
      (sum: number, item: CartItem) => sum + item.quantity,
      0
    );

    // Create a new transaction
    const transaksi = await prisma.transaksi.create({
      data: {
        totalHarga,
        jumlah: totalQuantity,
        metodeBayar: metodeBayar.toString(), // Convert the metodeBayar value to a string
        catatan,
        transaksiDetail: {
          create: items.map((item: CartItem) => ({
            menuId: item.menuId,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        },
      },
      include: {
        transaksiDetail: true,
      },
    });

    return NextResponse.json({ message: 'Transaksi berhasil dibuat.', transaksi }, { status: 201 });
  } catch (error) {
    console.error('Error saat menyimpan transaksi:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat menyimpan transaksi.' }, { status: 500 });
  }
}