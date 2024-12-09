'use client'


import React, { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { EditCheckoutFormProps, PaymentMethodType, CartItem } from '@/lib/types';

const EditCheckoutForm: React.FC<EditCheckoutFormProps> = ({
  id,
  cartItems: initialCartItems,
  onClose,
  onSuccess,
}) => {
  const [note, setNote] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('CASH');
  const [cashAmount, setCashAmount] = useState<string>('');
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralDiscount, setReferralDiscount] = useState<number>(0);
  const [referralValid, setReferralValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch existing transaction data
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`/api/transaction/${id}`);
        if (!response.ok) throw new Error('Failed to fetch transaction');
        
        const data = await response.json();
        setCartItems(data.items);
        setNote(data.note || '');
        setPaymentMethod(data.paymentMethod);
        setCashAmount(data.cashAmount?.toString() || '');
        setReferralCode(data.referralCode || '');
        setReferralDiscount(data.discount || 0);
        setReferralValid(!!data.referralCode);
      } catch (error) {
        console.error('Error fetching transaction:', error);
        alert('Error loading transaction data');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  // Check referral code validity
  useEffect(() => {
    const checkReferralCode = async () => {
      if (!referralCode) {
        setReferralValid(false);
        setReferralDiscount(0);
        return;
      }

      try {
        const response = await fetch(`/api/referral/check/${referralCode}`);
        if (response.ok) {
          const { isValid, discount } = await response.json();
          setReferralValid(isValid);
          setReferralDiscount(discount);
        } else {
          setReferralValid(false);
          setReferralDiscount(0);
        }
      } catch (error) {
        console.error('Error checking referral code:', error);
        setReferralValid(false);
        setReferralDiscount(0);
      }
    };

    checkReferralCode();
  }, [referralCode]);

  // Calculate total using menu prices
  const total = cartItems.reduce(
    (sum, item) => sum + item.menu.price * item.quantity,
    0
  );

  // Calculate change for cash payments
  const change =
    paymentMethod === 'CASH' && cashAmount
      ? Math.max(0, parseFloat(cashAmount) - total * (1 - referralDiscount / 100))
      : 0;

  // Suggested cash amounts
  const suggestedAmounts = [
    Math.ceil(total / 20000) * 20000,
    Math.ceil(total / 40000) * 40000,
    Math.ceil(total / 50000) * 50000,
    Math.ceil(total / 100000) * 100000
  ];

  // Apply referral discount
  const discountedTotal = referralValid ? total * (1 - referralDiscount / 100) : total;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (paymentMethod === 'CASH' && parseFloat(cashAmount) < discountedTotal) {
      alert('Insufficient cash amount');
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch(`/api/transaction/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            menuId: item.menu.id,
            quantity: item.quantity
            // price will be fetched from the menu in the API
          })),
          note,
          paymentMethod,
          cash: paymentMethod === 'CASH' ? parseFloat(cashAmount) : null,
          change: paymentMethod === 'CASH' ? change : null,
          referralCode: referralValid ? referralCode : null,
          discount: referralValid ? referralDiscount : 0
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update transaction');
      }
  
      const updatedData = await response.json();
      onSuccess(updatedData);
    } catch (error) {
      console.error('Update error:', error);
      alert(error instanceof Error ? error.message : 'Error updating transaction');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg">
          Loading transaction data...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-full flex flex-col lg:flex-row">
        {/* Left Section - Main Form */}
        <div className="p-6 flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>

            {/* Order Summary */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Order Summary</h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.menu.fotoUrl}
                      alt={item.menu.name}
                      className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.menu.name}</h4>
                      {item.menu.description && (
                        <p className="text-sm text-gray-500">{item.menu.description}</p>
                      )}
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600">Quantity: {item.quantity}</span>
                        <span className="font-medium">{formatCurrency(item.menu.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Referral Code Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Referral Code
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Enter referral code"
                />
                {referralValid && (
                  <span className="ml-2 text-green-600 text-sm">
                    {referralDiscount}% discount applied
                  </span>
                )}
                {!referralValid && referralCode && (
                  <span className="ml-2 text-red-600 text-sm">
                    Invalid code
                  </span>
                )}
              </div>
            </div>

            {/* Order Total */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(total)}</span>
              </div>
              {referralDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({referralDiscount}%):</span>
                  <span>-{formatCurrency(total * (referralDiscount / 100))}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>{formatCurrency(discountedTotal)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
                disabled={
                  loading ||
                  (paymentMethod === 'CASH' && (!cashAmount || parseFloat(cashAmount) < discountedTotal))
                }
              >
                {loading ? 'Updating...' : 'Update Transaction'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Section - Payment Details */}
        <div className="p-6 flex-1 bg-gray-50 rounded-r-lg overflow-y-auto border-l">
          {/* Payment Method Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center p-3 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  value="CASH"
                  checked={paymentMethod === 'CASH'}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethodType)}
                  className="mr-2"
                />
                <span>Cash</span>
              </label>
              <label className="flex items-center p-3 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  value="QRIS"
                  checked={paymentMethod === 'QRIS'}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethodType)}
                  className="mr-2"
                />
                <span>QRIS</span>
              </label>
            </div>
          </div>

          {paymentMethod === 'CASH' && (
            <>
              {/* Quick Amount Selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Quick Amount Selection</h3>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setCashAmount(amount.toString())}
                      className="px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm transition-colors"
                    >
                      {formatCurrency(amount)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cash Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cash Amount
                </label>
                <input
                  type="number"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Enter cash amount"
                />
              </div>

              {/* Change Calculation */}
              {parseFloat(cashAmount) > 0 && (
                <div className="bg-white p-4 rounded-lg space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Total Bill:</span>
                    <span>{formatCurrency(discountedTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cash Amount:</span>
                    <span>{formatCurrency(parseFloat(cashAmount))}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Change:</span>
                    <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(change)}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Order Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Notes
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              rows={3}
              placeholder="Add any special instructions..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCheckoutForm;