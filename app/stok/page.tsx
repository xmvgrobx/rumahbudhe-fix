import Sidebar from "@/components/sidebar"
import Link from "next/link";
import React from "react";
import StokTable from "../ui/stok/table";

const Home = async () => {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Stok</h1>
          <Link href="/stok/create" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Create
          </Link>
        </div>
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <StokTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
