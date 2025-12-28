import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loading from "../../components/loading";

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please log in first");
        return;
      }

      axios
        .get(import.meta.env.VITE_BACKEND_URI + "/api/orders", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setOrders(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          toast.error(e.response?.data?.message || "Failed to load orders");
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  const statusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Orders
        </h1>
        <p className="text-sm text-gray-400">
          Manage customer orders
        </p>
      </div>

      {isLoading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-400 py-24">
          No orders found
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">

          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b sticky top-0 z-10">
              <tr className="text-gray-600 uppercase tracking-wide text-xs">
                <th className="px-6 py-4 text-left">Order ID</th>
                <th className="px-6 py-4 text-left">Customer</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Address</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-right">Total (Rs)</th>
                <th className="px-6 py-4 text-center">Date</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-primary">
                    {order.orderId}
                  </td>

                  <td className="px-6 py-4 text-gray-800">
                    {order.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {order.email}
                  </td>

                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                    {order.address}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {order.phone}
                  </td>

                  <td className="px-6 py-4 text-right font-semibold text-primary">
                  {order.total?.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-center text-gray-500">
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
