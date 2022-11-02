import axios from "./index";
export const memberApi = {
  mypage: (data) => axios.get("/members", data),
};