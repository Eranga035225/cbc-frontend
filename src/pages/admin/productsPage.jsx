import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token")?.replace(/"/g, "");


    if (!token) {
      setError("You are not logged in");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URI + "/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);

        setProducts(response.data || []);

      })
      .catch((err) => {
        console.error("API error:", err);
      
        setProducts([]);
      });
  }, []);

  return (
    <div className="w-full h-full max-h-full overflow-y-scroll bg-amber-300 relative">
      {/* <Link >
        <button className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          Add New Product
        </button>
      </Link> */}

      {error && (
        <p className="text-red-500 text-center my-4">
          {error}
        </p>
      )}

      <table className="w-full text-center">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Labelled Price</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr key={item.productId}>
              <td>{item.productId}</td>
              <td>{item.name}</td>
              <td>
                <img
                  className="w-[50px] h-[50px] object-cover mx-auto"
                  src={item.images?.[0] || "/placeholder.png"}
                  alt={item.name}
                />
              </td>
              <td>{item.labeledPrice}</td>
              <td>{item.price}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
