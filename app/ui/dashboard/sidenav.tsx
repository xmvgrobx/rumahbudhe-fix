import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { kanit , inter} from '@/app/ui/fonts';
 
 
export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-amber-950 p-4 md:h-40"
        href="/"
        >
          <p className={`${kanit.className} text-3xl text-white md:text-l md:leading-normal`}>
              Atma Barbershop </p>
 
        <div className="w-32 text-white md:w-40"></div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-amber-100 hover:text-amber-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <Link
              href="/">
                <div className="flex h-[48px] w-full items-center justify-center gap-2">
                  <ArrowUturnLeftIcon className="w-6" />
                  <div className={`${inter.className} hidden md:block`}>Back</div>
                </div>
            </Link>
          </button>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-amber-100 hover:text-amber-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className={`${inter.className} hidden md:block`}>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}