import { prisma } from '@/lib/prisma';

export const getEmployee = async (query: string) => {
  try {
    const employee = await prisma.employee.findMany({
        where: {
            name: {
            contains: query,
            mode: 'insensitive'
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return employee;
  } catch (error) {
    throw new Error('Failed to fetch employee data');
  }
};

export const getEmployeeById = async (id: string) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
    });
    return employee;
  } catch (error) {
    throw new Error('Failed to fetch employee data');
  }
};

export const getImages = async () => {
  try {
    const result = await prisma.menu.findMany({
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
 
export const getImagesById = async (id: string) => {
  try {
    const result = await prisma.menu.findUnique({
      where: { id },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getTransaksi = async (query: string) => {
  try {
    const transaksi = await prisma.transaksi.findMany({
        where: {
            name: {
            contains: query,
            mode: 'insensitive'
            },
        },
        orderBy: {
            tanggal: "desc",
        },
    });
    return transaksi;
  } catch (error) {
    throw new Error('Failed to fetch transaksi data');
  }
};