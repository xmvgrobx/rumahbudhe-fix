"use client";

import React, { useState } from "react";
import { IoEye } from "react-icons/io5";

const DetailEmployee = ({ id }: { id: string }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [employee, setEmployee] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);

  const fetchEmployeeDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/employee/${id}`); // Panggil GET API
      if (!response.ok) {
        throw new Error("Failed to fetch employee detail");
      }
      const data = await response.json();
      setEmployee(data); // Simpan data karyawan
    } catch (error) {
      console.error("Error fetching employee detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = async () => {
    setModalOpen(true);
    await fetchEmployeeDetail(); // Ambil data ketika modal dibuka
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="hover-bg-gray-100 rounded-sm"
        aria-label="View Employee Details"
      >
        <IoEye size={20} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Employee Details</h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : employee ? (
              <div>
                <p>
                  <strong>Full Name:</strong> {employee.name}
                </p>
                <p>
                  <strong>Email:</strong> {employee.email}
                </p>
                <p>
                  <strong>Phone:</strong> {employee.phone}
                </p>
                <p>
                  <strong>Shift:</strong> {employee.shift}
                </p>
              </div>
            ) : (
              <p>Failed to load employee details.</p>
            )}
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailEmployee;
