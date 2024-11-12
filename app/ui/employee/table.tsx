import { getEmployee } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { EditEmployee, DeleteEmployee } from "@/components/buttons";

const EmployeeTable = async ({
  query, 
}: {
  query: string; 
}) => {
  const employee = await getEmployee(query);


  
  return (
    <table className="w-full text-sm text-left bg-white text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-white-50">
        <tr>
          <th className="py-3 px-6">#</th>
          <th className="py-3 px-6">Name</th>
          <th className="py-3 px-6">Phone Number</th>
          <th className="py-3 px-6">Email</th>

          <th className="py-3 px-6">Created At</th>
          <th className="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employee.map((e, index) => (
          <tr key={e.id} className="bg-white border-b">
            <td className="py-3 px-6">{index+1}</td>
            <td className="py-3 px-6">{e.name}</td>
            <td className="py-3 px-6">{e.phone}</td>
            <td className="py-3 px-6">{e.email}</td>
            <td className="py-3 px-6">
              {formatDate(e.createdAt.toString())}
            </td>
            <td className="flex justify-center gap-1 py-3">
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