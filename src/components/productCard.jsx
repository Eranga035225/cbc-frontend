export default function ProductCard({ product }) {
  return (
    <div className="w-[280px] bg-white rounded-xl shadow-md m-3 overflow-hidden hover:shadow-xl transition duration-300">
      
      {/* Product Image */}
      <div className="w-full h-[180px] bg-gray-100 flex items-center justify-center">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        
        {/* Name */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h2>

        {/* Product ID */}
        <p className="text-sm text-gray-500">
          ID: {product.productId}
        </p>

        {/* Prices */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xl font-bold text-green-600">
            Rs. {product.price}
          </span>
          <span className="text-sm line-through text-gray-400">
            Rs. {product.labeledPrice}
          </span>
        </div>

        {/* Availability */}
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full w-fit mt-1 ${
            product.isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.isAvailable ? "In Stock" : "Out of Stock"}
        </span>

        {/* Button */}
        <button
          className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          View Product
        </button>
      </div>
    </div>
  );
}
