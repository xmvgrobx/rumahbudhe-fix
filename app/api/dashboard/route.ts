// app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get current date and start of day
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    // Get all transactions for today with their items and menu details
    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
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

    // Calculate total revenue
    const totalRevenue = transactions.reduce((sum, transaction) => {
      const transactionTotal = transaction.items.reduce(
        (itemSum, item) => itemSum + (Number(item.price) * item.quantity),
        0
      );
      return sum + (transactionTotal - Number(transaction.discount));
    }, 0);

    // Get menu popularity data
    const menuStats = await prisma.transactionItem.groupBy({
      by: ['menuId'],
      _sum: {
        quantity: true,
      },
      _count: {
        id: true,
      },
    });

    // Get menu details for popular items
    const menuDetails = await prisma.menu.findMany({
      where: {
        id: {
          in: menuStats.map(stat => stat.menuId),
        },
      },
    });

    // Calculate popular menus with order counts and revenue
    const popularMenus = menuStats
      .map(stat => {
        const menu = menuDetails.find(m => m.id === stat.menuId);
        return {
          name: menu?.name || 'Unknown',
          orderCount: stat._sum.quantity || 0,
          totalRevenue: (stat._sum.quantity || 0) * (menu?.price || 0),
        };
      })
      .sort((a, b) => b.orderCount - a.orderCount)
      .slice(0, 5);

    // Get total number of menu items
    const totalMenuItems = await prisma.menu.count();

    // Format recent transactions
    const recentTransactions = transactions.slice(0, 5).map(transaction => ({
      id: transaction.id,
      createdAt: transaction.createdAt,
      paymentMethod: transaction.paymentMethod,
      total: transaction.items.reduce(
        (sum, item) => sum + (Number(item.price) * item.quantity),
        0
      ) - Number(transaction.discount),
      items: transaction.items,
    }));

    return NextResponse.json({
      stats: {
        totalTransactions: transactions.length,
        totalRevenue,
        averageTransaction: transactions.length > 0 ? totalRevenue / transactions.length : 0,
        totalMenuItems,
      },
      recentTransactions,
      popularMenus,
    });

  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    return NextResponse.json(
      { error: "Error fetching dashboard data" },
      { status: 500 }
    );
  }
}