import { Link, Route, Routes, useLocation } from "react-router-dom";
import ProductsPage from "./admin/productsPage";
import AddProductPage from "./admin/addProductsPage";
import EditProductPage from "./admin/productsEditPage";
import AdminOrderPage from "./admin/orders";

export default function AdminPage() {
  const location = useLocation();

  const navItems = [
    { name: "Products", path: "/admin/products" },
    { name: "Users", path: "/admin/users" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Reports", path: "/admin/reports" },
  ];

  return (
    <div className="w-full h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-[280px] bg-white border-r shadow-sm flex flex-col">

        {/* LOGO / TITLE */}
        <div className="px-6 py-5 border-b">
          <h1 className="text-xl font-bold text-primary">
            Admin Panel
          </h1>
          <p className="text-xs text-gray-400">
            Dashboard
          </p>
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

        {/* FOOTER */}
        <div className="px-6 py-4 border-t text-xs text-gray-400">
          © 2025 Admin
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/users" element={<h1 className="p-6">Users</h1>} />
          <Route path="/orders" element={<AdminOrderPage />} />
          <Route path="/reports" element={<h1 className="p-6">Reports</h1>} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/edit-product" element={<EditProductPage />} />
        </Routes>
      </main>

    </div>
  );
}
