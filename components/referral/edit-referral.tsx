"use client"

import React, { useState, useEffect } from 'react';
import { KodeAddButton } from '@/components/buttons';
import { useRouter } from 'next/navigation';

interface EditReferralProps {
  id: string;
}

const EditReferral: React.FC<EditReferralProps> = ({ id }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({
    code: '',
    discount: '',
  });

  // Fetch existing referral data
  useEffect(() => {
    const fetchReferral = async () => {
      try {
        const response = await fetch(`/api/referral/${id}`);
        if (response.ok) {
          const data = await response.json();
          setState({
            code: data.code,
            discount: data.discount.toString(),
          });
        } else {
          console.error('Failed to fetch referral');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferral();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: name === "discount" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { code, discount } = state;

    try {
      const response = await fetch(`/api/referral/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, discount }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Referral updated successfully:', result);
        router.push('/referral'); // Redirect to referral list page
        router.refresh(); // Refresh the page data
      } else {
        console.error('Failed to update referral');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto mt-5 max-w-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-5 max-w-md">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="code" className="block text-sm font-medium text-gray-800">
              Nama Kode
            </label>
            <input
              type="text"
              name="code"
              id="code"
              className="input input-bordered w-full max-w-xs"
              placeholder="Nama code..."
              value={state.code}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="discount" className="block text-sm font-medium text-gray-900">
              Discount
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              className="input input-bordered w-full max-w-xs"
              placeholder="Discount..."
              value={state.discount}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <KodeAddButton label="Update" />
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReferral;