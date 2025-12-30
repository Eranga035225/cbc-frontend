import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ReviewModal({ productId, onClose }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitReview() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to rate this product");
        return;
      }

      setLoading(true);

      await axios.post(
        import.meta.env.VITE_BACKEND_URI + "/api/reviews/add-review",
        { productId, rating, comment },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Thank you for your review ❤️");
      onClose();

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="bg-white rounded-3xl w-[420px] p-6 shadow-xl space-y-4">

        <h2 className="text-xl font-bold text-primary">
          Rate this product
        </h2>

        {/* Rating */}
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-3 border rounded-xl"
        >
          {[5,4,3,2,1].map((r) => (
            <option key={r} value={r}>{r} ⭐</option>
          ))}
        </select>

        {/* Comment */}
        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          className="w-full p-3 border rounded-xl resize-none"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={submitReview}
            disabled={loading}
            className="
              px-6 py-2 rounded-xl
              bg-primary text-white
              hover:bg-accent transition
            "
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

      </div>
    </div>
  );
}
