import React, { useState, useEffect } from "react";
import { getAllExperts, deleteExpert } from "../../services/ahliKonsultasi";
import { useNavigate } from "react-router-dom";

const AhliTanah = () => {
  const [experts, setExperts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const expertsData = await getAllExperts();
        setExperts(expertsData.data);
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    };

    fetchExperts();
  }, []);

  const handleDropdownToggle = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleEdit = (id) => {
    navigate(`/edit-ahli/${id}`);
  };

  const handleTambahAhli = () => {
    navigate("/tambah-ahli");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin untuk menghapus Ahli ini?"
    );

    if (confirmDelete) {
      try {
        const response = await deleteExpert(id);
        console.log(response.data);

        setExperts(experts.filter((expert) => expert.id !== id));
      } catch (error) {
        console.error("Error deleting expert:", error);
      }
    }
  };

  const handleUlasan = (id) => {
    navigate(`/ulasan-ahli/${id}`);
  };

  const filteredExperts = experts.filter((expert) =>
    expert.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Cari nama ahli..."
            className="p-2 border border-gray-300 rounded-lg w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleTambahAhli}
            className="p-2 bg-[#5D3323] text-white rounded-lg hover:bg-[#4a271e]"
          >
            Tambah Ahli
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-2 border-b-2 border-gray-300"> Nama</th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  {" "}
                  Bidang
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  {" "}
                  Nomor WhatsApp
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  {" "}
                  Deskripsi
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  {" "}
                  Lama Kerja (Tahun)
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300"> Foto</th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  {" "}
                  Ulasan
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredExperts.map((expert) => (
                <tr key={expert.id}>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {expert.nama}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {expert.bidang}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {expert.nomor_wa}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {expert.deskripsi}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {expert.lama_kerja}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    <img
                      src={expert.foto}
                      alt={`Foto ${expert.nama}`}
                      className="h-16 w-16"
                    />
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300 text-center relative">
                    <button
                      className="border border-gray-300 border-b rounded px-4 py-2 text-blue-500 hover:bg-gray-100"
                      onClick={() => handleUlasan(expert.id)}
                    >
                      Lihat
                    </button>
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300 text-right relative">
                    <button
                      className="border border-gray-300 rounded px-2 py-2 text-gray-500 hover:bg-gray-100 relative"
                      onClick={() => handleDropdownToggle(expert.id)}
                    >
                      &#x22EE;
                    </button>
                    {dropdownOpen === expert.id && (
                      <div className="absolute right-0 top-0 mt-8 w-32 bg-white rounded-md shadow-lg py-2 z-50">
                        <button
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full"
                          onClick={() => handleEdit(expert.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full"
                          onClick={() => handleDelete(expert.id)}
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

export default AhliTanah;
