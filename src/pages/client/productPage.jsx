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
        axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
          (res) =>{
            setProducts(Array.isArray(res.data) ? res.data : res.data.products || []);
            setIsLoading(false);
          // 
          }
        )
      }
    },[isLoading]

  )

  return (
    <div className="w-full h-full bg-red-400">
      {
        products.map((product)=> {
          return(
            <ProductCard product={product} key={product.id}/>
          )



        })
      }


    </div>
  )


    }








