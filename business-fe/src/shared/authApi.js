import axios from "./api";

export const authApi = {
  //회원가입
  signup: (data) => axios.post("business/sign-up", data),
  // 이메일 중복 체크
  checkemail: (email) => axios.post("business/check-email", email),
  // 인증번호 보내기
  //sendemail: (email) => axios.post("api/members/email/send", email),
  // 인증번호 검증
  //confirmemail: (data) => axios.post("api/members/email/confirm", data),

  login: (data) => axios.post("business/login", data),//,
  //googlelogin: (data) => axios.post("api/google-login", data),
  //getuser: () => axios.get("api/members"),
  //putpassword: (pwd) => axios.put("api/members/password", pwd),
  //deleteuser: () => axios.delete("api/members"),
  //getMyhistory: (date) => axios.get("api/histories", { params: { date } }),

  //checkReg: (data) => axios.post("https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey="+process.env.REACT_APP_OPENAPI_REG_SERVICEKEY ,data),
  checkReg: (data) => axios.post("https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=WQmEhbolzfQFCrn8v1NnwXhtNFlVsMQKmE5mr1eyVibvWFrpTTfo3rzuf%2Fcu5lGnHdaJCAM9ZchZAfOPF2wa2w%3D%3D",data),

  //OPENAPI_REG_SERVICEKEY
};
