"use client";

import React, { useState } from "react";
import { EyeClosed } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface TransactionItem {
  id: string;
  quantity: number;
  price: number;
  menu: {
    id: string;
    name: string;
    price: number;
    fotoUrl: string;
    description?: string;
  };
}

interface Transaction {
  id: string;
  createdAt: string;
  paymentMethod: 'CASH' | 'QRIS';
  cash: number | null;
  change: number | null;
  note: string | null;
  referralCode: string | null;
  discount: number;
  items: TransactionItem[];
}

const DetailTransaction = ({ id }: { id: string }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setLoading] = useState(false);

  const fetchTransactionDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/transaction/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch transaction detail");
      }
      const data = await response.json();
      setTransaction(data);
    } catch (error) {
      console.error("Error fetching transaction detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = async () => {
    setModalOpen(true);
    await fetchTransactionDetail();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const calculateTotal = (items: TransactionItem[]) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="hover:bg-gray-100 rounded-sm p-1"
        aria-label="View Transaction Details"
      >
        <EyeClosed size={20} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            {isLoading ? (
              <div className="p-6 space-y-4">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ) : transaction ? (
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-bold">Transaction Details</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Order Items</h4>
                  <div className="space-y-3">
                    {transaction.items.map((item) => (
                      <div key={item.id} className="flex items-start space-x-4 bg-gray-50 p-3 rounded-lg">
                        <img
                          src={item.menu.fotoUrl}
                          alt={item.menu.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                        <div className="flex-grow">
                          <h5 className="font-medium">{item.menu.name}</h5>
                          {item.menu.description && (
                            <p className="text-sm text-gray-500">{item.menu.description}</p>
                          )}
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm">
                              {item.quantity} x {formatCurrency(item.price)}
                            </span>
                            <span className="font-medium">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Details */}
                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(calculateTotal(transaction.items))}</span>
                  </div>
                  {transaction.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({transaction.discount}%):</span>
                      <span>
                        -{formatCurrency((calculateTotal(transaction.items) * transaction.discount) / 100)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>
                      {formatCurrency(
                        calculateTotal(transaction.items) * (1 - transaction.discount / 100)
                      )}
                    </span>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-2 border-t pt-4 text-sm">
                  <p>
                    <strong>Payment Method:</strong> {transaction.paymentMethod}
                  </p>
                  {transaction.paymentMethod === 'CASH' && transaction.cash && (
                    <>
                      <p>
                        <strong>Cash Amount:</strong> {formatCurrency(transaction.cash)}
                      </p>
                      <p>
                        <strong>Change:</strong> {formatCurrency(transaction.change || 0)}
                      </p>
                    </>
                  )}
                  {transaction.referralCode && (
                    <p>
                      <strong>Referral Code:</strong> {transaction.referralCode}
                    </p>
                  )}
                  {transaction.note && (
                    <p>
                      <strong>Note:</strong> {transaction.note}
                    </p>
                  )}
                </div>

                {/* Close Button */}
                <div className="border-t pt-4">
                  <button
                    onClick={handleCloseModal}
                    className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <p className="text-red-500">Failed to load transaction details.</p>
                <button
                  onClick={handleCloseModal}
                  className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DetailTransaction;