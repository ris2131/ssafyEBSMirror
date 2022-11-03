import axios from "./index";
export const authApi = {
  googlelogin: (data) => axios.post("/members/login", data),
  googlesignup: (data) => axios.post("/members/signup", data),
//   signup: (data) => axios.post("api/members/sign-up", data),
//   login: (data) => axios.post("api/login", data),
  // googlelogin: (data) => axios.post("/members/login", data),

//   getuser: () => axios.get("api/members"),
//   putuser: (data) => axios.put("api/members/info", data),
//   putpassword: (pwd) => axios.put("api/members/password", pwd),
//   deleteuser: () => axios.delete("api/members"),
//   emailauth: (email) => axios.post("api/members/email", email),
//   test: (data) => axios.post("api/diaries", data),
};