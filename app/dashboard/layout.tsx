import SideNav from '@/app/ui/dashboard/sidenav';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const isEmployee = router.asPath.startsWith('/employee');
  const isOwner = router.asPath.startsWith('/owner');

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav role={isEmployee ? 'employee' : isOwner ? 'owner' : 'unknown'} />
      </div>

      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}