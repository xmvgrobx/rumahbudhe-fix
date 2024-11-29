import React from "react";
import EditEmployee from "@/components/employee/edit-employee"; // Path ke form edit yang sudah dibuat

const EditEmployeePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit Employee</h1>
      {/* Kirimkan ID employee ke komponen edit */}
      <EditEmployee id={id} />
    </div>
  );
};

export default EditEmployeePage;
