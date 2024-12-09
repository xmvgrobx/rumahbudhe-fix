// app/api/transaction/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// GET endpoint
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            menu: true
          }
        }
      },
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
    return NextResponse.json(
      { error: 'Error fetching transaction' },
      { status: 500 }
    );
  }
}

// PUT endpoint
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

    // Update the transaction
    const updatedTransaction = await prisma.transaction.update({
      where: { id: params.id },
      data: {
        note,
        paymentMethod,
        referralCode,
        discount,
        items: {
          deleteMany: {}, // Remove existing items
          create: items.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            menu: {
              connect: { id: item.menuId }
            }
          })),
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

// DELETE endpoint
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.transaction.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Transaction not found' },
          { status: 404 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Error deleting transaction' },
      { status: 500 }
    );
  }
}