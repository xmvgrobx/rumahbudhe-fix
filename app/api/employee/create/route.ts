import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, shift } = body;

    // Validate required fields
    if (!name || !email || !phone || !shift) {
      return NextResponse.json({ error: 'Data tidak lengkap!' }, { status: 400 });
    }

    // Create a new employee
    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        phone,
        shift,
      }
    });

    return NextResponse.json({ 
      message: 'Karyawan berhasil dibuat.', 
      employee 
    }, { status: 201 });
  } catch (error) {
    console.error('Error saat membuat karyawan:', error);
    return NextResponse.json({ 
      error: 'Terjadi kesalahan saat membuat karyawan.' 
    }, { status: 500 });
  }
}