import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getArtikelEdukasiById,
  updateArtikelEdukasi,
  deletePostPhotos,
  addPhotosToPost,
} from "../../services/edukasi";

const EditArtikel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    isi: "",
    publisher: "",
    sumber: "",
    is_recommended: false,
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [deleteAll, setDeleteAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getArtikelEdukasiById(id);
        console.log(response);
        console.log(response.data);
        console.log(response.data.fotos);
        console.log(response.data.is_recommended);
        setFormData({
          ...response.data,
          foto: response.data.fotos || [], // Set foto to an empty array if it's undefined or null
        });
        setExistingImages(response.data.fotos || []); // Set existingImages to an empty array if it's undefined or null
      } catch (error) {
        console.error("Error fetching artikel edukasi:", error);
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

    if (e.target.type === "textarea") {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (existingImages.length + files.length > 3) {
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
    setNewImages([...newImages, ...validFiles]);
  };

  const handleDeleteAllImages = () => {
    setExistingImages([]);
    setDeleteAll(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (deleteAll) {
        await deletePostPhotos(id);
      }

      const formDataToSend = new FormData();
      formDataToSend.append("judul", formData.judul);
      formDataToSend.append("deskripsi", formData.deskripsi);
      formDataToSend.append("isi", formData.isi);
      formDataToSend.append("publisher", formData.publisher);
      formDataToSend.append("sumber", formData.sumber);
      console.log(formData.is_recommended);
      formDataToSend.append("is_recommended", formData.is_recommended);
      console.log(formData);
      console.log(formDataToSend);
      await updateArtikelEdukasi(id, formDataToSend);

      if (newImages.length > 0) {
        const photoFormData = new FormData();
        newImages.forEach((file) => {
          photoFormData.append("foto", file);
        });
        await addPhotosToPost(id, photoFormData);
      }
      navigate("/artikel-edukasi");
    } catch (error) {
      console.error("Error updating artikel edukasi:", error);
    }
  };

  const handleCancel = () => {
    navigate("/artikel-edukasi");
  };

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-2xl font-semibold mb-4">Edit Artikel Edukasi</h1>
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
            <label htmlFor="is_recommended" className="block mb-1">
              Apakah Artikel Direkomendasikan?
            </label>
            <select
              id="is_recommended"
              name="is_recommended"
              value={formData.is_recommended}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  is_recommended: e.target.value === "true",
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value={false}>Tidak</option>
              <option value={true}>Iya</option>
            </select>
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
            <div className="flex">
              <div className="w-1/2">
                {existingImages.length > 0 && (
                  <div className="mt-2">
                    <strong>Existing Images:</strong>
                    <ul className="list-disc list-inside flex flex-wrap">
                      {existingImages.map((imageUrl, index) => (
                        <li key={index} className="flex items-center mr-4 mb-2">
                          <img
                            src={imageUrl}
                            className="max-w-[200px] max-h-[200px] object-contain"
                            alt={imageUrl}
                          />
                        </li>
                      ))}
                    </ul>
                    <button
                      className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                      onClick={handleDeleteAllImages}
                    >
                      Delete All Photos
                    </button>
                  </div>
                )}
              </div>
              <div className="w-1/2">
                {newImages.length > 0 && (
                  <div className="mt-2">
                    <strong>New Images:</strong>
                    <ul className="list-disc list-inside flex flex-wrap">
                      {newImages.map((file, index) => (
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
            </div>
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

export default EditArtikel;
