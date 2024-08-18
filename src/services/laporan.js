import api from "./api";



export const getLaporanSengketa = async () => {
  try {
    const response = await api.get("/api/laporan/get/all");
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateLaporan = async (data) => {
  try {
    const response = await api.put("/api/laporan/update", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLaporanByNoSertifikat = async (noSertifikat, nikUser) => {
  try {
    const response = await api.get(`/api/laporan/${nikUser}/${noSertifikat}/get`);
    return response;
  } catch (error) {
    throw error;
  }
};



