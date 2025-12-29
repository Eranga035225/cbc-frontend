import { Link, useNavigate } from "react-router-dom";
import {  BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  [sideDrawerOpened, setSideDrawerOpened] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="w-full h-[72px] sticky top-0 z-50 bg-white shadow-md ">
  <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between font-fancy relative">
    <GiHamburgerMenu className="h-full text-3xl md:hidden absolute left-2"/>

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



      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary transition"
      >
        Login
      </button>
      <button
        onClick={() => navigate("/register")}
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
