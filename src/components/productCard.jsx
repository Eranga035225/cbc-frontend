export default function ProductCard({ product }) {
  return (
    <div className="w-[300px] h-[400px] bg-gray-500 shadow-md rounded-lg m-2 flex flex-col items-center justify-center text-white">
      <h2 className="text-lg font-bold">
        {product.name || "Product"}
      </h2>
      <p>ID: {product.productId}</p>
    </div>
  );
}
