import React, { useState, useEffect } from 'react';
import { getArtikelEdukasi } from '../services/api'; 


const ArtikelEdukasi = () => {

  const [artikel, setArtikel] = useState([]);

  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const response = await getArtikelEdukasi();
        setArtikel(response.data);
      } catch (error) {
        console.error("Failed to fetch artikel edukasi:", error);
      }
    };

    fetchArtikel();
  }, []);

  console.log(artikel);


  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-2 border-b-2 border-gray-300">ID</th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  Judul Artikel
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  Penulis
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">Sumber</th>
                <th className="px-6 py-2 border-b-2 border-gray-300">Isi</th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  Uploaded at
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">Edit</th>
              </tr>
            </thead>
            <tbody>
              {artikel.map((article) => (
                <tr key={article.id}>
                  <td className="px-6 py-2 border-b border-gray-300 text-center">
                    {article.id}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.judul}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.publisher}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.sumber}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.isi}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.tanggal_upload}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300 text-center">
                    <button className="border border-gray-300 rounded px-4 py-2 text-blue-500 hover:bg-gray-100">
                      Edit
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

export default ArtikelEdukasi;
