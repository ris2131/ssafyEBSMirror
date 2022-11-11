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
  //매장관리 수정.
  modifyinfo: (formData) => formApi.put("manage", formData),
  // signup: (formData) => formApi.post("members/sign-up", formData),
  // googlesignup: (formData) => formApi.post("members/google-sign-up", formData),
  // putuserimage: (formData) => formApi.put("members/info-image", formData),
  // putuser: (data) => formApi.put("members/info", data),
  // postdiary: (formData) => formApi.post("/diaries", formData),
};

