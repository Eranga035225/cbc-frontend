import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaStar } from "react-icons/fa";

import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { getCart, addToCart } from "../../utils/cart";

export default function ProductOverviewPage() {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [product, setProduct] = useState(null);

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URI + "/api/products/" + productId)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
        toast.error("Failed to load product");
      });
  }, [productId]);

  async function submitReview() {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to submit a review");
      return;
    }

    if (rating === 0 || comment.trim() === "") {
      toast.error("Please give a rating and comment");
      return;
    }

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URI + "/api/reviews/add-review",
        {
          productId: product.productId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Review submitted successfully");
      setShowReviewModal(false);
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error("Failed to submit review");
      console.error(err);
    }
  }

  if (status === "loading") return <Loading />;

  return (
    <>
      {/* ================= PRODUCT ================= */}
      {status === "success" && (
        <div className="bg-secondary w-full min-h-screen flex items-center justify-center p-6 font-fancy">
          <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 p-8">

            {/* LEFT */}
            <div className="md:w-1/2 w-full flex justify-center items-center">
              <ImageSlider images={product.images} />
            </div>

            {/* RIGHT */}
            <div className="md:w-1/2 w-full flex justify-center items-center">
              <div className="w-full max-w-md flex flex-col items-center gap-4">

                <h1 className="text-3xl font-bold text-primary text-center">
                  {product.name}
                  {product.altNames.map((alt, i) => (
                    <span key={i} className="text-lg font-normal text-gray-500">
                      {" / " + alt}
                    </span>
                  ))}
                </h1>

                <p className="text-sm tracking-widest uppercase text-gray-500">
                  {product.productId}
                </p>

                <p className="text-center text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-4">
                  {product.labeledPrice > product.price ? (
                    <div className="flex items-center gap-4">
                      <span className="text-xl line-through text-danger">
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

                {/* ACTION BUTTONS */}
                <div className="mt-6 flex flex-wrap gap-4 justify-center">

                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      toast.success("Added to cart");
                    }}
                    className="px-8 py-3 rounded-full border-2 border-primary
                      text-primary bg-white font-semibold
                      hover:bg-primary hover:text-white
                      transition-all"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      navigate("/checkout", {
                        state: {
                          cart: [
                            {
                              productId: product.productId,
                              name: product.name,
                              image: product.images[0],
                              price: product.price,
                              labeledPrice: product.labeledPrice,
                              quantity: 1,
                            },
                          ],
                        },
                      })
                    }
                    className="px-8 py-3 rounded-full bg-primary text-white
                      font-semibold hover:bg-accent transition-all"
                  >
                    Buy Now
                  </button>

                  {/* RATE BUTTON */}
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="px-8 py-3 rounded-full
                      bg-secondary text-primary font-semibold
                      hover:bg-primary hover:text-white
                      transition-all"
                  >
                    ⭐ Rate this product
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= REVIEW MODAL ================= */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">

            <h2 className="text-2xl font-bold text-primary mb-4 text-center">
              Rate this product
            </h2>

            {/* STARS */}
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={28}
                  className={`cursor-pointer transition
                    ${
                      (hoverRating || rating) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            {/* COMMENT */}
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your experience..."
              className="w-full rounded-xl border px-4 py-3
                focus:border-primary focus:ring-2 focus:ring-primary/20
                outline-none resize-none mb-4"
            />

            {/* ACTIONS */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowReviewModal(false)}
                className="w-1/2 py-3 rounded-xl border
                  text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={submitReview}
                className="w-1/2 py-3 rounded-xl
                  bg-primary text-white font-semibold
                  hover:bg-accent transition"
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
