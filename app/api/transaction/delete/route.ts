import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID transaksi tidak disediakan' },
        { status: 400 }
      );
    }

    // Hapus detail transaksi terlebih dahulu
    await prisma.detail.deleteMany({
      where: { transaksiId: id },
    });

    // Hapus transaksi
    await prisma.transaksi.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Transaksi berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus transaksi' },
      { status: 500 }
    );
  }
}
