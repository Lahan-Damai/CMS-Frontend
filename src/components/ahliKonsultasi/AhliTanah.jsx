import React, { useState, useEffect } from "react";
import { getAllExperts } from "../../services/ahliKonsultasi";

const AhliTanah = () => {
  const [experts, setExperts] = useState([]);

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
                  <td className="px-6 py-4 whitespace-nowrap">{expert.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{expert.bidang}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{expert.nomor_wa}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{expert.deskripsi}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{expert.lama_kerja}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={expert.foto}
                      alt={`Foto ${expert.nama}`}
                      className="h-12 w-12 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
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

export default AhliTanah;