import { useState } from "react";
import { addToCart, getCart, removeFromCart, getTotal } from "../../utils/cart";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT — CART ITEMS */}
        <div className="lg:col-span-2 space-y-5">

          {cart.length === 0 ? (
            <div className="text-center text-gray-400 py-24">
              🛒 Your cart is empty
            </div>
          ) : (
            cart.map((item) => (
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
                    onClick={() => {
                      addToCart(item, -1);
                      setCart(getCart());
                    }}
                    className="w-8 h-8 rounded-full bg-gray-100
                    hover:bg-red-500 hover:text-white transition"
                  >
                    −
                  </button>

                  <span className="font-bold w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => {
                      addToCart(item, 1);
                      setCart(getCart());
                    }}
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
                  onClick={() => {
                    removeFromCart(item.productId);
                    setCart(getCart());
                  }}
                  className="absolute top-3 right-3
                  text-gray-400 hover:text-red-600 transition"
                >
                  <BiTrash size={20} />
                </button>

              </div>
            ))
          )}

        </div>

        {/* RIGHT — CART SUMMARY */}
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

            <Link
              to="/checkout"
              state={{ cart }}
              className={`block w-full text-center py-3 rounded-2xl
              font-semibold text-lg transition-all duration-300
              ${
                cart.length === 0
                  ? "bg-gray-300 cursor-not-allowed pointer-events-none"
                  : "bg-primary text-white hover:bg-accent hover:scale-[1.02] shadow-lg"
              }`}
            >
              Proceed to Checkout
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}
