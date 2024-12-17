//api/stok/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const stok = await prisma.stok.findUnique({
      where: { id },
    });

    if (!stok) {
      return NextResponse.json({ message: "Stok not found" }, { status: 404 });
    }

    return NextResponse.json(stok); // Kirim data employee sebagai response
  } catch (error) {
    console.error("Error fetching stok:", error);
    return NextResponse.json(
      { message: "Failed to fetch stok data" },
      { status: 500 }
    );
  }
}

// API untuk update employee berdasarkan ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const { nama, jumlah, harga } = body;

    // Update data karyawan
    const updatedStok = await prisma.stok.update({
      where: { id },
      data: { nama, jumlah, harga },
    });

    return NextResponse.json(updatedStok); // Kirim data yang telah diperbarui sebagai response
  } catch (error) {
    console.error("Error updating stok:", error);
    return NextResponse.json(
      { message: "Failed to update stok" },
      { status: 500 }
    );
  }
}
