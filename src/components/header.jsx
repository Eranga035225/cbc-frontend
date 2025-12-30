import { Link, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

export default function Header() {
  const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
  const navigate = useNavigate();

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
              className="
                text-gray-700 font-medium relative
                hover:text-primary transition
                after:content-[''] after:absolute after:left-0 after:-bottom-1
                after:w-0 after:h-[2px] after:bg-primary
                hover:after:w-full after:transition-all
              "
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">

          {/* SEARCH ICON */}
          <button
            onClick={() => navigate("/search")}
            className="
              w-10 h-10 flex items-center justify-center
              rounded-full border border-gray-200
              text-gray-600
              hover:text-primary hover:border-primary
              hover:bg-gray-100
              transition-all duration-300
            "
            aria-label="Search"
          >
            <FiSearch className="text-lg" />
          </button>

          {/* CART */}
          <Link
            to="/cart"
            className="
              hidden md:flex w-10 h-10 items-center justify-center
              rounded-full border border-gray-200
              text-primary text-lg
              hover:bg-gray-100 hover:border-primary
              transition-all duration-300
            "
          >
            <BsCart3 />
          </Link>

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
            className="
              px-6 py-2 rounded-full
              bg-primary text-white text-sm font-semibold
              shadow-md hover:shadow-lg hover:scale-105
              transition-all duration-300
            "
          >
            Get Started
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {sideDrawerOpened && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSideDrawerOpened(false)}
          />

          <div className="absolute left-0 top-0 h-full w-[300px]
            bg-white shadow-2xl font-fancy">

            {/* HEADER */}
            <div className="h-[72px] flex items-center justify-between px-4 border-b">
              <div
                onClick={() => {
                  navigate("/");
                  setSideDrawerOpened(false);
                }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <img
                  src="/logo.jpg"
                  alt="Logo"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary"
                />
                <span className="text-lg font-bold text-primary">
                  Crystal Beauty
                </span>
              </div>

              <button
                onClick={() => setSideDrawerOpened(false)}
                className="text-2xl text-gray-500 hover:text-primary"
              >
                ✕
              </button>
            </div>

            {/* NAV */}
            <nav className="flex flex-col gap-5 px-6 py-6">
              {["Home", "Products", "About", "Contact"].map((item, index) => (
                <Link
                  key={index}
                  to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                  onClick={() => setSideDrawerOpened(false)}
                  className="text-lg font-semibold text-gray-700
                  hover:text-primary transition"
                >
                  {item}
                </Link>
              ))}

              <div className="h-px bg-gray-200 my-4" />

              {/* SEARCH */}
              <button
                onClick={() => {
                  navigate("/search");
                  setSideDrawerOpened(false);
                }}
                className="flex items-center gap-3
                text-lg font-semibold text-gray-700
                hover:text-primary transition"
              >
                <FiSearch className="text-xl" />
                Search
              </button>

              {/* CART */}
              <Link
                to="/cart"
                onClick={() => setSideDrawerOpened(false)}
                className="flex items-center gap-3
                text-lg font-semibold text-primary"
              >
                <BsCart3 className="text-xl" />
                Cart
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
