import axios from "./index";

export const subscribeApi = {
    getsubscribeinfo: () => axios.get("/subscribe"),
    getitemlist: (businessSeq) => axios.get(`/subscribe/items/${businessSeq}`),
    makeSubscribe: (data) => axios.post(`/subscribe`, data),
    getactivesubscribe: () => axios.get("/subscribe/active"),
    unsubscribe: (businessSeq) => axios.delete(`/subscribe/${businessSeq}`)
}