import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma, PaymentMethod } from '@prisma/client';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { 
        id: params.id 
      },
      include: {
        items: {
          include: {
            menu: true
          }
        }
      }
    });

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Transaction not found' },
          { status: 404 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Error fetching transaction' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      items,
      note,
      paymentMethod,
      cash,
      change,
      referralCode,
      discount,
    } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items array is required and cannot be empty' },
        { status: 400 }
      );
    }

    // Fetch menu items to get their current prices
    const menuIds = items.map(item => item.menuId);
    const menus = await prisma.menu.findMany({
      where: {
        id: {
          in: menuIds
        }
      }
    });

    // Create a map of menu prices
    const menuPrices = new Map(
      menus.map(menu => [menu.id, menu.price])
    );

    // Update the transaction
    const updatedTransaction = await prisma.transaction.update({
      where: { id: params.id },
      data: {
        note,
        paymentMethod: paymentMethod as PaymentMethod,
        cash: cash ? new Prisma.Decimal(cash) : null,
        change: change ? new Prisma.Decimal(change) : null,
        referralCode,
        discount: new Prisma.Decimal(discount || 0),
        items: {
          deleteMany: {}, // Remove existing items
          create: items.map((item) => {
            const menuPrice = menuPrices.get(item.menuId);
            if (!menuPrice) {
              throw new Error(`Price not found for menu item: ${item.menuId}`);
            }
            
            return {
              quantity: item.quantity,
              price: new Prisma.Decimal(menuPrice), // Use current menu price
              menu: {
                connect: { id: item.menuId }
              }
            };
          }),
        },
      },
      include: {
        items: {
          include: {
            menu: true
          }
        }
      },
    });

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Transaction not found' },
          { status: 404 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Error updating transaction' },
      { status: 500 }
    );
  }
}