import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { FaUserShield, FaSignOutAlt } from "react-icons/fa";

import ProductsPage from "./admin/productsPage";
import AddProductPage from "./admin/addProductsPage";
import EditProductPage from "./admin/productsEditPage";
import AdminOrderPage from "./admin/orders";
import CheckUsersPage from "./admin/checkUsers";
import AdminReviewsPage from "./admin/reviews";

export default function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); // loading | authorized | unauthorized
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      setStatus("unauthorized");
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setAdmin(decoded);
    } catch {
      toast.error("Invalid session");
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URI + "/api/users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.role !== "Admin") {
          toast.error("You are not authorized to access admin panel");
          setStatus("unauthorized");
          navigate("/");
        } else {
          setStatus("authorized");
        }
      })
      .catch(() => {
        toast.error("Session expired. Please login again");
        setStatus("unauthorized");
        navigate("/login");
      });
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  }

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (status !== "authorized") {
    return null;
  }

  const navItems = [
    { name: "Products", path: "/admin/products" },
    { name: "Users", path: "/admin/users" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Reviews", path: "/admin/reviews" },
  ];

  return (
    <div className="w-full h-screen flex bg-gray-100 font-fancy">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-[280px] bg-white border-r shadow-sm flex flex-col">

        {/* ADMIN PROFILE */}
        <div className="px-6 py-5 border-b flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary text-white
            flex items-center justify-center text-xl shadow">
            <FaUserShield />
          </div>

          <div>
            <p className="text-xs text-gray-500">Administrator</p>
            <p className="font-semibold text-gray-800">
              {admin?.firstName} {admin?.lastName}
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-xl font-medium transition
                  ${
                    isActive
                      ? "bg-primary text-white shadow"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="px-6 py-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2
            py-2 rounded-xl text-sm font-semibold
            text-red-600 hover:bg-red-50 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            © 2025 Crystal Beauty
          </p>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/users" element={<CheckUsersPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/orders" element={<AdminOrderPage />} />
          <Route path="/reviews" element={<AdminReviewsPage />} />
          <Route path="/edit-product" element={<EditProductPage />} />
        </Routes>
      </main>
    </div>
  );
}
