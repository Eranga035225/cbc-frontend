import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not logged in");
      return;
    }

    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URI + "/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProducts(response.data || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setProducts([]);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  function deleteProduct(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first");
      return;
    }

    axios
      .delete(import.meta.env.VITE_BACKEND_URI + "/api/products/" + productId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Product deleted successfully");
        setIsLoading(true);
      })
      .catch(() => {
        toast.error("Error deleting product");
      });
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 relative">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Products
        </h1>
      </div>

      {/* ADD PRODUCT FAB */}
      <Link
        to="/admin/add-product"
        className="fixed bottom-6 right-6 bg-primary text-white
        w-14 h-14 rounded-full flex items-center justify-center
        text-3xl shadow-lg hover:bg-accent transition"
      >
        +
      </Link>

      {/* ERROR */}
      {error && (
        <p className="text-red-500 text-center mb-4">
          {error}
        </p>
      )}

      {/* LOADING */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          No products found
        </div>
      ) : (

        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b sticky top-0">
              <tr className="text-gray-600 uppercase tracking-wide">
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Product</th>
                <th className="px-6 py-4 text-center">Image</th>
                <th className="px-6 py-4 text-right">Label Price</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr
                  key={item.productId}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-gray-500">
                    {item.productId}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800">
                    {item.name}
                  </td>

                  <td className="px-6 py-4">
                    <img
                      src={item.images?.[0] || "/placeholder.png"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg mx-auto"
                    />
                  </td>

                  <td className="px-6 py-4 text-right text-gray-500">
                    Rs. {item.labeledPrice}
                  </td>

                  <td className="px-6 py-4 text-right font-semibold text-primary">
                    Rs. {item.price}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          item.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {item.stock}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <FaTrash
                        onClick={() => deleteProduct(item.productId)}
                        className="text-red-500 cursor-pointer hover:scale-110 transition"
                      />
                      <MdModeEdit
                        onClick={() =>
                          navigate("/admin/edit-product", {
                            state: item,
                          })
                        }
                        className="text-blue-500 cursor-pointer hover:scale-110 transition"
                      />
                    </div>
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
