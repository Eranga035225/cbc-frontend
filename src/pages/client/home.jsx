import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/productCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URI + "/api/products")
      .then((res) => {
        setProducts(res.data.slice(0, 8)); // show featured only
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="font-fancy">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] bg-[url('/login.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-xl text-white space-y-6 ">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Reveal Your <span className="text-accent">Natural Beauty</span>
            </h1>

            <p className="text-white/90 text-lg">
              Premium skincare & cosmetics crafted to elevate your confidence.
            </p>

            <div className="flex gap-4">
              <Link
                to="/products"
                className="px-8 py-3 rounded-full bg-primary text-white font-semibold
                shadow-lg hover:bg-accent hover:scale-105 transition"
              >
                Shop Now
              </Link>

              <Link
                to="/about"
                className="px-8 py-3 rounded-full border border-white/70
                text-white font-semibold hover:bg-white hover:text-primary transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST SECTION ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

          {[
            {
              title: "Dermatologically Tested",
              desc: "Safe for all skin types",
            },
            {
              title: "Premium Ingredients",
              desc: "Only the finest natural extracts",
            },
            {
              title: "Cruelty Free",
              desc: "Never tested on animals",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary">
              Featured Products
            </h2>
            <p className="text-gray-600 mt-3">
              Best sellers loved by our customers
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-14">
            <Link
              to="/products"
              className="inline-block px-10 py-3 rounded-full
              bg-primary text-white font-semibold
              shadow-lg hover:bg-accent hover:scale-105 transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ================= BEAUTY PROMISE ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

          <img
            src="/login2.jpg"
            alt="Beauty Promise"
            className="w-full md:w-1/2 rounded-3xl shadow-xl"
          />

          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold text-primary">
              Our Beauty Promise
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At Crystal Beauty, we believe beauty is confidence.
              Every product is carefully designed to nourish your skin,
              enhance your glow, and make you feel your best every day.
            </p>

            <Link
              to="/contact"
              className="inline-block px-8 py-3 rounded-full
              bg-primary text-white font-semibold
              hover:bg-accent transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
