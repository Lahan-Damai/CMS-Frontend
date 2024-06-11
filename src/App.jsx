import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import ArtikelEdukasi from "./components/edukasi/ArtikelEdukasi";
import TambahArtikel from "./components/edukasi/TambahArtikel";
import EditArtikel from "./components/edukasi/UpdateArtikel";
import LaporanSengketa from "./components/LaporanSengketa";
import ProfilPengguna from "./components/KelolaPengguna";
import AhliTanah from "./components/ahliKonsultasi/AhliTanah";
import Forum from "./components/forum/Forum";
import Replies from "./components/forum/Replies";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path="/login"
            element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/artikel-edukasi" element={<ArtikelEdukasi />} />
          <Route path="/tambah-edukasi" element={<TambahArtikel />} />
          <Route path="/edit-edukasi/:id" element={<EditArtikel />} />
          <Route path="/laporan-sengketa" element={<LaporanSengketa />} />
          <Route path="/daftar-profil" element={<ProfilPengguna />} />
          <Route path="/daftar-ahli-tanah" element={<AhliTanah />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<Replies />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
