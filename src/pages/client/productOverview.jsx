import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaStar } from "react-icons/fa";

import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { addToCart } from "../../utils/cart";

export default function ProductOverviewPage() {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  // Review state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URI + "/api/products/" + productId)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("Failed to load product");
        setStatus("error");
      });
  }, [productId]);

  async function submitReview() {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to submit a review");
      return;
    }

    if (!rating || !comment.trim()) {
      toast.error("Please add rating and comment");
      return;
    }

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URI + "/api/reviews/add-review",
        { productId: product.productId, rating, comment },
        { headers: { Authorization: "Bearer " + token } }
      );

      toast.success("Review submitted");
      setShowReviewModal(false);
      setRating(0);
      setComment("");
    } catch {
      toast.error("Failed to submit review");
    }
  }

  if (status === "loading") return <Loading />;

  return (
    <>
      {status === "success" && (
        <div className="bg-secondary min-h-screen flex justify-center p-6 font-fancy">
          <div className="bg-white max-w-6xl w-full rounded-3xl shadow-xl flex flex-col md:flex-row gap-10 p-8">

            {/* IMAGE */}
            <div className="md:w-1/2 flex justify-center">
              <ImageSlider images={product.images} />
            </div>

            {/* DETAILS */}
            <div className="md:w-1/2 flex items-center">
              <div className="w-full max-w-md space-y-5">

                {/* NAME */}
                <h1 className="text-3xl font-bold text-primary">
                  {product.name}
                </h1>

                {/* ALT NAMES – BEAUTIFUL TAG STYLE */}
                <div className="flex flex-wrap gap-2">
                  {product.altNames.map((alt, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs
                        bg-primary/10 text-primary"
                    >
                      {alt}
                    </span>
                  ))}
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {/* PRICE */}
                <div>
                  {product.labeledPrice > product.price ? (
                    <div className="flex items-center gap-4">
                      <span className="line-through text-gray-400">
                        Rs.{product.labeledPrice.toFixed(2)}
                      </span>
                      <span className="text-3xl font-bold text-accent">
                        Rs.{product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-accent">
                      Rs.{product.price.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* ⭐ MODERN INLINE RATING SECTION */}
                <div
                  onClick={() => setShowReviewModal(true)}
                  className="
                    flex items-center gap-3 cursor-pointer
                    text-sm text-gray-600
                    hover:text-primary transition
                  "
                >
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FaStar key={s} className="text-yellow-400" />
                    ))}
                  </div>
                  <span className="underline underline-offset-4">
                    Rate this product
                  </span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      toast.success("Added to cart");
                    }}
                    className="
                      px-6 py-3 rounded-full border-2 border-primary
                      text-primary font-semibold
                      hover:bg-primary hover:text-white
                      transition
                    "
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      navigate("/checkout", {
                        state: {
                          cart: [{
                            productId: product.productId,
                            name: product.name,
                            image: product.images[0],
                            price: product.price,
                            labeledPrice: product.labeledPrice,
                            quantity: 1,
                          }],
                        },
                      })
                    }
                    className="
                      px-6 py-3 rounded-full bg-primary text-white
                      font-semibold hover:bg-accent transition
                    "
                  >
                    Buy Now
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">

            <h2 className="text-2xl font-bold text-primary text-center mb-6">
              Rate this product
            </h2>

            <div className="flex justify-center gap-3 mb-5">
              {[1, 2, 3, 4, 5].map((s) => (
                <FaStar
                  key={s}
                  size={30}
                  className={`cursor-pointer transition
                    ${(hoverRating || rating) >= s
                      ? "text-yellow-400 scale-110"
                      : "text-gray-300"
                    }`}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(s)}
                />
              ))}
            </div>

            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full rounded-xl border px-4 py-3 mb-6
                focus:border-primary focus:ring-2 focus:ring-primary/20
                outline-none resize-none"
            />

            <div className="flex gap-4">
              <button
                onClick={() => setShowReviewModal(false)}
                className="w-1/2 py-3 rounded-xl border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={submitReview}
                className="w-1/2 py-3 rounded-xl bg-primary
                  text-white font-semibold hover:bg-accent"
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
