import axios from "axios";

const baseURL = "/api";

const formApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

formApi.interceptors.request.use((config) => {
  if (!config.headers.authorization) {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = token;
    }
  }
  return config;
});

export const imgApi = {
  //머리완성 사진 보내기
  addReservationPhoto: (formData,reservation_seq)=>formApi.post(`/reservations/photo?reservation_seq=${reservation_seq}`,formData),
};

