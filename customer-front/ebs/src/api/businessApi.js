import axios from "./index";

const baseurl = "https://business.ssafy-ebs.com/api";
// const baseurl = "서버주소"
export const businessApi = {
  
  searchByname: (params) => axios.get(baseurl+"/search/hairshop",{params}) ,
  getInfo : (businessSeq) => axios.get(baseurl+`/search/hairshop/${businessSeq}/info`),
  getDesignerInfo : (businessSeq) => axios.get(baseurl+`/search/hairshop/${businessSeq}/designer`),
}