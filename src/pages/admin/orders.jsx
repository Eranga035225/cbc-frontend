import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loading from "../../components/loading";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!isLoading) return;

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
  }, [isLoading]);

  function openOrderModal(order) {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedOrder(null);
  }

  function printOrder() {
    window.print();
  }

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
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
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
            <thead className="bg-gray-50 border-b">
              <tr className="text-gray-600 uppercase tracking-wide text-xs">
                <th className="px-6 py-4 text-left">Order ID</th>
                <th className="px-6 py-4 text-left">Customer</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-right">Total (Rs)</th>
                <th className="px-6 py-4 text-center">Date</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  onClick={() => openOrderModal(order)}
                  className="border-b hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="px-6 py-4 font-medium text-primary">
                    {order.orderId}
                  </td>
                  <td className="px-6 py-4">{order.name}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {order.email}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold">
                    Rs. {order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
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

      {/* ORDER DETAILS MODAL */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-auto p-6 outline-none"
        overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      >
        {selectedOrder && (
          <div
            id="order-print-area"
            className="space-y-6 max-h-[80vh] overflow-y-auto"
          >

            {/* MODAL HEADER */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold">
                Order {selectedOrder.orderId}
              </h2>
              <button
                onClick={closeModal}
                className="text-xl text-gray-500 hover:text-black no-print"
              >
                ✕
              </button>
            </div>

            {/* CUSTOMER INFO */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Customer</p>
                <p className="font-medium">{selectedOrder.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{selectedOrder.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{selectedOrder.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <p className="text-gray-500 text-sm">Delivery Address</p>
              <p className="font-medium">{selectedOrder.address}</p>
            </div>

            {/* PRODUCTS */}
            <div>
              <h3 className="font-semibold mb-2">Products</h3>
              <div className="space-y-2">
                {selectedOrder.products.map((p, i) => (
                  <div
                    key={i}
                    className="flex justify-between border rounded-xl px-4 py-2 text-sm"
                  >
                    <span>
                      {p.productInfo.name} × {p.quantity}
                    </span>
                    <span className="font-medium">
                      Rs. {(p.productInfo.price * p.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* TOTAL */}
            <div className="flex justify-end text-lg font-bold">
              Total: Rs. {selectedOrder.total.toFixed(2)}
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-4 border-t pt-4 no-print">
              <button
                onClick={printOrder}
                className="px-6 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
              >
                🖨 Print
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-xl bg-primary text-white hover:bg-accent"
              >
                Close
              </button>
            </div>

          </div>
        )}
      </Modal>
    </div>
  );
}
