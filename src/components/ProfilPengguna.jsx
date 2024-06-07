import React from "react";
import { useState, useEffect } from "react";
import { getProfilPengguna } from "../services/api";

const ProfilPengguna = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getProfilPengguna();
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  NIK
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Nama Pengguna
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Email
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Alamat
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Tanggal Lahir
                </th>                
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Role
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.nik}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.nik}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.nama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.alamat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.tanggal_lahir}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select className="border border-gray-300 rounded px-2 py-1">
                      <option
                        value="Pengguna Umum"
                        selected={user.role === "user"}
                      >
                        Pengguna Umum
                      </option>
                      <option
                        value="Pemerintahan"
                        selected={user.role === "admin"}
                      >
                        Pemerintahan
                      </option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
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

export default ProfilPengguna;