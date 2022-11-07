import axios from "./index";

const baseurl = "http://localhost:8080";
// const baseurl = "서버주소"
export const businessApi = {
  
  searchByname: (params) => axios.get(baseurl+"/search/hairshop",{params}) ,
  getInfo : (businessSeq) => axios.get(baseurl+`/search/hairshop/${businessSeq}/info`),
  getDesignerInfo : (businessSeq) => axios.get(baseurl+`/search/hairshop/${businessSeq}/designer`),

};