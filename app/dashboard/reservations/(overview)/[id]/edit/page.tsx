import Form from '@/app/ui/reservations/edit-form';
import Breadcrumbs from '@/app/ui/reservations/breadcrumbs';
import { fetchReservationsById, fetchCustomers } from '@/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [reservations, customers] = await Promise.all([
        fetchReservationsById(id),
        fetchCustomers(),
      ]);
      return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Reservations', href: '/dashboard/reservations' },
          {
            label: 'Edit Reservations',
            href: `/dashboard/reservations/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form reservations={reservations} customers={customers} />
    </main>
  );
}