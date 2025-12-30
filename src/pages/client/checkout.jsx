import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function CheckOutPage() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  function getTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    return total;
  }

  function removeFromCart(productId) {
    setCart(cart.filter((item) => item.productId !== productId));
  }

  function changeQuantity(index, quantity) {
    const newCart = [...cart];
    const newQuantity = newCart[index].quantity + quantity;

    if (newQuantity <= 0) {
      removeFromCart(newCart[index].productId);
      return;
    }

    newCart[index].quantity = newQuantity;
    setCart(newCart);
  }

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first");
      return;
    }

    const orderInformation = {
      products: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      phone: phoneNumber,
      address,
    };

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URI + "/api/orders",
        orderInformation,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      toast.success("Order placed successfully");
      setCart([]);
      setPhoneNumber("");
      setAddress("");
    } catch (e) {
      toast.error("Error placing the order"+ e);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-fancy">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT — CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 py-24 text-lg">
              🛒 Your cart is empty
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={item.productId}
                className="bg-white rounded-2xl shadow-md
                flex flex-col sm:flex-row items-center gap-4 p-4
                hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-lg font-bold text-primary">
                    {item.name}
                  </h1>
                  <p className="text-xs text-gray-400">{item.productId}</p>

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

                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changeQuantity(index, -1)}
                      className="w-8 h-8 rounded-full bg-gray-100 text-primary
                      hover:bg-red-500 hover:text-white active:scale-95 transition"
                    >
                      −
                    </button>

                    <span className="font-bold w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => changeQuantity(index, 1)}
                      className="w-8 h-8 rounded-full bg-primary text-white
                      hover:bg-accent active:scale-95 transition"
                    >
                      +
                    </button>
                  </div>

                  <div className="font-bold text-primary text-sm">
                    Rs.{(item.quantity * item.price).toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="ml-auto w-10 h-10 rounded-full
                  flex items-center justify-center text-gray-400
                  hover:text-red-600 hover:bg-red-50 transition"
                >
                  <BiTrash size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="lg:col-span-1">
          <div
            className="relative bg-white rounded-3xl p-5
            shadow-xl border sticky top-24 overflow-hidden"
          >
            {/* GLOW RING */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-primary/20 pointer-events-none" />

            <div className="relative space-y-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Order Total
                </p>
                <p className="text-3xl font-extrabold text-primary mt-2">
                  Rs. {getTotal().toFixed(2)}
                </p>
              </div>

              {/* DELIVERY DETAILS */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Delivery Details
                </h3>

                <div className="bg-gray-50 rounded-2xl p-4 space-y-4 border">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full rounded-xl border px-4 py-3 text-sm
                    focus:border-primary focus:ring-2
                    focus:ring-primary/20 outline-none transition"
                  />

                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Delivery Address"
                    className="w-full rounded-xl border px-4 py-3 text-sm
                    focus:border-primary focus:ring-2
                    focus:ring-primary/20 outline-none resize-none transition"
                  />
                </div>

                <p className="text-xs text-gray-400">
                  🔒 Used only for delivery purposes
                </p>
              </div>

              {/* PLACE ORDER CTA */}
              <button
                onClick={placeOrder}
                disabled={cart.length === 0}
                className={`
                  w-full py-3.5 rounded-2xl
                  font-bold text-base transition-all duration-300
                  ${
                    cart.length === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : `
                        bg-gradient-to-r from-primary to-accent
                        text-white shadow-xl
                        hover:shadow-2xl hover:scale-[1.03]
                        active:scale-95
                      `
                  }
                `}
              >
                Place Order →
              </button>

              <p className="text-xs text-center text-gray-400">
                Secure checkout • Trusted payments
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
