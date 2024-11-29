// import { CreateEmployee } from "@/components/buttons";
// import EmployeeTable from "../ui/employee/table";
// import Search from "@/components/search";

// const Employee = async ({
//     searchParams,
//   }: {
//     searchParams?: {
//       query?: string;
//       page?: string;
//     };
//   }) => {
//     const query = searchParams?.query || "";
//     return (
//         <div className="max-w-screen-md mx-auto mt-5">

//             <div className="flex items-center justify-between gap-1 mb-5">
//             {/* <Search/>
//             <CreateEmployee /> */}
//             <EmployeeTable query={query}/>
//             </div>
//         </div>
//     )
// }

// export default Employee;

import React from "react";
import { prisma } from "@/lib/prisma";
import type { Employee } from "@prisma/client";
import EmployeeTable from "../ui/employee/table";

async function getEmployee(): Promise<Employee[]> {
  const emp = await prisma.employee.findMany();
  return emp;
}

const EmployeePage = async () => {
  const emp = await getEmployee(); // Data diambil dari database

  return (
    <div className="max-w-screen-md mx-auto mt-28">
       {/* <h1>Employee List</h1> */}
      <EmployeeTable />
    </div>
  );
};
export default EmployeePage;
