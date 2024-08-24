import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { FaGooglePlay } from "react-icons/fa";

function VotePage() {
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const noLapor = searchParams.get("no_lapor");
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (noLapor && lat && lon) {
      const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
      const playStoreLink =
        "https://play.google.com/store/apps/details?id=your.app.id"; // Replace with your actual Play Store link

      setMessage(`Mohon bantuannya untuk mendukung penyelesaian sengketa tanah dengan nomor pelaporan ${noLapor}. Berikut caranya:

1. Download aplikasi Lahan Damai di Play Store ${playStoreLink}.
2. Lakukan registrasi atau login pada aplikasi.
3. Klik fitur "Pemetaan" di halaman beranda.
4. Cari nomor pelaporan ${noLapor} pada searchbar di fitur pemetaan.
5. Klik pinpoint untuk tanah sengketa yang bersangkutan.
6. Berikan dukunganmu dengan menekan tombol "Dukung Laporan" untuk membantu menyelesaikan sengketa ini.

Untuk melihat lokasi di Google Maps, klik di sini: ${googleMapsLink}.`);
    } else {
      setMessage("Invalid parameters");
    }
  }, [location]);

  const renderMessageWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split("\n").map((part, index) => (
      <p key={index} className="mb-2">
        {part.split(urlRegex).map((subpart, subindex) =>
          urlRegex.test(subpart) ? (
            <a
              key={subindex}
              href={subpart}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {subpart}
            </a>
          ) : (
            subpart
          )
        )}
      </p>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-center text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
        Lahan Damai
      </h1>
      <p className="text-center text-lg sm:text-xl font-medium text-gray-600 mb-6">
        Dukung Penyelesaian Sengketa Tanah
      </p>

      <div className="bg-gray-100 rounded-lg p-6 shadow-md overflow-hidden">
        <pre className="whitespace-pre-wrap text-gray-700 font-poppins text-base leading-relaxed break-words text-justify">
          {renderMessageWithLinks(message)}
        </pre>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-4">
        <a
          href="https://play.google.com/store/apps/details?id=your.app.id" // Replace with actual Play Store link
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-[#5d3323] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#8E6F5B] transition duration-300"
        >
          <FaGooglePlay className="mr-2" />
          Download di Play Store
        </a>
        <a
          href={
            message.includes("Google Maps")
              ? message.match(/(https:\/\/www\.google\.com\/maps\?q=[^\s]+)/)[0]
              : "#"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-[#5d3323] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#8E6F5B] transition duration-300"
            >
          <FiMapPin className="mr-2" />
          Lihat di Google Maps
        </a>
      </div>
    </div>
  );
}

export default VotePage;
