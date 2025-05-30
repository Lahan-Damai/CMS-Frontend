import React, { useState, useEffect } from "react";
import { getReplies, deleteReplies } from "../../services/forum";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

const Replies = () => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await getReplies(id);
        setReplies(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch replies:", error);
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 8000);

    fetchReplies();

    return () => clearTimeout(timeoutId);
  }, [id]);

  const handleDelete = async (replyId) => {
    const confirmDelete = window.confirm("Apakah Anda yakin untuk menghapus balasan ini?");

    if (confirmDelete) {
      try {
        await deleteReplies(replyId);
        setReplies(replies.filter((reply) => reply.id !== replyId));
      } catch (error) {
        console.error("Error deleting reply:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <div className="overflow-x-auto">
          {loading ? (
            <LoadingSpinner />
          ) : replies.length === 0 ? (
            <p className="text-center text-gray-500">Threads TIDAK MEMILIKI REPLIES</p>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-6 py-2 border-b-2 border-gray-300">ID</th>
                  <th className="px-6 py-2 border-b-2 border-gray-300">Isi</th>
                  <th className="px-6 py-2 border-b-2 border-gray-300">NIK Pengguna</th>
                  <th className="px-6 py-2 border-b-2 border-gray-300">Delete</th>
                </tr>
              </thead>
              <tbody>
                {replies.map((reply) => (
                  <tr key={reply.id}>
                    <td className="px-6 py-2 border-b border-gray-300 text-center">{reply.id}</td>
                    <td className="px-6 py-2 border-b border-gray-300 text-center">{reply.isi}</td>
                    <td className="px-6 py-2 border-b border-gray-300 text-center">{reply.user_nik}</td>
                    <td className="px-6 py-4 border-b whitespace-nowrap text-center">
                      <button
                        className="border border-gray-300 rounded px-4 py-2 text-red-500 hover:bg-gray-100"
                        onClick={() => handleDelete(reply.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Replies;
