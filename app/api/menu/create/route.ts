import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { put } from '@vercel/blob';
import { MenuSchema } from '@/lib/zod'; // Assuming you have this

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Validate the form data
    const validateFields = MenuSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validateFields.success) {
      return NextResponse.json(
        { error: validateFields.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { nama, image, harga, keterangan } = validateFields.data;

    // Upload image
    const { url } = await put(image.name, image, {
      access: 'public',
      multipart: true,
    });

    // Create menu
    const menu = await prisma.menu.create({
      data: {
        nama,
        image: url,
        harga,
        keterangan,
      },
    });

    return NextResponse.json(
      { message: 'Menu created successfully', menu },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating menu:', error);
    return NextResponse.json(
      { error: 'Failed to create menu' },
      { status: 500 }
    );
  }
}