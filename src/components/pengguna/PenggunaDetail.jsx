import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserByNik, switchUserRole } from "../../services/pengguna";

const ViewUser = () => {
  const { nik } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(nik);
    const fetchUserData = async () => {
      try {
        const response = await getUserByNik(nik);
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        setError("Error fetching user data");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [nik]);

  const handleRoleChange = async (email, newRole) => {
  
    try {
      const response = await switchUserRole(email, newRole);
      setUserData((prevUserData) => ({
        ...prevUserData,
        role: response.role,
      }));
    } catch (error) {
      console.error("Failed to switch user role:", error);
    }
  };



  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-2xl font-semibold mb-4">Detail Pengguna</h1>
        {userData && (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">NIK:</label>
              <p className="border border-gray-300 rounded-lg px-4 py-2">
                {userData.nik}
              </p>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Nama:</label>
              <p className="border border-gray-300 rounded-lg px-4 py-2">
                {userData.nama}
              </p>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email:</label>
              <p className="border border-gray-300 rounded-lg px-4 py-2">
                {userData.email}
              </p>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Alamat:</label>
              <p className="border border-gray-300 rounded-lg px-4 py-2">
                {userData.alamat}
              </p>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Tanggal Lahir:</label>
              <p className="border border-gray-300 rounded-lg px-4 py-2">
                {userData.tanggal_lahir}
              </p>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Role:</label>
              <select
                className="border border-gray-300 rounded px-2 py-1"
                value={userData.role}
                onChange={(e) =>
                  handleRoleChange(userData.email, e.target.value)
                }
              >
                <option value="user">Umum</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Foto:</label>
              {userData.foto ? (
                <img
                  src={userData.foto}
                  alt="User"
                  className="border border-gray-300 rounded-lg max-w-[200px] max-h-[200px] object-contain"
                />
              ) : (
                <span className="text-gray-500">Tidak ada foto</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUser;
