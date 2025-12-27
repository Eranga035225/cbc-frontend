import { useState } from "react";
import { getCart } from "../../utils/cart";


export default function CartPage(){
  const [cart,setCart] = useState(getCart());

  return(
    <div className="w-full h-full flex flex-col items-center pt-4"> 
        {
          cart.map(
            (item)=> {
            return (
              <div key={item.productId} className="w-[600px] h-[100px] rounded-tl-3xl bg-white shadow-2xl flex flex-row">
                  <img src={item.image} className="w-[100px] h-[100px] object-cover rounded-3xl"/>
                  <div className="w-[400px] h-[100px] flex flex-col justify-center pl-4">
                    <h1 className="text-2xl font-bold">{item.name}</h1>
                    <h2 className="">{item.productId}</h2>
                    <p className="text-lg font-semibold">Rs.{item.price}</p>
                  </div>  
              </div>
            )
          }
        )







        }
        
         



    </div>
  )





}