import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { getCart } from "../../utils/cart";
import { addToCart } from "../../utils/cart";


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
    {
  status == "success" &&
  <div className="bg-secondary w-full min-h-screen flex items-center justify-center p-6 font-fancy">
    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 p-8">

      {/* LEFT */}
      <div className="md:w-1/2 w-full flex justify-center items-center">
        <ImageSlider images={product.images} />
      </div>

      {/* RIGHT */}
      <div className="md:w-1/2 w-full flex justify-center items-center">
        <div className="w-full max-w-md flex flex-col items-center gap-4">

          {/* Product Name */}
          <h1 className="w-full text-center text-3xl font-bold text-primary">
            {product.name}
            {product.altNames.map((altName, index) => (
              <span
                key={index}
                className="text-lg font-normal text-gray-500"
              >
                {" / " + altName}
              </span>
            ))}
          </h1>

         
          <h2 className="text-sm tracking-widest uppercase text-gray-500">
            {product.productId}
          </h2>

         
          <p className="text-center text-gray-600 leading-relaxed">
            {product.description}
          </p>

        
          <div className="mt-4">
            {product.labeledPrice > product.price && (
              <div className="flex items-center gap-4">
                <span className="text-xl line-through text-danger">
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

         
          <button
            className="mt-6 px-8 py-3 rounded-full bg-primary text-white
            font-semibold shadow-md hover:shadow-lg hover:scale-[1.03]
            transition-all duration-300"

            onClick = {
              ()=> {
                console.log(getCart());
                addToCart(product,1);
                toast.success("Product added to cart!");
              

              }
            }
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  </div>
}


    {status === "loading" && <Loading />}
  </>
);



} 