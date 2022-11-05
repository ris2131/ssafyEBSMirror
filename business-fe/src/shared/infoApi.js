import axios from "./api";

export const infoApi = {
  //회원관리 수정.
  modify: (data) => axios.post("business/info", data),
};