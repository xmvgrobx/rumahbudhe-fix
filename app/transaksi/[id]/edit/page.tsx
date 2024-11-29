'use client'

import { useState, useEffect } from "react";
import EditTransactionForm from "@/components/edit-trx";

export default function EditTransactionPage({ params }: { params: { id: string } }) {
  const { id } = params; // Access dynamic route parameter
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      console.log("Fetching transaction with ID:", id); // Debug the ID
      try {
        const response = await fetch(`/api/transaction/${id}`);
        if (!response.ok) {
          throw new Error(`test: ${response.status}`);
        }
        const data = await response.json();
        setTransaction(data);
      } catch (error: any) {
        console.error("Error fetching transaction:", error.message);
        setError(error.message || "Error fetching transaction");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchTransaction();
  }, [id]);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div className="text-red-500">{error}</div>;
  // if (!transaction) 

 return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Transaction</h1>
      <EditTransactionForm transaction={transaction} onClose={() => console.log("Closed")} />
    </div>
  );
}
