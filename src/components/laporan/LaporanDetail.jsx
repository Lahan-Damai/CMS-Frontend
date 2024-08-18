import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLaporanByNoSertifikat, updateLaporan } from "../../services/laporan";

const LaporanDetail = () => {
  const { noSertifikat, nikUser } = useParams();
  const [laporanData, setLaporanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prosesOptions = ["Diterima", "Diproses", "Ditolak", "Selesai"];

  useEffect(() => {
    const fetchLaporanData = async () => {
      try {
        console.log("noSertifikat:", noSertifikat, "nikUser:", nikUser);
        const response = await getLaporanByNoSertifikat(noSertifikat, nikUser);
        setLaporanData(response.data);
      } catch (error) {
        setError("Error fetching laporan data");
        console.error("Error fetching laporan data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLaporanData();
  }, [noSertifikat, nikUser]);

  const handleProsesChange = async (e) => {
    const newProses = e.target.value;
    const updatedLaporan = { ...laporanData, proses_laporan: newProses };
    setLaporanData(updatedLaporan);
    try {
      const { fotos, ...updateData } = updatedLaporan;  // Exclude 'fotos' if not needed in the update payload

      await updateLaporan(updateData);
    } catch (error) {
      console.error("Failed to update laporan:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-2xl font-semibold mb-4">Detail Laporan</h1>
        {laporanData && (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Nomor Sertifikat:</label>
              <p className="border border-gray-300 rounded-lg px-4 py-2">
                {laporanData.no_sertifikat}
              </p>
            </div>
            <div>
              <label className="block mb-1 font-semibold">NIK Pelapor:</label>
              <p className="border border-gray-300 rounded-lg px-4 py-2">
                {laporanData.user_nik}
              </p>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Deskripsi:</label>
              <p className="border border-gray-300 rounded-lg px-4 py-2">
                {laporanData.deskripsi}
              </p>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Proses Laporan:</label>
              <select
                value={laporanData.proses_laporan}
                onChange={handleProsesChange}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                {prosesOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Tanggal Lapor:</label>
              <p className="border border-gray-300 rounded-lg px-4 py-2">
                {laporanData.tanggal_lapor}
              </p>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Foto:</label>
              <div className="flex flex-wrap gap-2">
                {laporanData.fotos &&  laporanData.fotos.map((foto, index) => (
                  <img
                    key={index}
                    src={foto}
                    alt={`Foto ${index + 1}`}
                    className="border border-gray-300 rounded-lg max-w-[200px] max-h-[200px] object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaporanDetail;
