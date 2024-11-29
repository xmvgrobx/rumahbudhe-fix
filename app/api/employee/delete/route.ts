import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function DELETE(req: Request) {
  try {
    // Parse body untuk mendapatkan ID menu
    const { id } = await req.json();

    // Validasi ID
    if (!id) {
      return NextResponse.json(
        { error: 'ID employee tidak ditemukan' },
        { status: 400 }
      );
    }


    const emp = await prisma.employee.findUnique({
      where: { id },
    });

    if (!emp) {
      return NextResponse.json(
        { error: 'Employee tidak ditemukan' },
        { status: 404 }
      );
    }


    await prisma.employee.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Employee berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus employee' },
      { status: 500 }
    );
  }
}
