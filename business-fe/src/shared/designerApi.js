import axios from "./api";

export const designerApi = {
  
  //디자이너 추가.
  addDesigner: (data) => axios.post("manage/designers",data),

  //디자이너 목록 조회
  getDesigner: () => axios.get("manage/designers"),
};