import baseaxios from "axios";

// const baseURL = "https://k7d107.p.ssafy.io/api/"
//const baseURL = "";


const kakaoaxios = baseaxios.create({
  baseURL,
  headers : {
    Authorization : "KakaoAK d08fb758ac87e7487a96eb2cf1bd4b5e",
    "Content-Type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});




  export default kakaoaxios;

