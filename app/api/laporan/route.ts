// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma"; // Prisma instance

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const periode = searchParams.get("periode");

//   try {
//     const today = new Date();
//     let startDate: Date, endDate: Date;

//     // Tentukan rentang tanggal berdasarkan periode
//  if (periode === "bulanan") {
//       startDate = new Date(today.getFullYear(), today.getMonth(), 1); // Awal bulan
//       endDate = new Date(today);
//     } else if (periode === "tahunan") {
//       // Untuk periode tahunan, mulai dari awal tahun hingga hari ini
//       startDate = new Date(today.getFullYear(), 0, 1); // Awal tahun
//       endDate = new Date(today);
//     } else {
//       return NextResponse.json(
//         { error: "Parameter 'periode' tidak valid." },
//         { status: 400 }
//       );
//     }

//     // Query data transaksi dari database
//     const transaksi = await prisma.transaksi.findMany({
//       where: {
//         tanggal: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//       select: {
//         id: true,
//         totalHarga: true,
//         jumlah: true,
//         tanggal: true,
//       },
//     });

//     const total = transaksi.reduce((sum, item) => sum + item.totalHarga, 0);

//     // Response
//     return NextResponse.json({ transaksi, total });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Terjadi kesalahan saat memuat data laporan." },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Prisma instance

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const periode = searchParams.get("periode");
  const month = Number(searchParams.get("month"));
  const year = Number(searchParams.get("year"));

  try {
    const today = new Date();
    let startDate: Date, endDate: Date;

    // Handle period filtering based on the selected month and year
    if (periode === "bulanan") {
      if (!month || !year) {
        return NextResponse.json({ error: "Month and Year must be provided." }, { status: 400 });
      }
      startDate = new Date(year, month - 1, 1); // Start of the selected month
      endDate = new Date(year, month, 0); // End of the selected month
    } else if (periode === "tahunan") {
      if (!year) {
        return NextResponse.json({ error: "Year must be provided." }, { status: 400 });
      }
      startDate = new Date(year, 0, 1); // Start of the selected year
      endDate = new Date(year, 11, 31); // End of the selected year
    } else {
      return NextResponse.json({ error: "Invalid 'periode' parameter." }, { status: 400 });
    }

    // Query transactions from the database
    const transaksi = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        items: {
          include: {
            menu: true,  // Include menu data for each transaction item
          },
        },
      },
    });

    // Calculate total sales (total of each item based on quantity and price)
    const total = transaksi.reduce((sum, item) => {
      const itemTotal = item.items.reduce((itemSum, transactionItem) => {
        const price = transactionItem.price instanceof Decimal ? +transactionItem.price : transactionItem.price;
        const quantity = transactionItem.quantity;
        return itemSum + price * quantity;
      }, 0);
      return sum + itemTotal;
    }, 0);

    // Format transactions with details (items, price, quantity)
    const formattedTransactions = transaksi.map((item) => ({
      id: item.id,
      createdAt: item.createdAt,
      totalHarga: item.items.reduce((itemSum, transactionItem) => {
        const price = transactionItem.price instanceof Decimal ? +transactionItem.price : transactionItem.price;
        const quantity = transactionItem.quantity;
        return itemSum + price * quantity;
      }, 0),
      items: item.items.map((transactionItem) => ({
        menu: transactionItem.menu.name,
        quantity: transactionItem.quantity,
        price: transactionItem.price,
        total: transactionItem.price * transactionItem.quantity,
      })),
    }));

    return NextResponse.json({ transactions: formattedTransactions, total });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error occurred while fetching report data." },
      { status: 500 }
    );
  }
}



// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma"; // Prisma instance

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const periode = searchParams.get("periode");
//   const month = Number(searchParams.get("month"));
//   const year = Number(searchParams.get("year"));

//   try {
//     const today = new Date();
//     let startDate: Date, endDate: Date;

//     // Handle filtering based on period, month, and year
//     if (periode === "bulanan") {
//       if (!month || !year) {
//         return NextResponse.json({ error: "Month and Year must be provided." }, { status: 400 });
//       }
//       startDate = new Date(year, month - 1, 1); // Start of the selected month
//       endDate = new Date(year, month, 0); // End of the selected month
//     } else if (periode === "tahunan") {
//       if (!year) {
//         return NextResponse.json({ error: "Year must be provided." }, { status: 400 });
//       }
//       startDate = new Date(year, 0, 1); // Start of the selected year
//       endDate = new Date(year, 11, 31); // End of the selected year
//     } else {
//       return NextResponse.json({ error: "Invalid 'periode' parameter." }, { status: 400 });
//     }

//     const transaksi = await prisma.transaksi.findMany({
//       where: {
//         tanggal: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//       select: {
//         id: true,
//         totalHarga: true,
//         jumlah: true,
//         tanggal: true,
//       },
//     });

//     const total = transaksi.reduce((sum, item) => sum + item.totalHarga, 0);

//     return NextResponse.json({ transaksi, total });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Error occurred while fetching report data." },
//       { status: 500 }
//     );
//   }
// }
