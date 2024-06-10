import React from "react";
import { useEffect, useState } from "react";
import { getLaporanSengketa } from "../services/laporan";

const LaporanSengketa = () => {

  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const response = await getLaporanSengketa();
        setLaporan(response.data);
      } catch (error) {
        console.error("Failed to fetch laporan sengketa:", error);
      }
    };

    fetchLaporan();
  }, []);

  console.log(laporan);

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-8xl w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  User NIK
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  No Sertifikat
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  Latitude
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  Longitude
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  Deskripsi
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  Proses Laporan
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  Laporan Photos
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">
                  Uploaded at
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300">Edit</th>
              </tr>
            </thead>
            <tbody>
              {laporan.map((report) => (
                <tr key={report.no_sertifikat}>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {report.user_nik}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {report.no_sertifikat}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {report.latitude}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {report.longitude}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {report.deskripsi}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {report.proses_laporan}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {report.fotos.join(", ")}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {report.tanggal_lapor}
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

export default LaporanSengketa;
