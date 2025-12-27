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
  <div className="w-full min-h-screen bg-secondary py-12 px-6 font-fancy">

    {/* Page Header */}
    <div className="max-w-7xl mx-auto mb-12 text-center">
      <h1 className="text-4xl font-bold text-primary">
        Our Products
      </h1>
      <p className="text-gray-600 mt-3">
        Browse our collection of high quality products
      </p>

    
    </div>

    {/* Loading */}
    {isLoading && (
      <div className="flex justify-center items-center mt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-danger"></div>
      </div>
    )}

    {/* Products Grid */}
    {!isLoading && (
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.productId}
          />
        ))}
      </div>
    )}
  </div>
);

  
}
