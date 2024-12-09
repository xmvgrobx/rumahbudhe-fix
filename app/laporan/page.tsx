// app/reports/page.tsx
"use client";
import { useState } from "react";
import { format } from "date-fns";
import { generateTransactionPDF } from "@/lib/utils";
import Sidebar from "@/components/sidebar";

export default function ReportsPage() {
  const [period, setPeriod] = useState("bulanan");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        periode: period,
        month: month.toString(),
        year: year.toString(),
      });

      const response = await fetch(`/api/laporan?${params}`);
      const result = await response.json();

      if (response.ok) {
        setData(result);
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("Error fetching report");
    }
    setLoading(false);
  };

  const downloadPDF = () => {
    if (!data) return;
    const doc = generateTransactionPDF(data);
    doc.save(`transaction-report-${period}-${year}${month ? `-${month}` : ""}.pdf`);
  };

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Transaction Reports</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="bulanan">Monthly</option>
              <option value="tahunan">Yearly</option>
            </select>

            {period === "bulanan" && (
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="border p-2 rounded"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {format(new Date(2024, m - 1), "MMMM")}
                  </option>
                ))}
              </select>
            )}

            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="border p-2 rounded"
            >
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(
                (y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                )
              )}
            </select>

            <button
              onClick={fetchReport}
              disabled={loading}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              {loading ? "Loading..." : "Generate Report"}
            </button>

            {data && (
              <button
                onClick={downloadPDF}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Download PDF
              </button>
            )}
          </div>

          {/* Results */}
          {data && (
            <div>
              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-blue-100 rounded-lg">
                  <h3 className="font-bold">Total Transactions</h3>
                  <p>{data.summary.totalTransactions}</p>
                </div>
                <div className="p-4 bg-green-100 rounded-lg">
                  <h3 className="font-bold">Total Revenue</h3>
                  <p>Rp {data.summary.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-yellow-100 rounded-lg">
                  <h3 className="font-bold">Total Discount</h3>
                  <p>Rp {data.summary.totalDiscount.toLocaleString()}</p>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Payment</th>
                      <th className="p-3 text-left">Subtotal</th>
                      <th className="p-3 text-left">Discount</th>
                      <th className="p-3 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.transactions.map((t: any) => (
                      <tr key={t.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{t.date}</td>
                        <td className="p-3">{t.paymentMethod}</td>
                        <td className="p-3">Rp {t.subtotal.toLocaleString()}</td>
                        <td className="p-3">Rp {t.discount.toLocaleString()}</td>
                        <td className="p-3">Rp {t.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}