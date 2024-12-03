import TransaksiTable from "../ui/transaksi/table";
import Search from "@/components/search";
import { CreateTransaksi } from "@/components/buttons";

const Transaksi = async ({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) => {
    const query = searchParams?.query || "";
    return (
        <div className="max-w-screen-md mx-auto mt-5">
           
            <div className="flxe items-center justify-between gap-1 mb-5">
            <Search/>
            <CreateTransaksi/>
            <TransaksiTable query={query}/>
            </div>
        </div>
    )
}

export default Transaksi;