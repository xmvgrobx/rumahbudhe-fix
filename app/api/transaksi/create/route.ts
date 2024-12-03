import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CartItem } from '@/lib/types'; // Pastikan tipe CartItem sudah didefinisikan

// Fungsi untuk menangani transaksi POST
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, totalHarga, metodeBayar, catatan } = body;

    // Validasi input
    if (!items || items.length === 0 || !totalHarga || !metodeBayar) {
      return NextResponse.json({ error: 'Data tidak lengkap!' }, { status: 400 });
    }

    // Menghitung jumlah total item
    const totalQuantity = items.reduce(
      (sum: number, item: CartItem) => sum + item.quantity,
      0
    );

    // Membuat transaksi baru
    const transaksi = await prisma.transaksi.create({
      data: {
        totalHarga,
        jumlah: totalQuantity,
        metodeBayar: metodeBayar.toString(), // Mengkonversi metodeBayar ke string
        catatan: catatan || null, // Catatan opsional
        transaksiDetail: {
          create: items.map((item: CartItem) => ({
            menuId: item.menuId,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        },
      },
      include: {
        transaksiDetail: true, // Menyertakan detail transaksi
      },
    });

    return NextResponse.json({
      message: 'Transaksi berhasil dibuat.',
      transaksi,
    }, { status: 201 });
  } catch (error) {
    console.error('Error saat menyimpan transaksi:', error);
    return NextResponse.json({
      error: 'Terjadi kesalahan saat menyimpan transaksi.',
    }, { status: 500 });
  }
}

// Fungsi untuk memperbarui transaksi (PUT)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, items, totalHarga, metodeBayar, catatan } = body;

    // Validasi ID transaksi
    if (!id) {
      return NextResponse.json({ error: 'ID transaksi diperlukan!' }, { status: 400 });
    }

    // Validasi input lainnya
    if (!items || items.length === 0 || !totalHarga || !metodeBayar) {
      return NextResponse.json({ error: 'Data tidak lengkap!' }, { status: 400 });
    }

    // Menghitung jumlah total item
    const totalQuantity = items.reduce(
      (sum: number, item: CartItem) => sum + item.quantity,
      0
    );

    // Memperbarui transaksi
    const updatedTransaksi = await prisma.transaksi.update({
      where: { id },
      data: {
        totalHarga,
        jumlah: totalQuantity,
        metodeBayar: metodeBayar.toString(), // Mengkonversi metodeBayar ke string
        catatan: catatan || null, // Catatan opsional
        transaksiDetail: {
          deleteMany: {}, // Menghapus semua detail transaksi lama
          create: items.map((item: CartItem) => ({
            menuId: item.menuId,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        },
      },
      include: {
        transaksiDetail: true, // Menyertakan detail transaksi yang diperbarui
      },
    });

    return NextResponse.json({
      message: 'Transaksi berhasil diperbarui.',
      transaksi: updatedTransaksi,
    }, { status: 200 });
  } catch (error) {
    console.error('Error saat memperbarui transaksi:', error);
    return NextResponse.json({
      error: 'Terjadi kesalahan saat memperbarui transaksi.',
    }, { status: 500 });
  }
}
