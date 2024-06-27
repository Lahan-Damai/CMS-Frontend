import React, { useState, useEffect } from "react";
import {
  getArtikelEdukasi,
  deleteArtikelEdukasi,
  updateArtikelEdukasi,
} from "../../services/edukasi";
import { useNavigate } from "react-router-dom";

const ArtikelEdukasi = () => {
  const [artikel, setArtikel] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("rekomendasi");
  const navigate = useNavigate();

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

  const handleDropdownToggle = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleEdit = (id) => {
    navigate(`/edit-edukasi/${id}`);
  };

  const handleTambahEdukasi = () => {
    navigate("/tambah-edukasi");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin untuk menghapus Artikel ini?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteArtikelEdukasi(id);
        console.log(response.data); // "success"

        setArtikel(artikel.filter((article) => article.id !== id));
      } catch (error) {
        console.error("Error deleting artikel edukasi:", error);
      }
    }
  };

  const handleRekomendasiChange = async (id, isRecommended) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("is_recommended", isRecommended);

      await updateArtikelEdukasi(id, formDataToSend);

      setArtikel((prevArtikel) =>
        prevArtikel.map((article) =>
          article.id === id
            ? { ...article, is_recommended: isRecommended }
            : article
        )
      );
    } catch (error) {
      console.error("Error updating artikel edukasi:", error);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedArtikel = artikel
    .filter((article) =>
      article.judul.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "rekomendasi") {
        return b.is_recommended - a.is_recommended;
      } else if (sortOption === "oldest") {
        return new Date(a.tanggal_upload) - new Date(b.tanggal_upload);
      } else if (sortOption === "newest") {
        return new Date(b.tanggal_upload) - new Date(a.tanggal_upload);
      }
      return 0;
    });

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-7xl">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Cari judul artikel..."
            className="p-2 border border-gray-300 rounded-lg w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="p-2 border border-gray-300 rounded-lg mr-2"
            >
              <option value="rekomendasi">Rekomendasi</option>
              <option value="oldest">Oldest</option>
              <option value="newest">Newest</option>
            </select>
            <button
              onClick={handleTambahEdukasi}
              className="p-2 bg-[#5D3323] text-white rounded-lg hover:bg-[#4a271e]"
            >
              Tambah Artikel Edukasi
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  Judul Artikel
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  Penulis
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">Sumber</th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  Deskripsi
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">Isi</th>
                <th className="px-6 py-2 border-b-2 border-gray-300">Foto</th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  Diunggah Pada
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  Rekomendasi
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedArtikel.map((article) => (
                <tr key={article.id}>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.judul}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.publisher}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.sumber}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300 max-h-20 overflow-hidden text-ellipsis">
                    <div className="line-clamp-5">{article.deskripsi}</div>
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300 max-h-20 overflow-hidden text-ellipsis">
                    <div className="line-clamp-5">{article.isi}</div>
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.fotos && article.fotos.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {article.fotos.map((foto, index) => (
                          <img
                            key={index}
                            src={foto}
                            alt={`Foto ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {article.tanggal_upload}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    <select
                      value={article.is_recommended ? "Iya" : "Tidak"}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      onChange={(e) =>
                        handleRekomendasiChange(
                          article.id,
                          e.target.value === "Iya"
                        )
                      }
                    >
                      <option value="Iya">Iya</option>
                      <option value="Tidak">Tidak</option>
                    </select>
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300 text-right relative">
                    <button
                      className="border border-gray-300 rounded px-2 py-2 text-gray-500 hover:bg-gray-100 relative"
                      onClick={() => handleDropdownToggle(article.id)}
                    >
                      &#x22EE;
                    </button>
                    {dropdownOpen === article.id && (
                      <div className="absolute right-0 top-0 mt-8 w-32 bg-white rounded-md shadow-lg py-2 z-50">
                        <button
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                          onClick={() => handleEdit(article.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                          onClick={() => handleDelete(article.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
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
