// app/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import { format } from "date-fns";

type TransactionData = {
  id: string;
  createdAt: string;
  paymentMethod: string;
  total: number;
  items: {
    menu: {
      name: string;
    };
    quantity: number;
    price: number;
  }[];
};

type MenuPopularity = {
  name: string;
  orderCount: number;
  totalRevenue: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalRevenue: 0,
    averageTransaction: 0,
    totalMenuItems: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState<TransactionData[]>([]);
  const [popularMenus, setPopularMenus] = useState<MenuPopularity[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        setStats(data.stats);
        setRecentTransactions(data.recentTransactions);
        setPopularMenus(data.popularMenus);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Overview of your business</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Total Transactions</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.totalTransactions}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-800">
              Rp {stats.totalRevenue.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Average Transaction</h3>
            <p className="text-2xl font-bold text-gray-800">
              Rp {stats.averageTransaction.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Menu Items</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.totalMenuItems}</p>
          </div>
        </div>

        {/* Recent Transactions & Popular Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium text-gray-800 mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Time</th>
                    <th className="text-left py-2">Payment</th>
                    <th className="text-left py-2">Items</th>
                    <th className="text-left py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="py-2">
                        {format(new Date(transaction.createdAt), 'HH:mm')}
                      </td>
                      <td className="py-2">{transaction.paymentMethod}</td>
                      <td className="py-2">{transaction.items.length} items</td>
                      <td className="py-2">
                        Rp {transaction.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Items */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium text-gray-800 mb-4">Popular Menu Items</h3>
            <div className="space-y-4">
              {popularMenus.map((menu) => (
                <div key={menu.name} className="flex justify-between items-center">
                  <span className="font-medium">{menu.name}</span>
                  <div className="text-right">
                    <div className="text-gray-900">{menu.orderCount} orders</div>
                    <div className="text-sm text-gray-500">
                      Rp {menu.totalRevenue.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}