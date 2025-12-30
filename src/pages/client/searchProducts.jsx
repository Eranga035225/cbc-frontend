import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/productCard";
import { FiSearch } from "react-icons/fi";

export default function SearchProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // 🔒 Debounce search (premium UX)
    const timeout = setTimeout(() => {
      setIsLoading(true);

      axios
        .get(
          import.meta.env.VITE_BACKEND_URI +
            "/api/products/search/" +
            (query || "all")
        )
        .then((res) => {
          setProducts(Array.isArray(res.data) ? res.data : []);
        })
        .catch(() => {
          setProducts([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 400); // ⏳ debounce delay

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="w-full min-h-screen bg-secondary py-12 px-4 font-fancy">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-primary">
          Our Products
        </h1>
        <p className="text-gray-600 mt-3">
          Discover premium beauty products crafted for you
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products by name or code..."
            className="
              w-full h-14 pl-12 pr-4 rounded-2xl
              bg-white shadow-md border
              focus:outline-none focus:ring-2
              focus:ring-primary/30
              transition-all
            "
          />
        </div>
      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="flex justify-center items-center mt-24">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      )}

      {/* PRODUCTS GRID */}
      {!isLoading && products.length > 0 && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
            />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading && products.length === 0 && (
        <div className="text-center text-gray-400 mt-24 text-lg">
          🔍 No products found
          {query && (
            <>
              {" "}for "<span className="font-semibold">{query}</span>"
            </>
          )}
        </div>
      )}
    </div>
  );
}
