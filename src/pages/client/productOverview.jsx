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
          <div className="w-[50%] flex justify-center items-center h-full">
            <div className="w-[500px] h-[600px] flex-col items-center">
                <h1 className="w-full text-center text-3xl text-black font-semibold  ">{product.name}
                  {
                    product.altNames.map((altName,index)=> {
                      return (
                        <span key={index} className="text-xl text-gray-600 font-normal">, {" / "+altName}</span>  
                      )
                    }
                  )
                  }
                




                </h1>
                <h2 className="w-full text-center text text-gray-700 font-semibold mt-4">{product.productId}</h2>
                <p className="w-full text-center text text-gray-700 mt-4">{product.description}</p>
                
            </div>
            
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