import baseaxios from "axios";

<<<<<<< HEAD
// const baseURL = "https://k7d107.p.ssafy.io/api/"
const baseURL = "/api" 
=======

// const baseURL = "https://k7d107.p.ssafy.io/api/"
const baseURL = "/api" //nginx로 할때
>>>>>>> b29f0cdef90c62f53a3063ff7c7864d4b25ee4e4
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
