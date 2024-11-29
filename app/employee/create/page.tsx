import CreateEmployee from '@/components/employee/create-employee'
import React from 'react'

const CreateEmployeePage = () => {
  return (
    <div className='max-e-md mx-auto mt-5'>
        <h1 className='text-2xl text-center mb-2 '>Add New Employee</h1>
        <CreateEmployee/>
    </div>
  )
}

export default CreateEmployeePage