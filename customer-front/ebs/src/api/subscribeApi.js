import axios from "./index";

export const subscribeApi = {
    getsubscribeinfo: () => axios.get("/subscribe")
}