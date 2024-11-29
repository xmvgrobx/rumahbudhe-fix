import React from "react";
import { prisma } from "@/lib/prisma";
import type { Stok } from "@prisma/client";
import StokTable from "../ui/stok/table";

async function getStok(): Promise<Stok[]> {
  const st = await prisma.stok.findMany();
  return st;
}

const StokPage = async () => {
  const emp = await getStok(); // Data diambil dari database

  return (
    <div className="max-w-screen-md mx-auto mt-28">
       {/* <h1>Employee List</h1> */}
      <StokTable />
    </div>
  );
};
export default StokPage;