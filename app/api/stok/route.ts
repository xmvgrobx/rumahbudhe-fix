import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { draftMode } from 'next/headers';

// API route to disable draft mode
export async function GET(req: NextRequest) {
  try {
    const draft = draftMode(); // Get the draft mode object
    draft.disable(); // Correct way to disable draft mode
    
    // Fetch data from the database using Prisma
    const stok = await prisma.stok.findMany();
    return NextResponse.json(stok); // Return data as JSON
  } catch (error) {
    console.error('Error fetching stok:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data stok.' },
      { status: 500 }
    );
  }
}
