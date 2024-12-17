// api/stok/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This endpoint fetches all stocks
export async function GET() {
  try {
    const stok = await prisma.stok.findMany(); // Fetch all stocks from the database

    return NextResponse.json(stok); // Return the list of stocks
  } catch (error) {
    console.error("Error fetching stok:", error);
    return NextResponse.json(
      { message: "Failed to fetch stok data" },
      { status: 500 }
    );
  }
}
