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
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then(
          (res) =>{
            console.log(res.data);
            setProducts(res.data.products);
            setIsLoading(false);
          
          }
        )
      }
    },[isLoading]

  )

  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center bg-red-600">
      {
        products.map((product)=> {
          return(
            <ProductCard product={product} key={product.productId}/>
          )



        })
      }


    </div>
  )


    }








