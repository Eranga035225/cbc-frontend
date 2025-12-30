import { useState } from "react";
import { addToCart, getCart, removeFromCart, getTotal } from "../../utils/cart";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-fancy">
      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT — CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 py-24 text-lg">
              🛒 Your cart is empty
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.productId}
                className="
                  bg-white rounded-2xl shadow-md
                  flex flex-col sm:flex-row
                  items-center gap-4 p-4
                  hover:shadow-lg transition
                "
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                {/* PRODUCT INFO */}
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

                {/* QUANTITY */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        addToCart(item, -1);
                        setCart(getCart());
                      }}
                      className="
                        w-8 h-8 rounded-full
                        bg-gray-100 text-primary
                        hover:bg-red-500 hover:text-white
                        active:scale-95 transition
                      "
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
                      className="
                        w-8 h-8 rounded-full
                        bg-primary text-white
                        hover:bg-accent
                        active:scale-95 transition
                      "
                    >
                      +
                    </button>
                  </div>

                  <div className="font-bold text-primary text-sm">
                    Rs.{(item.quantity * item.price).toFixed(2)}
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => {
                    removeFromCart(item.productId);
                    setCart(getCart());
                  }}
                  className="
                    ml-auto w-10 h-10 rounded-full
                    flex items-center justify-center
                    text-gray-400
                    hover:text-red-600 hover:bg-red-50
                    transition
                  "
                >
                  <BiTrash size={20} />
                </button>
              </div>
            ))
          )}
        </div>

      <div className="lg:col-span-1">
  <div
    className="
      relative bg-white rounded-3xl p-5
      shadow-xl border
      sticky top-24
      overflow-hidden
    "
  >
    {/* GLOW RING */}
    <div className="absolute inset-0 rounded-3xl ring-1 ring-primary/20 pointer-events-none" />

    <div className="relative space-y-5">
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400">
          Cart Total
        </p>
        <p className="text-3xl font-extrabold text-primary mt-2">
          Rs. {getTotal().toFixed(2)}
        </p>
      </div>

      <Link
        to="/checkout"
        state={{ cart }}
        className={`
          block w-full text-center py-3.5 rounded-2xl
          font-bold text-base
          transition-all duration-300
          ${
            cart.length === 0
              ? "bg-gray-300 cursor-not-allowed pointer-events-none"
              : `
                bg-gradient-to-r from-primary to-accent
                text-white shadow-xl
                hover:shadow-2xl hover:scale-[1.03]
                active:scale-95
              `
          }
        `}
      >
        Proceed to Checkout →
      </Link>

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
