import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaStar } from "react-icons/fa";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again");
        return;
      }

      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URI + "/api/reviews",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load reviews");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function renderStars(rating) {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <FaStar
            key={i}
            className={`text-sm ${
              i <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="p-8 font-fancy">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Product Reviews
        </h1>
        <p className="text-gray-500 mt-1">
          Manage and monitor customer feedback
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
      )}

      {/* EMPTY */}
      {!loading && reviews.length === 0 && (
        <div className="text-center text-gray-400 py-24">
          No reviews available
        </div>
      )}

      {/* REVIEWS TABLE */}
      {!loading && reviews.length > 0 && (
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <table className="w-full">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  User
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Product
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Rating
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Comment
                </th>
                
              </tr>
            </thead>

            <tbody>
              {reviews.map((review) => (
                <tr
                  key={review._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* USER */}
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800">
                      {review.userName}
                    </p>
                  </td>

                  {/* PRODUCT */}
                  <td className="px-6 py-4 text-gray-600">
                    {review.productId}
                  </td>

                  {/* RATING */}
                  <td className="px-6 py-4">
                    {renderStars(review.rating)}
                  </td>

                  {/* COMMENT */}
                  <td className="px-6 py-4 text-gray-600 max-w-md">
                    {review.comment}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
}
