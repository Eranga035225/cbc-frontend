import { useState } from "react";
import { getCart } from "../../utils/cart";


export default function CartPage(){
  const [cart,setCart] = useState(getCart());

  return(
    <div className="w-full h-full flex flex-col items-center"> 
        {
          cart.map(
            (item)=> {
            return (
              <div key={item.productId} className="w-[500px]m h-[100px] bg-primary shadow 2xl">

              </div>
            )
          }
        )







        }
        
         



    </div>
  )





}