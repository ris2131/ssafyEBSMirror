import axios from "./api";

export const scheduleApi = {
  
  // 인증번호 검증
  //confirmemail: (data) => axios.post("api/members/email/confirm", data),

  getTimeSheet: (data) => axios.get("manage/calendar" , {params: { date: data}}),

  //googlelogin: (data) => axios.post("api/google-login", data),
  //getuser: () => axios.get("api/members"),
  //putpassword: (pwd) => axios.put("api/members/password", pwd),
  //deleteuser: () => axios.delete("api/members"),
  //getMyhistory: (date) => axios.get("api/histories", { params: { date } }),

  //OPENAPI_REG_SERVICEKEY
};
