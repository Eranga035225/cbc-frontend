import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import {  useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";





export default function CheckOutPage(){

 const location = useLocation();
 const [cart, setCart] = useState(location.state?.cart || []);
 const [phoneNumber, setPhoneNumber] = useState('');
 const [address, setAddress] = useState('');



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

 async function placeOrder(){
  const token =  localStorage.getItem("token");
  if(!token){
    toast.error("Please Log in first");
    return
  }

  const orderInformation = {
    products : [

    ],
    phone:phoneNumber,
    address: address

  }

  cart.forEach((item)=>{
    orderInformation.products.push({
      productId: item.productId,
      quantity: item.quantity
    })
  })

  try{
     await axios.post(import.meta.env.VITE_BACKEND_URI + "/api/orders",orderInformation, {
    headers: {
      Authorization: "Bearer " + token,
    }
  })
  toast.success("Order Placed successfully");
    setCart([]);
    setPhoneNumber("");
    setAddress("");
  }catch(e){
    console.log(e);
    toast.error("Eror placing the order")
    return
  }



  





 }

return (
  <div className="max-w-7xl mx-auto px-6 py-8">

    {/* MAIN GRID */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* LEFT SIDE — CART ITEMS */}
      <div className="lg:col-span-2 space-y-5">

        {cart.length === 0 ? (
          <div className="text-center text-gray-400 py-24">
            🛒 Your cart is empty
          </div>
        ) : (
          cart.map((item, index) => (
            <div
              key={item.productId}
              className="bg-white rounded-2xl shadow-md
              flex items-center gap-4 p-4 relative
              hover:shadow-lg transition"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h1 className="text-lg font-bold text-primary">
                  {item.name}
                </h1>
                <p className="text-xs text-gray-400">
                  {item.productId}
                </p>

                {item.labeledPrice > item.price ? (
                  <div className="mt-1">
                    <span className="text-sm line-through text-gray-400 mr-2">
                      Rs.{item.labeledPrice.toFixed(2)}
                    </span>
                    <span className="font-semibold text-accent">
                      Rs.{item.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="font-semibold text-accent">
                    Rs.{item.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* QUANTITY */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeQuantity(index, -1)}
                  className="w-8 h-8 rounded-full bg-gray-100
                  hover:bg-red-500 hover:text-white transition"
                >
                  −
                </button>

                <span className="font-bold w-6 text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() => changeQuantity(index, 1)}
                  className="w-8 h-8 rounded-full bg-primary
                  text-white hover:bg-accent transition"
                >
                  +
                </button>
              </div>

              {/* ITEM TOTAL */}
              <div className="font-bold text-primary ml-4">
                Rs.{(item.quantity * item.price).toFixed(2)}
              </div>

              {/* REMOVE */}
              <button
                onClick={() => removeFromCart(item.productId)}
                className="absolute top-3 right-3
                text-gray-400 hover:text-red-600 transition"
              >
                <BiTrash size={20} />
              </button>

            </div>
          ))
        )}

      </div>

      {/* RIGHT SIDE — ORDER SUMMARY */}
      <div className="lg:col-span-1 sticky top-24 h-fit">

        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-6 border">

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Cart Total
            </p>
            <p className="text-3xl font-extrabold text-primary mt-1">
              Rs. {getTotal().toFixed(2)}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">
              Delivery Details
            </h3>

            <div className="bg-gray-50 rounded-2xl p-4 space-y-4 border">

              <div className="relative">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="peer w-full rounded-xl border px-4 pt-5 pb-2 text-sm
                  focus:border-primary focus:ring-2 focus:ring-primary/20
                  outline-none transition"
                  placeholder=" "
                />
                <label className="absolute left-4 top-2 text-xs text-gray-500
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                  peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary
                  transition-all">
                  Phone Number
                </label>
              </div>

              <div className="relative">
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="peer w-full rounded-xl border px-4 pt-5 pb-2 text-sm
                  focus:border-primary focus:ring-2 focus:ring-primary/20
                  outline-none resize-none transition"
                  placeholder=" "
                />
                <label className="absolute left-4 top-2 text-xs text-gray-500
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                  peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary
                  transition-all">
                  Delivery Address
                </label>
              </div>

            </div>

            <p className="text-xs text-gray-400">
              🔒 Your details are used only for delivery purposes
            </p>
          </div>

          <button
            onClick={placeOrder}
            disabled={cart.length === 0}
            className={`w-full py-3 rounded-2xl font-semibold text-lg
            transition-all duration-300
            ${
              cart.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary text-white hover:bg-accent hover:scale-[1.02] shadow-lg"
            }`}
          >
            Place Order
          </button>

        </div>
      </div>

    </div>
  </div>
);

  





}