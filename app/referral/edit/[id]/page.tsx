// app/referral/edit/[id]/page.tsx
"use client"

import EditReferral from '@/components/referral/edit-referral';

export default function EditReferralPage({
  params
}: {
  params: { id: string }
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Referral Code</h1>
      <EditReferral id={params.id} />
    </div>
  );
}