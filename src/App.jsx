import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import ArtikelEdukasi from "./components/edukasi/ArtikelEdukasi";
import TambahArtikel from "./components/edukasi/TambahArtikel";
import EditArtikel from "./components/edukasi/UpdateArtikel";
import LaporanSengketa from "./components/laporan/LaporanSengketa";
import ProfilPengguna from "./components/pengguna/KelolaPengguna";
import AhliTanah from "./components/ahliKonsultasi/AhliTanah";
import TambahAhli from "./components/ahliKonsultasi/TambahAhli";
import EditAhli from "./components/ahliKonsultasi/UpdateAhli";
import ExpertReviews from "./components/ahliKonsultasi/UlasanRatingAhli";
import Forum from "./components/forum/Forum";
import Replies from "./components/forum/Replies";
import ViewUser from "./components/pengguna/PenggunaDetail";
import LaporanDetail from "./components/laporan/LaporanDetail";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import api from "./services/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/login"
          element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/artikel-edukasi"
          element={
            isLoggedIn ? <ArtikelEdukasi /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/tambah-edukasi"
          element={
            isLoggedIn ? <TambahArtikel /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/edit-edukasi/:id"
          element={
            isLoggedIn ? <EditArtikel /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/laporan-sengketa"
          element={
            isLoggedIn ? <LaporanSengketa /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/daftar-profil"
          element={
            isLoggedIn ? <ProfilPengguna /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/daftar-ahli"
          element={
            isLoggedIn ? <AhliTanah /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/tambah-ahli"
          element={
            isLoggedIn ? <TambahAhli /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/edit-ahli/:id"
          element={isLoggedIn ? <EditAhli /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/ulasan-ahli/:id"
          element={
            isLoggedIn ? <ExpertReviews /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/forum"
          element={isLoggedIn ? <Forum /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/forum/:id"
          element={isLoggedIn ? <Replies /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/view-user/:nik"
          element={isLoggedIn ? <ViewUser /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/laporan-sengketa/:nikUser/:noSertifikat"
          element={
            isLoggedIn ? <LaporanDetail /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<PageNotFound isLoggedIn={isLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
