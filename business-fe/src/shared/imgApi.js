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
  //디자이너 추가.
  addDesigner: (formData) => formApi.post("manage/designers",formData),
  //디자이너 수정
  modifyDesigner: (formData)=> formApi.put(`manage/designers`,formData),
};

