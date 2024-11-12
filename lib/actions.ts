'use server';
import { z } from 'zod';
import {prisma} from "@/lib/prisma"
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const EmployeeSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(5),
  phone: z.string().min(11),
});

export const saveEmployee = async (prevState:any, formData: FormData) => {
  const validateFields = EmployeeSchema.safeParse(Object.fromEntries(formData.entries()));
  if(!validateFields.success){
    return{
      Error: validateFields.error.flatten().fieldErrors
    }
  }
  try{
    await prisma.employee.create({
      data:{
        name: validateFields.data.name,
        email: validateFields.data.email,
        phone: validateFields.data.phone
      }
    })
  } catch (error){
    return {message: "Failed create employee"}
  }
  revalidatePath("/employee");
  redirect("/employee")
}


export const updateEmployee = async (id: string, prevState:any, formData: FormData) => {
  const validateFields = EmployeeSchema.safeParse(Object.fromEntries(formData.entries()));
  if(!validateFields.success){
    return{
      Error: validateFields.error.flatten().fieldErrors
    }
  }
  try{
    await prisma.employee.update({
      data:{
        name: validateFields.data.name,
        email: validateFields.data.email,
        phone: validateFields.data.phone
      },
      where:{id}
    })
  } catch (error){
    return {message: "Failed update employee"}
  }
  revalidatePath("/employee");
  redirect("/employee")
}

export const deleteEmployee = async (id: string) => {
  try{
    await prisma.employee.delete({
      where:{id}
    })
  } catch (error){
    return {message: "Failed delete employee"}
  }
  revalidatePath("/employee");
  redirect("/employee")
}
