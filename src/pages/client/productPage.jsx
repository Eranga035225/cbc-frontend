import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/productCard";

export default function ProductPage(){
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      if(isLoading == true){
        axios.get(import.meta.env.VITE_BACKEND_URI + "/api/products").then(
          (res) =>{
            console.log(res.data);
            setProducts(Array.isArray(res.data) ? res.data : []);
            setIsLoading(false);
          }
        )
      }
    },[isLoading]
  )

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10 px-6">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Our Products
        </h1>
        <p className="text-gray-500 mt-2">
          Browse our collection of high quality products
        </p>
      </div>
      

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800"></div>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.productId}
            />
          ))}
        </div>
      )}
    </div>
  )
}
