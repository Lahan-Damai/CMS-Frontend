import React, { useState, useEffect } from "react";
import { getAllExperts, deleteExpert } from "../../services/ahliKonsultasi";

const AhliTanah = () => {
  const [experts, setExperts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);

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
    // Navigate to the edit page for the expert with the given id
    console.log(`Edit expert with id ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteExpert(id);
      console.log(response.data); 

      setExperts(experts.filter((expert) => expert.id !== id));
    } catch (error) {
      console.error("Error deleting expert:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  ID
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Nama
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Bidang
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Nomor WhatsApp
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Deskripsi
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Lama Kerja (Tahun)
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Foto
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {experts.map((expert) => (
                <tr key={expert.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{expert.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap truncate max-w-[200px] max-h-[50px]">
                    {expert.nama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap truncate max-w-[200px] max-h-[50px]">
                    {expert.bidang}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {expert.nomor_wa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap truncate max-w-[300px] max-h-[50px]">
                    {expert.deskripsi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {expert.lama_kerja}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={expert.foto}
                      alt={`Foto ${expert.nama}`}
                      className="h-12 w-12 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right relative">
                    <button
                      className="border border-gray-300 rounded px-2 py-2 text-gray-500 hover:bg-gray-100 relative"
                      onClick={() => handleDropdownToggle(expert.id)}
                    >
                      &#x22EE;
                    </button>
                    {dropdownOpen === expert.id && (
                      <div className="absolute right-0 top-0 mt-8 w-32 bg-white rounded-md shadow-lg py-2 z-50">
                        <button
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                          onClick={() => handleEdit(expert.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
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