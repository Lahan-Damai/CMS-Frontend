import React from "react";

const ProfilPengguna = () => {
  const dummyData = [
    {
      id: 1,
      username: "DaffaDazzle",
      email: "DaffaStar@gmail.com",
      nomorTelepon: "+62 812 3456 7890",
      role: "Pengguna Umum",
    },
    {
      id: 2,
      username: "AkmalArchitect",
      email: "AkmalInnovator@gmail.com",
      nomorTelepon: "+62 812 3456 7890",
      role: "Pemerintahan",
    },
    {
      id: 3,
      username: "DaffaDynamo",
      email: "DaffaWave@gmail.com",
      nomorTelepon: "+62 812 3456 7890",
      role: "Pengguna Umum",
    },
    {
      id: 4,
      username: "AkmalAdventures",
      email: "AkmalPioneer@gmail.com",
      nomorTelepon: "+62 812 3456 7890",
      role: "Pengguna Umum",
    },
    {
      id: 5,
      username: "AkmalAce",
      email: "AkmalGalaxy@gmail.com",
      nomorTelepon: "+62 812 3456 7890",
      role: "Pengguna Umum",
    },
    {
      id: 6,
      username: "DaffaDelight",
      email: "DaffaSpark@gmail.com",
      nomorTelepon: "+62 812 3456 7890",
      role: "Pemerintahan",
    },
    {
      id: 7,
      username: "DaffaDreamscape",
      email: "DaffaQuest@gmail.com",
      nomorTelepon: "+62 812 3456 7890",
      role: "Pengguna Umum",
    },
  ];

  return (
    <div className="container mx-auto p-4 mt-20 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  ID
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Username Pengguna
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Email
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Nomor Telepon
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300 text-left">
                  Role
                </th>
                <th className="px-6 py-2 border-b-2 border-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.nomorTelepon}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select className="border border-gray-300 rounded px-2 py-1">
                      <option
                        value="Pengguna Umum"
                        selected={user.role === "Pengguna Umum"}
                      >
                        Pengguna Umum
                      </option>
                      <option
                        value="Pemerintahan"
                        selected={user.role === "Pemerintahan"}
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