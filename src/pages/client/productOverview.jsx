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


 return (
  <>
    {status === "success" && (
      <div className="min-h-screen w-full bg-secondary flex items-center justify-center p-6 font-fancy">
  <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 p-8">

    {/* Image */}
    <div className="md:w-1/2 w-full flex justify-center items-center">
      <ImageSlider images={product.images} />
    </div>

    {/* Details */}
    <div className="md:w-1/2 w-full flex justify-center items-center">
      <div className="w-full max-w-md flex flex-col gap-4">

        <h1 className="text-3xl font-bold text-primary text-center">
          {product.name}
          {product.altNames.map((altName, index) => (
            <span key={index} className="text-lg font-normal text-gray-500">
              {" / " + altName}
            </span>
          ))}
        </h1>

        <h2 className="text-center text-sm tracking-widest text-gray-500 uppercase">
          {product.productId}
        </h2>

        <p className="text-center text-gray-600 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-6 text-center">
          {product.labeledPrice > product.price && (
            <div className="flex justify-center items-center gap-4">
              <span className="text-xl text-gray-400 line-through">
                Rs.{product.labeledPrice.toFixed(2)}
              </span>
              <span className="text-3xl font-bold text-accent">
                Rs.{product.price.toFixed(2)}
              </span>
            </div>
          )}

          {product.labeledPrice <= product.price && (
            <span className="text-3xl font-bold text-accent">
              Rs.{product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="px-8 py-3 rounded-full bg-accent text-white font-semibold
          shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  </div>
</div>

      
    )}

    {status === "loading" && <Loading />}
  </>
);



} 