import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";


export default function ProductOverviewPage(){

const params =   useParams()
const productId = params.id
const[status  , setStatus] = useState("loading") //loading,success,error
const[product  , setProduct] = useState(null)



useEffect(
  ()=> {
    axios.get(import.meta.env.VITE_BACKEND_URI + "/api/products/" + productId).then(
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
    <>
    {
      status == "success" &&
        <div className="bg-secondary  w-full h-full flex items-center justify-center p-4 gap-4">
          <div className="w-[50% h-full ">
            <ImageSlider images={product.images}/>
          </div>
          <div className="w-[50%] h-full ">
          </div>
        </div>
}
{
  status== "loading" && 
  <Loading/>
}
    </>
  ) 


} 