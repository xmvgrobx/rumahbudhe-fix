'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { put, del } from '@vercel/blob';
import { getImagesById } from './data';

const EmployeeSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(5),
  phone: z.string().min(11),
  shift: z.string().min(5)
});

const MenuSchema = z.object({
  nama: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: 'Image is required' })
    .refine((file) => file.size === 0 || file.type.startsWith('image/'), {
      message: 'Only images are allowed',
    })
    .refine((file) => file.size < 4000000, {
      message: 'Image must less than 4MB',
    }),
  harga: z.coerce.number().min(3),
  keterangan: z.string().min(5),
});

const EditMenuSchema = z.object({
  nama: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.type.startsWith('image/'), {
      message: 'Only images are allowed',
    })
    .refine((file) => file.size < 4000000, {
      message: 'Image must less than 4MB',
    })
    .optional(),
  harga: z.coerce.number().min(3),
  keterangan: z.string().min(5),
});


export const saveEmployee = async (prevState: any, formData: FormData) => {
  const validateFields = EmployeeSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validateFields.success) {
    return {
      Error: validateFields.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.employee.create({
      data: {
        name: validateFields.data.name,
        email: validateFields.data.email,
        phone: validateFields.data.phone,
        shift: validateFields.data.shift
      },
    });
  } catch (error) {
    return { message: 'Failed create employee' };
  }
  revalidatePath('/employee');
  redirect('/employee');
};

export const updateEmployee = async (
  id: string,
  prevState: any,
  formData: FormData,
) => {
  const validateFields = EmployeeSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validateFields.success) {
    return {
      Error: validateFields.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.employee.update({
      data: {
        name: validateFields.data.name,
        email: validateFields.data.email,
        phone: validateFields.data.phone,
      },
      where: { id },
    });
  } catch (error) {
    return { message: 'Failed update employee' };
  }
  revalidatePath('/employee');
  redirect('/employee');
};

export const deleteEmployee = async (id: string) => {
  try {
    await prisma.employee.delete({
      where: { id },
    });
  } catch (error) {
    return { message: 'Failed delete employee' };
  }
  revalidatePath('/employee');
  redirect('/employee');
};

export const uploadMenu = async (prevState: unknown, formData: FormData) => {
  const validateFields = MenuSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { nama, image, harga, keterangan } = validateFields.data;
  const { url } = await put(image.name, image, {
    access: 'public',
    multipart: true,
  });

  try {
    await prisma.menu.create({
      data: {
        nama,
        image: url,
        harga,
        keterangan,
      },
    });
  } catch (error) {
    return { message: 'Failed create menu' };
  }
  revalidatePath('/menu');
  redirect('/menu');
};

export const deleteImage = async (id: string) => {
  const data = await getImagesById(id);
  if (!data) return { message: 'No data found' };

  await del(data.image);
  try {
    await prisma.menu.delete({
      where: { id },
    });
  } catch (error) {
    return { message: 'Failed to delete photo' };
  }

  revalidatePath('/menu');
};

export const updateMenu = async (
  id: string,
  prevState: any,
  formData: FormData,
) => {
  const validateFields = EditMenuSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validateFields.success) {
    return {
      Error: validateFields.error.flatten().fieldErrors,
    };
  }

  const data = await getImagesById(id);
  if(!data) return {message: "No images found"}

  const { nama, image} = validateFields.data;
  let imagePath;
  if(!image || image.size <= 0){
    imagePath = data.image;
  }else{
    await del(data.image);
    const { url } = await put(image.name, image, {
      access: "public",
      multipart: true,
    })
    imagePath = url;
  }


  try {
    await prisma.menu.update({
      data: {
        nama: validateFields.data.nama,
        image: imagePath,
        harga: validateFields.data.harga,
        keterangan: validateFields.data.keterangan,
      },
      where: { id },
    });
  } catch (error) {
    return { message: 'Failed update menu' };
  }
  
  revalidatePath('/menu');
  redirect('/menu');
};

export const DetailSchema = z.object({
  transaksiId: z.string().nonempty("Transaksi ID is required"),
  menuId: z.string().nonempty("Menu ID is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  subtotal: z.number().positive("Subtotal must be a positive number"),
});

export const saveDetail = async (prevState: any, formData: FormData) => {
  const validateFields = DetailSchema.safeParse(
      Object.fromEntries(formData.entries())
  );
  if (!validateFields.success) {
      return {
          Error: validateFields.error.flatten().fieldErrors,
      };
  }
  try {
      await prisma.detail.create({
          data: {
              transaksiId: validateFields.data.transaksiId,
              menuId: validateFields.data.menuId,
              quantity: validateFields.data.quantity,
              subtotal: validateFields.data.subtotal,
          },
      });
  } catch (error) {
      return { message: 'Failed to create detail' };
  }
  revalidatePath('/transaksi');
  redirect('/transaksi');
};