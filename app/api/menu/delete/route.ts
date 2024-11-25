import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { del } from '@vercel/blob'; // Fungsi untuk menghapus gambar

export async function DELETE(req: Request) {
  try {
    // Parse body untuk mendapatkan ID menu
    const { id } = await req.json();

    // Validasi ID
    if (!id) {
      return NextResponse.json(
        { error: 'ID menu tidak ditemukan' },
        { status: 400 }
      );
    }

    // Ambil data menu berdasarkan ID
    const menu = await prisma.menu.findUnique({
      where: { id },
    });

    if (!menu) {
      return NextResponse.json(
        { error: 'Menu tidak ditemukan' },
        { status: 404 }
      );
    }

    // Hapus gambar jika ada
    if (menu.image) {
      await del(menu.image); // Hapus gambar dari storage
    }

    // Hapus entri menu di database
    await prisma.menu.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Menu berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting menu:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus menu' },
      { status: 500 }
    );
  }
}
