import React from "react";
import { prisma } from "@/lib/prisma";
import type { Employee } from "@prisma/client";
import { EditEmployee, DeleteEmployee } from "@/components/buttons";
import DetailEmployee from "@/components/employee/detail-employee";

async function getEmployee(): Promise<Employee[]> {
  const emp = await prisma.employee.findMany();
  return emp;
}

const EmployeeTable = async () => {
  const emp = await getEmployee();

  return (
    <table className="w-full text-sm text-left bg-white text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-white-50">
        <tr>
          <th className="py-3 px-6">Name</th>
          <th className="py-3 px-6">Phone Number</th>
          <th className="py-3 px-6">Email</th>
          <th className="py-3 px-6">Jadwal Shift</th>
          <th className="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {emp.map((e) => (
          <tr key={e.id} className="bg-white border-b">
            <td className="py-3 px-6">{e.name}</td>
            <td className="py-3 px-6">{e.phone}</td>
            <td className="py-3 px-6">{e.email}</td>
            <td className="py-3 px-6">{e.shift}</td>
           
            <td className="flex justify-center gap-1 py-3">
              <DetailEmployee id={e.id}/>
              <EditEmployee id={e.id}/>
              <DeleteEmployee id={e.id}/>
            </td>
          </tr>

        )
        )}


      </tbody>
    </table>
  );
};

export default EmployeeTable;