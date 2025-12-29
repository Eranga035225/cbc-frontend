import { Link, useNavigate } from "react-router-dom";
import {  BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Header() {
  const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="w-full h-[72px] sticky top-0 z-50 bg-white shadow-md ">
  <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between font-fancy relative">
    <GiHamburgerMenu className="h-full text-3xl md:hidden absolute left-2"
    onClick={
      ()=>{
        setSideDrawerOpened(true)
      }
    }
    
    />

    {/* Logo */}
   <div
  onClick={() => navigate("/")}
  className="flex items-center gap-3 cursor-pointer group ml-6 md:ml-0"
>

      <img
        src="/logo.jpg"
        alt="Logo"
        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary group-hover:scale-105 transition-all duration-300"
      />
      <span className="text-xl font-bold text-primary tracking-wide">
        Beauty Cosmetics
      </span>
    </div>

    {/* Navigation */}
    <nav className="hidden  md:flex items-center gap-10 ">
      {["Home", "Products", "About", "Contact"].map((item, index) => (
        <Link
          key={index}
          to={`/${item === "Home" ? "" : item.toLowerCase()}`}
          className="text-gray-700 font-medium hover:text-primary transition relative
          after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0
          after:h-[2px] after:bg-primary hover:after:w-full after:transition-all"
        >
          {item}
        </Link>
      ))}
    </nav>

    {/* Right Action */}
    <div className="flex items-center gap-4">

      <div className="w-[80px] flex justify-center items-center hidden md:flex">

        <Link
            to="/cart"
            className="relative w-[42px] h-[42px]
            flex items-center justify-center
            rounded-full border border-gray-200
            text-primary text-xl
            hover:bg-secondary hover:border-primary
            hover:scale-105 transition-all duration-300"
          >
            <BsCart3 />
        </Link>


      </div>

      {sideDrawerOpened && (
  <div className="fixed inset-0 z-50 md:hidden">

    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setSideDrawerOpened(false)}
    />

    {/* Drawer */}
    <div
      className="absolute left-0 top-0 h-full w-[320px] bg-white
      shadow-2xl transform transition-transform duration-300
      translate-x-0 font-fancy"
    >

      {/* Drawer Header */}
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
            Beauty Cosmetics
          </span>
        </div>

        <button
          onClick={() => setSideDrawerOpened(false)}
          className="text-2xl text-gray-500 hover:text-primary"
        >
          ✕
        </button>
      </div>

      {/* Drawer Navigation */}
      <nav className="flex flex-col gap-4 px-6 py-6">
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

        {/* Divider */}
        <div className="h-px bg-gray-200 my-4" />

        {/* Cart */}
        <Link
          to="/cart"
          onClick={() => setSideDrawerOpened(false)}
          className="flex items-center gap-3 text-lg font-semibold text-primary"
        >
          <BsCart3 className="text-xl" />
          Cart
        </Link>
      </nav>
    </div>
  </div>
)}


      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary transition"
      >
        Login
      </button>
      <button
        onClick={() => navigate("/signup")}
        className="px-6 py-2 rounded-full bg-primary text-white text-sm font-semibold
        shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        Get Started
      </button>
    </div>
  </div>
</header>

  );
}
