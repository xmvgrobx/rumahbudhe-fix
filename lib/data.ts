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
