'use client';

import { useRouter } from 'next/navigation';
import { CartItem } from '@/lib/types';
import EditCheckoutForm from '@/components/transaction/edit-transaksi';

const EditTransactionPage = ({
  params
}: {
  params: { id: string }
}) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleSuccess = (updatedData: any) => {
    alert('Transaction updated successfully');
    router.push('/transaction'); // or wherever your transactions list is
  };

  return (
    <EditCheckoutForm
      id={params.id}
      cartItems={[]} // Initial empty array, will be populated by the form
      onClose={handleClose}
      onSuccess={handleSuccess}
    />
  );
};

export default EditTransactionPage;