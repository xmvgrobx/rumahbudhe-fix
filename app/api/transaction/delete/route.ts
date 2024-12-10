import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: 'ID transaksi tidak ditemukan' },
        { status: 400 }
      );
    }

    const emp = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!emp) {
      return NextResponse.json(
        { error: 'Transaksi tidak ditemukan' },
        { status: 404 }
      );
    }

    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Transaksi berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting transaksi:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus transaksi' },
      { status: 500 }
    );
  }
}
