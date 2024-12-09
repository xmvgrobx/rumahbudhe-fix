import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const pg = await prisma.referral.findUnique({
      where: { id },
    });

    if (!pg) {
      return NextResponse.json({ message: "Kode not found" }, { status: 404 });
    }

    return NextResponse.json(pg); 
  } catch (error) {
    console.error("Error fetching kode:", error);
    return NextResponse.json(
      { message: "Failed to fetch kode data" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const { code, discount } = body;

    const updatedKode = await prisma.referral.update({
      where: { id },
      data: { code, discount },
    });

    return NextResponse.json(updatedKode); 
  } catch (error) {
    console.error("Error updating kode:", error);
    return NextResponse.json(
      { message: "Failed to update kode" },
      { status: 500 }
    );
  }
}
