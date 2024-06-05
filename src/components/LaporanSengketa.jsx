import React from "react";

const LaporanSengketa = () => {
  const dummyData = [
    {
      id: 1,
      latitude: -6.2088,
      longitude: 106.8456,
      no_sertifikat: "123456",
      user_nik: "1234567890",
      deskripsi: "Gabut aja hehehe",
      proses_laporan: "Pending",
      laporan_photos: ["url1", "url2"],
      uploadedAt: "2/11/2023, 04.00.01",
    },
    {
      id: 2,
      latitude: -6.1754,
      longitude: 106.8272,
      no_sertifikat: "234567",
      user_nik: "2345678901",
      deskripsi: "Gabut lagi",
      proses_laporan: "In Progress",
      laporan_photos: ["url3", "url4"],
      uploadedAt: "2/11/2023, 04.00.01",
    },
    {
      id: 3,
      latitude: -6.2351,
      longitude: 106.8063,
      no_sertifikat: "345678",
      user_nik: "3456789012",
      deskripsi: "Emang saya gabut wkwk",
      proses_laporan: "Resolved",
      laporan_photos: ["url5", "url6"],
      uploadedAt: "2/11/2023, 04.00.01",
    },
  ];

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-8xl w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-2 border-b-2 border-gray-300">ID</th>
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
              {dummyData.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-2 border-b border-gray-300 text-center">
                    {report.id}
                  </td>
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
                    {report.laporan_photos.join(", ")}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {report.uploadedAt}
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
