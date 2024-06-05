import React from "react";

const ArtikelEdukasi = () => {
  const dummyData = [
    {
      id: 1,
      title: "5 Fakta tentang Tanah",
      author: "Liqba",
      source: "detik.com",
      content: "Lorem Ipsum....",
      uploadedAt: "2/11/2023, 04.00.01",
    },
    {
      id: 2,
      title: "Damal mendapat promosi jadi ahli tanah",
      author: "Liqba",
      source: "kompas.com",
      content: "Lorem Ipsum....",
      uploadedAt: "2/11/2023, 04.00.01",
    },
    {
      id: 3,
      title: "Iqbaliqba",
      author: "Liqba",
      source: "liputan6.com",
      content: "Lorem Ipsum....",
      uploadedAt: "2/11/2023, 04.00.01",
    },
  ];

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
              {dummyData.map((article) => (
                <tr key={article.id}>
                  <td className="px-6 py-2 border-b border-gray-300 text-center">
                    {article.id}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.title}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.author}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.source}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.content}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.uploadedAt}
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
