import React, { useState, useEffect } from "react";
import { getProfilPengguna, switchUserRole, getCurrentUser } from "../../services/pengguna";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

const ProfilPengguna = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getProfilPengguna();
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setLoading(false);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user.data);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 8000);

    fetchUsers();
    fetchCurrentUser();

    return () => clearTimeout(timeoutId);
  }, []);

  const handleRoleChange = async (email, newRole) => {
    try {
      const response = await switchUserRole(email, newRole);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, role: response.role } : user
        )
      );
    } catch (error) {
      console.error("Failed to switch user role:", error);
    }
  };

  const handleLihat = (nik) => {
    navigate(`/view-user/${nik}`);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (roleFilter ? user.role === roleFilter : true)
  );

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-7xl">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Cari email pengguna..."
            className="p-2 border border-gray-300 rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg ml-2"
            >
              <option value="">Semua Role</option>
              <option value="admin">Admin</option>
              <option value="user">Umum</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
        {loading ? (
            <LoadingSpinner />
          ) : users.length === 0 ? (
            <p className="text-center text-gray-500">Threads TIDAK MEMILIKI REPLIES</p>
          ) : (
          <table className="min-w-full bg-white table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-300">NIK</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  Nama Pengguna
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Email</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Alamat</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  Tanggal Lahir
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Role</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Detail</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.nik}>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {user.nik}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {user.nama}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {user.email}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    <div className="line-clamp-5">{user.alamat}</div>
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    {user.tanggal_lahir}
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300">
                    <select
                      className="border border-gray-300 rounded px-2 py-1"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.email, e.target.value)
                      }
                      disabled={currentUser && user.email === currentUser.email}
                    >
                      <option value="user">Umum</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-2 border-b border-gray-300 text-center relative">
                    <button
                      className="border border-gray-300 border-b rounded px-4 py-2 text-blue-500 hover:bg-gray-100"
                      onClick={() => handleLihat(user.nik)}
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

export default ProfilPengguna;
