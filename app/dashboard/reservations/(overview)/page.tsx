import LatestReservations from '@/app/ui/dashboard/latest-reservations';
import ReservationsTable from '@/app/ui/reservations/table';
import Search from '@/app/ui/search';
import Table from '@/app/ui/reservations/table';
import CreateReservations from '@/app/ui/reservations/buttons';
import { kanit, lusitana, inter } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  fetchCardData,
  fetchLatestReservations,
  fetchFilteredReservations
} from '@/lib/data';
import {
  SearchSkeleton,
  ReservationsTableSkeleton,
  CreateResSkeleton,
} from '@/app/ui/skeletons';
import { fetchReservationsPages } from '@/lib/data';
import Pagination from '@/app/ui/reservations/pagination';

// export default async function Page() {
//   await new Promise((resolve) => setTimeout(resolve, 3000));

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchReservationsPages(query);

  return (
    <div className="flex min-h-screen flex-col">
      <p className={`${lusitana.className} text-2xl`}>Reservations</p>
      <p className={lusitana.className}>221711721</p>
      <p className={lusitana.className}>Andrea Jatikumoro</p>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Suspense fallback={<SearchSkeleton />}>
          <Search placeholder="Search reservations..." />
        </Suspense>
        <Suspense fallback={<CreateResSkeleton />}>
          <CreateReservations />
        </Suspense>
      </div>

      <div className="mt-6 flow-root">

        {/* <Suspense fallback={<ReservationsTableSkeleton />}>
            <Table query="" currentPage={1} />
          </Suspense> */}
        <Suspense key={query + currentPage} fallback={<ReservationsTableSkeleton />}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>
      {/* <div className="mt-5 flex w-full justify-center">  */}
        <Pagination totalPages={totalPages} />
      </div>
    </div>
    // </div>
  );
}