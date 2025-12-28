import { useState } from "react";
import { addToCart, getCart } from "../../utils/cart";
import { BiTrash } from "react-icons/bi";

export default function CartPage(){
  const [cart,setCart] = useState(getCart());

  return(
    <div className="w-full h-full flex flex-col items-center pt-4 my-3"> 
        {
          cart.map(
            (item)=> {
                      return (
                    <div key={item.productId} className="w-[750px] h-[100px] rounded-tl-3xl bg-white shadow-2xl
                      flex flex-row items-center font-fancy my-3 relative ">
                    
                        <img src={item.image} className="w-[100px] h-[100px] object-cover rounded-3xl"
                          alt={item.name}
                        />

                      <div className="w-[400px] h-[100px] flex flex-col justify-center pl-4">
                        <h1 className="text-xl font-bold text-primary">
                          {item.name}
                        </h1>

                        <h2 className="text-sm text-gray-500">
                          {item.productId}
                        </h2>

                        {
                          item.labeledPrice > item.price ?
                          <div>
                            <span className="text-md mx-1 text-gray-500 line-through ">{item.labeledPrice.toFixed(2)}</span>
                            <span className="text-md mx-1 font-bold text-accent">{item.price.toFixed(2)}</span>
                          </div>

                          : <span className="text-md mx-1 font-bold text-accent">{item.price.toFixed(2)}</span>
                        }

                      </div>
                    <div className="w-[200px] h-[100px] flex items-center justify-between gap-3 mr-3">

                          <button
                          onClick={
                              ()=> {
                                addToCart(item,-1)
                                //to refresh the page automatically after adding to cart
                                setCart(getCart())
                              }
                            }
                            className="w-[36px] h-[36px] rounded-full
                            bg-gray-100 text-primary text-xl font-semibold
                            flex items-center justify-center
                            shadow-sm hover:shadow-md
                            hover:bg-danger hover:text-white
                            active:scale-95 transition-all duration-200"
                          >
                            −
                          </button>

                          <h1 className="text-lg font-bold text-primary min-w-[20px] text-center">
                            {item.quantity}
                          </h1>

                          <button
                            onClick={
                              ()=> {
                                addToCart(item,1)
                                //to refresh the page automatically after adding to cart
                                setCart(getCart())
                              }
                            }
                            className="w-[36px] h-[36px] rounded-full
                            bg-primary text-white text-xl font-semibold
                            flex items-center justify-center
                            shadow-md hover:shadow-lg
                            hover:bg-accent hover:scale-110
                            active:scale-95 transition-all duration-200"
                          >
                            +
                          </button>

                          <h1 className="text-lg font-bold text-primary min-w-[20px] text-center ml-5">
                            Rs.{(item.quantity*item.price).toFixed(2)}
                          </h1>

                          <button className="absolute text-red-600 cursor-pointer text-2xl hover:bg-red-600 hover:text-white rounded-full p-2 right-[-40px] ">
                            <BiTrash/>
                          </button>

                        </div>


  </div>
);
          }
        )
        }
        
    </div>
  )





}