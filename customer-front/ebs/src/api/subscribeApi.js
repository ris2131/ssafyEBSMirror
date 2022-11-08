import axios from "./index";

export const subscribeApi = {
    getsubscribeinfo: () => axios.get("/subscribe"),
    getitemlist: (businessSeq) => axios.get(`/subscribe/items/${businessSeq}`),
    makeSubscribe: (pricingSeq) => axios.post(`/subscribe/${pricingSeq}`)
}