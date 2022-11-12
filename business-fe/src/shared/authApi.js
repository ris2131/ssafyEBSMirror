import axios from "./api";

export const authApi = {
  //회원가입
  signup: (data) => axios.post("business/sign-up", data),
  // 이메일 중복 체크
  checkemail: (email) => axios.post("business/check-email", email),
  //로그인
  login: (data) => axios.post("business/login", data),//,
  //인증 번호 검증
  checkReg: (data) => axios.post("https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey="+process.env.REACT_APP_OPENAPI_REG_SERVICEKEY,data),

};
