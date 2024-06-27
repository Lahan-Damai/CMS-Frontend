import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getReviewsByExpertId,
  deleteExpertReviewByExpertId,
} from "../../services/ahliKonsultasi";

const ExpertReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviewsByExpertId(id);
        console.log(response.data);
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  const handleDelete = async (review) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin untuk menghapus Ulasan ini?"
    );

    if (confirmDelete) {
      try {
        await deleteExpertReviewByExpertId({
          ahli_id: review.ahli_id,
          user_nik: review.user_nik,
        });
        setReviews(reviews.filter((r) => r.user_nik !== review.user_nik));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  NIK Reviewer
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Rating
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Komentar
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.user_nik}>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {review.user_nik}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {review.rating}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {review.isi}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    <button
                      className="border border-gray-300 rounded px-4 py-2 text-red-500 hover:bg-gray-100"
                      onClick={() => handleDelete(review)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpertReviews;
