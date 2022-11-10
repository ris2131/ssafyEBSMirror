import axios from "./api";

export const designerApi = {
  
  //디자이너 추가.
  addDesigner: (data) => axios.post("manage/designers",data),
  //디자이너 단일 겟
  getDesignerInfo: (designer_seq)=> axios.get(`manage/designers/${designer_seq}`),
  //디자이너 수정
  modifyDesigner: (data)=> axios.put(`manage/designers`,data),
  //디자이너 삭제
  //deleteDesigner: (dat)=> axios.delete(`manage/designers`, {data: {designer_seq:dat.designer_seq}}),
  //deleteDesigner: (data)=> axios.delete(`manage/designers`, {data:JSON.stringify(data)}),
  deleteDesigner: (data)=> axios.delete(`manage/designers`, {data}),

  //디자이너 목록 조회
  getDesigner: () => axios.get("manage/designers"),
};