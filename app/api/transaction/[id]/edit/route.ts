import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CartItem } from '@/lib/types'; // Assuming you have a type definition for CartItem

export async function PUT(req: Request) {
    try {
      const body = await req.json();
      const { id, items, totalHarga, metodeBayar, catatan } = body;
  
      if (!id) {
        return NextResponse.json({ error: 'ID transaksi diperlukan!' }, { status: 400 });
      }
  
      // Validate required fields
      if (!items || items.length === 0 || !totalHarga || !metodeBayar) {
        return NextResponse.json({ error: 'Data tidak lengkap!' }, { status: 400 });
      }
  
      // Calculate the total quantity
      const totalQuantity = items.reduce(
        (sum: number, item: CartItem) => sum + item.quantity,
        0
      );
  
      // Update the transaction
      const updatedTransaksi = await prisma.transaksi.update({
        where: { id },
        data: {
          totalHarga,
          jumlah: totalQuantity,
          metodeBayar: metodeBayar.toString(),
          catatan,
          // Delete existing details and create new ones
          transaksiDetail: {
            deleteMany: {},
            create: items.map((item: CartItem) => ({
              menuId: item.menuId,
              quantity: item.quantity,
              subtotal: item.subtotal,
            })),
          },
        },
        include: {
          transaksiDetail: true,
        },
      });
  
      return NextResponse.json({ 
        message: 'Transaksi berhasil diperbarui.', 
        transaksi: updatedTransaksi 
      }, { status: 200 });
    } catch (error) {
      console.error('Error saat memperbarui transaksi:', error);
      return NextResponse.json({ 
        error: 'Terjadi kesalahan saat memperbarui transaksi.' 
      }, { status: 500 });
    }
  }


