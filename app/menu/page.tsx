import Sidebar from "@/components/sidebar"
import React from "react";
import MenuPage from "../ui/menu/table";

const Home = async () => {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
        </div>
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <MenuPage />
        </div>
      </div>
    </div>
  );
};

export default Home;
