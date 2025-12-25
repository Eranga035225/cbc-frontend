import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
export default function ProductOverviewPage(){

const params =   useParams()
const productId = params.id
const[status  , setStatus] = useState("loading") //loading,success,error
const[product  , setProduct] = useState(null)



useEffect(
  ()=> {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/:" + productId).then(
      (response) => {
        console.log("Product Data:", response.data);
        setProduct(response.data);
        setStatus("success");
      }
    ).catch(
      (error) => {
        console.error("Error fetching product data:", error);
        setStatus("error");
        toast.error("Failed to load product data.");
      }
    )



  }, [])
  

  return(
  <div className="bg-secondary min-h-screen p-8 font-fancy">
    <h1>Product Overview Page</h1>
    <p>Product ID: {productId}</p>
   
  </div>

  ) 

} 