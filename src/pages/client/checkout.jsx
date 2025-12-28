import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import {  useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";




export default function CheckOutPage(){

  const location = useLocation();
 const [cart, setCart] = useState(location.state?.cart || []);


  function getTotal(){
    let total = 0;
    for(let i=0; i<cart.length; i++){
      total += cart[i].price * cart[i].quantity;
    }
    return total
  }

  function removeFromCart(productId){
    const newCart = cart.filter((item)=> item.productId != productId);
    setCart(newCart);

  }

 function changeQuantity(index, quantity) {
  const newCart = [...cart];
  const newQuantity = newCart[index].quantity + quantity;

  if (newQuantity <= 0) {
    removeFromCart(newCart[index].productId);
    return;
  }

  newCart[index] = {
    ...newCart[index],
    quantity: newQuantity
  };

  setCart(newCart);
}

 function placeOrder(){
  const token =  localStorage.getItem("token");
  if(!token){
    toast.error("Please Log in first");
    return
  }

  const orderInformation = {
    products : [
      
    ]
  }
 }


  return(
    <div className="w-full h-full flex flex-col items-center pt-4 my-3 relative"> 
            <div className="fixed top-24 right-8 z-40
            bg-white rounded-2xl shadow-xl
            px-6 py-4 flex flex-col gap-1
            font-fancy border border-gray-100"
          >
            <span className="text-xs uppercase tracking-widest text-gray-500">
              CART TOTAL
             
            </span>

            <p className="text-2xl font-bold text-primary">
              Rs.
             
              <span className="text-accent ml-2">
               {getTotal().toFixed(2)}
               
              </span>
            </p>

            <button
              onClick={() => {
                placeOrder();
                
              }}
              className="w-full mt-3
              bg-primary text-white
              py-2.5 rounded-xl
              font-semibold font-fancy
              shadow-md hover:shadow-lg
              hover:bg-accent hover:scale-[1.02]
              active:scale-95
              transition-all duration-300"
            >
             Place Order
            </button>

          </div>

        {
          cart.map(
            (item,index)=> {
                      return (
                    <div key={item.productId} className="w-[750px] h-[100px] rounded-tl-3xl bg-white shadow-2xl
                      flex flex-row items-center font-fancy my-3 relative ">
                    
                        <img src={item.image} className="w-[100px] h-[100px] object-cover rounded-3xl"
                          alt={item.name}
                        />

                      <div className="w-[400px] h-[100px] flex flex-col justify-center pl-4">
                        <h1 className="text-xl font-bold text-primary font-fancy">
                          {item.name}
                        </h1>

                        <h2 className="text-sm text-gray-500">
                          {item.productId}
                        </h2>

                        {
                          item.labeledPrice > item.price ?
                          <div>
                            <span className="text-md mx-1 text-gray-500 line-through ">Rs.{item.labeledPrice.toFixed(2)}</span>
                            <span className="text-md mx-1 font-bold text-accent">Rs.{item.price.toFixed(2)}</span>
                          </div>

                          : <span className="text-md mx-1 font-bold text-accent">Rs.{item.price.toFixed(2)}</span>
                        }

                      </div>
                    <div className="w-[200px] h-[100px] flex items-center justify-between gap-3 mr-3">

                          <button
                          onClick={
                              ()=> {
                                changeQuantity(index,-1);
                               
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
                                changeQuantity(index,1);
                               
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

                          <button 
                          onClick={
                              ()=> {
                                removeFromCart(item.productId);
                               
                                
                              }
                            }
                          
                          className="absolute text-red-600 cursor-pointer text-2xl hover:bg-red-600 hover:text-white rounded-full p-2 right-[-40px] "
                          
                          >
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