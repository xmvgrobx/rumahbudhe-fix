// app/api/reports/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const periode = searchParams.get("periode");
  const month = Number(searchParams.get("month"));
  const year = Number(searchParams.get("year"));

  try {
    let startDate: Date, endDate: Date;

    if (periode === "bulanan") {
      if (!month || !year) {
        return NextResponse.json(
          { error: "Month and Year required" },
          { status: 400 }
        );
      }
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0);
    } else if (periode === "tahunan") {
      if (!year) {
        return NextResponse.json(
          { error: "Year required" },
          { status: 400 }
        );
      }
      startDate = new Date(year, 0, 1);
      endDate = new Date(year, 11, 31, 23, 59, 59);
    } else {
      return NextResponse.json(
        { error: "Invalid period" },
        { status: 400 }
      );
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedTransactions = transactions.map((transaction) => {
      const subtotal = transaction.items.reduce((sum, item) => 
        sum + (Number(item.price) * item.quantity), 0);
      const total = subtotal - Number(transaction.discount);

      return {
        id: transaction.id,
        date: format(transaction.createdAt, 'dd/MM/yyyy HH:mm'),
        paymentMethod: transaction.paymentMethod,
        subtotal,
        discount: Number(transaction.discount),
        total,
        items: transaction.items.map((item) => ({
          name: item.menu.name,
          quantity: item.quantity,
          price: Number(item.price),
          total: item.quantity * Number(item.price),
        })),
      };
    });

    const summary = {
      totalTransactions: transactions.length,
      totalRevenue: formattedTransactions.reduce((sum, t) => sum + t.total, 0),
      totalDiscount: formattedTransactions.reduce((sum, t) => sum + t.discount, 0),
      paymentMethods: formattedTransactions.reduce((acc, t) => {
        acc[t.paymentMethod] = (acc[t.paymentMethod] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };

    return NextResponse.json({
      transactions: formattedTransactions,
      summary,
      period: {
        type: periode,
        startDate,
        endDate,
      },
    });

  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: "Error generating report" },
      { status: 500 }
    );
  }
}