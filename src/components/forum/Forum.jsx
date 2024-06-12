import React from "react";
import { useEffect, useState } from "react";
import { getThreads, deleteThreads } from "../../services/forum";
import { useNavigate } from "react-router-dom";


const Forum = () => {
    const [thread, setThread] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const response = await getThreads();
                setThread(response.data);
            } catch (error) {
                console.error("Failed to fetch forum threads:", error);
            }
        };
        fetchThreads();
    }, []);
    
    const handleLihat = (id) => {
        navigate(`/forum/${id}`);
    };
    
    const handleDelete = async (id) => {
        try {
          const response = await deleteThreads(id);
          console.log(response.data); // "success"

          setThread(thread.filter((thread) => thread.id !== id));
        } catch (error) {
          console.error("Error deleting forum threads :", error);
        }
      };

    return (
        <div className="container mx-auto p-4 mt-20 flex justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-2 border-b-2 border-gray-300">ID</th>
                    <th className="px-6 py-2 border-b-2 border-gray-300">
                      Judul
                    </th>
                    <th className="px-6 py-2 border-b-2 border-gray-300">
                      Isi
                    </th>
                    <th className="px-6 py-2 border-b-2 border-gray-300">
                      Nama Pengguna
                    </th>
                    <th className="px-6 py-2 border-b-2 border-gray-300">
                      Replies
                    </th>
                    <th className="px-6 py-2 border-b-2 border-gray-300">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {thread.map((thread) => (
                    <tr key={thread.id}>
                      <td className="px-6 py-2 border-b border-gray-300 text-center">
                        {thread.id}
                      </td>
                      <td className="px-6 py-2 border-b border-gray-300 text-center">
                        {thread.judul}
                      </td>
                      <td className="px-6 py-2 border-b border-gray-300 text-center">
                        {thread.isi}
                      </td>
                      <td className="px-6 py-2 border-b border-gray-300 text-center">
                        {thread.user.nama}
                      </td>
                      <td className="px-6 py-2 border-b border-gray-300 text-center relative">
                        <button
                          className="border border-gray-300 border-b rounded px-4 py-2 text-blue-500 hover:bg-gray-100"
                          onClick={() => handleLihat(thread.id)}
                        >
                          Lihat
                        </button>
                      </td>
                      <td className="px-6 py-4 border-b whitespace-nowrap text-center">
                        <button
                          className="border border-gray-300 rounded px-4 py-2 text-blue-500 hover:bg-gray-100"
                          onClick={() => handleDelete(thread.id)}
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
        

export default Forum;