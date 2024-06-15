import React, { useEffect, useState } from "react";
import { getLaporanSengketa, updateLaporan } from "../../services/laporan";
import { useNavigate } from "react-router-dom";


const LaporanSengketa = () => {
  const [laporan, setLaporan] = useState([]);
  const prosesOptions = ["Diterima", "Diproses", "Ditolak", "Selesai"];
  const navigate = useNavigate();


  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const response = await getLaporanSengketa();
        console.log(response.data);
        setLaporan(response.data);
      } catch (error) {
        console.error("Failed to fetch laporan sengketa:", error);
      }
    };

    fetchLaporan();
  }, []);

  const handleProsesChange = async (e, noSertifikat) => {
    const newProses = e.target.value;
    const updatedLaporan = laporan.map((report) => {
      if (report.no_sertifikat.toLowerCase() === noSertifikat.toLowerCase()) {
        return { ...report, proses_laporan: newProses };
      }
      return report;
    });
    setLaporan(updatedLaporan);
    console.log(updatedLaporan);
    try {
      const updatedReport = updatedLaporan.find(
        (report) =>
          report.no_sertifikat.toLowerCase() === noSertifikat.toLowerCase()
      );

      const { fotos, ...updateData } = updatedReport;

      await updateLaporan(updateData);
      console.log("Laporan updated successfully");
    } catch (error) {
      console.error("Failed to update laporan:", error);
    }
  };

  const handleLihat = (no_sertifikat) => {
    navigate(`/laporan-sengketa/${no_sertifikat}`);
  };

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  User NIK
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  No Sertifikat
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  Latitude
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  Longitude
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  Deskripsi
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  Proses Laporan
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  Laporan Photos
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  Uploaded at
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Detail</th>
              </tr>
            </thead>
            <tbody>
              {laporan.map((report) => (
                <tr key={report.no_sertifikat}>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {report.user_nik}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {report.no_sertifikat}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {report.latitude}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {report.longitude}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {report.deskripsi}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    <select
                      value={report.proses_laporan}
                      onChange={(e) =>
                        handleProsesChange(e, report.no_sertifikat)
                      }
                      className="border border-gray-300 rounded-lg px-4 py-2"
                    >
                      {prosesOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {report.fotos && report.fotos.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {report.fotos.map((foto, index) => (
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
                  <td className="px-4 py-2 border-b border-gray-300">
                    {report.tanggal_lapor}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300 text-center relative">
                    <button
                      className="border border-gray-300 border-b rounded px-4 py-2 text-blue-500 hover:bg-gray-100"
                      onClick={() => handleLihat(report.no_sertifikat)}
                    >
                      Lihat
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
