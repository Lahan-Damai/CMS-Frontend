import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAhliById, updateAhli } from "../../services/ahliKonsultasi";

const bidangOptions = [
  'Surveyor Tanah',
  'Notaris / PPAT',
  'Pengacara Pertanahan',
  'Ahli Geologi / Geoteknik',
  'Pengembang Real Estate',
  'Perencana Kota dan Wilayah',
  'Ahli Lingkungan'
];

const EditAhli = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    nama: "",
    bidang: "",
    nomor_wa: "",
    deskripsi: "",
    lama_kerja: "",
    foto: null,
  });
  const [newImage, setNewImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAhliById(id);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching ahli:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (e.target.name === "deskripsi") {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", 
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      !file ||
      !["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(file.type)
    ) {
      alert("Only image files are allowed.");
      return;
    }
    setNewImage(file);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nama) newErrors.nama = "Nama is required.";
    if (!formData.bidang) newErrors.bidang = "Bidang is required.";
    if (!formData.nomor_wa) newErrors.nomor_wa = "Nomor WhatsApp is required.";
    if (!formData.deskripsi) newErrors.deskripsi = "Deskripsi is required.";
    if (!formData.lama_kerja) newErrors.lama_kerja = "Lama Kerja is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nama", formData.nama);
      formDataToSend.append("bidang", formData.bidang);
      formDataToSend.append("nomor_wa", formData.nomor_wa);
      formDataToSend.append("deskripsi", formData.deskripsi);
      formDataToSend.append("lama_kerja", formData.lama_kerja);
  
      if (newImage) {
        formDataToSend.append("foto", newImage);
      } else {
        formDataToSend.append("foto", formData.foto);
      }
  
      const response = await updateAhli(id, formDataToSend);
      navigate("/daftar-ahli");
    } catch (error) {
      console.error("Error updating ahli:", error);
    }
  };

  const handleCancel = () => {
    navigate("/daftar-ahli");
  };

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-2xl font-semibold mb-4">Edit Ahli Tanah</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nama" className="block mb-1">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.nama && (
              <div className="text-red-500 text-sm mt-1">{errors.nama}</div>
            )}
          </div>
          <div>
            <label htmlFor="bidang" className="block mb-1">
              Bidang
            </label>
            <select
              id="bidang"
              name="bidang"
              value={formData.bidang}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Pilih Bidang</option>
              {bidangOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.bidang && (
              <div className="text-red-500 text-sm mt-1">{errors.bidang}</div>
            )}
          </div>
          <div>
            <label htmlFor="nomor_wa" className="block mb-1">
              Nomor WhatsApp
            </label>
            <input
              type="tel"
              id="nomor_wa"
              name="nomor_wa"
              value={formData.nomor_wa}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.nomor_wa && (
              <div className="text-red-500 text-sm mt-1">{errors.nomor_wa}</div>
            )}
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
            {errors.deskripsi && (
              <div className="text-red-500 text-sm mt-1">{errors.deskripsi}</div>
            )}
          </div>
          <div>
            <label htmlFor="lama_kerja" className="block mb-1">
              Lama Kerja (Tahun)
            </label>
            <input
              type="number"
              id="lama_kerja"
              name="lama_kerja"
              value={formData.lama_kerja}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.lama_kerja && (
              <div className="text-red-500 text-sm mt-1">{errors.lama_kerja}</div>
            )}
          </div>
          <div>
            <label htmlFor="foto" className="block mb-1">
              Foto
            </label>
            <input
              type="file"
              id="foto"
              name="foto"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {formData.foto && (
              <div className="mt-2">
                <strong>Existing Image:</strong>
                <img
                  src={formData.foto}
                  alt="Existing Image"
                  className="max-w-[200px] max-h-[200px] object-contain"
                />
              </div>
            )}
            {newImage && (
              <div className="mt-2">
                <strong>New Image:</strong>
                <img
                  src={URL.createObjectURL(newImage)}
                  alt={newImage.name}
                  className="max-w-[200px] max-h-[200px] object-contain"
                />
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAhli;
