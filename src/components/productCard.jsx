import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  return (
    <Link
      to={`/overview/${product.productId}`}
      className="w-[280px] bg-white rounded-2xl shadow-md overflow-hidden
      hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-fancy"
    >

      {/* Product Image */}
      <div className="w-full h-[190px] bg-secondary flex items-center justify-center overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">

        {/* Name */}
        <h2 className="text-lg font-semibold text-primary line-clamp-2">
          {product.name}
        </h2>

        {/* Product ID */}
        <p className="text-xs tracking-wider text-gray-500 uppercase">
          {product.productId}
        </p>

        {/* Prices */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xl font-bold text-accent">
            Rs. {product.price}
          </span>
          <span className="text-sm line-through text-danger">
            Rs. {product.labeledPrice}
          </span>
        </div>

        {/* Availability */}
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full w-fit mt-1 ${
            product.isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-danger"
          }`}
        >
          {product.isAvailable ? "In Stock" : "Out of Stock"}
        </span>
        

        {/* Button */}
        <button
        
          className="mt-4 w-full bg-primary text-white py-2.5 rounded-full
          font-semibold shadow-md hover:shadow-lg hover:scale-[1.02]
          transition-all duration-300"
        >
          Buy Now
        </button>
      </div>
    </Link>
  );
}
