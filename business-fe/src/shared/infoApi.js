import axios from "./api";

export const infoApi = {
  
  //회원관리 조회
  getinfo: () => axios.get("manage"),
  //회원관리 수정.
  modifyinfo: (data) => axios.put("manage", data),

};