import React, { useEffect, useState } from "react";
import { getLaporanSengketa, updateLaporan } from "../../services/laporan";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

const LaporanSengketa = () => {
  const [laporan, setLaporan] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [statusFilter, setStatusFilter] = useState(""); 
  const prosesOptions = ["Diterima", "Diproses", "Ditolak", "Selesai"];
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const response = await getLaporanSengketa();
        setLaporan(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch laporan sengketa:", error);
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 8000);

    fetchLaporan();

    return () => clearTimeout(timeoutId);
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
    try {
      const updatedReport = updatedLaporan.find(
        (report) =>
          report.no_sertifikat.toLowerCase() === noSertifikat.toLowerCase()
      );

      const { fotos, ...updateData } = updatedReport;

      await updateLaporan(updateData);
    } catch (error) {
      console.error("Failed to update laporan:", error);
    }
  };

  const handleLihat = (no_sertifikat) => {
    navigate(`/laporan-sengketa/${no_sertifikat}`);
  };

  const filteredNoSertif = laporan.filter((report) =>
    report.no_sertifikat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "oldest") {
    filteredNoSertif.sort((a, b) => new Date(a.tanggal_lapor) - new Date(b.tanggal_lapor));
  } else if (sortOption === "newest") {
    filteredNoSertif.sort((a, b) => new Date(b.tanggal_lapor) - new Date(a.tanggal_lapor));
  }

  const filteredAndSorted = filteredNoSertif.filter((report) =>
    statusFilter ? report.proses_laporan === statusFilter : true
  );

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Cari Nomor Sertifikat Tanah..."
            className="p-2 border border-gray-300 rounded-lg w-full mr-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center pr-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg mr-2"
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg mr-2"
            >
              <option value="">Semua Status</option>
              {prosesOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
        {loading ? (
            <LoadingSpinner />
          ) : laporan.length === 0 ? (
            <p className="text-center text-gray-500">Tidak ada laporan</p>
          ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  NIK Pengguna
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
                  Foto Laporan
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  Diunggah Pada
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Detail</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.map((report) => (
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
                    <div className="max-w-[300px] whitespace-normal line-clamp-10">
                      {report.deskripsi}
                    </div>
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
                  <td className="px-4 py-2 border-b border-gray-300 w-98">
                    {report.fotos && report.fotos.length > 0 ? (
                      <div className="grid grid-cols-2 gap-1 max-w-[240px] w-full">
                        {report.fotos.slice(0, 5).map((foto, index) => (
                          <img
                            key={index}
                            src={foto}
                            alt={`Foto ${index + 1}`}
                            className={`w-16 h-16 object-cover rounded-md ${
                              index >= 3 ? "col-start-2" : ""
                            }`}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default LaporanSengketa;
