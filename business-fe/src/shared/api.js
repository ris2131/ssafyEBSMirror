import baseaxios from "axios";

const baseURL = "/api";

const axios = baseaxios.create({
  baseURL,
  headers :  {
    "Content-Type": "application/json; charset=UTF-8",
    accept: "application/json",
    'Cache-Control': 'no-store',
    Pragma: 'no-store',
    Expires: '0',
  },
});

axios.interceptors.request.use((config) => {
  if (!config.headers.authorization) {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = token;
    }
  }
  return config;
});

export default axios;