import { Link, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import {jwtDecode } from "jwt-decode";


export default function Header() {
  const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  return (
    <header className="w-full h-[72px] sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto h-full px-6
        flex items-center justify-between font-fancy relative">

        {/* MOBILE MENU */}
        <GiHamburgerMenu
          className="text-3xl md:hidden text-gray-700
          hover:text-primary transition cursor-pointer"
          onClick={() => setSideDrawerOpened(true)}
        />

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-12 h-12 rounded-full object-cover
            ring-2 ring-primary group-hover:scale-105
            transition-all duration-300"
          />
          <span className="text-xl font-bold text-primary tracking-wide">
            Crystal Beauty
          </span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {["Home", "Products", "About", "Contact"].map((item, index) => (
            <Link
              key={index}
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className="text-gray-700 font-medium relative
                hover:text-primary transition
                after:content-[''] after:absolute after:left-0 after:-bottom-1
                after:w-0 after:h-[2px] after:bg-primary
                hover:after:w-full after:transition-all"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3 relative">

          {/* SEARCH */}
          <button
            onClick={() => navigate("/search")}
            className="w-10 h-10 flex items-center justify-center
              rounded-full border border-gray-200
              text-gray-600 hover:text-primary hover:border-primary
              hover:bg-gray-100 transition-all"
          >
            <FiSearch />
          </button>

          {/* CART */}
          <Link
            to="/cart"
            className="hidden md:flex w-10 h-10 items-center justify-center
              rounded-full border border-gray-200 text-primary
              hover:bg-gray-100 hover:border-primary transition-all"
          >
            <BsCart3 />
          </Link>

          {/* ========== AUTH UI ========== */}
          {!user ? (
            <>
              {/* LOGIN */}
              <button
                onClick={() => navigate("/login")}
                className="hidden sm:block px-4 py-2
                text-sm font-semibold text-gray-700
                hover:text-primary transition"
              >
                Login
              </button>

              {/* SIGN UP */}
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-2 rounded-full
                bg-primary text-white text-sm font-semibold
                shadow-md hover:shadow-lg hover:scale-105
                transition-all"
              >
                Get Started
              </button>
            </>
          ) : (
            /* USER MENU */
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-2
                rounded-full hover:bg-gray-100 transition"
              >
                {user.img ? (
                  <img
                    src={user.img}
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-primary" />
                )}
                <span className="hidden sm:block text-sm font-semibold text-gray-700">
                  {user.firstName}
                </span>
              </button>

              {/* DROPDOWN */}
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white
                  rounded-xl shadow-xl border overflow-hidden z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  <button
                    onClick={logout}
                    className="w-full px-4 py-3 text-left
                    flex items-center gap-3 text-sm text-red-600
                    hover:bg-red-50 transition"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE DRAWER (unchanged) */}
      {sideDrawerOpened && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSideDrawerOpened(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[300px]
            bg-white shadow-2xl font-fancy">
            {/* same drawer content as before */}
          </div>
        </div>
      )}
    </header>
  );
}
