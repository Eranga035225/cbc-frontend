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

      axios.get(
        import.meta.env.VITE_BACKEND_URI + "/api/orders",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
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

  return (
    <div className="w-full h-full overflow-y-scroll">
      {isLoading ? (
        <Loading />
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order,index) => (
              <tr key={index}>
                <td>{order.orderId}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>{order.total}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
