import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// API untuk mendapatkan data employee berdasarkan ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Cari employee berdasarkan ID
    const employee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json(employee); // Kirim data employee sebagai response
  } catch (error) {
    console.error("Error fetching employee:", error);
    return NextResponse.json(
      { message: "Failed to fetch employee data" },
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

    const { name, email, phone, shift } = body;

    // Update data karyawan
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: { name, email, phone, shift },
    });

    return NextResponse.json(updatedEmployee); // Kirim data yang telah diperbarui sebagai response
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { message: "Failed to update employee" },
      { status: 500 }
    );
  }
}
