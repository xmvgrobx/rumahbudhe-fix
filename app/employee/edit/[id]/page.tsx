import UpdateEmployee from '@/components/edit-employee'
import { getEmployeeById } from '@/lib/data'
import { notFound } from 'next/navigation';
import React from 'react'

const UpdateEmployeePage = async({params}: {params:{id: string}}) => {
    const id = params.id;
    const employee = await getEmployeeById(id);
  

    if(!employee){
        notFound();
    }

    return (
    <div className='max-e-md mx-auto mt-5'>
        <h1 className='text-2xl text-center mb-2'>Update Employee</h1>
        <UpdateEmployee employee={employee}/>
    </div>
  )
}

export default UpdateEmployeePage