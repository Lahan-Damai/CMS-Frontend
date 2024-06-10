import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArtikelEdukasi } from "../../services/edukasi";

const TambahArtikel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    isi: "",
    publisher: "",
    sumber: "",
    foto: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (e.target.type === "textarea") {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("You can upload up to 3 images only.");
      return;
    }
    const validFiles = files.filter((file) =>
      ["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(file.type)
    );
    if (validFiles.length !== files.length) {
      alert("Only image files are allowed.");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      foto: [...prevData.foto, ...validFiles],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("judul", formData.judul);
      formDataToSend.append("deskripsi", formData.deskripsi);
      formDataToSend.append("isi", formData.isi);
      formDataToSend.append("publisher", formData.publisher);
      formDataToSend.append("sumber", formData.sumber);
      formDataToSend.append("tanggal_upload", new Date().toISOString());
      formData.foto.forEach((file) => {
        formDataToSend.append("foto", file);
      });
      console.log(formData);
      console.log(formDataToSend);
      const response = await createArtikelEdukasi(formDataToSend);
      console.log("New post created:", response.data);
      navigate("/artikel-edukasi");
    } catch (error) {
      console.error("Error creating artikel edukasi:", error);
    }
  };

  const handleCancel = () => {
    navigate("/artikel-edukasi");
  };

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-2xl font-semibold mb-4">Tambah Artikel Edukasi</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="judul" className="block mb-1">
              Judul Artikel
            </label>
            <input
              type="text"
              id="judul"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="publisher" className="block mb-1">
              Publisher
            </label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="sumber" className="block mb-1">
              Sumber
            </label>
            <input
              type="text"
              id="sumber"
              name="sumber"
              value={formData.sumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="deskripsi" className="block mb-1">
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none overflow-hidden"
            />
          </div>
          <div>
            <label htmlFor="isi" className="block mb-1">
              Isi Artikel
            </label>
            <textarea
              id="isi"
              name="isi"
              value={formData.isi}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none overflow-hidden"
            />
          </div>
          <div>
            <label htmlFor="foto" className="block mb-1">
              Foto
            </label>
            <input
              type="file"
              id="foto"
              name="foto"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {formData.foto.length > 0 && (
              <div className="mt-2">
                <strong>Preview Images:</strong>
                <ul className="list-disc list-inside flex flex-wrap">
                  {formData.foto.map((file, index) => (
                    <li key={index} className="flex items-center mr-4 mb-2">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="max-w-[200px] max-h-[200px] object-contain"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#5D3323] text-white rounded-lg py-2 px-4 hover:bg-[#4a271e]"
            >
              Buat Artikel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahArtikel;