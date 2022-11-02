import baseaxios from "axios";

const baseURL = "https://k7d107.p.ssafy.io/api/"
// const baseURL = "/api" nginx로 할때
//const baseURL = "";

const axios = baseaxios.create({
  baseURL,
  headers : {headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  }},
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
