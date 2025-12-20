import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full h-[72px] bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-15 h-15 rounded-full object-cover"
          />
          <span className="text-xl font-bold text-gray-800">
            Beauty Cosmetics
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/products">Products</Link>
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/contact">Contact</Link>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-black transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
