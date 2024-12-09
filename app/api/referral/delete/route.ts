import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Referral item ID is required' },
        { status: 400 }
      );
    }

    const ref = await prisma.referral.findUnique({
      where: { id }
    });

    if (!ref) {
      return NextResponse.json(
        { error: 'Refferal item not found' },
        { status: 404 }
      );
    }

    await prisma.referral.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: 'Referral item deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting referral:', error);
    return NextResponse.json(
      {
        error: 'Failed to referral menu item',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}