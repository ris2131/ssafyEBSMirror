import axios from "./api";

export const infoApi = {
  
  //매장관리 조회
  getinfo: () => axios.get("manage"),
  //매장관리 수정.
  // modifyinfo: (data) => axios.put("manage", data),
  //회원관리 등록(매장 등록)
  registerinfo: ()=>axios.put("manage/register"),
};